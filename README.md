# io_led

> a led controler project based on vue for Front-End, nodejs or Express for Back-End, Also with ARM chip based on C programming with socket_in.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 中文说明

`npm run dev` 可以开始调试
`npm run build` 生成生产用的静态文件

本前端项目利用 `vue.js` 开发完成
依靠 `webpack` 前端打包工具
前端用到了特殊的 `css` 动态语言， `stylus-loader` 转化模块
若后台用到了 `socket.io` 通信，本项目也同样支持 `socket.io` 通信

 `build`  产生的  `dist/`  文件夹必须在服务器条件下运行，不然会有找不到文件报错

 
## 截图效果

![](doc/img/1.png)
![](doc/img/2.png)
![](doc/img/3.png)
![](doc/img/4.png)