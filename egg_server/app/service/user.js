"use strict";

const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

class UserService extends Service {
  // 注册用户
  async register(){
    const md5 = crypto.createHash("md5");
    const ctx = this.ctx;
    const user = {
      account: ctx.request.body.account,
      password: md5.update(ctx.request.body.password).digest("hex"),
      nick_name: ctx.request.body.nick_name,
      avatar: ctx.request.body.avatar,
      uuid: uuidv4(),
      sex: ctx.request.body.avatar || '',
      age: ctx.request.body.age || '',
      address: ctx.request.body.address || '',
      other: ctx.request.body.other || ''
    };
    const result = await this.app.mysql.insert("egg_user", user);
    console.log('注册结果>>>',result)
    // 判断插入成功
   if(result.affectedRows === 1){
     const data = await this.app.mysql.select("egg_user",{
       where:{
         uuid:user.uuid
       },
       colums:['account','nick_name','avatar','uuid','sex','age','address','other']
     })
     console.log('查询结果>>>',data)
     return {
       error_code:200,
       msg: '注册成功',
       data: data[0]
     }
   }else {
     return {
      error_code:101,
      msg: '注册失败',
      data: result
     }
   }
  }

  // 用户登录
  async login(){
    const md5 = crypto.createHash("md5");
    const ctx = this.ctx;
    const user = {
      account: ctx.request.body.account,
      password: md5.update(ctx.request.body.password).digest("hex"),
    };
    const result = await this.app.mysql.select("egg_user", {
      where:{
        account: user.account,
        password: user.password,
      },
      colums:['account','nick_name','avatar','uuid','sex','age','address','other']
    });
    if (result) {
      return {
        msg: "登录成功",
        data: result[0],
        error_code: 200,
      };
    } else {
      return { msg: "账号或密码错误", error_code: 101 };
    }
  }
}

module.exports = UserService;
