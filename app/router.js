module.exports = app => {
  const { router, controller } = app;
  // index.js
  router.get("/api/banner", controller.home.banner)
  router.get("/api/getCompInfo", controller.home.getCompInfo)
  router.get("/api/getFiles", controller.manage.getFiles)
  router.post("/api/uploadFile", controller.manage.uploadFile)
  router.post("/api/deleteFile", controller.manage.deleteFile)

  // manage.js
  router.post("/api/saveCompInfo", controller.manage.saveCompInfo)
}