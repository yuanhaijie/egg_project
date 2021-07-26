'use strict';

const Service = require('egg').Service;

class TodoService extends Service {
    // 根据uuid获取todolist
    async getTodoListPage(uuid,pageSize,currentPage) {
        const limit = parseInt(pageSize);
        const offset = (parseInt(currentPage) - 1) * limit;
        const list = await this.app.mysql.select('user_todo',{
            user_uuid:uuid,
            columns:['id','desc','tag'],
            orders:['id','desc'],
            limit: limit,
            offset: offset,   
        });
        console.log('查询结果',list)
        return { data: list, msg:"success"};
    }

    async getTodoList(uuid) {
        const list = await this.app.mysql.get('todo_list',{
            u_uuid:uuid, 
        });
        console.log('查询结果',list)
       if(list) return { data: list, msg:"success",error_code:1};
       return { msg:"获取列表失败",error_code:2}
    }

    async addTodoList() {
        const ctx = this.ctx;
        const todoList = {
            name:ctx.request.body.name,
            createdAt:ctx.request.body.createdAt,
            list:ctx.request.body.list,
            u_uuid:ctx.request.body.u_uuid,
        }
        const result = await this.app.mysql.insert('todo_list',todoList);
        console.log('查询结果',result)
        if(result)return { data: result, msg:"success",error_code:1};
    }

    async updateTodoList() {
        const ctx = this.ctx;
        const todoList = {
            list:ctx.request.body.list,
            u_uuid:ctx.request.body.u_uuid,
        }
        const options = {
            where:{
                u_uuid:todoList.u_uuid
            }
        }
        const isExist = await this.app.mysql.get('todo_list',{u_uuid:todoList.u_uuid})
        if(isExist){
            const result = await this.app.mysql.update('todo_list',todoList,options);
            console.log('查询结果',result)
            if(result)return { data: result, msg:"success",error_code:1};
        }
        
    }


}

module.exports = TodoService;