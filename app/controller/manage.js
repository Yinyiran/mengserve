const Controller = require("egg").Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const UtilService = require("../../service/utile")

class ManageController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    const files = ctx.request.files;
    // ctx.logger.warn('files: %j', files);

    try {
      for (const file of files) {
        const name = file.filename.toLowerCase();
        let ext = name.slice(name.lastIndexOf("."));
        let newName = new Date().getTime() + ext
        let key = ctx.request.body.type + "Path";
        let dir = path.join(this.config.baseDir, UtilService[key]);
        const targetPath = path.join(dir, newName)
        try {
          fs.accessSync(path.join(dir));
        } catch (error) {
          fs.mkdirSync(path.join(dir));
        }
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
      }
    } finally {
      await ctx.cleanupRequestFiles();// delete those request tmp files
    }

    const fields = [];
    for (const k in ctx.request.body) {
      fields.push({
        key: k,
        value: ctx.request.body[k],
      });
    }
    ctx.body = { fields, files }
  }
  getFiles() {
    const { ctx } = this;
    let filepaths = path.join(this.config.baseDir, `resource/${ctx.query.type}`)
    
    ctx.body = fs.readdirSync(imgpath)
  }
}

module.exports = ManageController;