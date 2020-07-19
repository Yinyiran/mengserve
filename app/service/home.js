const Service = require('egg').Service

class HomeService extends Service {
  async getBanner() {
    const banners = await this.app.mysql.select('banner', { orders: [['SortID', 'asc'], ['BanID', 'asc'],] });
    return banners
  }
  async getCompInfo(params) {
    const compinfo = await this.app.mysql.get('compInfo', params)
    delete compinfo.PassWord
    return compinfo
  }
  async getArticle(params) {
    let whereParam = {}
    if (params.id) whereParam.ArtID = params.id;
    if (params.isStar) whereParam.ArtStar = params.isStar;
    return await this.app.mysql.select('article', { where: whereParam, orders: [['ArtID', 'desc']] })
  }
}

module.exports = HomeService;