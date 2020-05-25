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
    for (let i = 0; i < params.length; i++) {
      const options = {
        where: { ClassID: params[i] }
      };
      return await this.app.mysql.update('classify', { SortID: i }, options)
    }
  }


  // 产品
  async getProducts() {
    return await this.app.mysql.select("product")
  }
  async saveProduct() {
    return await this.app.mysql.insert("product")
  }
  async delProducts() {
    return await this.app.mysql.delete("product")
  }
  async getArticles() {
    return await this.app.mysql.select("article", { orders: [ ['ArtID', 'desc']] })

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
}

module.exports = ManageService;