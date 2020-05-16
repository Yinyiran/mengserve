const Service = require('egg').Service

class HomeService extends Service {
  async getBanner() {
    const banners = await this.app.mysql.select('banner');
    return banners
  }
  async getCompInfo(params) {
    return await this.app.mysql.get('compInfo', params)
  }
}

module.exports = HomeService;