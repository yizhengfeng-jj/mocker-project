// // import jsonServer from 'json-server';
// import enableDestroy from 'server-destroy';
const chalk = require("./chalkConfig");
const enableDestroy = require("server-destroy");
const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const { chalkSuccess } = chalk;

// 由于mockServser 模式自动监听文件变化，所以需要手动配置
// 监听文件插件chokidar
const chokidar = require("chokidar");
const routerPath = require("../json-mocker/index.js");
let server = null;

// 创造路由
let router = jsonServer.router(routerPath());

// 创造中间件
const middlewares = jsonServer.defaults();

const start = () => {
  // 创造服务
  const app = jsonServer.create();

  // 使用json服务
  app.use(middlewares);

  // 使用路由
  app.use(router);

  // 监听端口
  server = app.listen(3009, () => {
    console.log(chalkSuccess("mock server is runing"));
  });

  enableDestroy(server);
};

chokidar.watch("./json-mocker").on("change", file => {
  setTimeout(function() {
    const obj = require("../json-mocker/index.js")();
    console.log(obj);
    //   const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
    //   if(isDatabaseDifferent) {
    //     console.log(chalkSuccess("接口文档正在改变，请稍等......."));
    //     server && server.destroy();
    //     router = jsonServer.router(obj);
    //     start();
    //   }
    console.log(chalkSuccess("接口文档正在改变，请稍等......."));
    server && server.destroy();
    router = jsonServer.router(obj);
    start();
  }, 1000);
});
start();
