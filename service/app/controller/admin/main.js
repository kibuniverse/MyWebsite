'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let userPassword = this.ctx.request.body.password

        const sql = `SELECT userName FROM admin_user WHERE userName="${userName}" AND password="${userPassword}"`

        const res = await this.app.mysql.query(sql)

        console.log(res)
        if (res.length) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { error: 0, data: '登陆成功', 'openId': openId }
        } else {
            this.ctx.body = {
                error: 1,
                data: '密码或者账号错误'
            }
        }
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    async addArticle() {
        const articleInfo = this.ctx.request.body

        const result = await this.app.mysql.insert('articles', articleInfo)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body={
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    async updateArticle() {
        const articleInfo = this.ctx.request.body

        const result = await this.app.mysql.update('articles', articleInfo)
        const updataSuccess = result.affectedRows === 1
    
        this.ctx.body={
            updateScuccess: updataSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT articles.id,type.typeName,articles.title,articles.introduce,articles.addTime FROM articles, type WHERE type.id = articles.typeId'
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: res
        }
    }

    async deleteArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('articles', {'id': id})
        console.log(res)
        this.ctx.body = {
            data: res
        }
    }

    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT articles.id,type.typeName,articles.title,articles.introduce,articles.addTime,articles.articleContent FROM articles LEFT JOIN type ON articles.typeId = type.id WHERE articles.id=' + id;
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: res
        }
    }

    async getMessageInfo() {
        let sql = 'SELECT headProtrait, motto FROM admin_user WHERE userName="yankaizhi"'
        const res = await this.app.mysql.query(sql)
        console.log(res)
        this.ctx.body = {
            data: res
        }
    }

    async updateAdminHeader() {
        let headBase64 = this.ctx.request.body;
        console.log(headBase64)
        this.ctx.body = {
            data : '收到了数据请求了'
        }
    }
}

module.exports = MainController