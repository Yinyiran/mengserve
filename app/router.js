module.exports = app => {
  const { router, controller } = app;
  router.get("/api/banner", controller.home.banner)
  router.post("/api/uploadFile", controller.manage.uploadFile)
  router.get("/api/getFiles", controller.manage.getFiles)
}