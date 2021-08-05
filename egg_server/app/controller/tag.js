'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
    async createTag() {
        const ctx = this.ctx;
        const result = await ctx.service.tag.createTag();
        ctx.body = result;
    }

    async getTagList() {
        const ctx = this.ctx;
        const result = await ctx.service.tag.getTagList();
        ctx.body = result;
    }
}

module.exports = TagController;