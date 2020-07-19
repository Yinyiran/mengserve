const Service = require("egg").Service;
const FS = require('fs');
const Path = require('path');
const Pump = require('mz-modules/pump');
const UtilService = require("../../service/utile")

class ManageService extends Service {
  async login(param) {
    const compinfo = await this.app.mysql.get('compInfo', params);
    if (param.UserName === compinfo.UserName) {
      if (param.PassWord === compinfo.PassWord) {
        return "登录成功"
      } else {
        throw "登录名或密码错误"
      }
    } else {
      throw "登录名或密码错误"
    }
  }
  async getAllFile(path) {
    let allFiles = [];
    let getFile = (path) => {
      let arr = FS.readdirSync(path)
      arr.forEach(item => {
        let itemPath = Path.join(path, item)
        let state = FS.statSync(Path.join(this.config.baseDir, itemPath))
        if (state.isDirectory()) getFile(itemPath)
        else allFiles.push(itemPath.replace(/\\/g, "/"));
      })
    };
    getFile(path)
    return allFiles;
  }
  async fileExist(hashs) {
    let list = await this.app.mysql.select('file', { where: { FileHash: hashs } });
    let res = {}
    list.forEach(item => {
      res[item.FileHash] = item.FilePath;
    });
    return res;
  }
  async uploadFile(ctx) {
    let paramArr = [];
    let servePaths = [];
    const { body, files } = ctx.request;
    let connect = this.app.mysql
    try {
      for (const file of files) {
        const name = file.filename.toLowerCase();
        let ext = name.slice(name.lastIndexOf("."));
        let newName = new Date().getTime() + ext
        let basePath = UtilService[`${body.type}Path`];
        let dir = Path.join(this.config.baseDir, basePath);
        try {
          FS.accessSync(dir);
        } catch (error) {
          FS.mkdirSync(dir);
        }
        const source = FS.createReadStream(file.filepath);
        const target = FS.createWriteStream(Path.join(dir, newName));
        await Pump(source, target);
        let serPath = Path.join(basePath, newName).replace(/\\/g, "/");
        servePaths.push(serPath)
        paramArr.push(`(null, ${connect.escape(body[file.field])} , '${serPath}')`);
      }
      let query = `insert into file values ${paramArr.join()}`
      await connect.query(query);
    } finally {
      await ctx.cleanupRequestFiles();// delete those request tmp files
    }
    return servePaths;
  }
  async deleteFile(path) {
    await this.app.mysql.delete("file", { FilePath: path })
    let fullPath = Path.join(this.config.baseDir, path);
    return FS.unlinkSync(fullPath);
  }
  async saveCompInfo(params) {
    const { app } = this;
    const options = {
      where: {
        CompID: params.CompID
      }
    };
    return await app.mysql.update('compInfo', params, options)
  }

  async getClassify() {
    return await this.app.mysql.select('classify', { orders: [['SortID', 'asc'], ['ClassID', 'asc'],] })
  }
  async saveClassify(params) {
    const mysql = this.app.mysql;
    if (params.ClassID) {
      const options = {
        where: { ClassID: params.ClassID }
      };
      await mysql.update("classify", params, options)
      return true;
    } else {
      params.SortID = 99999;
      let result = await mysql.insert("classify", params);
      return await mysql.get("classify", { ClassID: result.insertId })
    }
  }
  async delClassify(params) {
    await this.app.mysql.delete('classify', params)
    return params
  }
  async sortClassify(params) {
    let connect = this.app.mysql
    let ids = params.map(item => connect.escape(item))
    let values = ids.map((item, index) => `WHEN ${item} THEN ${index + 1}`).join(" ");
    let query = `UPDATE classify SET SortID = CASE ClassID ${values} END WHERE ClassID in (${ids.join()})`
    return await connect.query(query)
  }


  // 产品
  async getProduct(param) {
    const con = this.app.mysql;
    let product = await con.select("product", { where: param })
    let prodIDs = product.map(prod => prod.ProdID);
    if (prodIDs.length) {
      const skuList = await con.select("sku", { where: { ProdID: prodIDs } });
      let idSku = {}
      skuList.forEach(item => {
        if (idSku[item.ProdID]) idSku[item.ProdID].push(item);
        else idSku[item.ProdID] = [item];
      });
      product.forEach(prod => {
        prod.SkuList = idSku[prod.ProdID] || []
      });
    }
    return product;
  }
  async getProdList(param) {
    const con = this.app.mysql;
    let query = {
      orders: [['ProdID', 'desc']],
      where: param,
      columns: ['ProdID', 'ProdName', 'ProdStar', 'Classify', 'ProdImg']
    }
    let products = await con.select("product", query);
    let prodIDs = products.map(prod => prod.ProdID);
    if (prodIDs.length) {
      const skuList = await con.select("sku", { where: { ProdID: prodIDs } });
      let idSku = {}
      skuList.forEach(item => {
        if (idSku[item.ProdID]) idSku[item.ProdID].push(item);
        else idSku[item.ProdID] = [item];
      });
      products.forEach(prod => {
        prod.SkuList = idSku[prod.ProdID] || []
      });
    }
    return products
  }
  async saveProduct(params) {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const { ProdContent, ProdID, ProdIntro, ProdName, ProdStar, Property, Classify } = params;
      let prodParam = { ProdContent, ProdID, ProdIntro, ProdName, ProdStar, Property, Classify }
      let prodid = 0;
      if (ProdID) {
        const options = {
          where: { ProdID: params.ProdID }
        };
        await conn.update("product", prodParam, options);
        prodid = ProdID;
      }
      else {
        let { insertId } = await conn.insert("product", prodParam);
        prodid = insertId;
      }
      let skuVals = []
      let skuColumn = ["ProdID", "IsMain", "SkuImg", "SkuProps", "SkuName"]
      params.SkuList.forEach(sku => {
        let str = ""
        skuColumn.forEach(col => {
          if (col === "ProdID") str += `${prodid},`
          else str += `${conn.escape(sku[col])},`
        });
        let vals = str.slice(0, -1)
        skuVals.push(`(${vals})`);
      })
      // 删除已存在sku
      await this.app.mysql.delete("sku", { ProdID: prodid });
      // 新建
      if (skuVals.length) {
        await conn.query(`insert into sku (${skuColumn.join()}) values ${skuVals.join()}`);
      }
      await conn.commit(); // 提交事务
      return { ProdID: prodid };
    } catch (error) {
      await conn.rollback()
      throw error
    }
  }

  async delProducts(params) {
    const con = this.app.mysql;
    await con.delete("product", { ProdID: params.ID });
    await con.delete("sku", { ProdID: params.ID });
    return params;
  }

  async saveArticle(params) {
    if (params.ArtID) {
      const options = {
        where: { ArtID: params.ArtID }
      };
      return await this.app.mysql.update("article", params, options)
    } else {
      return await this.app.mysql.insert("article", params)
    }
  }
  async delArticle(params) {
    if (params.ArtID) {
      await this.app.mysql.delete("article", params)
      return params;
    } else {
      throw "ArtID is not required"
    }
  }
  async saveBanner(params) {
    if (params.BanID) {
      const options = {
        where: { BanID: params.BanID }
      };
      return await this.app.mysql.update("banner", params, options)
    } else {
      return await this.app.mysql.insert("banner", params)
    }
  }
  async sortBanner(params) {
    let connect = this.app.mysql
    let ids = params.map(item => connect.escape(item))
    let values = ids.map((item, index) => `WHEN ${item} THEN ${index + 1}`).join(" ");
    let query = `UPDATE banner SET SortID = CASE BanID ${values} END WHERE BanID in (${ids.join()})`
    return await connect.query(query)
  }
  async delBanner(params) {
    await this.app.mysql.delete("banner", { BanID: params.id })
    return params;
  }
}

module.exports = ManageService;