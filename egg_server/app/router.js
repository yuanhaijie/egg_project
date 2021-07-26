'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // home
  router.get('/', controller.home.index);

  // user
  router.get('/user',controller.user.index);
  router.get('/getByName',controller.user.name);
  router.post('/add',controller.user.add);
  router.post('/update',controller.user.update);
  router.post('/login',controller.user.login);

  // todolist
  router.get('/getTodoList', controller.todo.getById);
  router.post('/addTodoList', controller.todo.addTodoList);
  router.post('/updateTodoList', controller.todo.updateTodoList);
};
