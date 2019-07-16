const Mock = require('mockjs');
module.exports = () => {
    return {
        url: 'list',
        res: {
            name: Mock.mock({
                "number|+1": 202
              })
        }
    }
}