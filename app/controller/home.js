const Controller = require("egg").Controller;

class HomeController extends Controller {
  async banner() {
    const { ctx, service } = this;
    ctx.body = await service.home.getBanner();
  }
  async products() {
    this.ctx.body = `kakka`
  }
  // 删除文件
  async getCompInfo() {
    const { ctx, service } = this;
    ctx.body = await service.home.getCompInfo(ctx.request.query);
  }
}

module.exports = HomeController