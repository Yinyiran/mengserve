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
  // 删除文件
  async getCompInfo() {
    const { ctx, service } = this;
    ctx.body = service.manage.getCompInfo(ctx.request.body.data);
  }
  // 保存企业信息
  async saveCompInfo() {
    const { ctx, service } = this;
    ctx.body = service.manage.deleteFile(ctx.request.body.data);
  }
}

module.exports = ManageController;