module.exports = () => {
  const fs = require("fs");
  const path = require("path");
  const join = path.join;

  // 读取所有API文件
  // const apiFiles = glob.sync(path.resolve(__dirname, './json-mocker') + '/**/*.js')

  const data = {};

  const getData = routerPath => {
    const list = fs.readdirSync(routerPath);
    list.forEach((item, index) => {
      let fPath = join(routerPath, item);
      let stats = fs.statSync(fPath);

      if (!stats.isDirectory() && routerPath !== "./json-mocker") {
        let api = require(path.resolve(__dirname, `../${fPath}`))();
        console.log(api);
        const { url, res } = api;

        if (url) {
          data[url] = res;
        }
      } else if (stats.isDirectory()) {
        getData(fPath);
      }
    });
  };

  getData("./json-mocker");
  return data;
};
