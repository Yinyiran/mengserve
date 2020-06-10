const Service = require("egg").Service;
const FS = require('fs');
const Path = require('path');


class ManageService extends Service {
  async getAllFile(path) {
    let allFiles = [];
    let getFile = (path) => {
      let arr = FS.readdirSync(path)
      arr.forEach(item => {
        let itemPath = Path.join(path, item)
        let state = FS.statSync(Path.join(this.config.baseDir, itemPath))
        if (state.isDirectory()) getFile(itemPath)
        else allFiles.push(itemPath);
      })
    };
    getFile(path)
    return allFiles;
  }
  async deleteFile(path) {
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
    return await this.app.mysql.query(query)
  }


  // 产品
  async getProducts() {
    return await this.app.mysql.select("product", { orders: [['ProdID', 'desc']] })
  }
  async saveProduct() {
    return await this.app.mysql.insert("product")
  }
  async delProducts() {
    return await this.app.mysql.delete("product")
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
  async delBanner(params) {
    await this.app.mysql.delete("banner", { BanID: params.id })
    return params;
  }
}

module.exports = ManageService;