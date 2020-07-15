# My Website

> 个人网站项目搭建

## 一、项目背景

该项目为第一个`React`项目，目的在于锻炼对`React`的项目使用能力，其中大部分组件使用了`React Hook`语法, 顺便也通过此次项目搭建个人网站，由于该项目目的主要为锻炼`React`的开发使用，所以后端以及`UI`均使用了现成的框架。博客用户端脚手架为个人手动搭建，了解了`React`的工作环境。

项目用到的技术栈主要有

前端：`React` `React Hook`  `Ant-Design` `webpack`

后端：`Egg.js`(基于`Koa`的上层框架)  `Nginx` `pm2`



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

`js`变量均为驼峰式 , 各个组件默认大写字母开头

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
npm uninstall webpack
npm uninstall webpack-cli -g
npm uninstall webpack-cli
npm uninstall webpack-dev-server -g
npm uninstall webpack-dev-server
```

然后重新安装适应`create-react-app`的`webpack`以及`webpack`相关包的版本

```text
npm install webpack@对应的版本号 -D
npm install webpack-cli -D
npm install webpack-dev-server@对应的版本号 -D
```

重新运行`npm start `正常启动服务

#### 3. 遇到组件重复渲染报错

原因是在一个组件的`onClick`方法中直接调用了对应的数据修改函数，导致在编译时就执行了改函数，进入了一个递归的过程。



## 六、项目上线过程

服务器环境 `CentOS7.6 `

### 大体的流程

首先将代码从`github `上拉下来

#### 后台服务端

- 执行`npm install --save`安装`pack.json`文件夹中需要的包
- 修改`config`文件夹中 数据库的名称和密码
- 配置`nginx`
- 启动服务

#### 前端用户端



#### 前端管理员端





#### 上线过程中遇到的问题

##### 1. 出现`Fatal error: ENOSPC: System limit for number of file watchers reached, watch '...path...'`错误

【解决】出现这个错误的原因是因为



##### 2.数据库版本错误

由于项目在写的过程中是在本地进行调试的，但是本地的数据库版本为8.x，因为本地数据库排序规则(`utf8mb4_0900_ai_ci`)和服务器数据库5.x排序规则(`utf8_general_ci`)不相符，导致本地数据库导出的`sql`脚本文件无法成功在服务器数据库运行，此处为开发前期为准备好，由于表和数据不是很多，就直接在服务器手动建表了 



##### 3. 管理员端在服务器上开启服务后在浏览器中无法访问(`nginx`已经配置)

问题： 通过`https://ip:address port`方法可以正常请求页面并进行操作，但是使用`Nginx`进行反向代理后出现`webSocket`连接错误，定位到`Nginx`错误后后配置`http version 1.1 `, ` proxy_set_header Upgrade $http_upgrade;`, `proxy_set_header Connection "Upgrade"`仍然出现`Error during WebSocket handshake` , 由于该端口是管理端，且目前找不到解决方案，就先使用`Ip`进行访问



##### 4. 项目上线后发现打开博客主页面就非常慢

打开控制台后发现是下载`index.js`时间过长导致页面无法进行渲染，但由于`UI`都放在`index.js`无法提前进行视图层的渲染，由于将所有的组件都包含在`webpack`打包后的`index.js`中，包括`antd`, 各种css, `index.js`未压缩前达到了惊人的`21.7Mb`, 打开主页面需要将近三分钟， 刚开始以为服务器出问题，后面发现只是`index.js`过大

解决办法： 首先使用`Nginx`进行压缩

`Nginx`配置

```ng
gzip on;
gzip_min_length 1k;
gzip_buffers 32 4k;
gzip_comp_level 9;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript; 
gzip_vary on;
gzip_static on;
gzip_proxied any;
```

由于`index.js`中引入了太多的组件，所以使用`Nginx`压缩后仍旧有`5.2Mb`，下载依然需要半分钟左右，所以就需要进一步对`index.js`进行处理

下面从`webpack`入手，在使用`webpack-dev-server`的进行热部署的时候加入参数`--compress`对`js`和`css`进行压缩，压缩完之后`index.js`已经达到了`1.1Mb`，相比于之前的`21Mb`有了明显的提升，但是仍旧需要十几秒的加载时间，还需继续优化。。