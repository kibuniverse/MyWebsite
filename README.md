# MyWebsite

个人网站项目搭建

## 一、项目背景



## 项目中遇到的问题

#### 在react中异步请求数据时出现问题

[解决] 在使用useEffect传入第二个空数组参数并在请求Promise的异步回调中修改数据



#### 在项目内使用`create-react-app`生成管理员前端后，使用`npm run start`出现 `webpack`版本错误

【解决】 首先cd 到外层文件夹，删除对应的`webpack`, `webpack-cli`, `webpack-dev-server`包

```mysql
npm uninstall webpack -g
npm unstall webpack
npm uninstall webpack-cli -g
npm unstall webpack-cli
npm uninstall webpack-dev-serve -g
npm unstall webpack-dev-serve
```

然后重新安装适应`create-react-app`的`webpack`以及`webpack`相关包的版本

```text
npm install webpack@对应的版本号 -D
npm install webpack-cli -D
npm install webpack-dev-serve@对应的版本号 -D
```

重新运行`npm start `正常启动服务



## 项目的缺点

- 由于本项目脚手架为个人手动搭建，并且使用`webpack` 直接打包`html`页面并将打包后的`js`引入，所以未使用`react`路由

