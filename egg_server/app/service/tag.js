'use strict';

const Service = require('egg').Service;
const sd = require('silly-datetime');

class TagService extends Service {
    async createTag(){
        const ctx = this.ctx;
        const tag = {
            name:ctx.request.body.name,
            uuid:ctx.request.body.uuid,
            createdAt:sd.format(new Date(),'YYYY-MM-DD HH:mm:ss'),
            updatedAt:''
        }
        try{
            const result = await this.app.mysql.insert('egg_tag',tag)
            console.log(result)
            return {
                error_code:200,
                msg: '添加成功',
            }
        }catch(err){
            this.logger.error.err
            return {}
        }

    }
    async getTagList(){
        const ctx = this.ctx;
        const uuid = ctx.request.body.uuid;
        try{
            const result = await this.app.mysql.select('egg_tag',uuid)
            console.log('查询结果',result)
            return {
                error_code:200,
                msg:'查询成功',
                data:result
            }
        }catch(err){
            this.logger.error.err
            return {}
        }
    }
}

module.exports = TagService;