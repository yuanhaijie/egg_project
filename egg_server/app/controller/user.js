'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
      const ctx = this.ctx;
      const user = await ctx.service.user.getUserList();
      ctx.body = user;
    }
    async name() {
        const ctx = this.ctx;
        const user = await ctx.service.user.getUserByName();
        ctx.body = user;
      }
    async add() {
        const ctx = this.ctx;
        const user = await ctx.service.user.addUser();
        ctx.body = user;
    }

    async update() {
        const ctx = this.ctx;
        const user = await ctx.service.user.updatePsd();
        ctx.body = user;
    }

    async login() {
        const ctx = this.ctx;
        const user = await ctx.service.user.login();
        ctx.body = user;
    }

  }

 module.exports = UserController;