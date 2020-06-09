const Service = require('egg').Service

class HomeService extends Service {
  async getBanner() {
    const banners = await this.app.mysql.select('banner');
    return banners
  }
  async getCompInfo(params) {
    return await this.app.mysql.get('compInfo', params)
  }
  async getArticle(params) {
    let whereParam = {}
    if (params.id) whereParam.ArtID = params.id;
    if (params.isStar) whereParam.ArtStar = params.isStar;
    return await this.app.mysql.select('article', { where: whereParam, orders: [['ArtID', 'desc']] })
  }
}

module.exports = HomeService;