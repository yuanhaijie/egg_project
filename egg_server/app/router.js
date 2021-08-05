'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // home
  router.get('/', controller.home.index);

  // user
  router.post('/register',controller.user.register);
  router.post('/login',controller.user.login);

  // tag
  router.post('/createTag', controller.tag.createTag);
  router.post('/getTagList', controller.tag.getTagList);

  // tools
  router.post('/upload', controller.tools.saveAvatar);
};
