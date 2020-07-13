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
        
    }
}

module.exports = MainController