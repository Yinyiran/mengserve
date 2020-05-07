const Service = require('egg').Service

class HomeService extends Service {
  async getBanner() {
    const banners = await this.app.mysql.select('banner');
    return banners
  }
}

module.exports = HomeService;