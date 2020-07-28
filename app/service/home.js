const Service = require('egg').Service

class HomeService extends Service {
  async getBanner() {
    const banners = await this.app.mysql.select('banner', { orders: [['SortID', 'asc'], ['BanID', 'asc'],] });
    return banners
  }
  async getCompInfo(params) {
    const compinfo = await this.app.mysql.get('compinfo', params)
    delete compinfo.PassWord
    return compinfo
  }
  async getArticle({ ID, ArtStar }) {
    let whereParam = {}
    if (ID) whereParam.ArtID = ID;
    if (ArtStar) whereParam.ArtStar = ArtStar;
    return await this.app.mysql.select('article', { where: whereParam, orders: [['ArtID', 'desc']] })
  }
}

module.exports = HomeService;