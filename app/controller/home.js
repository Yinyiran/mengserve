const Controller = require("egg").Controller;

class HomeController extends Controller {
  async getHomeInfo() {
    const { ctx, service } = this;
    const articles = await service.home.getArticle({ ArtStar: 1 });
    const banners = await service.home.getBanner();
    const products = await service.manage.getProdList({ ProdStar: 1 });
    ctx.body = { articles, banners, products }
  }
  async banner() {
    const { ctx, service } = this;
    ctx.body = await service.home.getBanner();
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