'use strict';

const Controller = require('egg').Controller;

class TodoController extends Controller {
    async getById() {
        const ctx = this.ctx;
        const uuid = ctx.query.uuid;
        // const pageSize = parseInt(ctx.query.pageSize);
        // const currentPage = parseInt(ctx.query.currentPage);
        const result = await ctx.service.todo.getTodoList(uuid);
        ctx.body = result;
    }

    async addTodoList() {
        const ctx = this.ctx;
        // const uuid = ctx.query.uuid;
        // const pageSize = parseInt(ctx.query.pageSize);
        // const currentPage = parseInt(ctx.query.currentPage);
        const result = await ctx.service.todo.addTodoList();
        ctx.body = result;
    }

    async updateTodoList() {
        const ctx = this.ctx;
        const result = await ctx.service.todo.updateTodoList();
        ctx.body = result;
    }
}

module.exports = TodoController;