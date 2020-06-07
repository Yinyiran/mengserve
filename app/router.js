module.exports = app => {
  const { router, controller } = app;
  // index.js
  router.get("/api/getBanner", controller.home.banner);
  // 信息
  router.get("/api/getCompInfo", controller.home.getCompInfo)
  router.post("/api/saveCompInfo", controller.manage.saveCompInfo)

  // 文件
  router.get("/api/getFiles", controller.manage.getFiles)
  router.post("/api/uploadFile", controller.manage.uploadFile)
  router.post("/api/deleteFile", controller.manage.deleteFile)

  // 类型
  router.get("/api/getClassify", controller.manage.getClassify)
  router.post("/api/saveClassify", controller.manage.saveClassify)
  router.post("/api/delClassify", controller.manage.delClassify)
  router.post("/api/sortClassify", controller.manage.sortClassify)

  // 产品
  router.get("/api/getProducts", controller.manage.getProducts)
  router.post("/api/saveProduct", controller.manage.saveProduct)
  router.post("/api/delProducts", controller.manage.delProducts)

  // 新闻
  router.get("/api/getArticle", controller.home.getArticle)
  router.get("/api/getArticles", controller.manage.getArticles)
  router.post("/api/saveArticle", controller.manage.saveArticle)
  router.post("/api/delArticle", controller.manage.delArticle)

  // manage.js
  router.post("/api/saveCompInfo", controller.manage.saveCompInfo)
  router.post("/api/saveBanner", controller.manage.saveBanner);

}