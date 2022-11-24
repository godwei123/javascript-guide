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

Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为 Webpack 只认识 JavaScript，所以 Loader
就成了翻译官，对其他类型的资源进行转译的预处理工作。

Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin
可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)
、loader、options (参数)等属性。

Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

## .browerslist

可以通过 browerslist 来进行配置我们需要兼容那些浏览器，可以通过配置.browserslistrc 来配置浏览器兼容的规则。

browserslist 这个插件不能单独使用，他只能计算出需要适配的浏览器有哪些，我们需要添加浏览器前缀的话需要配合 autoprefixer 或者
babel 或 postcss 等插件使用，也可以安装 browserslist-cli 用 npx browserslist 进行操作。

## Webpack 构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
  开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk
  转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用
Webpack 提供的 API 改变 Webpack 的运行结果。

简单说

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## sourcemap 是什么？生产环境怎么用？

sourcemap 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucremap。

## 模块打包原理

Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

## 文件监听原理呢？

在发现源码发生变化时，自动重新构建出新的输出文件。
Webpack 开启监听模式，有两种方式：

启动 webpack 命令时，带上 --watch 参数在配置 webpack.config.js 中设置 watch:true
缺点：每次需要手动刷新浏览器
原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout
后再执行。

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

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个
Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向
WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk
的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API
以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

## 文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

- Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
- Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
- Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

JS 的文件指纹设置，设置 output 的 filename，用 chunkhash。

CSS 的文件指纹设置，设置 MiniCssExtractPlugin 的 filename，使用 contenthash。

图片的文件指纹设置，设置 file-loader 的 name，使用 hash。

## 如何保证各个 loader 按照预想方式工作？

可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline
官方不推荐使用)

## 优化 Webpack 的构建速度

## Babel 原理

大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器)
Babel 大概分为三大部分：

- 解析：将代码转换成 AST
  - 词法分析：将代码(字符串)分割为 token 流，即语法单元成的数组
  - 语法分析：分析 token 流(上面生成的数组)并生成 AST
- 转换：访问 AST 的节点进行变换操作生产新的 AST，Taro 就是利用 babel 完成的小程序语法转换
- 生成：以新的 AST 为基础生成代码

## Webpack 里面的插件是怎么实现的

## Webpack 为什么慢，如何进行优化

https://github.com/lgwebdream/FE-Interview/issues/921

## Webpack 热更新的原理

### 一、基础概念

- Webpack Compiler: 将 JS 编译成 Bundle
- Bundle Server: 提供文件在浏览器的访问，实际上就是一个服务器
- HMR Server: 将热更新的文件输出给 HMR Runtime
- HMR Runtime: 会被注入到 bundle.js 中，与 HRM Server 通过 WebSocket 链接，接收文件变化，并更新对应文件
  bundle.js: 构建输出的文件

### 二、原理

1.启动阶段

Webpack Compiler 将对应文件打包成 bundle.js(包含注入的 HMR Server)，发送给 Bundler Server

浏览器即可以访问服务器的方式获取 bundle.js

2.更新阶段(即文件发生了变化)

Webpack Compiler 重新编译，发送给 HMR Server

HMR Server 可以知道有哪些资源、哪些模块发生了变化，通知 HRM Runtime

HRM Runtime 更新代码

### 三、HMR 原理详解

![hmr](../../public/2f696d672d73746.png)

使用 webpack-dev-server 去启动本地服务，内部实现主要使用了 webpack、express、websocket。

- 使用 express 启动本地服务，当浏览器访问资源时对此做响应。
- 服务端和客户端使用 websocket 实现长连接
- webpack 监听源文件的变化，即当开发者保存文件时触发 webpack 的重新编译。

  - 每次编译都会生成 hash 值、已改动模块的 json 文件、已改动模块代码的 js 文件
  - 编译完成后通过 socket 向客户端推送当前编译的 hash 戳

- 客户端的 websocket 监听到有文件改动推送过来的 hash 戳，会和上一次对比

  一致则走缓存,不一致则通过 ajax 和 jsonp 向服务端获取最新资源

- 使用内存文件系统去替换有修改的内容实现局部刷新

  1.server 端

- 启动 webpack-dev-server 服务器
- 创建 webpack 实例
- 创建 Server 服务器
- 添加 webpack 的 done 事件回调
- 编译完成向客户端发送消息
- 创建 express 应用 app
- 设置文件系统为内存文件系统
- 添加 webpack-dev-middleware 中间件
- 中间件负责返回生成的文件
- 启动 webpack 编译
- 创建 http 服务器并启动服务
- 使用 sockjs 在浏览器端和服务端之间建立一个 websocket 长连接
- 创建 socket 服务器

  2.client 端

- webpack-dev-server/client 端会监听到此 hash 消息
- 客户端收到 ok 的消息后会执行 reloadApp 方法进行更新
- 在 reloadApp 中会进行判断，是否支持热更新，如果支持的话发射 webpackHotUpdate 事件，如果不支持则直接刷新浏览器
- 在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件
- 在 check 方法里会调用 module.hot.check 方法
- HotModuleReplacement.runtime 请求 Manifest
- 它通过调用 JsonpMainTemplate.runtime 的 hotDownloadManifest 方法
- 调用 JsonpMainTemplate.runtime 的 hotDownloadUpdateChunk 方法通过 JSONP 请求获取到最新的模块代码
- 补丁 JS 取回来后会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法
- 然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk 方法动态更新模块代码
- 然后调用 hotApply 方法进行热更新

## Webpack 的构建流程

### tree-shaking 的原理

## JavaScript 模块化实现的技术

CommonJS、AMD、CMD、以及 ES 的模块系统

### 一、CommonJS

commonJS 的出发点：js 没有完善的模块系统，但是随着 NodeJS 的出现，让 js 可以在任意地方运行，因此具备了大型项目的开发能力，CommonJS 也在此时应运而生。
NodeJS 是 commonJS 的主要实践者，有四个环境变量 Module，exports，require，global 为它提供支持，实际使用时，用 module.exports 导出模块（定义当前模块对外输出的接口），require 加载模块。

commonJS 使用同步的方式加载模块，在本地时，因为模块文件储存在磁盘中，读取速度很快，所以没有问题，但是在浏览器中，因为网络的问题，所以更合理的方法是采用异步的方法。 -暴露方法>module.exports = value 或 exports.xxx = value -引入模块>const xxx = require(xxx)

commonJS 规范 1.一个文件就是一个模块，具有单独的作用域。 2.普通方式定义的变量、函数、对象都属于该作用域中。 3.通过 require 加载模块。 4.通过 exports 和 module.exports 来暴露模块中的内容。
注意：
1.exports 是 module.exports 的子集 2.所有代码运行在指定的模块中，不会污染全局作用域 3.模块可以被多次加载，但是只会在第一次加载时执行，之后就会讲运行结果缓存进行下一次使用。 4.模块加载顺序，按照模块出现的顺序进行加载。
5.\_dirname 代表当前文件所在的文件夹路径
6.\_filename 代表当前模块文件所在的文件夹路径+文件名 7.当 exports 和 module.exports 同时存在，module.exports 会覆盖 exports。 8.当模块内全是 exports 时，就相当于 module.exports

### 二、ES6 模块化

es6 模块化语言旨在成为浏览器和服务器的通用模块解决方案，通过 export 导出模块，通过 import 引入模块，es6 还提供了默认导出的 exports
default 命令，为模块增加指定输出，对应的 import 不需要大括号。
es6 模块不是对象，import 命令会被 js 引擎静态分析（安全的编译，优化性能，静态的将代码加载到引用了的文件？具体不太懂，了解清楚后会发文），编译时就会引入模块的代码，而不是在代码运行的时候去加载，所以无法实现按条件加载。也正是因为这个，使静态加载成为可能。
1.export
将模块中的代码对外暴露，可以导出的是一个对象包含的多个属性方法，export.default 只能导出一个可以不具名的函数，我没可以通过 import 引用，同时我没也可以用 require 引入，因为 webpack 引起了 server 相关。
2.import 引入需要用到的模块，在编译时就会引入，所以不存在按需引入。

```
import {fn} from './xxx/xxx'(export的导出方式的引用方式)
import fn from './xxx/xxx1'(export.default的到处方式的引用方式)
```

### 三、AMD

Asynchronous Module Definition，异步加载模块。它是一个在浏览器端模块化开发的规范，不是原生 js 的规范，使用 AMD 进行模块开发需要使用到 RequireJS 函数库。
AMD 规范采用异步方式加载模块，模块的加载不影响后续代码的执行，所有依赖这个模块的语句都会定义一个回调函数，当模块加载完成后会执行这个回调函数。
使用 require.js 实现 AMD 规范的模块化：用 require.config()指定引用路径等，用 defined()定义模块，用 require()引入模块。

```
//定义模块
defined('moduleName',['a','b'],function(ma,mb){
  return someExportValue
})
//引入模块
require(['a','b'],function(ma,mb)){
  //*code*
}
```

1.函数库 requireJS 主要解决的问题 -文件可能存在依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器中。
-js 在加载的时候浏览器会停止页面渲染，加载文件越多，页面的响应时间就会越长。 -异步加载前置 2.语法
define(id,dependencies,factory)
-id 可选参数，用来定义模块的标识，如果没有提供该参数，将使用脚本文件名（去掉拓展名）
-dependencies 是一个当前模块用来的模块名称数组。
-factory，工厂方法，模块初始化要执行的函数或是对象，如果是函数，他应该制备执行一次，如果是对象，此对象应该为模块的输出值。

### 四、CMD

CMD 是另一种 js 模块化方案，它与 AMD 很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行。此规范其实是在 sea.js 推广过程中产生的。
因为 CMD 推从一个文件一个模块，所以经常就用文件名作为模块 id；CMD 推推崇依赖就近，所以一般不再 define 的参数中写依赖，而是在 factory 中写
define(id,deps,factory)
factory 有三个参数：function(require,exports,module){}
1.require 参数是第一个参数，是一个方法，接收模块标识作为唯一参数，用来获取其它模块提供的接口；
2.exports，是一个对象，用来向外提供模块接口；
3.module，是一个对象，上面存储了与当前模块相关联的一些属性和方法。

```
//定义没有依赖的模块
define(function(require,exports,module){
  exports.xxx = value
module.exports = value
})
//定义有依赖的模块
define(function(require,exports,module){
  //同步引入模块
  var module1 = require('./module1.js')
  //异步引入模块
  require.async('./module2.js',function(m2){
  /***/
})
exports.xxx = value
}
//引入模块
define(function(require){
  const m1 = require('./module1.js');
m1.show()
})
```

### 五、UMD 通用模块规范

一种整合了 CommonJS 和 AMD 规范的方法，希望能解决跨平台模块方案。
运行原理

- UMD 先判断是否支持 Node.js 模块（exports 是否存在），存在则用 Node.js 模块模式。
- 在判断是否支持 AMD（define 是否存在）存在则使用 AMD 加载模块。

```
(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```

### 六、总结

commonjs 是同步加载的，主要是在 nodejs 也就是服务端应用的模块化机制，通过 Module.export 导出声明。通过 require('')
加载。每个文件都是一个模块。他有自己的作用域，文件内的变量，属性函数等不能被外界访问。node 会将模块缓存，第二次加载会直接在缓存中获取。
AMD 是异步加载的。主要应用在浏览器环境下，requireJS 是遵循 AMD 规范的模块化工具，他是通过 define()定义声明，通过 require(''
,function(){})加载。

es6 的模块化加载时通过 export default 导出，用 import 带入，可通过{}对导出的内容进行解构。

es6 的模块的运行机制与 common 不一样，js 引擎对脚本静态分析的时候，遇到模块加载指令后会生成一个只读引用，等到脚本真正执行的时候才会通过引用去模块中获取值，在引用到执行的过程中，模块中的值发生了变化，导入的这里也会跟着变，es6
模块是动态引用，并不会缓存值。模块里总是绑定其所在的模块。

关于模块化，我认为是构建大型项目所必须的，让代码结构更加清晰，让模块之间的引用关系，以及具体作用功能更加清晰，方便了团队联合开发。

## CommonJS 和 ES6 Module 的区别

CommonJS

- Node 规范
- require 和 exports/module.exports
- 动态加载，运行时加载
- 值拷贝

ES6 Module

- ES 规范
- import export
- 静态导入，编译时加载（可以进行 Tree shaking）
- 动态 API：import(module)
- 值引用
