const Controller = require("egg").Controller;

class HomeController extends Controller {
  async banner() {
    const { ctx } = this;
    this.ctx.body = await ctx.service.home.getBanner();
  }
  async products() {
    this.ctx.body = `kakka`
  }
}

module.exports = HomeController