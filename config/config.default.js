
module.exports = appInfo => {
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1523879140687_7825',
    // token
    security: {
      csrf: {
        headerName: 'x-csrf-token',// 自定义请求头
      }
    },
    multipart: {
      mode: "file"
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'kongwu123',
        database: 'meng'
      },
      app: true,
      agent: false,
    },
  };
  return config;
};