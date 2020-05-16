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
}

module.exports = ManageService;