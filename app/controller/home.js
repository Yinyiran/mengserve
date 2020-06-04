const Controller = require("egg").Controller;

class HomeController extends Controller {
  async banner() {
    const { ctx, service } = this;
    ctx.body = await service.home.getBanner();
  }
  async products() {
    this.ctx.body = `kakka`
  }
  // 获取企业信息
  async getCompInfo() {
    const { ctx, service } = this;
    ctx.body = await service.home.getCompInfo(ctx.request.query);
  }
  // 获取企业信息
  async getArticle() {
    const { ctx, service } = this;
    ctx.body = await service.home.getArticle(ctx.request.query);
  }
}

module.exports = HomeController