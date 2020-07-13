let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin',   //登录检查用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo'  // 获取文章列表
}

export default servicePath