# CMS-Webpack

基于Webpack集成了一套用于开发页面开发的项目模板

## 技术支持
### JavaScript
集成了babel，支持ES2015+的语法

### CSS的
集成了Less-loader，可以使用了Less编写css

### HTML
集成了ejs，可以使用ejs语法来编写HTML，减少重复的HTML代码

## Install

`npm install`

## 开发预览

执行`npm run dev`，然后浏览器打开 `localhost:8080` 就可以即时预览页面

## 发布
执行 `npm run build`，会将代码发布到根目录下的 `dist` 目录

## 目录结构说明
```
├─dist
└─src  --每一个页面都应该在该目录编写一个.ejs文件作为入口
    ├─css
    ├─image --图片存放目录，图片文件必须存放在该目录，否则代码里面无法访问到正确的文件
    ├─js
    ├─layout --模板文件，存放可复用的.ejs文件
    └─lib
        └─bootstrap-3.4.1        
            ├─less
               └─variables.less --bootstrap的css变量参数文件
```

## 指南

### 创建一个页面 `index`

| 路径格式 | `index` 页面文件路径              |可选|  说明   |
| -------- | -------------------- |----| ------- |
| ./src/{name}.ejs    | ./src/index.ejs      | 否 |  |
| ./src/js/{name}.js   | ./src/js/index.js    | 是 |    | 
| ./src/js/{name}.less | ./src/js/index.less   | 是 |    |

编译后会自动生成 `./dist/index.html`

如果有创建 `index.js` 会在header标签自动添加 `<script defer src="js/index.js"></script>`

如果有创建 `index.less` 会在header标签自动添加 `<link href="./css/index.css" rel="stylesheet">`

### 默认支持的UI库
| 名称 | 版本 | 引用方式 |
| -- | -- | -- |
| Jquery |  ^1.12.4 | npm |
| bootstrap | ^3.4.1 | 源码 |

### 引用新的UI库

#### 安装
`npm i {库名}`

#### 引用JS库

在 ./src/js/{name}.js 插入以下代码
```
import '{库名}' 
```

#### 引用css库
在 ./src/js/{name}.less 插入以下代码

```
@import url("{.less文件路径}");
```

