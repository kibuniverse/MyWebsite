module.exports = app =>{
    const { router, controller } = app
    router.get('/default/getArticleList', controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
    router.get('/default/getArticleListByTypeId/:typeId', controller.default.home.getArticleListByTypeId)
}