'use strict';

const Service = require('egg').Service;
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

class UserService extends Service {
    // 获取用户列表
    async getUserList() {
      const list = await this.app.mysql.select('user');
      return { data: list, msg:"success"};
    }

    // 根据用户姓名获取信息
    async getUserByName() {
        const ctx = this.ctx;
        const name = ctx.params.name;
        const result = await this.app.mysql.select('user',{name:name});
        return { data: result, msg:"success"};
    }

    // 添加用户
    async addUser() {
        const md5 = crypto.createHash('md5')
        const ctx = this.ctx;
        const user = {
            name:ctx.request.body.name,
            psd:md5.update(ctx.request.body.psd).digest('hex'),
            uuid:uuidv4()
        }
        const isExist = await this.app.mysql.get('user',{name:user.name})
        if(isExist){
           return {msg:'该用户名已存在'}
        }else {
            const result = await this.app.mysql.insert('user',user);
            // 判断插入成功
            const insertSuccess = result.affectedRows === 1;
            if(insertSuccess){
                return {  msg:"success"};
            }else {
                return {  msg:"fail"};
            }
        }
      }

      // 登录
      async login(){
        const md5 = crypto.createHash('md5')
        const ctx = this.ctx;
        const user = {
            name:ctx.request.body.name,
            psd:md5.update(ctx.request.body.psd).digest('hex'),
        }
        const options = {
              name: user.name,
              psd: user.psd
        }
        const result = await this.app.mysql.get('user',options)
        console.log(result)
        if(result){
            return {msg:"登录成功",data:result,error_code:1}
        }else{
            return {msg:"账号或密码错误",error_code:2}
        }
      }

      // 修改用户密码
      async updatePsd() {
        const md5 = crypto.createHash('md5')
        const ctx = this.ctx;
        const user = {
            name:ctx.request.body.name,
            psd:md5.update(ctx.request.body.psd).digest('hex'),
            uuid:ctx.request.body.uuid
        }
        const options = {
            where: {
              uuid: user.uuid
            }
        }
        const isExist = await this.app.mysql.get('user',{name:user.name})
        if(isExist){
            const result = await this.app.mysql.update('user',user,options);
            // 判断插入成功
             const insertSuccess = result.affectedRows === 1;
             if(insertSuccess){
                 return {  msg:"修改成功"};
             }else {
                 return {  msg:"修改失败"};
             }
        }else {
            return {msg:"该用户不存在"}
        }
      }
  }

  module.exports = UserService;