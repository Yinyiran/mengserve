module.exports = app => {
  const { router, controller } = app;
  router.get("/banner", controller.home.banner)
  router.post("/uploadFile", controller.manage.uploadFile)
  router.get("/getFiles", controller.manage.getFiles)
}