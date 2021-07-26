'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  nunjunks:{
    enable: true,
    package: 'egg-view-nunjucks'
  },
  mysql:{
    enable:true,
    package:'egg-mysql'
  }
};
