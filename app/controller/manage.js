const Controller = require("egg").Controller;
const FS = require('fs');
const Path = require('path');
const Pump = require('mz-modules/pump');
const UtilService = require("../../service/utile")

class ManageController extends Controller {
  // 上传文件
  async uploadFile() {
    const { ctx } = this;
    const files = ctx.request.files;
    let servePaths = []
    try {
      for (const file of files) {
        const name = file.filename.toLowerCase();
        let ext = name.slice(name.lastIndexOf("."));
        let newName = new Date().getTime() + ext
        let key = ctx.request.body.type + "Path";
        let dir = Path.join(this.config.baseDir, UtilService[key]);
        try {
          FS.accessSync(dir);
        } catch (error) {
          FS.mkdirSync(dir);
        }
        const source = FS.createReadStream(file.filepath);
        const target = FS.createWriteStream(Path.join(dir, newName));
        await Pump(source, target);
        servePaths.push(Path.join(UtilService[key], newName))
      }
    } finally {
      await ctx.cleanupRequestFiles();// delete those request tmp files
    }
    ctx.body = servePaths;
  }
  // 获取所有文件
  async getFiles() {
    const { ctx, service } = this;
    ctx.body = await service.manage.getAllFile(`resource/${ctx.query.type}`)
  }
  // 删除文件
  async deleteFile() {
    const { ctx, service } = this;
    ctx.body = service.manage.deleteFile(ctx.request.body.data);
  }
  // 保存企业信息
  async saveCompInfo() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveCompInfo(ctx.request.body);
  }
}

module.exports = ManageController;