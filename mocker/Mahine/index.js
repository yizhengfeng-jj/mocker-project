const Mock = require("mockjs");
let userList = [];

const proxy = {
  "GET /api/list": userList,

  "POST /api/create": (req, res) => {
    userList.push(req.body);
    return res.json("ok");
  },

  "POST /api/editor/:id": (req, res) => {
    const index = req.params.id;
    userList.splice(index, 1, req.body);

    return res.json("ok");
  },

  "GET /api/list/:id": (req, res) => {
    
    const parmasId = req.params.id;
    const result = userList.filter((item, index) => index === Number(parmasId));

    return res.json(result);
  },

  "DELETE /api/delete/:id": (req, res) => {
    const parmasId = req.params.id;
    userList.splice(parmasId, 1);

    return res.json(userList);
  }

  // "GET /api/info": (req, res) => {
  //   return res.json({
  //     data: Mock.mock({
  //       "firstName|3": "fei", //重复fei这个字符串 3 次，打印出来就是'feifeifei'。
  //       "lastName|2-5": "jiang", //重复jiang这个字符串 2-5 次。
  //       "big|+1": 0, //属性值自动加 1，初始值为 0
  //       "age|20-30": 25, //生成一个大于等于 20、小于等于 30 的整数，属性值 25 只是用来确定类型
  //       "weight|100-120.2-5": 110.24, //生成一个浮点数,整数部分大于等于 100、小于等于 120，小数部分保留 2 到 5 位。
  //       "likeMovie|1": Boolean, //随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
  //       "life1|2": obj, //从属性值 obj 中随机选取 2 个属性
  //       "life1|1-2": obj, //从属性值 obj 中随机选取 1 到 2 个属性。
  //       "friend1|1": arr, //从数组 arr 中随机选取 1 个元素，作为最终值。
  //       "friend2|+1": arr, //从属性值 arr 中顺序选取 1 个元素，作为最终值
  //       "friend3|2-3": arr //通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3。
  //     })
  //   });
  // }
};

module.exports = proxy;