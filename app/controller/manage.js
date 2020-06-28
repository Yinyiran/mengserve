const Controller = require("egg").Controller;

class ManageController extends Controller {
  // ------ 文件 -------
  // 根据filehash 判断文件是否已经上传
  async fileExist() {
    const { ctx, service } = this;
    ctx.body = await service.manage.fileExist(ctx.request.body)
  }
  // 上传文件
  async uploadFile() {
    const { ctx, service } = this;
    let servePaths = await service.manage.uploadFile(ctx)
    ctx.body = servePaths;
  }
  // 获取所有文件
  async getFiles() {
    const { ctx, service } = this;
    ctx.body = await service.manage.getAllFile(`resource/${ctx.query.type}`)
  }
  // 删除文件
  async deleteFile() {
    const { ctx, service } = this;
    ctx.body = service.manage.deleteFile(ctx.request.body.FilePath);
  }


  // ------ 分类 -------
  // 获取所有类
  async getClassify() {
    const { ctx, service } = this;
    ctx.body = await service.manage.getClassify(ctx.query)
  }
  // 获取所有文件
  async saveClassify() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveClassify(ctx.request.body)
  }
  // 获取所有文件
  async sortClassify() {
    const { ctx, service } = this;
    ctx.body = await service.manage.sortClassify(ctx.request.body)
  }
  // 获取所有文件
  async delClassify() {
    const { ctx, service } = this;
    ctx.body = await service.manage.delClassify(ctx.request.body)
  }


  // 保存企业信息
  async saveCompInfo() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveCompInfo(ctx.request.body);
  }

  // 产品
  async getProduct() {
    const { ctx, service } = this;
    let res = await service.manage.getProduct(ctx.request.query)
    ctx.body = res[0];
  }
  async getProdList() {
    const { ctx, service } = this;
    ctx.body = await service.manage.getProdList(ctx.request.query)
  }
  async saveProduct() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveProduct(ctx.request.body)
  }
  async delProducts() {
    const { ctx, service } = this;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    ctx.body = await service.manage.delProducts(ctx.request.body)
  }

  async saveArticle() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveArticle(ctx.request.body)

  }
  async delArticle() {
    const { ctx, service } = this;
    ctx.body = await service.manage.delArticle(ctx.request.body)

  }
  // 轮播图
  async saveBanner() {
    const { ctx, service } = this;
    ctx.body = await service.manage.saveBanner(ctx.request.body)
  }
  async sortBanner() {
    const { ctx, service } = this;
    ctx.body = await service.manage.sortBanner(ctx.request.body)
  }
  async delBanner() {
    const { ctx, service } = this;
    ctx.body = await service.manage.delBanner(ctx.request.body)
  }
}

module.exports = ManageController;