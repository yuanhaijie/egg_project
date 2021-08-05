"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 用户注册
  async register() {
    const ctx = this.ctx;
    const user = await ctx.service.user.register();
    ctx.body = user;
  }

  // 用户登录
  async login() {
    const ctx = this.ctx;
    const user = await ctx.service.user.login();
    ctx.body = user;
  }
}

module.exports = UserController;
