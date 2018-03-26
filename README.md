# cfdq-wechat

> 厨房电器

### 目录结构

    build 编译配置
    config 配置
    src 未编译代码
        api 接口文件
        assets 资源文件
            img 图片文件
            style 样式文件
        common 存放公共js文件
            request 请求类
            bus 监听广播类
            config host配置类
            constant 枚举集和全局常量类
            flexible 适配类
            storage 存储集
            utils 公共js方法
        components 组件文件（使用次数大于等于两次的组件，都需要抽取出来）
        router 路由信息
        page 视图文件
        App.vue  入口vue
        main.js  入口js
    dist 编译后的输出路径

    index.html 入口页面
    package.json  插件配置

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
