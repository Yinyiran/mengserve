const Controller = require("egg").Controller;

class ManageController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    await ctx.service.manage.uploadFile();
    ctx.body = JSON.stringify(ctx)
  }
}

module.exports = ManageController;