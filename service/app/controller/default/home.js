'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        this.ctx.body = 'api 接口';
    }

    async getArticleList() {
        let sql = 'SELECT * FROM articles'
        console.log(new Date().getTime())
        const res = await this.app.mysql.query(sql)
        console.log(new Date().getTime())
        this.ctx.body = {
            data: res
        }
    }
    
}

module.exports = HomeController