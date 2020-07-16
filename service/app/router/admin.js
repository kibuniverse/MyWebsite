

module.exports = app => {
    const { router, controller } = app

    let adminAuth = app.middleware.adminAuth()  // 中间键， 验证session

    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', adminAuth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle', adminAuth, controller.admin.main.updateArticle)
    router.get('/admin/getArticleList', adminAuth, controller.admin.main.getArticleList)
    router.get('/admin/deleteArticle/:id', adminAuth, controller.admin.main.deleteArticle)
    router.get('/admin/getArticleById/:id', adminAuth, controller.admin.main.getArticleById)
    router.post('/admin/updateAdminHeader', adminAuth, controller.admin.main.updateAdminHeader)
    router.get('/admin/getMessageInfo', adminAuth, controller.admin.main.getMessageInfo)
}