# 打包工具

- 传统编译：Webpack, Rollup, Parcel, Esbuild
- ESM 混合编译：Snowpack, Vite

## Webpack

### **Loader**和**Plugin**的不同？

不同的作⽤:

- **Loader**直译为"加载器"。Webpack 将⼀切⽂件视为模块，但是 webpack 原⽣是只能解析 js ⽂件，如果想将其他⽂件也打包的话，就会⽤到
  loader 。 所以 Loader 的作⽤是让 webpack 拥有了加载和解析⾮ JavaScript ⽂件的能⼒。
- **Plugin**直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运⾏的⽣命周期中会⼴播出许多事件，Plugin
  可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

**不同的⽤法**

- **Loader**在 module.rules 中配置，也就是说他作为模块的解析规则⽽存在。 类型为数组，每⼀项都是⼀个 Object ，⾥⾯描述了对于什么类型的⽂件（
  test ），使⽤什么加载( loader )和使⽤的参数（ options ）
- **Plugin**在 plugins 中单独配置。 类型为数组，每⼀项是⼀个 plugin 的实例，参数都通过构造函数传⼊。

### **webpack**的构建流程**?**

Webpack 的运⾏流程是⼀个串⾏的过程，从启动到结束会依次执⾏以下流程：

1. 初始化参数：从配置⽂件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：⽤上⼀步得到的参数初始化 Compiler 对象，加载所有配置的插件，执⾏对象的 run ⽅法开始执⾏编译；
3. 确定⼊⼝：根据配置中的 entry 找出所有的⼊⼝⽂件；
4. 编译模块：从⼊⼝⽂件出发，调⽤所有配置的 Loader 对模块进⾏翻译，再找出该模块依赖的模块，再递归本步骤直到所有⼊⼝依赖的⽂件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk
   转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

在以上过程中，Webpack 会在特定的时间点⼴播出特定的事件，插件在监听到感兴趣的事件后会执⾏特定的逻辑，并且插件可以调⽤ Webpack
提供的 API 改变 Webpack 的运⾏结果。

### 编写**loader**或**plugin**的思路？

Loader 像⼀个"翻译官"把读到的源⽂件内容转义成新的⽂件内容，并且每个 Loader 通过链式操作，将源⽂件⼀步步翻译成想要的样⼦。

编写 Loader 时要遵循单⼀原则，每个 Loader 只做⼀种"转义"⼯作。 每个 Loader 的拿到的是源⽂件内容（source），可以通过返回值的⽅式将处理后的内容输出，也可以调⽤
this.callback() ⽅法，将内容返回给 webpack。 还可以通过 this.async() ⽣成⼀个 callback 函数，再⽤这个 callback 将处理后的内容输出出去。
此外 webpack 还为开发者准备了开发 loader 的⼯具函数集——loader-utils 。

相对于 Loader ⽽⾔，Plugin 的编写就灵活了许多。 webpack 在运⾏的⽣命周期中会⼴播出许多事件，Plugin 可以监听这些事件，在合适的时机通过
Webpack 提供的 API 改变输出结果。

### 如何⽤**webpack**来优化前端性能？

⽤ webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- **压缩代码**：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤ webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩
  JS ⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css
- **利⽤ CDN 加速**: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤ webpack 对于 output 参数和各 loader
  的 publicPath 参数来修改资源路径
- **Tree Shaking**: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 webpack 时追加参数 --optimize-minimize 来实现
- **Code Splitting:** 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利⽤浏览器缓存
- **提取公共第三⽅库**: SplitChunksPlugin 插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

### **Babel**的原理是什么**?**

babel 的转译过程也分为三个阶段：**parsing、transforming、generating**

babel 的转译过程也分为三个阶段，这三步具体是：

- **解析 Parse**: 将代码解析⽣成抽象语法树（AST），即词法分析与语法分析的过程；
- **转换 Transform**: 对于 AST 进⾏变换⼀系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进⾏遍历，在此过程中进⾏添加、更新及移除等操作；
- **⽣成 Generate**: 将变换后的 AST 再转换为 JS 代码, 使⽤到的模块是 babel-generator。

![img](../public/16159086c2022b1db0.png)

##
