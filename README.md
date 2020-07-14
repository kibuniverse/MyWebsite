# My Website

> 个人网站项目搭建

## 一、项目背景

该项目为第一个`React`项目，目的在于锻炼对`React`的项目使用能力，其中大部分组件使用了`React Hook`语法, 顺便也通过此次项目搭建个人网站，由于该项目目的主要为锻炼`React`的开发使用，所以后端以及`UI`均使用了现成的框架。博客用户端脚手架为个人手动搭建，了解了`React`的工作环境。

项目用到的技术栈主要有

前端：`React` `React Hook`  `Ant-Design` `webpack`

后端：`Egg.js`(基于`Koa`的上层框架)  `Nginx`



## 二、项目目录

```js
│  README.md      // 项目readme 文档
│  webpack.config.js   // webpack打包配置文件
│
├─admin   // 管理员端
│  │  .gitignore   
│  │  package.json   // 包管理文件
│  │  README.md
│  │
│  ├─public    // 图标资源文件夹
│  │
│  └─src
│      │  index.js  // 入口文件
│      │
│      ├─config   // 公共请求路径配置文件夹  方便后期上线
│      │      apiUrl.js
│      │
│      ├─pages  // 页面组件文件夹
│      │
│      └─styles  // 样式
│
├─service   // 提供服务端
│  │
│  ├─app
│  │  │  router.js  // 总路由文件
│  │  │
│  │  ├─controller  // 提供服务接口文件夹
│  │  │  ├─admin   // 提供管理员端接口
│  │  │  │
│  │  │  └─default   // 提供用户端接口
│  │  │
│  │  ├─middleware  // 中间键， 做session验证
│  │  │
│  │  └─router  // 子路由文件夹
│  │          admin.js
│  │          default.js
│  │
│  ├─config  // egg.js 配置文件
│  │      config.default.js
│  │      plugin.js
│
└─src   // 博客主页面文件夹
    │  index.js  // 主入口文件
    │
    ├─components  // 各个页面组件文件
    |  |
    │  ├─blogPage
    │  │
    │  ├─HomePage
    │  │
    │  └─list
    │
    ├─config   // 公共请求路径配置文件夹  方便后期上线
    │      apiurl.js
    ├─pages
    │
    ├─static   // 静态资源
    │  │  favicon.ico
    │  │  header.png
    │  │
    │  ├─js   // js工具
    │  │
    │  └─styles  // 公共样式
    │          base.css
    │
    │
    └─styles    // css样式
```



## 三、项目功能

项目分为两个用户端和管理员端

用户端主要实现了博客的展示以及个人简介

管理端实现了博客的增删改查, (使用markdown 格式)



## 四、项目规范

### 4.1 命名规范

`js`变量均为驼峰式 

`css`样式为`单词-单词`

### 4.2 推送规范

`master`为主分支， 一般不往这个分支进行直接推送， `dev`分支为主要的开发分支, 其余分支根据分支名作为开发其他功能分支， 由于该项目为个人项目，所以不存在`code review`, 当`dev`分支完成并完善一个功能后直接在本地合并至主分支并推送至`github`



## 五、项目开发中遇到的问题

#### 1. 在react中异步请求数据时出现问题

【解决】 在使用useEffect传入第二个空数组参数并在请求Promise的异步回调中修改数据



#### 2. 在项目内使用`create-react-app`生成管理员前端后，使用`npm run start`出现 `webpack`版本错误

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

#### 3. 遇到组件重复渲染报错



## 六、上线过程中遇到的问题