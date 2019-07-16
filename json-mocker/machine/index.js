const Mock = require('mockjs');
module.exports = () => {
    return {
        url: 'submitaaabb',
        res: {
            machine: Mock.mock({
                "number|+1": 202
              })
        }
    }
}