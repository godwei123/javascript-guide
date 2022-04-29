# 项目工程化（Webpack）

## 常见的 Loader

file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去

source-map-loader：加载额外的 Source Map 文件，以方便断点调试

image-loader：加载并且压缩图片文件

babel-loader：把 ES6 转换成 ES5

css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

eslint-loader：通过 ESLint 检查 JavaScript 代码

## 常见的 Plugin

define-plugin：定义环境变量

terser-webpack-plugin：通过 TerserPlugin 压缩 ES6 代码

html-webpack-plugin 为 html 文件中引入的外部资源，可以生成创建 html 入口文件

mini-css-extract-plugin：分离 css 文件

clean-webpack-plugin：删除打包文件

happypack：实现多线程加速编译

## Loader 和 Plugin 的区别？

Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

## .browerslist

可以通过 browerslist 来进行配置我们需要兼容那些浏览器，可以通过配置.browserslistrc 来配置浏览器兼容的规则。

browserslist 这个插件不能单独使用，他只能计算出需要适配的浏览器有哪些，我们需要添加浏览器前缀的话需要配合 autoprefixer 或者 babel 或 postcss 等插件使用，也可以安装 browserslist-cli 用 npx browserslist 进行操作。

## Webpack 构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

-   初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
    开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
-   确定入口：根据配置中的 entry 找出所有的入口文件
-   编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
-   完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
-   输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
-   输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

简单说

-   初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
-   编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
-   输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## sourcemap 是什么？生产环境怎么用？

sourcemap 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucremap。

## 模块打包原理

Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

## 文件监听原理呢？

在发现源码发生变化时，自动重新构建出新的输出文件。
Webpack 开启监听模式，有两种方式：

启动 webpack 命令时，带上 --watch 参数在配置 webpack.config.js 中设置 watch:true
缺点：每次需要手动刷新浏览器
原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

```js
module.export = {
    // 默认false,也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000,
    },
};
```

## Webpack 的热更新原理

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

## 文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

-   Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
-   Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
-   Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

JS 的文件指纹设置，设置 output 的 filename，用 chunkhash。

CSS 的文件指纹设置，设置 MiniCssExtractPlugin 的 filename，使用 contenthash。

图片的文件指纹设置，设置 file-loader 的 name，使用 hash。

## 如何保证各个 loader 按照预想方式工作？

可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline 官方不推荐使用)

## 优化 Webpack 的构建速度

## Babel 原理

大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器)
Babel 大概分为三大部分：

-   解析：将代码转换成 AST
    -   词法分析：将代码(字符串)分割为 token 流，即语法单元成的数组
    -   语法分析：分析 token 流(上面生成的数组)并生成 AST
-   转换：访问 AST 的节点进行变换操作生产新的 AST，Taro 就是利用 babel 完成的小程序语法转换
-   生成：以新的 AST 为基础生成代码
