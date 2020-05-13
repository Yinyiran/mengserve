const Controller = require("egg").Controller;
const FS = require('fs');
const Path = require('path');
const Pump = require('mz-modules/pump');
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
        let dir = Path.join(this.config.baseDir, UtilService[key]);
        const targetPath = Path.join(dir, newName)
        try {
          FS.accessSync(Path.join(dir));
        } catch (error) {
          FS.mkdirSync(Path.join(dir));
        }
        const source = FS.createReadStream(file.filepath);
        const target = FS.createWriteStream(targetPath);
        await Pump(source, target);
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
  async getFiles() {
    const { ctx } = this;
    ctx.body = await this.getAllFile(`resource/${ctx.query.type}`)
  }
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
}

module.exports = ManageController;