'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        let result = await this.app.mysql.get('blog-content', {});
        console.log(result);
        this.ctx.body = result;
    }
}

module.exports = HomeController