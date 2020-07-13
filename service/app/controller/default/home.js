'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async getArticleList() {
        let sql = 'SELECT articles.id,type.typeName,articles.title,articles.introduce,articles.addTime FROM articles, type WHERE type.id = articles.typeId'
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: res
        }
    }

    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT articles.id,type.typeName,articles.title,articles.introduce,articles.addTime,articles.articleContent FROM articles LEFT JOIN type ON articles.typeId = type.id WHERE articles.id=' + id;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: res
        }
    }

    async getArticleListByTypeId() {
        let typeId = this.ctx.params.typeId
        let sql = `SELECT * FROM articles WHERE typeId=${typeId}`
        console.log(sql)
        const res = await this.app.mysql.query(sql)
        console.log(res)
        this.ctx.body = {
            data: res
        }
    }
    
    
}

module.exports = HomeController