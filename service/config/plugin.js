'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

//数据库相关操作
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}

// 处理跨域
exports.cors = {
  enable: true,
  package: 'egg-cors'
}