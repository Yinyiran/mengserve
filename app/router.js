module.exports = app => {
  const { router, controller } = app;
  // index.js
  router.post("/api/login", controller.manage.login);
  // index.js
  router.get("/api/getHomeInfo", controller.home.getHomeInfo);
  router.get("/api/getBanner", controller.home.banner);
  // 信息
  router.get("/api/getCompInfo", controller.home.getCompInfo)
  router.post("/api/saveCompInfo", controller.manage.saveCompInfo)

  // 文件
  router.get("/api/getFiles", controller.manage.getFiles)
  router.post("/api/uploadFile", controller.manage.uploadFile)
  router.post("/api/deleteFile", controller.manage.deleteFile)
  router.post("/api/fileExist", controller.manage.fileExist)

  // 类型
  router.get("/api/getClassify", controller.manage.getClassify)
  router.post("/api/saveClassify", controller.manage.saveClassify)
  router.post("/api/delClassify", controller.manage.delClassify)
  router.post("/api/sortClassify", controller.manage.sortClassify)

  // 产品
  router.get("/api/getProdList", controller.manage.getProdList)
  router.get("/api/getProduct", controller.manage.getProduct)
  router.post("/api/saveProduct", controller.manage.saveProduct)
  router.post("/api/delProducts", controller.manage.delProducts)

  // 新闻
  router.get("/api/getArticle", controller.home.getArticle)
  router.post("/api/saveArticle", controller.manage.saveArticle)
  router.post("/api/delArticle", controller.manage.delArticle)

  // manage.js
  router.post("/api/saveCompInfo", controller.manage.saveCompInfo)

  // 轮播图
  router.post("/api/saveBanner", controller.manage.saveBanner);
  router.post("/api/delBanner", controller.manage.delBanner);
  router.post("/api/sortBanner", controller.manage.sortBanner);

}