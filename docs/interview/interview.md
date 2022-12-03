# interview

- <https://juejin.cn/post/7075332630417244173>
- <https://blog.csdn.net/z1832729975/article/details/123431083>
- <https://juejin.cn/post/6989422484722286600>
- <https://juejin.cn/post/6844904116339261447>

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## Vue-router 跳转和 location.href 有什么区别

- 使用 `location.href= /url`来跳转，简单方便，但是刷新了页面；
- 使用 `history.pushState( /url )` ，无刷新页面，静态跳转；
- 引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 `history.pushState()` 没什么差别的，因为 vue-router 就是用了 `history.pushState()` ，尤其是在 history 模式下。

## params 和 query 的区别

用法：query 要用 path 来引入，params 要用 name 来引入，接收参数都是类似的，分别是 `this.$route.query.name`
和 `this.$route.params.name` 。

url 地址显示：query 更加类似于 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意：query 刷新不会丢失 query 里面的数据 params 刷新会丢失 params 里面的数据。

## Vuex

![vuex](../public/160958caf932f8d6.jpeg)

Vuex 实现了一个单向数据流，在全局拥有一个 State 存放数据，当组件要更改 State 中的数据时，必须通过 Mutation 提交修改信息，
Mutation 同时提供了订阅者模式供外部插件调用获取 State 数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)
或批量的同步操作需要走 Action ，但 Action 也是无法直接修改 State 的，还是需要通过 Mutation 来修改 State 的数据。最后，根据
State 的变化，渲染到视图上。

## Vuex 中 action 和 mutation 的区别

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation
都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受
state 作为第一个参数

- mutation 必须是同步函数.任何在回调函数中进行的状态的改变都是不可追踪的
- Action 可以包含任意异步操作。
- Action 提交的是 mutation，而不是直接变更状态。

两者的不同点如下：

- Mutation 专注于修改 State，理论上是修改 State 的唯一途径；Action 业务代码、异步请求。
- Mutation：必须同步执行；Action：可以异步，但不能直接操作 State。
- 在视图更新时，先触发 actions，actions 再触发 mutation
- mutation 的参数是 state，它包含 store 中的数据；store 的参数是 context，它是 state 的父级，包含 state、getters

## Vuex 和 localStorage 的区别

- vuex 存储在内存，localStorage 存储在本地
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex 用于组件之间的传值。
- localstorage 是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。
- Vuex 能做到数据的响应式，localstorage 不能
- 刷新页面时 vuex 存储的值会丢失，localstorage 不会。

## Vuex 有哪几种属性？

有五种，分别是 State、 Getter、Mutation 、Action、 Module

- state = 基本数据(数据源存放地)
- getters = 从基本数据派生出来的数据
- mutations = 提交更改数据的方法，同步
- actions = 像一个装饰器，包裹 mutations，使之可以异步。
- modules = 模块化 Vuex

## 虚拟 DOM

从本质上来说，Virtual Dom 是一个 JavaScript 对象，通过对象的方式来表示 DOM 结构。将页面的状态抽象为 JS 对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能。保证性能下限，在不进行手动优化的情况下，提供过得去的性能；跨平台

## DIFF 算法

在新老虚拟 DOM 对比时：
首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换，如果为相同节点，进行 patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)
比较如果都有子节点，则进行 updateChildren，判断如何对这些新老节点的子节点进行操作（diff 核心）。匹配时，找到相同的子节点，递归比较子节点，在 diff 中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从 O(n3)降低值 O(n)，也就是说，只有当新旧 children
都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。

## Vue 中 key 的作用

vue 中 key 值的作用可以分为两种情况来考虑：

第一种情况是 v-if 中使用 key。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 key 的作用是用来标识一个独立的元素。

第二种情况是 v-for 中使用 key。用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，diff 操作可以更准确、更快速。更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快

## React Hooks，常用的有哪些

## 对 Vue3 的理解

## 在项目当中，用到的 Vue 的周边

## React hooks 的使用，useEffect 的第二个参数

## setState hook 如何修改超长列表中的某一项（要求性能优化）

## 路由 404 的原因，如何解决

## react 底层的 commit 中断后是重新开始还是继续

## Redux？不了解

## this.setState 是同步还是异步

## useMemo() 和 useCallback() 有什么区别

## Vue 组件通信方式

## vue 路由 history 和 hash 两种模式的区别

## webpack 的 loader 和 plugin 区别

## Vue 响应式原理

先手写了观察者模式（网上说是发布订阅模式，我觉得还是有区别的，发布订阅模式是 Vue 的 emit 和 $on 的实现原理），之后讲 Vue 如何递归去把数据添加到响应式系统 【Object.defineProperty】，然后讲 Dep 和 Watcher 类，Vue 在 Compile 阶段如何识别 data 数据，实例化 Watcher 的过程【Dep.target】

## Vue 组件间通信方式

（9 种，1. props 父传子 2. emit 子传父 3. bus 公共事件总线 4. Vuex 5. parent/children 6. Storage 7.
provide/inject 8. attrs 9. ref 和 refs）

## Vue 中 key 的作用，为什么有高效性？（就地复用、Diff 算法）

## Webpack 相关，Proxy 代理跨域的实现原理，并要求用 node.js 手写出来一个简单的例子

## vue 中 v-if 和 v-show 的区别

## vue 中的 nextTick 是什么

## nextTick 底层使怎么实现的

## Vue 中 key 值为什么不能用索引(diff 算法)

## webpack 工作原理

## Vue 常见的组件通信方法

## 兄弟组件通信你会考虑用哪些方法

## Vue MVVM 实现思路

## keep-alive,websocket

## React 和 Vue 的区别

## vue 有一个很深的子组件，父组件怎么给它传值（想问 inject，没学）

## Vue data 为什么是函数，深拷贝、浅拷贝

## Vue 使用 nextTick 的原因和作用，项目哪些场景用到了 nextTick

## vue 组件封装，写逻辑部分。大概是：全选单选，就像购物车的全选按钮，四个商品四个按钮，一个全选按钮，点击全选，商品都选中，反之，商品都选中则全选按钮亮

## vue 中怎么拦截路由

## vue3 和 vue2 的区别

## webpack 怎样设置多入口模式

## vue 的双向数据绑定,底层怎么实现

## 相同引用的 js 代码打包成一个单独的文件要怎么配置

## 怎么启动混淆模式

## webpack 的构建原理（流程）

## import 引入和 require 引入在 webpack 中有什么区别

## 进程和线程

## 线程共享为什么比进程共享容易？

## SPA 是什么？

## 路由

## React hooks 有哪些？

## 谈一下对 Vue 和 React 的理解

## React 的原生事件与它的合成事件的区别

## Vite 原理

## 了解 React 的那些？

## React hooks 用到了那些？

## useCallback 用来干什么？

## 用过哪些自定义 hooks，第三方 hooks ？

## React 用 hook 封装实现异步请求？

## 为什么选用了 vite 作为打包工具？

## 什么是 MVVM？

## MVVM 的特性？

## Vue 什么特性表示出 MVVM 特性？

## React 事件机制？

## computed 源码

## `$set` vue 响应式更新

```js
this.$set("a", "b", 1);
this.a.b = 2; // 视图如何变化
```

## Webpack

## webpack loader

## 约瑟夫环

## 函数柯里化

## 合并有序数组

## 最长无重复子串

## 最长回文子串

## 斐波那契数列（尾递归优化）

## 翻转二叉树

## 最小栈,螺旋打印矩阵

## 根据 id 比较数组的差异

```javascript
// 根据 id 比较数组的差异，返回差异项，要求找出增加项，删除项，变更项
// id 不一定是有序的
const arr1 = [
  {id: 1, value: 100},
  {id: 2, value: 400},
  {id: 3, value: 200},
]
const arr2 = [
  {id: 1, value: 100},
  {id: 2, value: 200},
  {id: 5, value: 200}
  {id: 3, value: 300},
  {id: 4, value: 700}
]
```

手写题：LRU 的实现

场景题：长字符串在长文本的模式匹配，要求时间复杂度尽可能低（归并查找 + 模式匹配）

## 1.问微信小程序怎么实现

小程序中，将视图层和逻辑层是分开的，双线程同时运行，视图层的界面使用 `WebView` 进行渲染，逻辑层运行在 `JSCore` 中.

小程序在渲染层，宿主环境会把`wxml`转化成对应的`JS`对象,在逻辑层发生数据变更的时候，通过宿主环境提供的`setData`
方法把数据从逻辑层传递到渲染层，再经过对比前后差异，把差异应用在原来的`Dom`树上，渲染出正确的视图

对于事件的分发处理，将所有的事件拦截后，丢到逻辑层交给`JavaScript`进行处理,在小程序中，页面更新成了异步操作

## 2.mvvm mvc

都是前端架构模式，通过分离关注点来改进代码组织方式。

MVVM，模型-视图-视图模型，M 指的是数据，V 指的是页面，VM 是连接视图和模型的桥梁，主要作用：

- 负责模型将转化为视图，实现方式：数据绑定
- 负责将视图转化为模型，实现方式：DOM 事件监听

MVC，模型-视图-控制器。C 指的是页面业务逻辑，使用 MVC 的目的就是将 M 和 V 的代码分离。MVC 是单向通信。也就是 View 跟
Model，必须通过 Controller 来承上启下。

MVC 是站在整个项目角度来看的，涵盖了前端和后端，前端是 V(view 层)，后端是 VC(controller+model)

mvvm 是前端视图层的分层开发思想，主要把每个页面分成了 M、V、VM，其中 VM 是 MVVM 思想的核心，因为它是 M 和 V 之间的调度者，前端页面中使用
MVVM，主要是为了让开发更加方便，因为 MVVM 提供了数据的双向绑定，这个双向绑定是由 VM 来提供的，MVVM
实现的是业务逻辑组件的重用，使开发更高效，结构更清晰，增加代码的复用性。

## 3.居中

- <https://juejin.cn/post/7026619878484213797>

## 4.重绘重排概念,什么不会在重绘重排中变化

网页从 HTML 文件变成屏幕上的画面所经历的过程：

1. HTML 内容被 HTML 解析器解析生成 DOM 树
2. CSS 内容被 CSS 解析器解析生产 CSSOM 树
3. DOM 树+CSSOM 树会生产 Render Tree（渲染树）
4. 生成布局，浏览器根据渲染树来布局，以计算每个节点的几何信息
5. 将各个节点绘制到屏幕上

当 DOM 的变化影响了元素的几何信息(元素的的位置和尺寸大小)
，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。重排也叫回流，简单的说就是重新生成布局，重新排列元素。

以下情况会引发重排：

- 页面初始渲染(无法避免)

- 添加或删除可见的 DOM 元素

- 元素位置的改变，或者使用动画

- 改变元素尺寸，比如边距、填充、边框、宽度和高度等

- 填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变

- 浏览器窗口尺寸的变化（resize 事件发生时）

- 设置 style 属性的值，因为通过设置 style 属性改变结点样式的话，每一次设置都会触发一次 reflow

- 读取某些元素属性：offsetLeft/Top/Height/Width, clientTop/Left/Width/Height, scrollTop/Left/Width/Height,

  width/height, getComputedStyle(), currentStyle(IE)

当一个元素的外观发生改变，但没有改变布局, 浏览器重新把元素外观绘制出来的过程，叫做重绘。

重排必定会引发重绘，但重绘不一定会引发重排。

重绘：元素的外观被改变，例如：元素的背景颜色发生变化

重排：重新生成布局，重新排列元素，例如：元素的尺寸、位置发生变化

使用 absolute 或 fixed 脱离文档流：使用 `absolute` 或 `fixed` 脱离文档流使用绝对定位会使的该元素单独成为渲染树中 `body`
的一个子元素，重排开销比较小，不会对其它节点造成太多影响

## css 选择器权重值和优先级

## css 样式隔离

1.通过 style 标签的 scoped 指令定义作用域，通过编译为该作用域所有标签生成唯一的属性。

2.css 模块化：CSS Modules 指的是我们像 import js 一样去引入我们的 css 代码，

代码中的每一个类名都是引入对象的一个属性, 编译时会将 css 类名 加上唯一 hash。

css module 需要 webpack 配置 css-loader 或者 scss-loader , module 为 true。

## 9.浏览器同源策略

- 协议
- 域名
- 端口

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSRF
等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

同源策略限制内容有：

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

- `<img src='' />`
- `<link href='' />`
- `<script src='' />`

## 10.跨域是什么，原因，如何解决，项目中有没有实现跨域的地方

当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”。

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了
。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会?因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax
可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止
CSRF，因为请求毕竟是发出去了。

跨域解决方案:

- jsonp，只支持 get 请求，需要服务器配合。
- cros, Access-Control-Allow-Origin
- websocket
- postMessage
- Node 中间件代理，同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略
- Nginx 反向代理
- iframe

项目中前后端分离，使用接口会遇到跨域，Vue 中开发阶段可以通过配置 devProxy，具体配置见 Vue 部分；生产环境无法使用此配置。

## 11.事件绑定,事件冒泡,事件捕获,事件委托

addEventListener 绑定事件，可以绑定多个事件

先捕获，后冒泡

在捕获阶段：

- 浏览器检查元素的最外层祖先`<html`，是否在捕获阶段中注册了一个`onclick`事件处理程序，如果是，则运行它。
- 然后，它移动到`<html`中单击元素的下一个祖先元素，并执行相同的操作，然后是单击元素再下一个祖先元素，依此类推，直到到达实际点击的元素。

在冒泡阶段，恰恰相反:

- 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个`onclick`事件处理程序，如果是，则运行它
- 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达`<html`元素。

默认情况下，所有事件处理程序都在冒泡阶段进行注册。

阻止冒泡： e.stopPropagation()

冒泡还允许我们利用事件委托——这个概念依赖于这样一个事实,如果你想要在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。

## 12.浅拷贝

重新在堆中创建内存，拷贝前后的基本类型互不影响，拷贝前后的引用类型还是会共享同一块内存，故而会相互影响。

方法：`Object.assign()` ， `展开运算符...` ， `array.slice()` `array.concat()`。

## 13.深拷贝

1、JSON.parse(JSON.stringify(obj))

- `date` 属性从一个对象变成了一个字符串，`fuc` 属性消失了，`reg` 属性变成了空对象

- `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略；

- `Date` 日期会被当做字符串处理；

- `NaN` 和 `Infinity` 格式的数值及 `null` 都会被当做 `null`；

- 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet`，仅会序列化可枚举的属性；

- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误；

2、使用递归的方式

```js
function deepClone(obj) {
  const cloneObj = new obj.constructor();
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      cloneObj[i] = deepClone(obj[i]);
    }
  }
  return cloneObj;
}
```

3、函数库 lodash 的`_.cloneDeep()`

4、通过`$.extend()`实现深拷贝，当 extend 内的第一个参数为 true 时，实现的是深拷贝，false 是浅拷贝。

## 14.es6 有哪些新特性

解构赋值、扩展运算符、Symbol、Map 与 Set、

filter、reduce、箭头函数、promise、let 与 const 块级作用域

## 15.箭头函数和普通函数的区别

- 书写格式不同
- 箭头函数没有 arguments，可以使用`...args`
- this 指向，箭头函数的 this 指向上层函数作用域的 this 对象，如果没有上层函数作用域，则指向顶部 this（在浏览器中顶部 this

  则是 window）。普通函数的 this 指向该函数的调用者。
  call, apply, bind 会改变普通函数的 this，但不会改变箭头函数的 this

- 箭头函数不能作为构造函数，不能使用 new
- 箭头函数没有原型属性 prototype
- 箭头函数不能当做 Generator 函数,不能使用 yield 关键字

箭头函数不同于传统 JavaScript 中的函数，箭头函数并没有属于⾃⼰的 this，它所谓的 this 是捕获其所在上下⽂的 this 值，作为⾃⼰的
this 值，并且由于没有属于⾃⼰的 this，所以是不会被 new 调⽤的，这个所谓的 this 也不会被改变。

## 16.写代码实现循环输出 1 2

## 17.js 为什么要设计成单线程

javascript 作为一个浏览器脚本语言，它的主要用途是与用户互动，以及操作 DOM，这决定了它只能是单线程，即使 H5 中出现了 web
workers 的多线程语法,还是没有改变只能有一个线程在操作（更新）页面的事实，js 一开始的设计就没有考虑将 js
设计为单线程语言，只能说没有内置多线程支持，单线程也仅仅是相对于多线程提出的概念。

注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript
引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合

单线程是指 Js 引擎执行 Js 时只分了一个线程给他执行，也就是执行 js 时是单线程的。

## 18.进程和线程

进程是 CPU 进行资源分配的基本单位

线程是 CPU 调度的最小单位，是建立在进程的基础上运行的单位，共享进程的内存空间。

## 19.耗时比较久的操作怎么分离出 js 线程

WebWorkers

## 20.webwork 能操作 dom 吗

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作
DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

也不能使用 window 对象的默认方法和属性

## 21.webwork 怎么和主进程通信

workers 和主线程间的数据传递通过这样的消息机制进行——双方都使用 postMessage()方法发送各自的消息，使用 onmessage
事件处理函数来响应消息（消息被包含在`Message`事件的 data 属性中）。这个过程中数据并不是被共享而是被复制。

```javascript
// main.js
var myWorker = new Worker("worker.js");
first.onchange = function () {
  myWorker.postMessage([first.value, second.value]);
  console.log("Message posted to worker");
};

second.onchange = function () {
  myWorker.postMessage([first.value, second.value]);
  console.log("Message posted to worker");
};

myWorker.onmessage = function (e) {
  result.textContent = e.data;
  console.log("Message received from worker");
};

// worker.js
onmessage = function (e) {
  console.log("Message received from main script");
  var workerResult = "Result: " + e.data[0] * e.data[1];
  console.log("Posting message back to main script");
  postMessage(workerResult);
};
```

一个专用 worker 仅仅能被生成它的脚本所使用。

在主线程中使用时，`onmessage`和`postMessage()` 必须挂在 worker 对象上，而在 worker 中使用时不用这样做。原因是，在 worker
内部，worker 是有效的全局作用域。

当一个消息在主线程和 worker 之间传递时，它被复制或者转移了，而不是共享。

与一个共享 worker 通信必须通过端口对象

## 数据类型检测的方式有哪些

```js
typeof

instanceof

constructor,如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了

Object.prototype.toString.call()
```

## 22.如何判断空对象

```js
- Object.prototype.toString.call(obj)
- JSON.stringify(obj) == “{}”
- Object.keys(obj).length === 0
- Object.getOwnPropertyNames(obj).length === 0
- for…in
```

## 23.如何判断是否是对象

```js
Object.prototype.toString.call(obj) === “[Object object]”
```

## 24.判断数组有哪些方法

```js
typeof constructor; // a.constructor===Array
obj instanceof Array;
Object.prototype.toString.call(obj).slice(8, -1) === "Array";
Array.isArray(arr);
obj.__proto__ === Array.prototype;
Array.prototype.isPrototypeOf(obj);
```

## 25.一个 flex 父元素，一个子元素 flex 设为 1，一个设为 0，有什么效果，如果溢出了有什么效果

## 26.关掉浏览器还能记住用户登录状态

Cookie,localStorage

## 27.图片标签中如何进行 xss 攻击，input 呢，如何进行防范

## 29.垃圾回收有什么方法

- 标记清理

  当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。

  垃圾回收程序运行的时候，会标记内存中存储的所有变量（记住，标记方法有很多种）。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。

- 引用计数

  其思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变量，那么引用数加

  1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一个值的引用数为 0
  时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为 0 的值的内存。

## 30.有哪些内存泄露的例子，dom 中有没有

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为
0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

## v-if、v-show、v-html 的原理

## v-if 和 v-show 的区别

## `v-if` , `v-for`

## v-model 是如何实现的，语法糖实际是什么？

## 对 keep-alive 的理解

## nextTick

## Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

## Vue 数组监听

## SPA/MPA

## Vue template 到 render 的过程

## mixin、extends

## mixin 不足

## extends

## `Vue.extend` 移除

## Vue 自定义指令

## 31.事件循环代码输出题小结

- 注意 promise 是否有发生变化
- promise 返回值包括状态和返回子
- 当 promise 为 pending 时，then 不会被加入到微任务，不会执行
- then，catch 接收参数是函数
- return new Error() 会被包裹为 promise，被 then 捕获，和 throw new Error(),被 catch 成捕获
- then，catch 不能返回自身，否则造成死循环
- promise.all(),promise.race()都会把数组内的执行完成，并不会因为返回而阻塞
- await 后面代码相当于 promise.then()
- await pending 后面代码将不执行
- async 抛出错误，后面代码将不执行，除非被捕获处理
- finally 返回值为前一个 promise 的值，且 finally 参数为函数，没有参数
- then 会按顺序执行，不会因为前一个 then 没有返回值而终止。
- 注意定时器时间大小

## this 指向代码输出题小结

- 箭头函数不绑定 this，它的 this 来自原其父级所处的上下文
- 如果第一个参数传入的对象调用者是 null 或者 undefined，call 方法将把全局对象（浏览器上是 window 对象）作为 this

  的值。所以，不管传入 null 还是 undefined，其 this 都是全局对象 window。

- 在严格模式中，null 就是 null，undefined 就是 undefined
- 对象不构成单独的作用域
- 立即执行匿名函数表达式是由 window 调用的，this 指向 window
- 匿名函数的 this 是指向全局对象的
- new 绑定是比隐式绑定优先级高
- this 绑定的优先级：new 绑定 显式绑定 隐式绑定 默认绑定。

## 变量提升/闭包代码输出题小结

- Function 和 var 都会被提升（变量提升）
- Function 比 var 提升到更前面

## 32.对于宏任务和微任务队列的实现方式

（给了几个思路，1. 二维数组 2. 哈希散列 3. 数组链表）

## 33.Set、Map、WeakMap、WeakSet 区别

Map

map 本质上就是键值对的集合，但是普通的 Object 中的键值对中的键只能是字符串。而 ES6 提供的 Map
数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的 Hash 结构。如果 Map
的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。

Map 数据结构有以下操作方法：

- size： `map.size` 返回 Map 结构的成员总数。
- set(key,value)：设置键名 key 对应的键值 value，然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前
  Map 对象，所以可以链式调用）
- get(key)：该方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- has(key)：该方法返回一个布尔值，表示某个键是否在当前 Map 对象中。
- delete(key)：该方法删除某个键，返回 true，如果删除失败，返回 false。
- clear()：map.clear()清除所有成员，没有返回值。

Map 结构原生提供是三个遍历器生成函数和一个遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。map.forEach( (value,key,map) = {console.log(key,value); })

WeakMap

WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。其键必须是对象，原始数据类型不能作为 key 值，而值可以是任意的。

该对象也有以下几种方法：

- set(key,value)：设置键名 key 对应的键值 value，然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前
  Map 对象，所以可以链式调用）
- get(key)：该方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- has(key)：该方法返回一个布尔值，表示某个键是否在当前 Map 对象中。
- delete(key)：该方法删除某个键，返回 true，如果删除失败，返回 false。

WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

而 WeakMap 的键名所引用的对象都是弱引用
，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap
里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

总结：

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且
  WeakMap 的键名所指向的对象，不计入垃圾回收机制。

## 34.Map 和 Object 比较

## 35.WeakMap 和 WeakSet 可迭代吗

不可以,随时可能会被销毁，所以没必要提供迭代功能

## 36.JS 垃圾回收机制对 WeakMap 和 WeakSet 的影响

如果存在引用，不会成为垃圾回收的目标；

如果对象引用不存在了，垃圾回收机制会自动清理。

## 39.响应式布局

媒体查询 + 百分比布局 + rem，以及 rem 和 em 的区别

## 40.单行文本省略，多行文本省略实现

- 单行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
white-space: nowrap; // 规定段落中的文本不进行换行
```

- 多行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
display: -webkit-box; // 作为弹性伸缩盒子模型显示。
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 3; // 显示的行数
```

## 41.ES6 和 ES7

## 异步编程

JavaScript 中的异步机制可以分为以下几种：

- 回调函数 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then

  的链式调用，可能会造成代码的语义不够明确。

- generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在

  generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行
  generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。

- async 函数 的方式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个

  await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve
  后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

- async/await 其实是`Generator` 的语法糖，它能实现的效果都能用 then 链来实现，它是为优化 then 链而开发出来的。从字面上来看，async

  是“异步”的简写，await 则为等待，所以很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

- await 表达式的运算结果取决于它等的是什么。

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。

  - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve
    的值，作为 await 表达式的运算结果。

## async/await 对比 Promise 的优势

- 代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调⽤也会带来额外的阅读负担
- Promise 传递中间值⾮常麻烦，⽽ async/await ⼏乎是同步的写法，⾮常优雅
- 错误处理友好，async/await 可以⽤成熟的 try/catch，Promise 的错误捕获⾮常冗余
- 调试友好，Promise 的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个.then
  代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then 代码块，因为调试器只能跟踪同步代码的每⼀步。
  回调地狱的根本问题就是：

1. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
2. 嵌套函数一多，就很难处理错误

当然，回调函数还存在着别的几个缺点，比如不能使用 `try catch` 捕获错误，不能直接 `return`。

## 42.实现原理 generator

## 43.防抖节流原理介绍

## 44.原型和原型链

## 对原型、原型链的理解

## 47.如何理解闭包

## 48.如何理解面向对象

## 49.设计模式

## 50.Async 和 Await 原理

## 54.浏览器渲染过程

## 浏览器渲染优化

## 渲染过程中遇到 JS 文件如何处理？

## 52.DOM 树和 cssom 树是互斥的还是同时的

## 53.JS 脚本阻塞 DOM 构建,js 脚本会不会对 cssom 树影响

## CSS 如何阻塞文档解析？

## 56.var let const 区别

## 57.实现 eventbus

## 60.代码实现

假如现在本地无法实现加法功能，现有其他团队提供的 api

```js
await asyncAdd = (a, b, (err, res) = {
  // 利用网络请求实现a+b，成功结果返回res
})
```

现需要改进该 api，利用其实现一个 add 方法，使其能够实现多个数相加（写主要思路即可）（时间复杂度为 logn）

```js
function add(a,b,c...) {
  //Todo
}
```

## 61.li 标签最后一个 class 为 b 的改为红色

## 62.伪类的实现原理了解么？

## 63.伪类选择器

## 讲讲性能优化，能实际实现的

## z-index 属性在什么情况下会失效

## 用 js 操作 Dom，怎么知道 Dom 已经操作好了

MutationObserver,提供了监视对 DOM 树所做更改的能力

## 少用闭包，但构建工具用的都是闭包，怎么理解的？

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

闭包有三个特性:

1.函数嵌套函数 2.函数内部可以引用外部的参数和变量 3.参数和变量不会被垃圾回收机制回收

一个功能，能用块级作用域实现也能用闭包实现，那就最好不用闭包。

## display:none 和 visibility:hidden 的区别？

display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。

visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

## 盒模型

1.盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。

2.标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时，所对应的范围不同：

- 标准盒模型的 width 和 height 属性的范围只包含了 content，
- IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content。

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

- box-sizeing: content-box 表示标准盒模型（默认值）
- box-sizeing: border-box 表示 IE 盒模型（怪异盒模型）

## form 表单的属性

## CSS：position，display，float 都有哪些属性

## position 取值,reletive 相对谁

absolute 生成绝对定位的元素， 相对于最近一级的定位不是 static 的父元素来进行定位。

fixed （老 IE 不支持）生成绝对定位的元素，相对于浏览器窗口进行定位。

relative 生成相对定位的元素，相对于其自己在普通流中的位置进行定位。

static 默认值。没有定位，元素出现在正常的流中

## 脱离文档流指的是什么？

脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

需要注意的是，使用 float 脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。

而对于使用 absolute positioning 脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

## 隐藏元素的方法

## 前端向服务器请求数据，能想到哪些方法？

## e.target 和 e.currentTarget

## js 和 ts

## 简单介绍下 WebSocket？

全双工通信

## WebSocket 如何连接？服务端给客户端发送的 http 状态码是什么？

## 如何使用 Reflect，它提供了什么？

## 什么是类数组？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有
arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

## 列举浏览器和 node 的一些返回 promise 的原生 API？

## 如何防止脚本获取 cookie？

## 浏览器多线程？

## Worker 线程之间如何通信？

## Symbol 和 Bigint 简单介绍

## undefined 和 null 的区别

## typeof(null) 为什么返回的是 'object'

## == 和 === 的区别？

## Instanceof 的原理

## typeof(NaN) 返回什么

## isNaN 和 Number.isNaN 函数的区别？

## CSS：background 的属性

## Class 和 new

## Promise 的理解

## Object 和 Map 相互转换

## 代码输出结果

```javascript
var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})();

// undefined
// 10
// 20
```

## 数组中的方法如何实现 break

## arguments 类数组转换为数组，如何遍历类数组

## escape、encodeURI、encodeURIComponent 的区别

## 什么是尾调用，使用尾调用有什么好处？

尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是
ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

## for...in 和 for...of 的区别

for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 for…in
的区别如下

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

总结：for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map
以及 Generator 对象。

## 浏览器事件循环机制 和 node 事件循环机制

## 有了 promise 为什么还需要 async/await

## CSS 单位 px rem em vw vh

## 如果窗口尺寸调整，vw，vh 会产生变化吗

## 项目中的移动端布局、移动端倍率

## DOM 树上有 10 个节点，渲染树上一定有 10 个节点吗？

## 下面两种方式的区别？typeof 判断，str1、str2、String 有没有 prototype

```js
const str1 = 'abc';
const str2 = new String('abc');

typeof str1 //"string"
typeof str2 //"object"
str1,str2 没有prototype
String 有prototype

str1.__proto__ === String.prototype //true
str2.__proto__ === String.prototype //true
```

## new 操作符干了什么事？

## this、call()、apply()、 bind()

## 对 this 对象的理解

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

- 第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- 第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是

  this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用
  call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的
  this 指向除了使用 new 时会被改变，其他情况下都不会改变。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。

## call() 和 apply() 的区别？

它们的作用一模一样，区别仅在于传入参数的形式的不同。

- apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply

  方法把这个集合中的元素作为参数传递给被调用的函数。

- call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。
- bind 和 call/apply 有一个很重要的区别，一个函数被 call/apply 的时候，会立即执行函数，但是 bind 会创建一个新函数，不会立即执行。
- bind 另一个重要的区别是，后面传入的这个参数列表可以分多次传入，call 和 apply 则必须一次性传入所有参数。

（1）call 函数的实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 处理传入的参数，截取第一个参数后的所有参数。
- 将函数作为上下文对象的一个属性。
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性。
- 返回结果。

（2）apply 函数的实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 将函数作为上下文对象的一个属性。
- 判断参数值是否传入
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性
- 返回结果

（3）bind 函数的实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 保存当前函数的引用，获取其余传入参数值。
- 创建一个函数返回
- 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply

  调用，其余情况都传入指定的上下文对象。

## with 的了解

## const 声明生成对象的时候，如何使其不可更改

Object.freeze(obj)

// 如果 obj 中的值为对象，则可以修改，只可以冻结一层，使其不可修改，可利用递归实现。

## 实现代码

```js
function isArray(arr) {
  return Array.isArray(arr);
}
function isNaN(n) {
  return Object.is(NaN, n);
}
```

## constructor,instanceof,Object.prototype.toString.call 比较

## 页面有一个 iframe，将主页面的一个数组传到 iframe 中再用 instanceof 判断数组是否可行

## EventLoop JS 事件循环队列、宏任务和微任务

## 输出什么？

```js
for(let i = 0; i < 10; i++) {
    this.a = i;
    this.$nextTick(() = {
        console.log(i);
        console.log(this.a)
    })
}


```

## 扫码登录原理

## WebSocket 在服务端是怎么处理消息的？

## 考虑机器性能，假如带宽很窄，如果有大量消息发送，服务端如何处理

## 触发 CORS 预检请求

## 利用 CORS 解决跨域问题，除了 CORS 还有其他什么方案？（JSONP 、反向代理......）

## JSONP 原理

## 堆

## 正向代理和反向代理

## 对闭包的了解

## 事件循环机制

## 对作用域、作用域链的理解

## 全局作用域和函数作用域

## 块级作用域

## 对执行上下文的理解

## 如何使其拥有动态作用域的特性

动态作用域的语言中，程序中某个变量所引用的对象是在程序运行时刻根据程序的控制流信息来确定的。

## 如何阻止事件冒泡

- 普通浏览器使用：event.stopPropagation()
- IE 浏览器使用：event.cancelBubble = true;

## 哪些操作会造成内存泄漏？

- 第一种情况是由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
- 第二种情况是设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
- 第三种情况是获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
- 第四种情况是不合理的使用闭包，从而导致某些变量一直被留在内存当中

## 一次性可能发 10 个请求，但是请求池控制一次性只能处理三个，请求池内的请求一个处理完后推进下一个请求

## 场景题：前端给页面加水印，说说各种编码的特点，说说数字签名的特点

## 场景题：实现协同编辑，说说你认为的技术关键点

## es6 class 怎么设置原型、静态、实例方法

## 类数组怎么转换为数组，说说你知道的所有方法

## canvas 如何进行局部刷新(局部重绘)

## 大型文件传输，前后端分别怎么处理，数据流上的具体操作

## 秒传、分片传输、断点传输的具体实现和细节

## MTP 的作用

## 了解浏览器渲染引擎有哪些，渲染机制是怎样的吗，举例说明一下

## 怎么衡量一个页面的渲染速度，性能

## 你对首屏时间，可交互时间等概念的理解和看法

## 首屏加载慢

## 浏览器的缓存存放在哪里，如何在浏览器中判断强制缓存是否生效？

内存缓存（`from memory cache`）和硬盘缓存（`from disk cache`）

- 内存缓存(`from memory cache`)：内存缓存具有两个特点，分别是快速读取和时效性：

- 快速读取：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。
  - 时效性：一旦该进程关闭，则该进程的内存则会清空。
  - 硬盘缓存（`from disk cache`）：硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行 `I/O`
    操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。
    在浏览器中，浏览器会在 `js` 和图片等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中读取；而 `css`
    文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存。

## HTML5 有哪些更新

## 行内元素和块级元素

## 渐进增强和优雅降级之间的区别

## DOCTYPE(文档类型) 的作用

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html 或
xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。它必须声明在 HTML
文档的第一行。

浏览器渲染页面的两种模式：

- 标准模式，默认模式，浏览器使用 W3C 的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- 怪异模式，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

## 怪异模式和标准模式有什么区别？

## Canvas 和 SVG 的区别

## 常见的 meta 标签有哪些

## 单页应用和多页应用

## HTML 语义化

## 什么是 HTML 语义化？

## 为什么要语义化？

## link 和@import 的区别

## 超链接 target 属性的取值和作用？

## iframe 优缺点

## src 与 href 的区别

## title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别

## label 标签的作用

## html 中 title 属性和 alt 属性的区别

## CSS 布局单位

## px、em、rem 的区别

## 清除浮动

## 浮动定义

- 非 IE 浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时，内容会溢出到容器外面而影响布局。
  这种现象被称为浮动（溢出）。
- 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
- 浮动元素碰到包含它的边框或者其他浮动元素的边框停留

## 浮动元素引起的问题

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素会跟随其后
- 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

## 清除浮动的方式

- 给父级 div 定义`height`属性

- 最后一个浮动元素之后添加一个空的 div 标签，并添加`clear:both`样式

- 包含浮动元素的父级标签添加`overflow:hidden`或者`overflow:auto`

- 使用 :after 伪元素。

  clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 display
  属性值的原因。

```css
.clearfix:after {
  content: "\200B";
  display: table;
  height: 0;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

官方对 clear 属性解释：“元素盒子的边不能和前面的浮动元素相邻”，对元素设置 clear 属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 display 属性值的原因。

## BFC

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发
BFC 的条件，则 BFC 中的元素布局不受外部影响。

- 块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。
  - BFC 区域不会与 float box 重叠
  - BFC 是页面上的一个独立容器，子元素不会影响到外面
  - 计算 BFC 的高度时，浮动元素也会参与计算
- 用于清除浮动，防止 margin 重叠等
- 哪些元素会生成 BFC：
  - 根元素
  - float 不为 none 的元素
  - position 为 fixed 和 absolute 的元素
  - display 为 inline-block、table-cell、table-caption，flex，inline-flex 的元素
  - overflow 不为 visible 的元素

创建 BFC 的条件：

- 根元素：body；
- 元素设置浮动：float 除 none 以外的值；
- 元素设置绝对定位：position (absolute、fixed)；
- display 值为：inline-block、table-cell、table-caption、flex 等；
- overflow 值为：hidden、auto、scroll；

BFC 的特点：

- 垂直方向上，自上而下排列，和文档流的排列方式一致。
- 在 BFC 中上下相邻的两个容器的 margin 会重叠
- 计算 BFC 的高度时，需要计算浮动元素的高度
- BFC 区域不会与浮动的容器发生重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素
- 每个元素的左 margin 值和容器的左 border 相接触

BFC 的作用：

- 解决 margin 的重叠问题：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了
  margin 重叠的问题。
- 解决高度塌陷的问题：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个
  BFC。常用的办法是给父元素设置 overflow:hidden。
- 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。左侧设置`float:left`
  ，右侧设置`overflow: hidden`。这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

## 什么是 margin 重叠问题？如何解决？

问题描述：

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，
浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。

计算原则：

折叠合并后外边距的计算原则如下：

- 如果两者都是正数，那么就去最大者
- 如果是一正一负，就会正值减去负值的绝对值
- 两个都是负值时，用 0 减去两个中绝对值大的那个

解决办法：

对于折叠的情况，主要有两种：兄弟之间重叠和父子之间重叠

（1）兄弟之间重叠

- 底部元素变为行内盒子：`display: inline-block`
- 底部元素设置浮动：`float`
- 底部元素的 position 的值为`absolute/fixed`

（2）父子之间重叠

- 父元素加入：`overflow: hidden`
- 父元素添加透明边框：`border:1px solid transparent`
- 子元素变为行内盒子：`display: inline-block`
- 子元素加入浮动属性或定位

## offset/scroll/client 各类属性

- clientHeight：表示的是可视区域的高度，不包含 border 和滚动条
- offsetHeight：表示可视区域的高度，包含了 border 和滚动条
- scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分。
- clientTop：表示边框 border 的厚度，在未指定的情况下一般为 0
- scrollTop：滚动后被隐藏的高度，获取对象相对于由 offsetParent 属性指定的父坐标(css 定位的元素或 body 元素)距离顶端的高度

## clientX clientY

- 鼠标相对于浏览器窗口可视区域的 X，Y 坐标

## pageX pageY

- 类似于 clientX，clientY，但它们使用的是文档坐标而非窗口坐标。具体来说,pageY = clientY + 页面滚动高度。

## offsetX offsetY

- 鼠标相对于事件源元素（srcElement）的 X，Y 坐标。

![图片说明](../public/976B9A7655484F3.png)

## 选择器上的优先级和覆盖原则

对于选择器的优先级：

- 标签选择器、伪元素选择器：1
- 类选择器、伪类选择器、属性选择器：10
- id 选择器：100
- 内联样式：1000

注意事项：

- !important 声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 通用选择器（\*）、子选择器（）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0；
- 样式表的来源不同时，优先级顺序为：内联样式 内部样式 外部样式 浏览器用户自定义样式 浏览器默认样式。

简单记住结论：!important 行内样式 id 选择器 class 选择器/属性选择器标签选择器通配符\*

覆盖原则：

- 规则一：由于继承而发生样式冲突时，最近祖先获胜。
- 规则二：继承的样式和直接指定的样式冲突时，直接指定的样式获胜。
- 规则三：直接指定的样式发生冲突时，样式权值高者获胜。
- 规则四：样式权值相同时，后者获胜。
- 规则五：!important 的样式属性不被覆盖。

## CSS3 中有哪些新特性

## link 和 @import 的区别

## 伪类和伪元素

## preload、prefetch 有什么区别

## HTTPS 通信（握手）过程

## 非对称加密和对称加密

## HTTPS 怎么保证数据安全

## 输入 url 到渲染的过程(对服务器如何定位到具体文件追问了)

## Http 常见状态码

## xss、csrf 攻击原理和防范

## vue 基本原理

## vue 响应式原理

## vue2 和 vue3

## vue2 和 vue3 响应式的区别

## proxy 对比 defineproperty 的优势

## 没有 proxy，怎么解决 defineproperty 缺陷

## Vue3 双向数据绑定的原理

## vue 实现跨域

## computed 和 watch

## computed 和 method

## 三次握手

## 主动方为什么会等待 2MSL

## 对 post 和 get 请求的理解

## 浏览器缓存,强缓存、协商缓存,为什么 cache-control 优先级更高

## cookie 的 httpOnly 是干啥的

## 禁止 js 操作获取 cookie

## cookie 的属性有哪些

## 强缓存和协商缓存,什么情况下会用到协商缓存？

## Cookie 和 Session 的区别

## http1.0 和 http1.1 的区别

## http1.1 和 http2.0 的区别

## https 和 http 之间的区别，https 握手过程

## slot

## 过滤器

## 常见的事件修饰符及其作用

## template 和 jsx

## 对 Vue 组件化的理解

## 常见的 Vue 性能优化方法

## 组件通信

## Vue-router

## 动态路由？如何获取传过来的动态参数

## 全局的路由守卫

## 单个路由独享的路由守卫

## 组件级的路由守卫

## 输出及代码实现

```javascript
Object.prototype.a = 10;
var s = Symbol();
var obj = {
  [s]: 20,
  b: 30,
};
Object.defineProperty(obj, "c", {
  enumerable: true,
  value: 40,
});
for (let val in obj) {
  console.log(val);
}

// b
// c
// a
```

```javascript
lazyMan("name").eat("apple").sleep(1000).eat("orange");
// 打印 name，打印 apple，延迟 1s 打印 orange
function lazyMan(name) {
  console.log(name);
  return lazyMan.prototype;
}
lazyMan.prototype.eat = function (str) {
  console.log(str);
  return lazyMan.prototype;
};
function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

lazyMan.prototype.sleep = (t) = {
  wait(t);
  return lazyMan.prototype;
};

lazyMan("name").eat("apple").sleep(1000).eat("orange");
```

```js
console.log(typeof typeof typeof null);
// string
```

```js
function f(x) {
  var x;
  console.log(x);
}
f(5); // 5
```

```js
var name = "123";
var obj = {
  name: "456",
  getName: function () {
    function printName() {
      console.log(this.name);
    }
    printName();
  },
};

obj.getName();
// 结果？ 123
// 改写，让结果输出456
var obj = {
  name: "456",
  getName: function () {
    let printName = () = {
      console.log(this.name);
    };
    printName();
  },
};
// ---
var obj = {
  name: "456",
  getName: function () {
    that = this;
    function printName() {
      console.log(that.name);
    }
    printName();
  },
};
```

```javascript
// 让所有的c都变成h(包括大写的C)

"abcdcbaC".replace(/c/gi, "h");
```

```javascript
setTimeout(() = {
  console.log("quick timer");
}, 0);

new Promise((resolve, reject) = {
  console.log("init promise");
  process.nextTick(resolve);
}).then(() = console.log("promise.then"));

process.nextTick(() = {
  console.log("nextTick");
});

setImmediate(() = {
  console.log("immediate");
});

// init promise
// nextTick
// promise.then
// quick timer
// immediate
```

```javascript
// 手写一个repeact()函数，加上下面的代码运行，使每3秒打印一个helloword，总共执行4次
const wait = (t) = {
  return new Promise((resolve) = {
    setTimeout(() = {
      resolve();
    }, t);
  });
};

const repeact = (fn, n, t) = {
  return async function (s) {
    for (let i = 0; i < n; i++) {
      fn(s);
      await wait(t);
    }
  };
};

const repeatFunc = repeact(console.log, 4, 3000);
repeatFunc("helloword");
```

## tcp/udp 区别

## udp 不稳定怎么解决

- 增加系统发送或接收缓冲区大小
- 增加应答机制，处理完一个包后，在继续发包
- 控制报文大小

## 怎么理解端到端的连接？

## TCP 是怎么判断丢包的？

## TCP 的重传机制

由于 TCP 的下层网络（网络层）可能出现丢失、重复或失序的情况，TCP 协议提供可靠数据传输服务。为保证数据传输的正确性，TCP
会重传其认为已丢失（包括报文中的比特错误）的包。TCP 使用两套独立的机制来完成重传，一是基于时间，二是基于确认信息。

TCP 在发送一个数据之后，就开启一个定时器，若是在这个时间内没有收到发送数据的 ACK
确认报文，则对该报文进行重传，在达到一定次数还没有成功时放弃并发送一个复位信号。

## TCP 流量控制、拥塞控制

一般来说，流量控制就是为了让发送方发送数据的速度不要太快，要让接收方来得及接收。TCP 采用大小可变的滑动窗口
进行流量控制，窗口大小的单位是字节。这里说的窗口大小其实就是每次传输的数据大小。

- 当一个连接建立时，连接的每一端分配一个缓冲区来保存输入的数据，并将缓冲区的大小发送给另一端。
- 当数据到达时，接收方发送确认，其中包含了自己剩余的缓冲区大小。（剩余的缓冲区空间的大小被称为窗口，指出窗口大小的通知称为窗口通告

  。接收方在发送的每一确认中都含有一个窗口通告。）

- 如果接收方应用程序读数据的速度能够与数据到达的速度一样快，接收方将在每一确认中发送一个正的窗口通告。
- 如果发送方操作的速度快于接收方，接收到的数据最终将充满接收方的缓冲区，导致接收方通告一个零窗口

  。发送方收到一个零窗口通告时，必须停止发送，直到接收方重新通告一个正的窗口。

TCP 的拥塞控制机制主要是以下四种机制：

- 慢启动（慢开始）
- 拥塞避免
- 快速重传
- 快速恢复

## v-if, v-show 区别; v-if 缓存

v-if 是插入或移除元素，在 html 模板里是插入，或者不存在。v-show 只是简单的基于 css 切换.

v-if 是可以和 `<template>` 标签配合使用的。但 v-show 不行。

v-if 是有缓存的。v-show 没有缓存。

v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show
是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且 DOM 元素保留；

v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗；

v-if 适合运营条件不大可能改变；v-show 适合频繁切换。

## webpack 打包流程？怎么引入文件？可能是想问 import 会导致文件打包后体积较大，用 link 等方式借助 CDN 可以减小体积，充分利用浏览器多线程提升响应速度

## Object.assign()

- 同名属性会覆盖
- 第一个参数不为对象，则需要转换为对象（12 -> Number(12)），进行合并，转换失败会抛出错误
- 后面参数不为对象，则需要转换为对象，进行合并，转换失败会忽略

## vue 数据绑定原理？vue3 深度绑定函数？

vue2 的响应式基本原理：

## vue 会遍历此 data 中对象所有的属性

## 并使用 Object.defineProperty 把这些属性全部转为 getter/setter

## 而每个组件实例都有 watcher 对象

## 它会在组件渲染的过程中把属性记录为依赖

## 之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新

## 在生命周期的 initState 方法中将 data，prop，method，computed，watch 中的数据劫持， 通过 observe 方法与

Object.defineProperty 方法将相关对象转为换 Observer 对象。

## 然后在 initRender 方法中解析模板，通过 Watcher 对象，Dep 对象与观察者模式将模板中的 指令与对象的数据建立依赖关系，使用全局对象

Dep.target 实现依赖收集。

## 当数据变化时，setter 被调用，触发 Object.defineProperty 方法中的 dep.notify 方法， 遍历该数据依赖列表，执行器 update 方法通知

Watcher 进行视图更新。

vue 是无法检测到对象属性的添加和删除，但是可以使用全局 Vue.set 方法（或 `vm.$set` 实例方法）。

vue 无法检测利用索引设置数组，但是可以使用全局 Vue.set 方法（或 `vm.$set` 实例方法）。

无法检测直接修改数组长度，但是可以使用 splice

Proxy 需要的是整体监听，不需要关心里面有什么属性，而且 Proxy 的配置项有 13 种，可以做更细致的事情，这是之前的 defineProperty
无法达到的。

## Object.defineProperty 具体怎么绑？会新建对象的属性？

## 讲讲 sourcemap，都有哪些字段？

SourceMap 一个存储源代码与编译代码对应位置映射的信息文件.

- version：Source Map 的版本号。
- sources：转换前的文件列表。
- names：转换前的所有变量名和属性名。
- mappings：记录位置信息的字符串，经过编码。
- file：(可选)转换后的文件名。
- sourceRoot：(可选)转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
- sourcesContent:(可选)转换前的文件内容列表，与 sources 列表依次对应。

## nth-of-type 和 nth-child 区别？注意事项？

nth-of-type 他是当前元素的兄弟元素的第 n 个

而 nth-child 是当前元素的兄弟节点的第 n 个当前元素

:nth-child(n) 选择器匹配属于其**父元素的第 N 个子元素**，**不论元素的类型**，n 可以是数字、关键词或公式。

:nth-of-type(n)选择器匹配属于父元素的**特定类型的第 N 个子元素**，元素类型没有限制；n 可以是数字、关键词或公式。

nth-child,按照个数来算。nth-of-type,按照类型来计算

Element:nth-of-type 使用时要注意，**它选中的是元素**。当你把 Element 改为 class 或 id 时，它选中的依旧为元素。

## 简单请求和复杂请求具体区别

简单请求不会触发 CORS 预检请求。若该请求满足以下两个条件，就可以看作是简单请求：

**1）请求方法是以下三种方法之一：**

- HEAD
- GET
- POST

**2）HTTP 的头信息不超出以下几种字段：**

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

若不满足以上条件，就属于非简单请求了。

## 数据库比较老旧，无法支持高并发，你会怎么做？

回答了 Nginx 配置服务器权重，尝试负载均衡(是叫这个吧)；尝试 CDN 减少加载时间和数据包大小；尝试用缓存把不需要更新的内容留在本地，每次只更新不同的数据

## 问怎么描绘客户画像？

检测点击量、请求内容、偏好功能，

检测页面停留时间识别热点连接，然后把热点缓存减少服务器请求次数

## CDN 机制？

前端部署 cdn（cdn 问的很深 具体问到一些配置怎么配置 QAQ）

## Promise 原理

一个`promise`的当前状态只能是`pending`、`fulfilled`和`rejected`三种之一。状态改变只能是`pending`到`fulfilled`或者`pending`
到`rejected`,而且状态改变不可逆的。

`promise`的`then`方法接收两个可选参数，表示该`promise`状态改变时的回调(`promise.then(onFulfilled, onRejected`))。`then`
方法返回一个`promise`。`then`方法能够被同一个`promise`调用屡次。

在 Promise 的内部，有一个状态管理器的存在，有三种状态：pending、fulfilled、rejected。(1) promise 对象初始化状态为 pending。(2)
当调用 resolve(成功)，会由 pending => fulfilled。(3) 当调用 reject(失败)，会由 pending => rejected。 需要记住的是注意
promsie 状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变。

解决异步回调问题

promise 有两种异常捕获方式，一个是 then 中的 reject，另一个是 catch()方法。

then 中的 reject 方法捕获异常，无法捕获当前 then 中抛出的异常

catch 不仅能捕获 then 中抛出的异常，还能捕获前面 promise 抛出的异常，所以建议使用 catch 方法。

## Generator 原理

Generator 函数可以说是 Iterator 接口的具体实现方式。Generator 最大的特点就是可以控制函数的执行。

`iterator` 也是一种对象，不过它有着专为迭代而设计的接口。它有`next` 方法，该方法返回一个包含 `value` 和 `done`
两个属性的对象 (下称 `result` )。前者是迭代的值，后者是表明迭代是否完成的标志 -- 布尔值: `true` 表示迭代完成，`false`
表示没有。`iterator` 内部有指向迭代位置的指针，每次调用`next`, 自动移动指针并返回相应的 `result`。

手动写个 `iterator` 太麻烦了，所以`ES6` 推出 `generator` ，方便创建 `iterator`。也就是说，`generator`
就是一个返回值为 `iterator` 的函数。

`*` 标明这是个 `generators`， `yield` 用来在调用 `next`时返回 `value`。

需要注意的是，`yield` 不能跨函数；箭头函数不能用做 `generator`

`for-of` 只能用在 `iterable` 上，用其他对象上会报错。

<https://github.com/jeyvie/understanding-ES6/blob/master/docs/8.2.generator_advanced.md>

## Vue 中的通信方式，传参方式，传参的底层原理

## Vuex 的设计原理

接下来要回答以下三点：
1、Vuex 是什么？
2、vuex 的核心概念；
3、为什么要用 vuex？

1.vuex 是什么？
vuex 是一个专为 vue.js 应用程序开发的状态管理模式
2.vuex 的核心概念；
vuex 的属性；vuex 五大核心属性：state，getter，mutation，action，module

state：存储数据，存储状态；在根实例中注册了 store 后，用 `this.$store.state` 来访问；对应 vue 里面的 data；存放数据方式为响应式，vue
组件从 store 中读取数据，如数据发生变化，组件也会对应的更新。
getter：可以认为是 store 的计算属性，它的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
action：包含任意异步操作，通过提交 mutation 间接更变状态。
module：将 store 分割成模块，每个模块都具有 state、mutation、action、getter、甚至是嵌套子模块。
vuex 的数据传递流程；当组件进行数据修改的时候我们需要调用 dispatch 来触发 actions 里面的方法。actions 里面的每个方法中都会有一个
commit 方法，当方法执行的时候会通过 commit 来触发 mutations 里面的方法进行数据的修改。mutations 里面的每个函数都会有一个
state 参数，这样就可以在 mutations 里面进行 state 的数据修改，当数据修改完毕后，会传导给页面。页面的数据也会发生改变。

3.为什么要用 vuex？
由于传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致代码无法维护。所以我们需要把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

**解答问题：vuex 的 store 是如何注入到组件中的？**

Vue.use(Vuex); // vue 的插件机制,安装 vuex 插件

store 注入 vue 的实例组件的方式，是通过 vue 的 mixin 机制，借助 vue 组件的生命周期 钩子 beforeCreate 完成的。即 每个 vue
组件实例化过程中，会在 beforeCreate 钩子前调用 vuexInit 方法。

Vuex 的双向绑定通过调用 new Vue 实现，然后通过 Vue.mixin 注入到 Vue 组件的生命周期中，再通过劫持 state.get 将数据放入组件中

## 使用 createDocumentFragment 的场景

createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。

当你想提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用 createDocumentFragment() 方法。

你也可以使用文档的文档对象来执行这些变化，但要防止文件结构被破坏，createDocumentFragment() 方法可以更安全改变文档的结构及节点。

## 防抖和节流的应用场景

## ts 的泛型，如何继承

## 如何设计一个组件

## 95%用户使用的浏览器支持 ES6，怎么转码更好的满足

自定义@babel/preset-env

.browserslistrc 文件配置兼容性

## 观察者模式和发布订阅者模式有什么区别

从图中可以看出，观察者模式中观察者和目标直接进行交互，而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

```js
// 观察者
class Observer {
  constructor() {}
  update(val) {}
}
// 观察者列表
class ObserverList {
  constructor() {
    this.observerList = [];
  }
  add(observer) {
    return this.observerList.push(observer);
  }
  remove(observer) {
    this.observerList = this.observerList.filter((ob = ob !== observer));
  }
  count() {
    return this.observerList.length;
  }
  get(index) {
    return this.observerList[index];
  }
}
// 目标
class Subject {
  constructor() {
    this.observers = new ObserverList();
  }
  addObserver(observer) {
    this.observers.add(observer);
  }
  removeObserver(observer) {
    this.observers.remove(observer);
  }
  notify(...args) {
    let obCount = this.observers.count();
    for (let index = 0; index < obCount; index++) {
      this.observers.get(i).update(...args);
    }
  }
}
```

```javascript
class PubSub {
  constructor() {
    this.subscribers = {};
  }
  subscribe(type, fn) {
    if (!Object.prototype.hasOwnProperty.call(this.subscribers, type)) {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
  }
  unsubscribe(type, fn) {
    let listeners = this.subscribers[type];
    if (!listeners || !listeners.length) return;
    this.subscribers[type] = listeners.filter((v = v !== fn));
  }
  publish(type, ...args) {
    let listeners = this.subscribers[type];
    if (!listeners || !listeners.length) return;
    listeners.forEach((fn = fn(...args)));
  }
}

let ob = new PubSub();
ob.subscribe("add", (val = console.log(val)));
ob.publish("add", 1);
```

## ES6 模块机制与 CommonJS 的区别

## commonjs 模块输出的是值的浅拷贝，ES6 模块输出的是值的引用 (也就是说，cmmonjs 模块输出后被改变，其他引用模块不会改变，而

ES6 模块会改变)

## commonjs 模块是运行时加载，而 ES6 模块是编译时输出接口，之所以 webpack 的 tree-shaking 只能作用于 ES6 模块，就是因为 ES6

模块在编译时就能确定依赖

## CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段

## 怎么去做优化项目

图片懒加载

代码压缩

CDN

按需加载

预加载

## h5 自适应响应式网站的方案

em

rem

@media

## scss mixin/import 的用法

## position 的三个用法

## 8.http 状态码 缓存

## 9.tcp udp 直播用什么协议 抢购系统用什么协议 图解 tcp 学到了什么

## cookie 同源协议 cookie 的相关字段

withCredential

domin

path

max-age

httponly

## 怎么做跨域 什么资源可以跨域

jsonp

cors

## jsonp 原理

Script 没有同源限制

## cors 原理

Origin:

服务器允许跨域请求 Access-Control-Allow-Origin

## dns 解析流程 怎么做优化

## 用过 iframe 标签

它能够将另一个 HTML 页面嵌入到当前页面中。

`srcdoc`该属性是一段 HTML 代码，这些代码会被渲染到 iframe 中。如果浏览器不支持 `srcdoc` 属性，则会渲染 `src` 属性表示的内容。

`src`被嵌套的页面的 URL 地址。

## css 实现一个随着父元素自缩放的盒子

- 使用百分比
- flex

## flex 布局相关 flex1 解释一下

## flex 布局中 flex:0 1 auto

- 第一个 `number` 表示 `flex-grow` 默认值 0
- 第二个 `number` 表示 `flex-shrink` 默认值 1
- 第三个描述宽度的值表示 `flex-basis` 默认值 auto，初始大小

## 写洗牌算法

```js
function shuffle(arr) {
  var result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
}

function shuffle(arr) {
  var length = arr.length,
    temp,
    random;
  while (0 != length) {
    random = Math.floor(Math.random() * length);
    length--;
    // swap
    temp = arr[length];
    arr[length] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

[1, 2, 3, 4, 5, 6].sort(function () {
  return 0.5 - Math.random();
});

function shuffle(arr) {
  let n = arr.length,
    random;
  while (0 != n) {
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]]; // ES6的结构赋值实现变量互换
  }
  return arr;
}
```

## css 选择器知道吗，有哪些？

组合选择器知道吗？（兄弟 ？....）---->（组合选择器指的就是同时使用多个选择器，比如一个标签父元素（div）的 class 是 a， 这个标签（p）本身
id 是 b，组合选择器就是 div.a p.b{}）

## 选择器优先级

内联 id 类 (伪类 属性,类) （伪元素，元素）

## css 样式 !important 知道吗？

## 选择器优先级一样高的话取决于什么？

后面的样式会覆盖前面的

## 元素水平垂直居中怎么办？

## visible

## css 定位 position

static、relative、absolute、sticky、fixed

粘滞定位 必须设置 top left bottom right 中的一个

## sticky 相对于窗口进行定位？绝对定位呢？

绝对定位 最近开启定位的元素进行定位 body（面试官纠正：非 static 定位的元素进行定位）

父元素 sticky 相对于什么进行定位？

## ES6 对吧？let、var、const 区别？

变量、函数声明提升

未声明的变量直接声明报错 暂时性死区

## 箭头函数和普通函数的区别？

内部没有 this 指向，定义时的外面

箭头函数不能 new generator arguments

## promise 知道吗？

异步操作的方式，是 es6 中出现的

promise api 有哪些？

- all
- race
- finadlly
- catch
- resolve/reject...

pending fulfilled rejected （三种状态）

## 转成一个 promise 实例

## 怎么拿取 resolve 的结果？

使用.then 有两个参数 成功和失败的回调 使用成功的回调拿到

有其他的方法吗？

.finally 不管是 resolve

## 用过 async await 吗？

内部自带执行器

异步执行的函数

await 等待异步的执行结果

promise 的 resolve 可以用 await 获取结果（面试官补充），因为 await 会等待 promise 的返回结果

## js 异常捕捉的方法

try catch

try catch 捕捉什么

## promise.reject 结果怎么拿到？

.then .catch 获取

## await 怎么捕获

用 try...catch 在 try 里面 await 一个结果

catch 中捕捉一个异常

## js 的 eventloop？

执行栈 任务的执行 先同步后异步，任务队列(宏和微) 【过程】

## ts 了解过吗

## css 选择器？

## 兄弟选择器和并列 都叫组合选择器

## 兄弟选择器怎么写的？

## `+`下一个兄弟 `~`是兄弟都可以

## less sass 一些？

嵌套的写，没了解过

## Es6 增加了什么？

## const 不能改变？详细说说（值操作，不能指向新的对象）

## promise 你了解到的？

- js 对象，对回调函数的缺点进行处理，回调函数无法浏览器记录信息所以回调地狱，出现.then 链式调用，promise
  有三个状态，pending,resolve,reject

## async 当我们用 await 等待一个结果 后面的代码执行顺序？

- await 后面的同步执行，下面的代码压入微任务队列
- await 阻塞

## 文件的上传和下载（将默认请求阻止，进行了二次封装）

## 说一下图片的懒加载是怎么实现的（预加载和懒加载，判断图片是否快要到底部，再发送请求，在进行渲染）

## 说一下垃圾回收机制（基于世代假说，分为新生代，老生代，新生代分为 from 和 to 等等）

## bind，call，apply 的区别

## 用 js 实现一个拖拽功能（使用自带的事件 api，mouseenter，mousemove，mouseleave）

## 异步加载 js 的方法 defer 和 async 有什么区别

## js 的防抖和节流

## cookie 和 localstorage 的区别

## 实现像下面的函数

```javascript
sum(1)(2)(3);

function sum(a) {
  let fn = function (b) {
    return sum(a + b);
  };
  fn.toString = function () {
    return a;
  };
  return fn;
}

sum(1)(2)(3).toString();

/*================================*/

function curry(fn) {
  let parmas = [];
  return function sum(...args) {
    if (args.length) {
      //判断是否有参数
      parmas = [...parmas, ...args];
      return sum;
    }
    return fn(parmas);
  };
}

function add(arr) {
  return arr.reduce((acc, item) => {
    return acc + item;
  });
}

let curried = curry(add);
console.log(curried(1)(2)(3)(4)(10, 20)()); //40
// 注意最后的调用用方式，()调用不传递参数，会跳出判断，调用累加函数
```

## Vue 的数据绑定和双向数据驱动底层怎么实现？

## Array.from 将 arguments 转成数组，还可以使用什么方法？

```js
Array.prototype.splice.call(arguments,0)

Array.prototype.slice.call(arguments)

Array.prototype.concat.call([],arguments)
[...arguments]
```

## 扩展运算符和 Array.from 都可以转成数组，有什么区别？

扩展运算符（...）：
任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。如：Map 和 Set 结构，Generator 函数

Array.from:
Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

能用扩展运算符转的 都能用 Array.from。

其中在扩展运算符有个注意点：如果没有实现 iterator 接口，则不能转。

## for ... of 怎么遍历对象？怎么让对象可以直接用这个方法遍历

for…of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代方法，并为每个不同属性的值执行语句

普通的对象用 for..of 遍历是会报错的

如果需要遍历的对象是类数组对象，用 Array.from 转成数组即可。

如果不是类数组对象，就给对象添加一个[Symbol.iterator]属性，并指向一个迭代器即可。

```js
//方法一：
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

obj[Symbol.iterator] = function () {
  var keys = Object.keys(this);
  var count = 0;
  return {
    next() {
      if (count < keys.length) {
        return { value: obj[keys[count++]], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

for (var k of obj) {
  console.log(k);
}

// 方法二
var obj = {
  a: 1,
  b: 2,
  c: 3,
};
obj[Symbol.iterator] = function* () {
  var keys = Object.keys(obj);
  for (var k of keys) {
    yield [k, obj[k]];
  }
};

for (var [k, v] of obj) {
  console.log(k, v);
}
```

## event.target 和 event.currentTarget 区别？绑定捕获阶段的事件，怎么实现？

event.target 实际点击的节点

event.currentTarget 事件绑定所在的节点

target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
target.addEventListener(type, listener, useCapture, wantsUntrusted);

（1）type

表示监听事件类型的字符串。

（2）listener

当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener
接口的对象，或者是一个函数。

（3）options 可选

一个指定有关 listener 属性的可选参数**对象**。可用的选项如下：

- capture: Boolean，**表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。**

- once: Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
- passive: Boolean，设置为 true 时，表示 listener 永远不会调用 preventDefault()。如果 listener

  仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

- signal：AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除。

**（4）useCapture** **可选**

Boolean，在 DOM 树中，注册了 listener 的元素， 是否要先于它下面的 EventTarget，调用该 listener。 当 useCapture(设为 true)
时，沿着 DOM 树向上冒泡的事件，不会触发
listener。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。如果没有指定，
useCapture 默认为 false 。

（5）wantsUntrusted

如果为 true , 则事件处理程序会接收网页自定义的事件。此参数只适用于 Gecko（chrome 的默认值为 true，其他常规网页的默认值为
false），主要用于附加组件的代码和浏览器本身。

## async await 在进行异常捕获的时候，怎么实现？在 promise 外层能用 try-catch 捕获吗？

async await 使用 try-catch 捕获错误

在 promise 外层不能用 try-catch 捕获。

```js
try {
  new Promise((resolve, reject) => {
    throw new Error("error");
  });
} catch (e) {
  console.log(e);
}
```

JS
的事件循环，哪些是宏任务？视图渲染的机制？结合宏任务、微任务，视图渲染是在什么时机去做？页面渲染是宏任务能具体讲讲？（参考这篇文章，之前我也不清楚 <https://zhuanlan.zhihu.com/p/441288090>）

## Vue 的 mixin 和 mixins？

## computed 和 watch 的区别和使用场景

## 有做过移动端吗？知道怎么做适配吗？

## 5、vue 中父子组件是什么传值的？祖孙之间呢？

## 6、用过 eventbus 吗？vuex 呢？

## 7、用 vue 做过最复杂的功能是什么？

## 9、平时会自己封装组件吗？

```text
1.数据从父组件传入（子组件本身尽量不要生产数据，如果需要生成数据，只能在组件内部进行使用，不要传递出去。）
props: {
 num:{
  type: Number,
 }
}
对于通过props传入的参数，不建议对其进行操作，因为会同时修改父组件里面的数据（如果修改的话，控制台中也会报错的），如果需要修改数据，可以传递给父组件，让父组件去修改（在父组件中处理事件）。
如果一定要在子组件中使用，在父组件传入时进行一次深拷贝。
--------------------------------------------------
2.在父组件中处理事件（父组件中处理的事件是和后端交互的事件，比如发起的axios的请求，但并不是所有的事件都放到父组件中处理，比如组件内部的一些交互行为，或者处理的数据只在组件内部传递，就可以在子组件中处理。）

// 子组件中
<div @click="changeApproval"></div>
changeApproval(id) {
  this.$emit("pushId", id);
}

// 父组件中
<common-dialog @pushId="getId"></common-dialog>

getId(id) {
  this.approvalForm.approval = id;
}
--------------------------------------------------
3.记得留一个slot（详细上方连接）
一个通用的组件，往往不能完美的适应所有的应用场景，所以在封装组件的时候，只需要完成组件的80%的功能，剩下的20%让父组件通过slot解决。
--------------------------------------------------
4.不要依赖vuex
如果要抽离组件尽量不要使用vuex来实现参数的传递，因为vuex是用来管理组件状态的，虽然可以用来传参，但是不推荐，可以选择放到localstorage中，或者通过props传递等方式。
--------------------------------------------------
5.合理使用scoped
样式中添加scoped可以让样式只对当前组件生效，但是一味使用scoped，会产生重复代码，所以需要有一个全局的样式，组件内只写针对于组件的样式，避免重复的样式代码。
--------------------------------------------------
6.组件具有单一职责
封装业务组件或者基础组件，如果不能给这个组件起一个有意义的名字，证明这个组件承担的职责可能不够单一，需要继续抽组件，直到它可以是一个独立的组件即可。

```

## JSONP 后端实际返回的是什么

服务端返回的是一段可执行的 JavaScript 代码。

## 你知道为什么现在都不用 table 布局了吗？

- Table 要比其它 html 标记占更多的字节。
  (延迟下载时间，占用服务器更多的流量资源。)
- Table 会阻挡浏览器渲染引擎的渲染顺序。
  (会延迟页面的生成速度，让用户等待更久的时间。)
- Table 里显示图片时需要你把单个、有逻辑性的图片切成多个图。
  (增加设计的复杂度，增加页面加载时间，增加 HTTP 会话数。)
- 在某些浏览器中 Table 里的文字的拷贝会出现问题。
  (这会让用户不悦。)
- Table 会影响其内部的某些布局属性的生效(比如`<td里的`元素的`height:100%`)
  (这会限制你页面设计的自由性。)
- 一旦学了 CSS 知识，你会发现使用 table 做页面布局会变得更麻烦。
  (先花时间学一些 CSS 知识，会省去你以后大量的时间。)
- table 对对于页面布局来说，从语义上看是不正确的。
  (它描述的是表现，而不是内容。)
- table 代码会让阅读者抓狂。
  (不但无法利用 CSS，而且会你不知所云)
- table 一旦设计完成就变成死的，很难通过 CSS 让它展现新的面貌。

## 19.看代码说输出

```javascript
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000));
}

async function main() {
  console.time();
  const a = wait();
  const b = wait();
  const c = wait();
  await a;
  await b;
  await c;
  console.timeEnd();
}

main();
```

## css 样式隔离了解吗？有哪几种方法？

- 命名空间，这很好理解，其实就是给每个不同模块使用的 css 规划好命名，这样所有的 css
  就都不会出现冲突，这种方法虽然很好理解和简单，但是编写起来很繁琐，维护成本会很高，当然，现在也有打包工具很容易就可以实现就是了。

- css Modules，这其实跟命名空间有点类似，vue 应该就是使用类似的方法，给选择器加上特殊的字符串，达到 css 隔离的效果。理解起来很简单，给每一个
  dom 都给了一个独立的 Hash，对于它们上面所挂在的 css 样式通过该 hash 绑定即可，没什么好说的，现在打包工具这么完善，借助打包工具很轻松的就能实现这种代码。

- css-in-js，使用 JS 语言写 CSS。

- Shadow DOM，Web components 的一个重要属性是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁。其中，Shadow
  DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。Shadow DOM 是指浏览器的一种能力，它允许在文档（document）渲染时插入一棵
  DOM 元素子树，但是这棵子树不在主 DOM 树中。有了 Shadow DOM，元素就可以和一个新类型的节点关联。这个新类型的节点称为 shadow
  root。与一个 shadow root 关联的元素称作一个 shadow host。shadow host 的内容不会渲染；shadow root 的内容会渲染。Shadow DOM
  允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的
  DOM 元素一样。

## 21、vue 中是怎么实现 SPA 的？原理？

## 移动端适配方法？

1.px + viewport 适配

通过动态设置`meta`标签的`viewport`让 css 中的 1px 等于设备的 1px。

2.rem 布局
。CSS3 媒体查询适配
。基于设计图的 rem 布局
。基于屏幕百分比的 rem 布局
。小程序的 rpx 布局
3.vw 布局
。通过媒体查询的方式即 CSS3 的 meida queries
。以天猫首页为代表的 flex 弹性布局
。以淘宝首页为代表的 rem+viewport 缩放
。rem 方式

## vue 中用 import 引入图片用过吗？

## 3、引用数据类型和基本数据类型有什么区别？

两种类型的区别在于存储位置的不同：
原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## 4、内存溢出是栈溢出还是堆溢出？

什么是内存泄漏？内存泄漏是指程序被分配的栈内有一块内存既不能使用，也不能被回收。

导致内存泄漏的原因一般有一下几种情况：

- 函数内未使用声明变量关键字的变量

- 未销毁的定时器

浏览器常用的垃圾回收办法有两种：标记清除和引用计数。

标记清除

这个是最常用的方式。当变量进入执行时，会给上一个标记，就证明这个变量进入了代码的执行环境，当变量执行完毕，离开执行环境时，会被标记上离开了执行环境。此时的垃圾回收器会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。

引用计数

这种方式用的不多。引用计数，顾名思义就是计算这个变量被引用的次数。当一个变量被声明且赋上引用类型，这个变量的引用次数就会相应的加
1，如果包含这个值的引用变量又附上了另外一个值，那么这个值的引用次数就相应的减 1，当引用次数变为 0
的时候，就无法访问这个值了。当垃圾收集器运行的时候，就会回收引用次数为 0 的值所占的内存，并释放这些内存。

## 场景题：比如说我有 20 个请求，然后需要限制执行，并发请求只有 4 个

```javascript
async function asyncPool(poolLimit, array) {
  const ret = []; // 用于存放所有的promise实例
  const executing = []; // 用于存放目前正在执行的promise
  for (const item of array) {
    const p = Promise.resolve(item);
    ret.push(p);
    if (poolLimit <= array.length) {
      // then回调中，当这个promise状态变为fulfilled后，将其从正在执行的promise列表executing中删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
        // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
        // 然后再进入到下一次for循环，生成新的promise进行补充
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
```

## CSS:设计两列，左边的块宽 200px，右边的自适应。DOM 先写右边的块，给两个块设置不同的颜色

- flex+order
- `position:absolute` + width

```css
div {
  height: 200px;
}

.left {
  width: 200px;
  position: absolute;
  background: goldenrod;
}

.right {
  position: absolute;
  width: 100%;
  background: red;
}
```

## 如何实现文件下载

- 通过 FileReader 实例的 readAsArrayBuffer 方法，获取文件的二进制数据
- 使用 Blob 这个构造函数创建一个 blob 实例，结合 URL.createObjectURL 方法创建一个包含源内容的字符串
- 创建一个 a 标签，将 a 标签的 href 属性指定为 URLL.createObjectURL 方法返回的字符串，download 指定为文件名称
- 调用 a 标签的 click 方法实现文件下载

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="ie=edge" http-equiv="X-UA-Compatible" />
    <title>Title</title>
  </head>
  <body>
    <input id="file" name="img" type="file" />
  </body>
  <script>
    const element = document.querySelector('#file');
    const fileReader = new FileReader()element.addEventListener('change', () => { // 获取文件对象
      let file = element.files[0] // 获取文件对应的二进制数据
      fileReader.readAsArrayBuffer(file) fileReader.onload = () => {
        // 创建blob实例
        let blob = new Blob([fileReader.result], { type: file.type })
        // 创建包含源内容的字符串
        let url = URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url a.download = file.name
        // 下载文件
        a.click()
        // 删除这个包含源内容的字符串，因为该字符串与文档相关联，避免内存泄漏
        URL.revokeObjectURL(url)
      }
    })
  </script>
</html>
```

## 使用 URL.createObjectURL 这个方法需要注意什么

- 创建一个字符串，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 相绑定
- 需要调用 URL.revokeObjectURL(url)从文档中移除该字符串，避免内存泄漏

## 服务器如何验证用户身份？

- cookie 或者 token

## token 过期了怎么办？

- token 续签
- 已知 token 过期时间，在请求前根据时间差决定是否需要续签 token
- 或者当返回 401 状态码的时候，根据当前用户是否登录决定是否续签 token，未登录重定向到登录页

## webpack 如何配置压缩代码？

- html----html-webpack-plugin
- css----先提取 css 文件（mini-css-extract-plugin）---压缩 css（css-minimizer-webpack-plugin）
- js----terser-webpack-plugin
- compression-webpack-plugin 将文件压缩为 gzip 格式，在浏览器请求压缩后的.gz 文件时，会通过浏览器内置的解码器解码.gz 文件
- 配置 tree-shaking 删除无用代码，也可以压缩代码体积

## 使用 tree-shaking 需要注意什么？

- 项目的模块规范必须使用 esmodule
- package.json 中的 sideEffects 设置为 false，表示整个项目没有副作用，可以进行 tree-shaking 处理
- 如果 css 文件通过@import 引入的其他的 css 文件，说明该样式文件存在副作用，需要在 sideEffects 配置一个数组，值为对应的 css
  文件名称

## 回流和重绘

token 和 cookie，csrf 攻击，cookie 如何被窃取，如何防止

axios 的封装，介绍 restful 风格，封装成基于资源的库是如何封装的。axios 底层的两种实现方法，如何实现（XHR 和 Fetch）

数组和链表是如何存储的，他们查询复杂度分别是多少

队列和栈有什么区别

排序有几种，每个复杂度是多少，详细介绍，说一下快排的实现

## 字符串有效性验证 isValid：{}, [], ()是否匹配（栈实现）输入 "123{23[2a(d)]}34" 输出 true

## 合并两个有序数组。实现后提问复杂度，再问，能不能用 O(n)实现（用插入排序）

1 拖动 div，

```html
<div id="demo"></div>
```

```css
#demo {` `position``: ``absolute``;` `width``: ``100px``;` `height``: ``100px``;` `background-color``: ``rgb``(``0``, ``0``, ``255``);` `}
```

## 解析 url 成对象

例如

input: " [http://www.qq.com?age=2&name=leili&name=meimeihan&gender=male](http://www.qq.com/?age=2&name=leili&name=meimeihan&gender=male) "

output:

```js
{     "age": "2",     "name": [         "leili",         "meimeihan"     ],     "gender": "male" }
```

```js
var obj={
    name:'tonny'
}
var b={
    name:'tom'
    getelement()=>{
        console.log(this.name)
    }
}
var a=b().getelement();
a()
// 如果是箭头函数和普通函数，this的指向分别会指向什么会输出什么
```

```js
console.log(1)
new promise(resolve){
    console.log(2)
  setTimeout()=>{for(let i=0;i<9999;i++)
        {
            resolve(i)
        }
    console.log(3)
}
}
.then{
    console.log(4)
}
console.log(5)

```

项目做了那些优化

- 压缩构建产物，分包 chunk，修改压缩器为 esbuild
- 配置字体，音频和 css 等资源静态缓存
- 添加列表动画实现平滑过渡
- 表单提交添加防抖处理
- 对输入框进行过滤防止 XSS 攻击
- 对语音播报的内容添加节流处理
- 配置路由懒加载，避免首屏加载资源过多，减少首屏加载时间
- 配置路由拦截，防止未登录访问系统
- 通过对象存储管理图片资源
- 配置 token 续签功能，确保用户对后台服务的有权访问

JS 数据类型

闭包是什么，有什么作用

原型和原型链是什么

Koa 洋葱圈模型

跨域怎么解决

- JSONP
- CORS
- 脚手架代理
- NGINX 代理
- Websocket
- postMessage+iframe
- document.domain+iframe

浏览器的多个标签页如何通信

- ServiceWorker
- SharedWorker
- localStorage
- BroadcastChaneel

强缓存与协商缓存

## HTTP 缓存的资源的存储位置

- css 磁盘缓存

- js、图片、字体 内存缓存

http1.0、http1.1 和 http2 区别

vue2 与 vue3 的区别

Vue3 有什么优势

- 采用 TS 重构，增强对于 TS 的支持能力
- 重构响应式系统，将 Object.defineProperty 改为 Proxy，拦截整个对象属性的操作
- 重构 diff[算法
  ，引入[最长递增子序列的思想，减少比对次数，提升性能
- 修复 vue2 中插槽更新的异常，比如子组件更新引发整个父组件更新
- 引入组合式 API，降低对于 this 的依赖程度，通过函数式编程的思想管理组织功能模块

## 网络相关

- 浏览器输入 url 过程
  - 解析 url 在本地 host 文件查询找到 DNS 解析得对应 IP 地址等
  - 三次握手建立 TCP 连接，HTTPS 协议的话还要进行 TLS 握手
  - 服务端接受请求后返回响应
  - 浏览器根据响应进行解析生成 DOM 树和 CSSOM 树
- DNS 查找过程展开说说？
  - 挖坑- - 我答得现在本地的 host 文件查询，若有对应 IP 就直接返回，然后在路由器查询，然后再去 DNS 服务器查询
  - 那对根服务器的一个了解不是很多是吧 （嗯嗯，寄）
- TCP 连接
  - 面向字节流，提供可靠的传输服务，需要三次握手
  - 展开三次握手讲讲（挖坑 ×2）
  - 你提到了两次握手不安全，原因是啥
    - 两次握手的话服务端不知道客户端收到报文的能力是否正常
  - 最后一次握手讲一下（前边没说清楚，不太记得了，淦，回头开一篇博客详细讲讲）
- TCP 和 UDP 区别
  - UDP 无连接、不可靠，传输数据更快
  - UDP 的应用场景多为丢包不重要的
  - 还有其他的吗？（……）
- TCP 拥塞控制了解过吗，讲讲
  - 拥塞窗口、超时重传、慢开始和快重传（坏了，快重传、快恢复这里混淆了）
  - 应该是慢开始、拥塞避免、加性增和减性乘、快重传、快恢复

## HTML 相关

- DOM 树和 CSSOM 树构建过程（前面挖的坑）
- 加载 JS 资源、CSS 资源对页面有什么影响吗（阻不阻塞）
  - JS 资源，讲了 async 和 defer
  - CSS 资源是在啥时候解析的，会不会阻塞 DOM 结点的构建？（寄，我觉得是并行的）
    - 不会阻塞解析还是渲染？

## 前端安全？

- 跨域解决方法？
  - 主要讲了讲 CORS，简单请求和非简单请求
    - 讲讲简单请求和非简单请求，预检请求
  - 其他 jsonp 啥的没细说

【参考链接】<https://ysx.cosine.ren/cn/note/front-end/bytedance-note/web-safe-getting-started/>

跨站脚本攻击 XSS(Cross Site Scripting)

注入恶意脚本，完成攻击，后果：泄露用户隐私等

XSS 主要利用了开发者对用户提交内容的盲目信任。

特点

- 通常**难以从 UI 上感知**（一般都是暗地里执行脚本）
- 窃取用户信息（**cookie/token**）
- **绘制 UI（如弹窗等）**，诱骗用户点击/填写表单

xss 攻击也分几大类：Store XSS、Reflected XSS、DOM-based XSS、Mutation-based XSS

## Store XSS

- 提交的恶意脚本被**存在数据库**中
- 访问页面 -> 读数据 == 被攻击
- **危害最大**，对全部用户可见
- 如：某个视频网站，上传了恶意脚本被存到数据库中，从此电商网站上便多了一个视频共享账户。

## Reflected XSS

- 不涉及数据库
- 从 **URL** 上攻击，在 URL 上带上脚本

## DOM-based XSS

- 不需要服务器的参与
- 恶意攻击的发起+执行，全在浏览器完成
- 完成注入脚本的地方，是由浏览器来的，这是它与 Reflected XSS 的不同之处

## Mutation-based XSS

- 一个巧妙地攻击方式，利用浏览器的特性

  > 如果用户所提供的富文本内容通过 javascript 代码进入 innerHTML 属性后，一些意外的变化会使得这个认定不再成立：浏览器的渲染引擎会将本来没有任何危害的
  > HTML 代码渲染成具有潜在危险的 XSS 攻击代码。

- 巧妙，最难防御的一种方式,攻击者非常的懂浏览器

## Cross-site request forgery（CSRF，跨站伪造请求）

- 在用户不知情的前提下

- **利用用户权限**(cookie)

- **构造**指定 HTTP **请求**，进而窃取或修改用户敏感信息

  一个用户访问了一个恶意的页面，这个页面向银行发送一个转账请求，ServerA 为银行的服务器，发现这个请求带有用户的 cookie，成功

  > CSRF 通过伪装来自受信任用户的请求来利用受信任的网站。与[XSS]攻击相比，CSRF
  > 攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比[XSS]`更具危险性`。

## Injection（注入）

- SQL 注入：通过 SQL 参数进行注入
- 命令行注入等
- 读取+改进行流量攻击

## Denial of Service（DOS）攻击

- 通过某种方式(构造特定请求)，导致服务器资源被显著消耗,

- 来不及响应更多请求，导致请求挤压，进而雪崩效应。

- 拓展：正则表达式——贪婪模式

  - 重复匹配时，`?` /`no ?` ：满足`”一个即可“` / `尽可能多`

- 例子：ReDoS:基于正则表达式的 DoS

- 贪婪：n 次不行 ? n-1 次再试试?——回溯

- Distributed Dos （DDOS）

  - 短时间内，来自大量**僵尸设备**的请求流量，服务器不能及时完成全部请求，导致请求堆积，进而雪崩效应，无法响应新请求。（量大就完事儿了）
  - 特点：
    - 直接访问 IP
    - 任意 API
    - 消耗大量带宽（耗尽）

## 中间人攻击（传输层）

- **明文传输**
- **信息篡改不可知**
- **对方身份未验证**

## JS 相关

- 经典基本数据类型
- 如何判断一个变量类型
- 原型链讲讲

```js

Function-- > Function.prototype ----> Object.prototype ----> null
Object  ---> Function.prototype ----> Object.prototype ----> null
```

- 一道题 写出 p 与 Person 的关系（尽可能多） ↓ 我的回答

```js
function Person() {}
let p = new Person();
// 写出p与Person的关系（尽可能多） ↓我的回答
console.log(p.__proto__ === Person.prototype); // true
console.log(p.constructor === Person); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
```

```js
function Foo() {
  getName = function () {
    console.log("1");
  };
  return this;
}
Foo.getName = function () {
  console.log("2");
};
Foo.prototype.getName = function () {
  console.log("3");
};
var getName = function () {
  console.log("4");
};
// 判断以下输出
Foo.getName();
getName();
new Foo().getName(); // 此处执行new Foo()会把getName重新赋值，导致下面输出 1
getName();
```

- 答案是 2 4 3 1

## object 方法

```js
Object.assign(); // 通过复制一个或多个对象来创建一个新的对象。
Object.create(); // 使用指定的原型对象和属性创建一个新对象。
Object.defineProperty(); //给对象添加一个属性并指定该属性的配置。
Object.defineProperties(); //给对象添加多个属性并分别指定它们的配置。
Object.entries(); //返回给定对象自身可枚举属性的 [key, value] 数组。
Object.freeze(); //冻结对象：其他代码不能删除或更改任何属性。
Object.getOwnPropertyDescriptor(); //返回对象指定的属性配置。
Object.getOwnPropertyNames(); //返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。
Object.getOwnPropertySymbols(); //返回一个数组，它包含了指定对象自身所有的符号属性。
Object.getPrototypeOf(); //返回指定对象的原型对象。
Object.is(); //比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。
Object.isExtensible(); //判断对象是否可扩展。
Object.isFrozen(); //判断对象是否已经冻结。
Object.isSealed(); //判断对象是否已经密封。
Object.keys(); //返回一个包含所有给定对象自身可枚举属性名称的数组。
Object.preventExtensions(); //防止对象的任何扩展。
Object.seal(); //防止其他代码删除对象的属性。
Object.setPrototypeOf(); //设置对象的原型（即内部 [[Prototype]] 属性）。
Object.values(); //返回给定对象自身可枚举值的数组。

Object.prototype.hasOwnProperty(); //返回一个布尔值，用于表示一个对象自身是否包含指定的属性，该方法并不会查找原型链上继承来的属性。
Object.prototype.isPrototypeOf(); //返回一个布尔值，用于表示该方法所调用的对象是否在指定对象的原型链中。
Object.prototype.toString(); //返回一个代表该对象的字符串。
Object.prototype.valueOf(); //返回指定对象的原始值。
```

## 实现一个函数 可以接收三个参数 前两个是一个数组 两个数组取并集，去掉重合元素，第三个参数为一个处理函数，处理数组中每个元素

```js
func([1, 1, 2, 2, 3], [2, , 3, 4]); // [1,1,4]
func([1, 1, 2.1, 2.2, 3], [2, , 3, 4], Math.floor); //[1,1,4]
```

## display 和 定位 和 浮动的优先级

（1）首先判断 display 属性是否为 none，如果为 none，则 position 和 float 属性的值不影响元素最后的表现。

（2）然后判断 position 的值是否为 absolute 或者 fixed，如果是，则 float 属性失效，并且 display 的值应该被设置为 table 或者
block，具体转换需要看初始转换值。

（3）如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none，如果不是，则 display 的值则按上面的规则转换。注意，如果
position 的值为 relative 并且 float 属性的值存在，则 relative 相对于浮动后的最终位置定位。

（4）如果 float 的值为 none，则判断元素是否为根元素，如果是根元素则 display 属性按照上面的规则转换，如果不是，则保持指定的
display 属性值不变。

总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"
优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"
的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。

```javascript
function f1() {
  setTimeout(() => {
    console.log("===f1", this.id);
  }, 100);
}

function f2() {
  setTimeout(function log() {
    console.log("===f2:", this.id);
  }, 100);
}

var id = 1;
f1.call({ id: 23 }); // 23
f2.call({ id: 23 }); // 1
```

讲一下 call、apply、bind

## onclick 怎么处理 this

```html
<input type="button" value="按钮" onclick="clickFun()" />
<script>
  function clickFun() {
    this; // this指向 window
  }
</script>

<input type="button" value="按钮" onclick="clickFun(this)" />
<script>
  function clickFun(e) {
    e; // 指向绑定的对象 input 元素
    this; // this指向 window
  }
</script>
```

## splice 几个参数分别是什么

- start,指定修改的开始位置（从 0 计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1
  计数，这意味着-n 是倒数第 n 个元素并且等价于`array.length-n`）；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。

- deleteCount

- ...item

返回值：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

## 如何判断他是一个数组

## Array(7) 和 Array.of(7)

`Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数：`Array.of(7)` 创建一个具有**单个**元素 7
的数组，而 **`Array(7)`** 创建一个**长度为 7**的空数组（**注意：**这是指一个有 7 个空位(empty)的数组，而不是由 7
个`undefined`组成的数组）。

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```

响应式布局

- flex 布局
- rem
- 媒体查询

JS 基础类型

怎么判断数据类型

- typeof
- instancedof
- constructor
- toString

怎样理解 JS 异步任务

宏任务、微任务都包含哪些

页面滚动事件多久触发一次

跨域

前端浏览器缓存

v-if v-show 区别

VUE 路由模式

hash 模式与 history 模式区别

- history 模式下配置 404 页面原因

对 webpack 的了解

问 html 都有什么标签，css 都有什么选择器，css 都有什么样式，每种样式的缩写怎么写等等，只简单列举完全不行，挖的特别细，光是问这些基础大概都有三十分钟。

之后就是问 vue 双向绑定之类的。二十分钟左右。

二十分钟写三道题，

1）考查事件代理，但是我没参透，思路直接歪了，

2）获取 classA 所有元素，并且添加 classB，写出来了

3）url 参数解析，写出来了

三栏布局，如何实现三栏布局

楼主答了 float 的圣杯和双飞翼，然后被追问 absolute，答不出

http 的方法，追问 post 和 put 的区别

事件轮询，追问 Promise，宏任务和微任务

this 的指向，看了两道代码答输出

new 的过程中发生了什么，现场手撕

长度最小的子数组

````js
inner = 0
    function say(){
      console.log(inner)
      console.log(this.inner)
    }
    let obj1 = {
      inner:'1-1',
      say(){
        let inner = '1-2'
        console.log(inner)
        console.log(this.inner)
      }
    }
    let obj2 = {
      inner:'2-1',
      say(){
        let inner = '2-2'
        console.log(inner)
        console.log(this.inner)
      }
    }
    say()
    obj1.say()
    obj2.say()
    obj1.say = say
    obj1.say()
    obj2.say = obj1.say
    obj2.say()
    ```

## 知道 promise 嘛？说一下是做什么的？为什么可以链式调用？如果返回个 promise 怎么处理？它的 then 方法和 catch 方法关系？promise 的错误捕获怎么做的？

## 说一下 eventloop？微任务里面嵌套一个微任务怎么执行？

## 说一下闭包，作用域，原型链？

## new 内部实现原理？

## 还是看代码说输出，具体代码不记得，就是关于微任务和宏任务的

## 场景题，给了一个 sleep 函数， 实现功能，隔 1s 打印 1，再隔 2s 打印 2，隔 3 秒打印 3

```js
function sleep(timeout){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,timeout)
    })
    }
 function main(){
  // 写代码
  }
````

刚开始用 promise 链式调用实现，后面问了有没有更优雅的方式，就改成了 async await 方式实现

## 数据懒加载和图片懒加载原理？

```javascript
// 1. getBoundingClientRect
// Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
// 如果是标准盒子模型，元素的尺寸等于width/height + padding + border-width的总和。
// 如果box-sizing: border-box，元素的的尺寸等于 width/height。

element.getBoundingClientRect().top < document.body.clientHeight //getBoundingClientRect().top 元素的上边相对浏览器视窗的位置如果小于可视窗口的高度

// 方法二
el.offsetTop <= (document.documentElement.scrollTop || document.body.scrollTop) + document.body.clientHeight

// 方法三 IntersectionObserver

created()
{
  this.intersectionObserver();
}
,
methods:{
  intersectionObserver()
  {
    let images = document.getElementsByTagName('img');
    const observer = new IntersectionObserver((imgs) => {
      console.log('imgs===', imgs)
      // imgs: 目标元素集合
      imgs.forEach((img) => {
        // img.isIntersecting代表目标元素可见，可见的时候给src赋值
        if (img.isIntersecting) {
          const item = img.target
          item.src = item.dataset.src
          observer.unobserve(item);
        }
      })
    })
    //定时器和Array.from的目的是让images可遍历
    setTimeout(() => {
      Array.from(images).forEach(item => {
        observer.observe(item);
      })
    }, 300)
  }
}

```

## 对象字符串转化成树形结构

```js
let strarr = {
  "a-b-c-d": 1,
  "a-b-c-e": 2,
  "a-b-f": 3,
  "a-j": 4,
};
let obj = {
  a: {
    b: {
      c: {
        d: 1,
        e: 2,
      },
      f: 3,
    },
    j: 4,
  },
};

function strArrToObj(strarr) {
  let root = {};
  for (const key in strarr) {
    let value = strarr[key];
    let keys = key.split("-");
    let ans = root;
    for (let i = 0; i < keys.length; i++) {
      if (!ans.hasOwnProperty(keys[i])) {
        if (i == keys.length - 1) {
          ans[keys[i]] = value;
        } else {
          ans[keys[i]] = {};
        }
      }
      ans = ans[keys[i]];
    }
  }
  return root;
}
```

项目技术选型怎么考虑的

一般在项目中如何运用 TS

- 编写全局的类型声明文件 index.d.ts，声明整个项目中用到的数据类型，通过 ts.config.json 配置全局生效

Vue3 怎么与 TS 相结合，用 TS 做了那些类型声明？

- 接口类型定义，响应式数据类型定义，列表渲染数据定义，全局状态和路由组件的类型定义，增强类型检查和代码提示
- TS 一方面充当了使用文档，另一方面减少了手误导致的拼写错误，提供运行时编译检查，例如在伪数组上调用数组方法，在编译阶段直接提示报错
- 通过内置的 ThisType 显示指定 this 指向的内容类型，因为 this 的指向与调用时函数所在的对象，或者调用的方式相关

实现 TS 类型

- StartsWith:：判断字符串是否以子串为起始

```text
 /** * 判断字符串是否以子串为起始 * type Result = StartsWith<"123", "12"> // true */type StartsWith< S1 extends   string, S2 extends   string> = S1 extends   ${S2}${infer Right} ?
  true : false;
```

- Last：判断数组的最后一个元素的类型

```text

 // 实现一个通用的 Last<T>，它接受一个数组 T 并返回其最后一个元素。type Last<T extends   any[]> = T extends   [...any[], infer P] ? P : undefined;type arr1 = ["a", "b", "c"];type arr2 = [3, 2, 1];   type tail1 = Last<arr1>; // expected to be 'c'type tail2 = Last<arr2>; // expected to be 1
```

TS 中的 never 是什么

- never 表示永远不存在的类型
- 比如一个函数总是抛出错误，而没有返回值
- 或者一个函数内部有死循环，永远不会有返回值，函数的返回值就是 never 类型

TS 中的 keyof 是什么，有什么用？

层级关系题目

```js
// 以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，
结构如下： // 原始 list 如下
let list = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 16, name: "部门L", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
  ];
const result = convert(list);
console.log(result);
// 转换后的结果如下
let result = [
  { id: 1, name: "部门A", parentId: 0, children: [
    { id: 3, name: "部门C", parentId: 1, children: [
      { id: 6, name: "部门F", parentId: 3, },
      { id: 16, name: "部门L", parentId: 3, },
      ],
     },
     { id: 4, name: "部门D", parentId: 1, children: [
      { id: 8, name: "部门H", parentId: 4, }, ], }, ], }, ];

function  convert(list, id = 0) {
    let res = [];
    for(let i = 0; i < list.length; i++) {
      if   (list[i].parentId === id) {
        res.push(list[i]);
        list[i].children = convert(list, list[i].id);
        }
        }
        return   res;
        }
```

权限控制如何实现的？

- 根据角色加载权限列表，角色与权限相绑定，账号与角色相互绑定
- 状态管理确保切换角色后自动更新视图
- 路由过滤获取可访问路由列表
- 路由拦截防止越权访问
- 添加 404 页面用于非法访问过渡

设计一个权限控制的组件，伪代码

- 子组件介绍待处理数据，当前用户唯一标识，以及需要做权限控制的字段
- 子组件通过计算属性过滤，再将过滤后的内容列表渲染出来
- 子组件的数据通过作用域插槽传递到父组件，不推荐使用 mixin

什么情况下不能用箭头函数？

1.定义对象方法

2.定义原型方法

3.定义构造函数

4.定义事件回调函数

箭头函数在声明的时候就绑定了执行上下文，要动态改变上下文是不可能的，在需要动态上下文的时候它的弊端就凸显出来。比如在客户端编程中常见的
DOM 事件回调函数（event listenner）绑定，触发回调函数时 this 指向当前发生事件的 DOM 节点，而动态上下文这个时候就非常有用。

```javascript
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log(this === window); // => true
  this.innerHTML = "Clicked button";
});
```

vue 中不能用箭头函数的情况

1.不应该使用箭头函数来定义一个生命周期方法

2.不应该使用箭头函数来定义 method 函数

3.不应该使用箭头函数来定义计算属性函数

4.不应该对 data 属性使用箭头函数

5.不应该使用箭头函数来定义 watcher 函数

原因: 箭头函数绑定了父级作用域的上下文，this 将不会按照期望指向 Vue 实例。也就是说，你不能使用 this 来访问你组件中的 data
数据以及 method 方法了。this 将会指向 undefined。

## 说一说箭头函数为什么没有自己的 this

参考：<https://blog.csdn.net/devincob/article/details/72628757>

1.你看过 vue2,vue3 的源码是把，说说你对响应式的理解？手写 vue2.,vue3 的响应式？
2.https 的具体过程？ssl/tls 具体过程? 3.访问 `http://www.baidu.com/` 的具体细节，发生了什么？ 4.手写函数柯里化
const add=(x,y,z)=>x+y+z;
可以 add(1)(2)(33)或者 add(100,10)(20) 5.你遇到的最大的困难是什么。
6.for in , for of 的区别
7.vue3 的代理对比 vue2 的 defineProperty 有什么优点。 8.其他的忘记了 八股文挺多的。 9.好像也问了你做过的项目中最难得是啥？

## http 的 1.0 1.1 2.0 的区别和一些特性？

好像还有浏览器缓存

一面的面试官是一个很帅的小哥，很友好，真的，就面试体验很好，因为我本身面对字节就有点紧张，然后问我 http 的 1.0 1.1 2.0
的区别和一些特性的时候，我当时有些忘记了，他说没关系，你可以仔细想想，想得到就说，想不到也没啥

技术二面

## 是一道递归+剪枝的

印象中是
输入[1,2,3,4] 3
输出[[1,2,3],[1,2,4],[2,3,4]]; 2.你手写过 promise 是把，说说里面的静态方法有哪些？各个分别有啥不同和作用？手写 Promise.all
方法 3.手写 jsonp 4.用过 nodejs 吗，nodejs 的架构？
5.nodejs 如何开启多进程？如何开启多线程? 6.还有其他的一些，但是我忘记了

二面面试官比较冷一点，写出来了，然后 promise.all
写的有瑕疵，其他的问题关于 nodejs 架构这些我不是很了解，回答的不是很好，以为挂了，没想到后面还是过了

技术三面

1.项目问题，拿着我的简历问问问，说说你对低代码的理解？ 2.在你的这些项目中，你做过最难的项目是什么？最难的点是什么？ 3.平时你是怎么学习前端的？ 4.以后的打算是啥？ 5.你简历上写了你看了源码，说说你对
diff 算法的理解？
6.axios 源码看过是把，说说你从中收获了什么？ 7.还有其他的一些，但是我忘记了 dbq

面试官问项目比较多一些，为人也很面善，在此感谢他

- http 和 https 的区别，https 的加密原理
- get 和 post 的区别
- Vue 的 mixin 有了解吗
- Vue 的 nextTick 有了解吗？内部原理是什么，为啥优先使用 promise 而不是 setTimeout？
- 项目如何部署的
- websoket 的安全问题
- 数据库有了解吗？有用过吗？
- vite 和 webpack 的差异

```js
console.log(typeof typeof typeof null);
// 其中还问了typeof为什么识别null 为object

let mySet = new Set(); // set 有什么特点
mySet.add({}); // size ??
mySet.add({}); //size ??

// 运行什么结果
for (let i = 0; i < 9; i++) {
  console.log(i);
  let i = "9";
}
// 运行什么结果
for (let i = 0; i < 9; i++) {
  let i = "9";
  console.log(i);
} // 运行结果
var a = 1;
function fn() {
  console.log(a);
  var a = 2;
}
fn();

// 解构结果
let [foo] = [];
console.log(foo);

let [bar, foo] = [1];
console.log(bar);
console.log(foo);
```

```js
var count = 10;
function a() {
  return count + 10;
}
function b() {
  var count = 20;
  return a();
}
console.log(b());

// 输出什么？解释下执行过程和原理
var now = new Date();
var timer = setTimeOut(function () {
  console.log(new Date() - now);
}, 300);
while (new Date() - now < 1000) {}
console.log(new Date() - now);
```

## HTML5 的更新

## LocalStorage 和 sessionStorage 的区别

## CSS 选择器及优先级

## CSS3 的更新

## 用纯 CSS 绘制一个三角形

## 用 CSS 绘制一条 0.5px 的线

## 谷歌浏览器怎么设置小于 12px 的字体

## 三栏布局

## js 的数据类型

## js 中 symbol 的用处？

## 如果 new 一个箭头函数会发生什么？

## new 操作符具体干了什么？

## 0.1+0.2 ！== 0.3？

## 事件委托？事件循环？

## 浅拷贝和深拷贝？

## 原声与原型链？

## 作用域和作用链？

## 常见的数组操作方法？

## js 声明变量 var ，const，let 的区别

## const 声明的变量可以修改吗？const 声明的对象的属性可以修改吗？

## vue 框架的一些原理

## vue 的双向数据绑定

## vue 实现数据劫持？

## vue 的声明周期和钩子函数？

## vue 实现组件间传值有哪些方法？

## vue 中 computed 和 watch 的区别？

## 在 vue 中一般用哪个声明周期请求异步数据？

## http 常用的状态码

## vue 中$nextTick 的原理及作用

## 输入 url 到页面加载全过程

## 盒模型，box-sizing

## CSS3 新特性，伪类，伪元素，锚伪类

## CSS 实现隐藏页面的方式

## 如何实现水平居中和垂直居中

## 说说 position，display

## 请解释`{box-sizing:border-box;}`的作用，并说明使用它的好处

## 浮动元素引起的问题和解决办法？绝对定位和相对定位，元素浮动后的 display 值

## link 和@import 引入 css 的区别

## 解释一下 css3 的 flexbox，以及适用场景

## inline 和 inline-block 的区别

## 哪些是块级元素那些是行级元素，各有什么特点

## grid 布局

## table 布局的作用

## 实现两栏布局有哪些方法？

## css dpi

## 你知道 attribute 和 property 的区别么

## css 布局问题？css 实现三列布局怎么做？如果中间是自适应又怎么做？

## 流式布局如何实现，响应式布局如何实现

## 移动端布局方案

## 实现三栏布局（圣杯布局，双飞翼布局，flex 布局）

## 清除浮动的原理

## overflow:hidden 有什么缺点？

## padding 百分比是相对于父级宽度还是自身的宽度

## css3 动画，transition 和 animation 的区别，animation 的属性，加速度，重力的模拟实现

## CSS 3 如何实现旋转图片（transform: rotate）

## sass less

## 对移动端开发了解多少？（响应式设计、Zepto；@media、viewport、JavaScript 正则表达式判断平台。）

## 什么是 bfc，如何创建 bfc？解决什么问题？

## CSS 中的长度单位（px,pt,rem,em,ex,vw,vh,vh,vmin,vmax）

## CSS 选择器的优先级是怎样的？

## 雪碧图

## svg

## 媒体查询的原理是什么？

## CSS 的加载是异步的吗？表现在什么地方？

## 常遇到的浏览器兼容性问题有哪些？常用的 hack 的技巧

## 外边距合并

## 解释一下"::before"和":after"中的双冒号和单冒号的区别

## HTML5 新特性，语义化

## 浏览器的标准模式和怪异模式

## xhtml 和 html 的区别

## 使用 data-的好处

## meta 标签

## canvas

## HTML 废弃的标签

## IE6 bug，和一些定位写法

## css js 放置位置和原因

## 什么是渐进式渲染

## html 模板语言

## meta viewport 原理

## js 的基本类型有哪些？引用类型有哪些？null 和 undefined 的区别

## 如何判断一个变量是 Array 类型？如何判断一个变量是 Number 类型？（都不止一种）

## Object 是引用类型嘛？引用类型和基本类型有什么区别？哪个是存在堆哪一个是存在栈上面的？

## JS 常见的 dom 操作 api

## 解释一下事件冒泡和事件捕获

## 事件委托（手写例子），事件冒泡和捕获，如何阻止冒泡？如何组织默认事件？

## 对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？

## this 有哪些使用场景？跟 C,Java 中的 this 有什么区别？如何改变 this 的值？

## call，apply，bind

## 显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链

## 创建对象的多种方式

## 实现继承的多种方式和优缺点

## new 一个对象具体做了什么

## 手写 Ajax，XMLHttpRequest

## 变量提升

## 举例说明一个匿名函数的典型用例

## 指出 JS 的宿主对象和原生对象的区别，为什么扩展 JS 内置对象不是好的做法？有哪些内置对象和内置函数？

## attribute 和 property 的区别

## document load 和 document DOMContentLoaded 两个事件的区别

## `===` 和 `==` , `[]===[]`, `undefined === undefined`,`[] == []`, `undefined == undefined`

## typeof 能够得到哪些值

## 什么是"use strict",好处和坏处

## 函数的作用域是什么？js 的作用域有几种？

## JS 如何实现重载和多态

## 常用的数组 api，字符串 api

## 原生事件绑定（跨浏览器），dom0 和 dom2 的区别？

## 给定一个元素获取它相对于视图窗口的坐标

## 如何实现图片滚动懒加载

## js 的字符串类型有哪些方法？ 正则表达式的函数怎么使用？

## 深拷贝

## 编写一个通用的事件监听函数

## web 端 cookie 的设置和获取

## setTimeout 和 promise 的执行顺序

## JavaScript 的事件流模型都有什么？

## navigator 对象，location 和 history

## js 的垃圾回收机制

## 内存泄漏的原因和场景

## DOM 事件的绑定的几种方式

## DOM 事件中 target 和 currentTarget 的区别

## typeof 和 instanceof 区别，instanceof 原理

## js 动画和 css3 动画比较

## JavaScript 倒计时（setTimeout）

## js 处理异常

## js 的设计模式知道那些

## 轮播图的实现，以及轮播图组件开播 10000 张图片过程

## websocket 的工作原理和机制

## 手指点击可以触控的屏幕时，是什么事件？

## 什么是函数柯里化？以及说一下 JS 的 API 有哪些应用到了函数柯里化的实现？(函数柯里化一些了解，以及在\* 函数式编程的应用，最后说了一下 JS 中 bind 函数和数组的 reduce 方法用到了函数柯里化。)

## JS 代码调试

## 使用过哪些框架？

## zepto 和 jquery 是什么关系，有什么联系么？

## jquery 源码如何实现选择器的，为什么$取得的对象要设计成数组的形式，这样设计的目的是什么

## jquery 如何绑定事件，有几种类型和区别

## 什么是 MVVM，MVC

## Vue 和 Angular 的双向数据绑定原理

## Vue，Angular 组件间通信以及路由原理

## react 和 vue 的生命周期

## react 和 vue 的虚拟 dom 以及 diff 算法

## vue 的 observer，watcher，compile

## react 和 angular 分别用在什么样的业务吗？性能方面和 MVC 层面上的区别

## jQuery 对象和 JS 的 Element 有什么区别

## jQuery 对象是怎么实现的

## jQuery 除了它封装了一些方法外，还有什么值得我们去学习和使用的？

## jQuery 的$(‘xxx’)做了什么事情

## 介绍一下 bootstrap 的栅格系统是如何实现的

## 跨域，为什么 JS 会对跨域做出限制

## 前端安全：xss，csrf

## 浏览器怎么加载页面的？script 脚本阻塞有什么解决方法？defer 和 async 的区别？

## 浏览器强缓存和协商缓存

## 浏览器的全局变量有哪些

## 浏览器同一时间能够从一个域名下载多少资源

## 按需加载，不同页面的元素判断标准

## web 存储、cookies、localstroge 等的使用和区别

## 浏览器的内核

## 如何实现缓存机制？（从 200 缓存，到 cache 到 etag 再到）

## 说一下 200 和 304 的理解和区别

## 什么是预加载、懒加载

## 一个 XMLHttpRequest 实例有多少种状态？

## dns 解析原理，输入网址后如何查找服务器

## 服务器如何知道你？

## 浏览器渲染过程

## ie 的某些兼容性问题

## session

## 拖拽实现

## 拆解 url 的各部分

## 谈一谈 promise

## 所有的 ES6 特性你都知道吗？如果遇到一个东西不知道是 ES6 还是 ES5, 你该怎么区分它

## es6 的继承和 es5 的继承有什么区别

## promise 封装 ajax

## let const 的优点

## es6 generator 是什么，async/await 实现原理

## ES6 和 node 的 commonjs 模块化规范区别

## 箭头函数，以及它的 this

## HTTP 协议头含有哪些重要的部分，HTTP 状态码

## 网络 url 输入到输出怎么做？

## 性能优化为什么要减少 HTTP 访问次数？

## Http 请求的过程与原理

## https（对是 https）有几次握手和挥手？https 的原理

## http 有几次挥手和握手？TLS 的中文名？TLS 在哪一网络层？

## TCP 连接的特点，TCP 连接如何保证安全可靠的？

## 为什么 TCP 连接需要三次握手，两次不可以吗，为什么

## 为什么 tcp 要三次握手四次挥手？

## tcp 的三次握手和四次挥手画图（当场画写 ack 和 seq 的值）？

## tcp 与 udp 的区别

## get 和 post 的区别？什么情况下用到？

## http2 与 http1 的区别？

## websocket

## 什么是 tcp 流，什么是 http 流

## babel 是如何将 es6 代码编译成 es5 的

## http2 的持久连接和管线化

## 域名解析时是 tcp 还是 udp

## 域名发散和域名收敛

## Post 一个 file 的时候 file 放在哪的？

## HTTP Response 的 Header 里面都有些啥？

## 对 webpack,gulp，grunt 等有没有了解?对比

## webpack 的入口文件怎么配置，多个入口怎么分割

## webpack 的 loader 和 plugins 的区别

## gulp 的具体使用

## 前端工程化的理解、如何自己实现一个文件打包，比如一个 JS 文件里同时又 ES5 和 ES6 写的代码，如何编译兼容他们

## 对 AMD,CMD,CommonJS 有没有了解?

## 为什么要模块化？不用的时候和用 RequireJs 的时候代码大概怎么写？

## 说说有哪些模块化的库，有了解过模块化的发展的历史吗？

## 分别说说同步和异步模块化的应用场景，说下 AMD 异步模块化实现的原理？

## 如何将项目里面的所有的 require 的模块语法换成 import 的 ES6 的语法？

## 使用模块化加载时，模块加载的顺序是怎样的，如果不知道，根据已有的知识，你觉得顺序应该是怎么样的？

## 对 nodejs 有没有了解

## Express 和 koa 有什么关系，有什么区别？

## nodejs 适合做什么样的业务？

## nodejs 与 php，java 有什么区别

## Nodejs 中的 Stream 和 Buffer 有什么区别？

## node 的异步问题是如何解决的？

## node 是如何实现高并发的？

## 说一下 Nodejs 的 event loop 的原理

## cdn 的用法是什么？什么时候用到？

## 浏览器的页面优化？

## 如何优化 DOM 操作的性能

## 单页面应用有什么 SEO 方案？

## 单页面应用首屏显示比较慢，原因是什么？有什么解决方案？

## this 指向

## bind 和 apply 区别？

## 事件冒泡事件捕获的不同

## eventloop

## 手写题 sum(1)(2)(3,4).sumOf()

## websocket 通信原理

## websocket 主动关闭连接，不关闭对服务器的压力有多少

## 心跳包

## http 的 keep-alive，持久连接、推送消息，与 websocket 的区别

## 服务端保证消息有序的方案

## 进程与线程

## 实时消息存放在哪

## koa 的中间件模型(洋葱模型）

## 多进程间通信机制

## pm2 工具 （进程守护）

## 说一下 https

## 节流和防抖的区别

## 多个异步请求，如何保证结果的先后顺序 Promise.allSettled

## 项目里面提到了频繁触发滚轮事件 问了节流和防抖

## 看你用了 Echarts 内部原理有无了解？ 无，只是浅用，有了解其他的工具比如 D3

## 项目里面用到了 react-dnd ，它是怎么实现的？和 H5 的拖拽有啥区别？ 说了一下怎么使用的，和 H5 的拖拽使用比较相似，（当时说个人认为是基于 h5 然后方便在 react 使用的一个库）

## 还有啥方法实现拖拽 ? 我回答了绑定鼠标事件，然后重新设置 dom 元素位置 （实在是不知道，尽力想了个方法）

## 绑定事件用 addListener 和 onclick 有啥区别 ？ 以为是问 react 合成事件和原生事件 ，最后发现不是这个，给自己挖坑了

## 讲一下原生事件和合成事件的区别

## 讲一下冒泡和捕获，举个栗子

## react 里面 jsx 直接绑定事件有啥缺点

## setState 是同步还是异步？ 什么时候是同步，什么时候是异步？

## JS 中你对异步编程的理解

## 比较一下 promise 和 async 函数

## 了解过浏览器的垃圾回收机制吗

## vue2 中的生命周期

## computed 和 watch 的区别

## watch 中 deep 有了解过吗？

## 自定义指令

## vue 中组件通信的方式

## 你在项目中用的什么（vuex）

## 介绍一下 vuex

## 有没有写过 vuex 的插件

## 类似于 输入 123、456，输出一百二十三、四百五十六

## 字符串中的某一子字符串的重复个数

## http2

## webpack

## devserver 解决了什么问题

## cookie

## saas

## vue2 响应式如何检测数组和对象

## 项目环境搭建是用脚手架还是自己搭的

## vite 和 webpack 原理是否了解过

## 简单说几个配置

## 讲一讲跨域

## jsonp，cros，nginx

## 讲一讲 http 缓存

## Etag 和 Last-Modified 的请求头字段说一下

## position 讲一下

## 垂直居中实现一下

## flex：order 和 flex: direction

## 立即执行函数

## 计时器函数

## let、const、var

## 组合寄生继承

## map 和 set

## 事件循环

## 为什么学 vue

## vue 实现 v-modle（语法糖）

## props 设置类型检查以及默认值

## data 为什么是函数

## webpack 的构建流程

## webpack 中 plugin 和 loader 的区别

## vue2.0 中的 Object.defineProperty 和 vue3.0 中的 proxy 有什么区别

## 说一说事件循环机制

## 看题目说输出，说详细过程

## 说一下 promise，知道哪些 promise 方法

## 手写 promise.allSttered 方法

## 说一下普通函数与箭头函数的区别

## service worker 是什么，有什么用？

## Vue 子组件如何向父组件传递数据？

## css 盒模型的理解

## 实现一个 16:9 比例固定的样式

## 判断数组的方法

## 谈谈你对原型链的理解

## 对 this 的理解

## 在 new 一个对象的时候发生了什么事情（手写 new）

## 箭头函数和其他的区别

## flat 数组扁平化，去重，排序

## http1.0 2.0 的缺点和改进

## osi 七层网络模型(物理层 数据链路层 网络层 传输层 会话层 表示层 应用层)

## DNS 解析过程(本地 dns 服务器～根 dns 服务器～顶级 dns 服务器～权威 dns 服务器)

## 应用层的一些协议(说了 snmp.telnet.pop.ftp 这些)

## Ip 地址分类(Abcde 类，32 位，主机号，网络号)

## ARP 协议(讲了是物理地址到 ip 地址的解析，还有 arp 表，但是我把 ARP 的具体过程忘了，没讲出来 π_π)

## 还问我能讲下别的什么传输层协议 不是常见的那种(我说了 RIP 路由信息协议，不过我把最大跳数说成了 7，其实是 15)

## 用过哪些响应式方案和布局方案？

## flex 的属性和 api

## 在父容器：display:flex,在子容器中 flex:1 代表什么？

## 你了解过 rem 响应式布局？那你说下 rem 布局怎么用的？

## 问些比较基础的 js 问题？你知道哪些数据类型？

## 你了解过闭包嘛？那说下闭包？

## 那你举你用过几个闭包的例子？怎么实现防抖的？节流的区别呢？（我当时说节流实现的时候，面试官：可以了，可以了...）

## 你说下箭头函数和普通函数的区别？

## 箭头函数的 this 指向是？那怎么改变箭头函数的 this 指向？call,apply,bind 的区别？

## 箭头函数的 prototype 挂载 a 属性,能否访问 a 属性？（我直接说没有 prototype）

## 你用过哪些 promise 的方法?(我以为面试官会问 promise 的方法一些实现，结果没问下去了)

## 好，接下来问下网络基础，说下 http 和 https 的区别？

## 你刚才说到 https 暗文传输更安全，那你说下你知道哪些攻击手段

## 那说下 xss 的攻击手段？防范措施？（csrf 还没聊完，面试官又说可以了...）

## 聊下跨域的方式？jsonp 的实现及缺陷？

## 看你的项目都是 vue3.0,那你说下它有哪些改进？

## 父子组件传参方式？

## 你刚才说到 Vuex?那你聊下 Vuex？Vuex 怎么实现的？（Vuex 都是用同一份 store,class 里面都是一个

## this,被面试官引导说出来它的核心思想采用单例模式)

## `this.$emit` 采用了什么设计思想？发布订阅怎么实现？

## 看你第一个项目用了 webpack，第二个项目用的 vite， 那你说下用过 webpack 或者 vite 的优化配置？（当时说了 webpack 分包，没然后了，面试官叫我针对编译速度和打包体积方面研究下）

## 你之前用 Vue2.0，为什么选用 Vue3.0

## cdn 你了解吗？怎么去优化？

## dns 你了解吗？主要干什么的？

## 输入 URL 发生了什么？

## 前端安全（CSRF、XSS、SQL 注入）

## commenjs 和 es module

## TCP、UDP TCP 如何保证可靠性

## http、https

## 栈和队列及其应用场景

## css 长度

## 解释 z-index

## 九宫格布局

## let，const 这俩的区别

## promise .then 值穿透

## 0.1 + 0.2 !=0.3 使用什么方法使其相等

## Vue 生命周期

## Vue 通信方式

## computed 缓存怎么实现的

## 插槽怎么实现的

## 写一下垂直居中的方案，尽可能多的写。（就写了三种）

## 浏览器缓存有哪些？（强缓存和协商缓存），又追问了具体字段有哪些？协商缓存的两对字段分别是什么？Etags 是什么？

## 骨架屏有什么用？

## 你的项目存在哪些安全隐患？（说了客户端和服务端不同步，会导致订单价格不一致）

## 场景提：5 点抢红包，如果客户端和服务端时间不一致，怎么办？（说了把客户端的时间发送给服务端，以服务端的时间为准），面试官说对

## js 渲染结合进程和线程

## es6 的新特性

## set map 的区别

## let var const

## 数据类型

## 数据类型的内存

## 一个全局变量，一个闭包里的变量在内存中如何存储

## 闭包的垃圾回收机制(回答错了)

## 两个有序数组排序

## 简化路径 <https://leetcode-cn.com/problems/simplify-path/>

## 介绍项目封装的组件，骨架屏是怎么封装的？

## vue 的 created 和 mounted 声明周期都做什么？接口请求在哪里？（都可以）

## 骨架屏组件是怎么使用的？（请求回调控制骨架屏显示和隐藏）

## 虚拟 dom 的优势？如果用原生 js 如何实现虚拟 dom 的作用？（DocumentFragment）

## http 和 tcp 关系？

## 在一条 tcp 可以发送多个 http 嘛？为什么？（可以，http2 的多路复用机制）

## 对 webpack 的了解？基本配置？loader 和 plugin 区别？

## 手写 promise.all

## 手写原生 ajax

## 用 promise 封装 ajax

## 会写 promise 底层吗？（我说会），接着问，现在可以写嘛（我说可以），他说不用了，太费时间了

## js 的基本类型？ 如何判断？(说了 typeof，instanceof，Object.ptototype.toString)

## instanceof 原理？手写一下？

## 问了状态码？

## 原型的理解

## 手写深拷贝

## xss 了解吗？如何预防

## react 了解吗，组件通信，状态管理

## webpack 自己配置过吗？大致讲讲

## style-loader 是用来干什么的

## 学习前端过程中遇到的难题

## 介绍项目，根据我讲的做一些追问

## 会 TS 吗，type 和 interface 的区别

## 用 TS 自己实现一个 Pick/Omit

## 前端缓存了解吗

## 强缓存和内容协商的本质区别

## 还有别的缓存方案吗，临时存一些数据用什么（答 cookie 或 localStorage）

## cookie 和 localStorage 的区别，分别在什么时候用

## cookie 会过期，如果 localStorage 也要实现这个应该怎么做

## ES6 有哪些新特性，提到了 Promise（给自己挖坑）

## Promise.then 里面怎么捕获异常

## 前端安全了解过哪些（答 XSS，追问怎么预防）

## for in 和 for of 区别

## for in 遍历出原型的属性怎么办（用 hasOwnProperty 检测）

## 数组去重的变型（根据给的 key 去重）

## css 中的 position 可以取哪些值（问了解过 sticky 吗 没了解

## css 中的选择优先级，权重

## box-sizing 属性

## instanceof

## 宏任务微任务看输出顺序

## 如何让一个元素脱离文档流

## computed 和 methods 的区别

## 手写防抖（问了下 reduce 会不会，不会才让我写的防抖

## 两数之和（可以使用哈希表把数字的值当成 key 然后把下标当成值）

## vue 组件传参方式，兄弟组件的传参方式

## 判断箭头函数中 this 指向，说了下箭头函数是什么

## 如果想让项目实际上线需要去做什么事情

## 怎么处理跨域的问题

## 为什么要做跨域同源政策 csrf 攻击

## csrf 攻击为什么访问 B 网站的时候可以利用用户在 A 网站的 cookieB 不是直接访问 a 的 cookiecookie 被浏览器保存，如果请求资源的 url 满足 cookie 设置的 domain 和 path，cookie 会被浏览器在请求时自动携带

## flex-grow，flex-shrink 的膨胀压缩规则

## 选择器的优先级

## echarts 两种渲染（canvas 和 svg），比较一下 canvas 和 svg 渲染的区别

## 移动端和 pc 端开发的区别移动端 js+rem 适配移动端的点击延迟，怎么解决，fastclick 库

## 图片懒加载原理

## 除了滚动监听+视口判断，你还知不知道新的判断视口的方式？intersectionObserve

## 和函数节流概念相似的 api - requestAnimationFrame

## 如果是 120hz 的高刷屏，requesAnimationFrame 的调用频率会跟着提高吗？

## 讲一下 kmp 算法

## 以 element UI 为例，说明怎样修改组件样式

## 样式权重计算

## setTimeOut（定时器线程）

## 宏任务和微任务

## 有效括号

## 给定两个整数，不使用额外空间，有几种方法交换

## 给两个杯子，一个 5 升、一个 6 升，取出 3 升水

## 有十个箱子，其中一个较轻，用最少比较次数找出较轻的那个箱子

## 对 vite 的理解

## object 和其它数据类型的区别

## 类型判断

## 讲一讲原型和原型链

## null 和 undefined

## 讲一下 new 的过程

## 讲一下 this

## promise 讲一下

## async 和 await 的原理

## 错误捕获的方法

## 对象的解构

## url 输入之后发送了什么

## etag 和 Last-Modified

## 讲一下强缓存

## 如果缓存成功则 304，如果缓存失败则 200

## 父子组件生命周期

## 常见指令

## v-show 和 v-if

## 怎么理解单向数据流

## filter

## computed，watch 的区别

## 讲一下响应式原理

## 响应式原理

## 重复的 DNA 序列 <https://leetcode-cn.com/problems/repeated-dna-sequences/>

## 移动端适配布局

## rem

## es6 新特性

## js 数组筛选遍历操作

## js 常见数据类型

## 原型链 原型对象 对象原形（object.prototype 那个属性类型也有）

## 场景题“解决数组转换的多种方法”

## 为什么学习前端？ 你觉得学习前端最大成就？

## node 对接一些问题

## 跨域 产生原因 解决方法

## 闭包（闭包原理，应用场景）

## 问项目实现逻辑 功能 对接遇到的问题

## 项目有什么难解决的问题 怎么解决的

## 常用 git 命令

## git rebase 和 git merge 区别

## git reset

## 让一个元素在可视范围消失的方法有那些

## 元素垂直水平居中

## flex 布局，实现三栏布局

## 伪元素和伪类

## JS 基本数据类型和引用数据类型

## JS 数组常用方法有那些，哪些会改变原数组

## 简单算法:版本号比较大小

## 简单算法:按层遍历二叉树

## vue2 和 vue3 双向数据绑定

## vue 从初始化到挂载发生了什么（不太清楚面试官想问啥，回答了浏览器渲染流程，应该是问虚拟 dom 之类的）

## 浏览器缓存机制

## 如果资源标识还有效，但不想用缓存怎么办。（说请求的时候把 etag 改了），追问如果请求的是图片没有头部呢？

## vue 事件机制（说了 vue 封装了一个类，里面有 on，emit，off，once 方法巴拉巴拉）

## js 事件流（事件代理优缺点）

## 说一下防抖和节流，手写防抖函数（秒）

## 重绘和回流以及怎样减少回流等（说了减少 dom 操作，使用 css3 动画——浏览器会产生一个复合涂层，不会影响文档流）

## 追问除了动画还有哪些会在浏览器新建复合图层（设置透明度，过度动画等）

## vuex 及适用范围

## 你怎么理解前端的

## js 和 c 的区别（c 早忘了，胡乱说了一通）

## http 请求方法

## http 和 https（说了大概的 ssl 握手和混合加密过程）

## ca 证书放在哪里的（蒙，我说找机构请求的）

## 闭包及用途

## 原型链及用途

## http 版本（1.0,2.0，说了 2.0 的服务器推送和压缩头部，多路复用）

## 输入 url 的到页面展示的过程（dns 解析巴拉巴拉）

## 渲染过程（dom 树=>cssom 树=>render 树….）

## js 异步(settimeout,js 事件， 网络请求（傻了没想到）)

## 追问如果渲染的时候遇到有发送请求的 js 文件怎么办（说了事件循环机制-蒙混过关，不太了解浏览器渲染机制）

## 求斐波那契数列

## 发起两个请求，a 请求的结果用作 b 请求的参数（秒）

## get 和 post 区别（缓存，长度限制，无害性）

## 跨域及解决方案（jsonp，代理，cors（开始忘了，最后才补上，本来还想再说一下 cors 实现，面试官没继续问了））

## 说一下对 promise 的理解

## 如何判断一个对象是不是 promise 实例

## 介绍 promise.all，promise.race

## 手写异步并行控制

## 介绍 js 事件循环机制（微任务宏任务）

## v-if 和 v-show 区别

## diff 算法

## diff 算法缺陷

## keep-alive 是什么，怎么实现的

## vue 数据双向绑定原理

## 手写发布订阅模式

## 微信小程序和 h5 的区别

## tcp 和 http 关系

## http 一条通道能不能发送多个请求

## 手写代码：对象展开

## js 事件循环机制

## 讲讲 Vuex 理解 ==》为什么项目中用 Vuex ，不用会怎么样 ==》解决了什么问题 ==》组件通讯

## Vue 生命周期（详细底层）

## http code 100 200 301 302 304 400 ==> 304 协商缓存

## 性能优化了解多少，项目中用了哪些

## 讲讲 webpack 的理解

## webpack 用的 loader plugin ，有写过来解决一些特别困难的问题吗？

## webpack 性能优化 ==》 分包策略讲讲

## position

## 线程、进程

## 网络的三次握手

## flex 布局

## js 判断数组的所有方法

## react 介绍 jsx

## state 同步还是异步？

## react 生命周期

## 401 代表什么

## 登录怎么实现

## cookie 适用场景

## cookie 和 localStorage 的区别

## js 循环遍历的方法

## foreach 和 map 的区别

## 怎么实现 reduce

## 回文数字

## 前端框架为什么能流行？（我自己用的 vue,说了一下优点）

## http 的请求方法（post，put,get,delete,patch,我说了这几个）

## 进程和线程？

## https 建立的过程？

## 从输入 url 到浏览器显示页面发生了什么？

## js 数组

## promise 方法加三种状态

## 问了 HTTPS 对 HTTP 做了哪些改进

## HTTPS 的加密是怎么完成的

## 线程读取同一块内存怎么解决冲突的

## 死锁是什么

## 浏览器的事件循环机制

## 为什么要分宏任务和微任务

## 手撕 instanceOf

## 手撕对象深拷贝

## display：block、inlineblock、 inline 三者的区别

## css 实现画一条 0.5px 的线

## let const var 三者的区别

## const 定义一个对象 里面的属性可以修改么

## http 的状态码有哪些

## 跨域是什么 如何解决

## 实现三栏布局

## 实现一个深拷贝

## csrf 和 xss

## 实现观察者模式

## 实现一个防抖

## 防抖和节流

## 实现快速排序

## websocket 的过程是什么、在（网络层面）了解过么

## OSI 7 层模型

## DNS 请求报文协议头字段有哪些

## tcp、udp 有哪些区别

## DNS 劫持了解过么

## 线程、进程、线程同步（只考虑网络层次）

## 堆和栈（内存）

## 性能优化你会优先关注哪些

## Webpack Plugin

## 前端哪个方向你更加感兴趣

## ANSI、Unicode、UTF-8

## Promise 解决了什么问题？

## 为什么需要 class，相比于 fuction 的有什么改进之处？

## class 的实现

## koa 和 express 的区别？

## 介绍下洋葱模型？这种模型的优势在什么？

## eventloop 事件循环解释一下？

## 手写一道编程题：涉及柯里化闭包之类的

## 判断数组是不是数组的方法

## 浅拷贝深拷贝解释一下

## instanceof typeof 区别？intanceof 的实现原理简单说一下

## var let const 区别

## vue 双向数据绑定原理

## v-if v-show 的区别

## 是否了解 react？

## http https 区别？

## https 加密过程

## EventLoop

## Promise

## 垂直居中方式

## 跨域和解决方案

## 浏览器输入一个 URL

## 为什么 JS 是单线程的

## TS 解决了什么问题

## 对 Java 的看法，前后端的理解

## Vue 的数据驱动和响应式原理，我项目里是怎么简单运用的。MVP 框架是怎么弄的？为什么中间要中转一次？

## 浏览器输入 URL 到页面渲染，涉及到哪些事情？

## TCP 的三次握手和四次挥手？为什么要三次和四次？OSI7 层协议有哪些？HTTP 是哪一层协议？

## 链表和数组的区别？各自应用场景？

## 进程和线程的区别？Chrome 中打开一个 Tab 是进程还是线程？

## CSS 的盒模型？content-box 和 border-box 的区别？

## 事件轮询机制，哪些是微任务？Promise 的哪些 API 经常使用？Promise.all 的使用，手写 Promise.all

## Vue 的生命周期？DOM 渲染是在哪个生命周期？

## 有个数组 X（每个数都大于 0），要计算出前缀和数组与后缀和数组中相同值的个数

## 深拷贝如何解决循环引用问题

## 谈谈对 vue 渐进式的理解

## webpack 打包优化

## 浏览器为什么不允许跨域

## 强缓存 协商缓存 怎么配置资源的缓存规则

## vue data 为什么是函数不是对象

## setTimeout 的 this 指向

## 改变 this 指向

## vue 按需引入

## 项目优化

## cookie 和 token 的区别

## vue-router hash history

## vue 事件代理 绑定事件是操作原生 DOM 吗

## SSL 握手 对称 非对称加密

## websocket 原理

## 口述实现 promise A+规范

## promise.all 原理

## 实现 0 延迟的防抖

## 红黑树原理

## 动态规划 原理 最优子规划

## prototype 和 `__proto__`

## for in 和 for of

## axios 方法，怎么用，流程

## cookie 用法，参数

## js 去重有哪些方法

## 二叉树遍历有哪些

## 判断链表有环的方法

## 链表和数组的区别

## 为啥引用类型需要用栈和堆 基本类型只需要栈

## 301, 302 有什么区别

## webpack，除了 gzip 还有哪些压缩格式，配过 tree-shaking 吗

## vue2 和 vue3 响应式差别

## 实现一个双向绑定，实现 render，proxy 实现 v-model

## 如何优化，对 CDN 了解多少

## 浏览器输入 url 之后发生了什么，缓存（请求头 cach-control 和 etag 区别），cdn 在哪一步

## css 会不会阻塞页面加载，css 动画会不会阻塞，animation

## js 异步，轮询机制（宏任务，微任务）

## 跨域，nginx 哪一个环节解决

## vue 踩过哪些坑：我答的响应式，用`$set`；还可以答 css 污染，加 scope；data 要 return 一个函数，只能组件内部用；watch 可以设置 deep，immediate；处理 dom，放在 nextTick

## vue-router 路由跳转，几种模式（hash，history）,自己实现路由跳转（点击 url 更新页面，可以服务器渲染）

## 节流，有几种，发送请求还没有结束下一个就来了

## 几种盒模型。假设宽度 100px，padding 100px，整体宽度多少

## webpack 压缩时，主要压缩了什么？

## 将图片转换为 base64 编码和不转换有啥区别吗？

## base64 如何编码，为啥非要叫 base64，不叫 63？

## 除了 base64，图片还可以转换为那种形式的编码，然后直接引入？

## gzip 如何编码？

## 实现 es6 的 Set

## 实现哈希表

## 滚动条的百分比怎么获取

## 数据类型有哪些

## 数据类型判断方法，写几个

## new 的过程

## 数组方法有哪些，写几个

## 构造函数 this 指向，箭头函数 this 指向

## ==怎么判断的

## 原型链

## call 的参数和返回值

## 虚拟 DOM 和真实 DOM、Diff 算法

## SessionStorage 和 localStorage 区别

## JS 数据基本类型（后续新增 Symbol，Bigint 的了解）

## 判断数据类型、为什么写 Object.prototype.toString.call()

## Call、apply、bind 区别，会返回什么

## 节流和防抖

## 继承

## 垂直水平居中

## position 的值

## 七层网络模型

## 传输层协议

## TCP 和 UDP 区别

## JS 的线程（分支线程做什么）

## JS 的同步操作和异步操作与线程之间的联系

## 排序以及时间复杂度

## JS 基本数据类型，Symbol 是引用类型还是基本类型

## v-model 原理

## get 和 post 区别

## prototype 和`__proto__`

## 递归写深拷贝

## reduce 实现 map

## 力扣 54-螺旋矩阵

## http, http2, https 区别

## content-type 的类型，form-data 可以传对象吗？

## 说一下 webpack 的 plugin 是什么？（说了下底层）

## 状态码 301 和 302 区别？

## 说一下 common.js 和 es6 module 区别？

## 做过哪些方面的性能优化？

## 提一个场景，如果金融系统用定时器每隔一秒钟用 promise 发请求，会出现什么问题（存在的隐患）？

## 一个容器里只有一个元素，怎么让它右对齐？（浮动、绝对定位、flex）

## flex：1 表示什么？

## 知道栅格布局吗？原理是什么？

## Event 监听事件里 target 和 currentTarget 什么区别？

## 数据类型检测的方式？（typeof、instanceof、Object.prototype.toString.call）

## instanceof 实现机制

## promise.all 和 promise.race 的区别和使用场景

## 如果 promise 的 then 后面返回一个 new promise，那么整体继续 then 后面返回的是 promise 对象还是 resolve 的值？

## 箭头函数有什么特点？

## 写过 React 吗？里面箭头函数有个应用场景（没写过……）好，那不问了 😅

## vue 中的 router 有哪两种类型？（hash、history）区别是什么？

## computed 和 watch 的使用场景？

## vue 里 style 标签添加 scoped 属性是干嘛的

## 提到了 gzip，它具体是如何操作的

## 提到了 cdn 除了缓存还有什么功能，“距离用户最近”它是怎么判断的

## event loop

## csrf 如何产生如何处理

## 排序算法

## Js 闭包问题 es6 数据私有化

## Tcp 三次握手 四次挥手 问的也很深入

## 请问 html 他的块元素与行内元素有哪些 他们的区别是什么

## h5 新增了哪些表单控件

## css 如何实现 5px 的线

## css 如何区分 visibility：hidden，display：none

## 说说回流和重绘

## 说说 vue 当中是如何实现减少回流的

## 虚拟 dom

## 讲讲 vue 的生命周期

## vue 父子组件周期

## vue 父子组件通信

## js 类型转换显式隐式

## 讲讲 mvvm

## css 哪些属性是可以继承的

## 给你十万条表格信息你怎么去渲染（使用懒加载，虚拟 dom，虚拟滚动，服务端渲染，分页）

## http 协议了解过吗？

## 请求有哪些？

## get post 区别

## HTTP 状态码有哪些？

## 401 代表的啥

## flex 布局了解吗？一些属性

## flex-basis 和直接设置元素的外框高哪个优先级高

## http 和 https 具体的差异？为什么现在都用 https ？

## https 是怎么加密的？简述以下加密过程

## http1.x 和 http2.0 有什么区别？

## 介绍一下你的项目，做了哪些优化？

## 前端优化方案说一下（balabala，提到了浏览器缓存）

## 说一下浏览器缓存吧，字段有哪些。。。。if-Modified-since 是哪个缓存？（主要说了下强缓存和协商缓存）

## 你刚才说的 script 延迟执行怎么优化性能？（说了 html 是边解析边渲染的）

## 说一下懒加载是怎么实现的？

## 说一下移动端适配方案？（说了下 px，em，rem，vw, vh）

## 知道媒体查询？ （ balabalabala。。。）

## 说一下 css 动画有哪些？（说了 animation 和 transform），又追问让一个元素从左到右滑动怎么实现？

## 说一下 transiton 和 left 区别？（我就说了 transition 会触发 GPU 加速）

## 说一下 js 的数据类型有哪些？symbol 是什么？

## null == undefined 结果？为什么？

## 给你一个数组下标，说出删除数组中这个下标元素的方法，尽可能多的说？

## 介绍一下生成器函数和 async await 区别？

## 手写 Promise.all（本来问的是 promise.allsettled,我说这个 api 不太清楚，就让我说 all 了）

## 前端路由（hash 和 history 路由）（将 hash 模式直接转换成 history，会有什么问题）

## 前端跨域

## 最简单的二分查找（什么时候 while 那里不需要写 等号）

## 从 url 输入到页面渲染（越详细越好）

## 三次握手和四次挥手

## DNS 解析（迭代查询和递归查询）

## 两次握手会有什么问题

## 盒子模型（标准和 IE）

## vue3 生命周期都完成了什么

## 在项目中用到了哪些新特性（Vue3）

## jwt 的详细介绍（优缺点）

## 节流和防抖的原理

## 反向代理原理（后面又问了正向代理有哪些）

## 反向代理的流量转发

## koa、express 中间件

## 怎么去记录中间件执行的时间

## axios 怎么增加 headers 字段（有几种方法）

## axios 链式调用的写法是怎么实现的

## http1.1 与 http2.0 的区别

## http2 的多路复用解决了什么问题

## ES module、commonjs 的区别（还有一些其他模块）

## webpack 基本原理

## babel 的基本原理

## nodejs 中 require 一个模块他是怎么定位的

## v-if v-for 区别

## 组件之间怎么触发事件

## 双向绑定，动态渲染

## vue 生命周期的理解

## vue 项目怎么与后端交互

## 项目中 axios 响应拦截器与请求拦截器

## token 是做什么的

## http 常见的状态码 问的很详细 404 403 503 还给我讲了具体的场景

## get, post 区别

## vue 响应式 vue3 proxy 与 vue2 对比一下

## 项目怎么优化？

## 精灵图的原理？

## 精灵图有哪些优缺点？

## HTTP/2.0 有哪些新特性？

## 头部压缩用的什么算法？

## HPACK 的原理？

## 多路复用解决了什么问题？

## 说一下强缓存和协商缓存

## 说说对打包工具的理解

## loader 和 plugin 的区别？

## 组件延迟加载的原理？

## ESM 和 CommonJS 的区别？

## Vue 组件通信的方式有哪些？

## 兄弟组件之间如何通信？

## Vue3 和 Vue2 的区别？

## 哪些情况下 Vue2 的无法检测数据变化？如何解决？

## 生命周期钩子有哪些？

## 哪些钩子中可以获取到 DOM 节点？

## nextTick 有哪些使用场景？

## 计算属性和侦听器的区别？

## JS 的数据类型有哪些？

## 判断数据类型的方法有哪些？

## 浅拷贝和深拷贝的区别？

## 实现深拷贝

## 说说对 this 的理解

## 什么是原型链？

## 原型链的终点是什么？

## 什么是外边距塌陷？如何解决？

## [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

## [两数之和](https://leetcode-cn.com/problems/two-sum/)

## 说一下 Vue 生命周期，每个步骤发生了什么，越详细越好

## Vue 组件通信的方式有哪些

## 在实际项目中，组件通信有哪些注意点？

## 计算属性和侦听器的区别

## v-if 和 v-for 的优先级？为什么不建议在同一元素上使用？

## 说一下事件循环

## Vue 源码中有哪些用到了事件循环的地方？

## 智力题：有一个 7 升的杯子和一个 4 升的杯子，如何盛出 5 升水？

## [二分查找](https://leetcode-cn.com/problems/binary-search/)

## nextTick() 为什么会存在及其实现原理

![img](../public/924DEBF98CC9513D.png)

## 浏览器内核

> IE: trident 内核
> Firefox：gecko 内核
> Safari: webkit 内核
> Opera: 以前是 presto 内核，Opera 现已改用 GoogleChrome 的 Blink 内核
> Chrome: Blink(基于 webkit，Google 与 Opera Software 共同开发)

## 你是怎么理解 HTML 语义化

HTML 语义化简单来说就是用正确的标签来做正确的事。
比如表示段落用 p 标签、表示标题用 h1-h6 标签、表示文章就用 article 等。

## DOCTYPE 的作用

> [Doctype 作用？严格模式与混杂模式如何区分？它们有何差异？](https://www.cnblogs.com/wuqiutong/p/5986191.html)

1. `<!DOCTYPE>` 声明位于文档中的最前面，处于 `<html>` 标签之前。告知浏览器以何种模式来渲染文档。

2. 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。
3. 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站 点无法工作。
4. DOCTYPE 不存在或格式不正确会导致文档以混杂模式呈现。复制代码 你知道多少种 Doctype 文档类型？ 该标签可声明三种 DTD
   类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。 HTML 4.01 规定了三种文档类型：Strict、Transitional 以及
   Frameset。 XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。 Standards
   （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks （包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。

## 行内元素、块级元素、 空元素有那些？

- 行内元素 (不能设置宽高，设置宽高无效) a,span,i,em,strong,label
- 行内块元素：img, input
- 块元素： div, p, h1-h6, ul,li,ol,dl,table...
- 知名的空元素 br, hr,img, input,link,meta

可以通过 display 修改 `inline-block`, `block`, `inline`

注意: 只有文字才能组成段落，因此 `p` 标签里面不能放块级元素，特别是 `p` 标签不能放 `div`。同理还有这些标签`h1,h2,h3,h4,h5,h6,dt`
，他们都是文字类块级标签，里面不能放其他块级元素。

## **meta viewport** **是做什么用的，怎么写**

使用目的

告诉浏览器，用户在移动端时如何缩放页面

```html
<meta
  name="viewport"
  content="width=device-width, 
               initial-scale=1, 
               maximum-scale-1, minimum-scale=1"
/>
```

`with=device-width` 将布局视窗（layout viewport）的宽度设置为设备屏幕分辨率的宽度

`initial-scale=1` 页面初始缩放比例为屏幕分辨率的宽度

`maximum-scale=1` 指定用户能够放大的最大比例

`minimum-scale=1` 指定用户能够缩小的最大比例

## **label** **标签的作用**

label 标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
<label for="Name">Number:</label>
<input type="text" name="Name" id="Name" />

<label
  >Date:
  <input type="text" name="B" />
</label>
```

## **canvas** **在标签上设置宽高 和在** **style** **中设置宽高有什么** **区别**

> canvas 标签的 width 和 height 是画布实际宽度和高度，绘制的图形都是在这个上面。
> 而 style 的 width 和 height 是 canvas 在浏览器中被渲染的高度和宽度。
> 如果 canvas 的 width 和 height 没指定或值不正确，就被设置成默认值 。

## html5 新特性

> [HTML5 新特性](https://zhuanlan.zhihu.com/p/77131734)

## css3 新特性

> [CSS3 有哪些新特性？CSS3 新特性详解](https://zhuanlan.zhihu.com/p/136700705)

## css 选择器

## margin 合并

在垂直方向上的两个盒子，他们的 margin 会发生合并（会取最大的值），比如上边盒子设置`margin-bottom:20px`
，下边盒子设置`margin-top:30px;`，那么两个盒子间的间距只有`30px`，不会是`50px`

解决 margin 合并，我们可以给其中一个盒子套上一个父盒子，给父盒子设置 BFC

## margin 塌陷

效果： 一个父盒子中有一个子盒子，我们给子盒子设置`margin-top:xxpx`
结果发现会带着父盒子一起移动（就效果和父盒子设置`margin-top:xxpx`的效果一样）

解决： 1、给父盒子设置 border，例如设置`border:1px solid red;` 2、给父盒子设置 BFC

## flex

> 设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效

## 什么是 rem、px、em 区别

> rem 是一个相对单位，**rem 的是相对于 html 元素的字体大小**，**没有继承性**
>
> em 是一个相对单位，**是相对于父元素字体大小有继承性**
>
> px 是一个“绝对单位”，**就是 css 中定义的像素**，利用 px 设置字体大小及元素的宽高等，比较稳定和精确。

## 响应式布局

**响应式布局有哪些实现方式？什么是响应式设计？响应式设计的基本原理是什么？**

> 1.百分比布局，但是无法对字体，边框等比例缩放
>
> 2.弹性盒子布局 display:flex
>
> 3.rem 布局，1rem=html 的 font-size 值的大小
>
> 4.css3 媒体查询 @media screen and(max-width: 750px){}
>
> 5.vw+vh
>
> 6.使用一些框架（bootstrap，vant）
>
> 什么是响应式设计：响应式网站设计是一个网站能够兼容多个终端，智能地根据不同设备环境进行相对应的布局
>
> 响应式设计的基本原理：基本原理是通过媒体查询检测不同的设备屏幕尺寸设置不同的 css 样式 页面头部必须有 meta 声明的

## 布局

- 两栏布局,左边定宽，右边自适应
- 三栏布局、圣杯布局、双飞翼布局

## 水平垂直居中

方法一：给父元素设置成弹性盒子，子元素横向居中，纵向居中

方法二：父相子绝后，子部分向上移动本身宽度和高度的一半，也可以用 transfrom:translate(-50%,-50%)（最常用方法）

方法三：父相子绝，子元素所有定位为 0，margin 设置 auto 自适应

## **iframe** **有哪些缺点？**

iframe 是一种框架，也是一种很常见的网页嵌入方

**iframe 的优点：**

1. iframe 能够原封不动的把嵌入的网页展现出来。
2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。

**iframe 的缺点：**

1. 会产生很多页面，不容易管理。
2. iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
3. 代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe
   会不利于搜索引擎优化。
4. 很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。
5. iframe 框架页面会增加服务器的 http 请求，对于大型网站是不可取的。现在基本上都是用 Ajax 来代替 iframe，所以 iframe
   已经渐渐的退出了前端开发。

## **link @import** **导入** **css**

> link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；
> @import 属于 CSS 范畴， 只能加载 CSS。
> link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。link
> 无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
> link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。

## DOM 事件机制/模型

> DOM0 级模型、IE 事件模型、DOM2 级事件模型

就比如用户触发一个点击事件，有一个触发的过程

事件捕获-阶段（从上大小，从外到内）--->处于目标事件-阶段---->事件冒泡-阶段（从下到上，从内到外）

```js
window.addEventListener(
  "click",
  function (event) {
    event = event || window.event /*ie*/;
    const target = event.target || event.srcElement; /*ie*/ // 拿到事件目标

    // 阻止冒泡
    // event.stopPropagation()
    // event.cancelBubble=true; // ie

    // 阻止默认事件
    // event.preventDefault();
    // event.returnValue=false; // ie
  },
  /* 是否使用捕获，默认是fasle, */ fasle
);
```

![事件传播.jpeg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44f3f89d86344aacb901cd841620bbff~tplv-k3u1fbpfcp-watermark.awebp?)

## 事件委托

简介：事件委托指的是，不在事件的发生地（直接 dom）上设置监听函数，而是

在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的

触发，通过判断事件发生元素 DOM 的类型，来做出不同的响应。

举例：最经典的就是 ul 和 li 标签的事件监听，比如我们在添加事件时候，采用

事件委托机制，不会在 li 标签上直接添加，而是在 ul 父元素上添加。

好处：比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事

件触发机制

## 如果需要手动写动画，你认为最小时间间隔是多久

> 多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 `1/60＊1000ms = 16.7ms`

## ::before 和:after 中双冒号和单冒号有什么区别

单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。 ::before 就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于
dom 之中，只存在在页面之中。 :before 和 :after 这两个伪元素，是在 CSS2.1 里新出现的。起初，伪元素的前缀使用的是单 冒号语法，但随着
Web 的进化，在 CSS3 的规范里，伪元素的语法被修改成使用双冒号，成 为::before ::after

## CSS sprites 精灵图

CSS Sprites 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS
的 `“background-image”，“ background-repeat ”，“ background-position”` 的 组 合 进 行 背 景 定 位 ， background-position
可以用数字能精确的定位出背景图片的位置。这样可以减少很多图片请 求的开销，因为请求耗时比较长；请求虽然可以并发，但是也有限制，一般浏览器都是
6 个

## 重排和重绘

重绘（repaint 或 redraw）：当盒子的位置、大小以及其他属性，例如颜色、字 体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将
内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为，浏览器 会根据元素的新属性重新绘制，使元素呈现新的外观。
触发重绘的条件：改变元素外观属性。如：color，background-color 等。 注意：table
及其内部元素可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用 table
布局页面的 原因之一。
重排（重构/回流/reflow）：当渲染树中的一部分(或全部)因为元素的规模尺寸， 布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)
。每个页面至少需要 一次回流，就是在页面第一次加载的时候。
重绘和重排的关系：在回流的时候，浏览器会使渲染树中受到影响的部分失效， 并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕
中，该过程称为重绘。所以，重排必定会引发重绘，但重绘不一定会引发重排。

## js 数据类型

## js 的基本数据类型和复杂数据类型的区别（在堆和栈中，赋值时的不同,一个拷贝值一个拷贝地址）

## 基本类型和引用类型在内存上存储的区别

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89b70c934a0f436d90364287d706971a~tplv-k3u1fbpfcp-zoom-1.image)

## null 与 undefined 的异同

**相同点：**

- Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null

**不同点：**

- null 转换成数字是 0, undefined 转换数字是`NaN`

- undefined 代表的含义是未定义， null 代表的含义是空对象。

- typeof null 返回'object'，typeof undefined 返回'undefined'

- ```js
  null == undefined; // true
  null === undefined; // false
  ```

- 其实 null 不是对象，虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32
  位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object
  。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 说说 JavaScript 中判断数据类型的几种方法

typeof

- `typeof`一般用来判断基本数据类型，**除了判断 null 会输出"object"，其它都是正确的**
- `typeof`判断引用数据类型时，**除了判断函数会输出"function",其它都是输出"object"**

instanceof

> Instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的`prototype`属性是否在某个实例对象的原型链上， 不能判断基本数据类型

```js
// instanceof 的实现
function instanceofOper(left, right) {
  const prototype = right.prototype;
  while (left) {
    if ((left = left.__proto__) === prototype) {
      return true;
    }
  }
  return false;
}
// let obj  = {}
// Object.getPrototypeOf(obj) === obj.__proto__ ==> true
```

```js
// 实现 instanceof 2
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true; //找到相同原型对象，返回true
    proto = Object.getPrototypeof(proto);
  }
}
```

**Object.prototype.toString.call()** 返回 `[object Xxxx]` 都能判断

## 深拷贝和浅拷贝

```js
let obj = { b: "xxx" };
let arr = [{ a: "ss" }, obj, 333];

// 赋值
let arr2 = arr;
// 浅拷贝-只拷贝了一层，深层次的引用还是存在
// Object.assign(), ...扩展运算符，slice等
let arr2 = arr.slice();
let arr2 = [...arr];
obj.b = "222"; // arr2[1].b => 222
// arr[2] = 4444 ==> arr2[2] ===> 333

// 深拷贝
// 1. 最简单的，JSON.stringify，但这个有问题，看下面有说明
let arr2 = JSON.parse(JSON.stringify(arr));

// 2. 自己封装，要递归处理
```

实现深拷贝-简单版

```js
export function deepClone(obj, map = new Map()) {
  if (!obj && typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  if (map.get(obj)) {
    //  如果有循环引用、就返回这个对象
    return map.get(obj);
  }

  const cloneObj = obj.constructor(); // 数组的就是[],对象就是{}

  map.set(obj, cloneObj); // 缓存对象，用于循环引用的情况

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }

  return cloneObj;
}
```

## `JSON.stringify` 问题

1. 如果有循环引用就报错

   ![img](https://img-blog.csdnimg.cn/c224a6d165a14d969c014170533c13dd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemjpmL_po54=,size_20,color_FFFFFF,t_70,g_se,x_16)

2. `Symbol`、`function`、`undefined`会丢失

3. `布尔值`、`数字`、`字符串`的包装对象会转换成原始值

4. `NaN`、`Infinity` 变成 `null`

5. `Date`类型的日期会变成字符串

6. `RegExp`、`Error`被转换成了空对象 `{}`

![img](https://img-blog.csdnimg.cn/53927bb12f094d69b84298c445e4d088.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemjpmL_po54=,size_20,color_FFFFFF,t_70,g_se,x_16)

## 模块化

- `commonjs`

  ```js
  // 由nodejs实现
  const fs = require("fs");
  module.exports = {};
  ```

- ESM

  ```js
  // 由es6实现
  import $ from "jquery";
  export default $;
  ```

- AMD（异步加载模块）

  ```js
  // 由RequireJS实现
  define(["juqery", "vue"], function ($, Vue) {
    // 依赖必须一开始就写好
    $("#app");
    new Vue({});
  });
  ```

- CMD

  ```js
  // 由SeaJS 实现
  define(function (require, exports, module) {
    var a = require("./a");
    a.doSomething();
    // ....
    var b = require("./b"); // 依赖可以就近书写
    b.doSomething();
    // ...
  });
  ```

- UMD (通用加载模块)

  ```js
  (function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define(factory)
      : ((global = global || self), (global.Vue = factory()));
  })(this, function () {
    "use strict";
  });
  ```

## AMD 和 CMD 的区别有哪些

- <https://blog.csdn.net/qq_38912819/article/details/80597101>

1. 对于依赖的模块，AMD 是**提前执行**，CMD 是**延迟执行**。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）
2. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**

## CommonJS 与 ES6 Module 的差异

**CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。**

- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`
  ，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像
  Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

**CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。**

- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
- 编译时加载: ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`
  时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

**CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6
模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。**

## JS 延迟加载的方式

JavaScript 会阻塞 DOM 的解析，因此也就会阻塞 DOM 的加载。所以有时候我们希望延迟 JS 的加载来提高页面的加载速度。

- 把 JS 放在页面的最底部
- script 标签的 defer 属性：脚本会立即下载但延迟到整个页面加载完毕再执行。该属性对于内联脚本无作用 (即没有 **「src」**
  属性的脚本）。
- Async 是在外部 JS 加载完成后，浏览器空闲时，Load 事件触发前执行，标记为 async
  的脚本并不保证按照指定他们的先后顺序执行，该属性对于内联脚本无作用 (即没有 **「src」** 属性的脚本）。
- 动态创建 script 标签，监听 dom 加载完毕再引入 js 文件

## call、apply 、bind

> call，apply, bind 都是改变 this 指向，bind 不会立即执行，会返回的是一个绑定 this 的新函数
>
> [面试官问：能否模拟实现 JS 的 call 和 apply 方法](https://juejin.cn/post/6844903728147857415)

```js
// obj.call(this指向, 参数1， 参数2)ss
// obj.apply(this指向, [参数1， 参数2])

function fn(age) {
  console.log(this, age);
}
const obj = { name: "" };
const result = fn.bind(obj); // bind会返回一个新的函数
result(20);
```

```js
// 实现一个 apply
Function.prototype.myApply = function (context) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  var res = context[fn](...arguments[1]);
  delete context[fn];
  return res;
};
```

实现一个 bind

```js
// 最终版 删除注释 详细注释版请看上文
Function.prototype.bind =
  Function.prototype.bind ||
  function bind(thisArg) {
    if (typeof this !== "function") {
      throw new TypeError(this + " must be a function");
    }
    var self = this;
    var args = [].slice.call(arguments, 1);
    var bound = function () {
      var boundArgs = [].slice.call(arguments);
      var finalArgs = args.concat(boundArgs);
      if (this instanceof bound) {
        if (self.prototype) {
          function Empty() {}
          Empty.prototype = self.prototype;
          bound.prototype = new Empty();
        }
        var result = self.apply(this, finalArgs);
        var isObject = typeof result === "object" && result !== null;
        var isFunction = typeof result === "function";
        if (isObject || isFunction) {
          return result;
        }
        return this;
      } else {
        return self.apply(thisArg, finalArgs);
      }
    };
    return bound;
  };
```

## 防抖 debounce

> debounce 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

```js
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流 throttle

> 就是指连续触发事件但是在 n 秒中只执行一次函数

```js
function throttle(fn, wait) {
  let pre = 0;
  return function (...args) {
    let now = Date.now();
    if (now - pre >= wait) {
      fn.apply(this, args);
      pre = now;
    }
  };
}
```

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数 ——《JavaScript 高级程序设计》

当函数可以记住并访问所在的词法作用域时，就产生了闭包，

即使函数是在当前词法作用域之外执行 ——《你不知道的 JavaScript》

- 闭包用途：
  1. 能够访问函数定义时所在的词法作用域(阻止其被回收)
  2. 私有化变量
  3. 模拟块级作用域
  4. 创建模块
- 闭包缺点：会导致函数的变量一直保存在内存中，过多的闭包可能会导致内存泄漏

## 原型、原型链(高频)

**原型:** 对象中固有的`__proto__`属性，该属性指向对象的`prototype`原型属性。

**原型链:**
当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是`Object.prototype`
所以这就是我们新建的对象为什么能够使用`toString()`等方法的原因。

**特点:** `JavaScript`对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

## this 指向、new 关键字

`this`对象是是执行上下文中的一个属性，它指向最后一次调用这个方法的对象，在全局函数中，`this`等于`window`
，而当函数被作为某个对象调用时，this 等于那个对象。 在实际开发中，`this`的指向可以通过四种调用模式来判断。

1. 函数调用，当一个函数不是一个对象的属性时，直接作为函数来调用时，`this`指向全局对象。
2. 方法调用，如果一个函数作为一个对象的方法来调用时，`this`指向这个对象。
3. 构造函数调用，`this`指向这个用`new`新创建的对象。
4. 第四种是 `apply 、 call 和 bind`调用模式，这三个方法都可以显示的指定调用函数的 this 指向。`apply`
   接收参数的是数组，`call`接受参数列表，`` bind`方法通过传入一个对象，返回一个`this`绑定了传入对象的新函数。这个函数的` this`指向除了使用`new `时会被改变，其他情况下都不会改变。

## new

> [面试官问：能否模拟实现 JS 的 new 操作符](https://juejin.cn/post/6844903704663949325)

1. 首先创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的`prototype`对象。
3. 让函数的`this`指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
// new 操作符的实现
function newOperator(ctor) {
  if (typeof ctor !== "function") {
    throw "newOperator function the first param must be a function";
  }
  newOperator.target = ctor;
  var newObj = Object.create(ctor.prototype);
  var argsArr = [].slice.call(arguments, 1);
  var ctorReturnResult = ctor.apply(newObj, argsArr);
  var isObject =
    typeof ctorReturnResult === "object" && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === "function";
  if (isObject || isFunction) {
    return ctorReturnResult;
  }
  return newObj;
}
```

## 作用域、作用域链、变量提升

`作用域`
负责收集和维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。(
全局作用域、函数作用域、块级作用域)。
作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是`作用域链`
。

## 继承(含 es6)、多种继承方式

```js
function Animal(name) {
  // 属性
  this.name = name || "Animal";
  // 实例方法
  this.sleep = function () {
    console.log(this.name + "正在睡觉！");
  };
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃：" + food);
};
```

（1）第一种是以`原型链的方式来实现继承`，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

```js
// 原型链继承
function Cat() {}
Cat.prototype = new Animal("小黄"); // 缺点 无法实现多继承 来自原型对象的所有属性被所有实例共享
Cat.prototype.name = "cat";
```

（2）第二种方式是使用`借用构造函数`
的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

```js
// 借用构造函数继承
function Cat() {
  Animal.call(this, "小黄");
  // 缺点 只能继承父类实例的属性和方法，不能继承原型上的属性和方法。
}
```

（3）第三种方式是`组合继承`
，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

（4）第四种方式是`原型式继承`
，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5
中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

（5）第五种方式是`寄生式继承`
，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。

```js
function createAnother(original) {
  var clone = object(original); //通过调用object函数创建一个新对象
  clone.sayHi = function () {
    //以某种方式来增强这个对象
    alert("hi");
  };
  return clone; //返回这个对象
}
```

（6）第六种方式是`寄生式组合继承`，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

```js
function extend(subClass, superClass) {
  var prototype = object(superClass.prototype); //创建对象
  prototype.constructor = subClass; //增强对象
  subClass.prototype = prototype; //指定对象
}
```

## 类型转换

大家都知道 JS 中在使用运算符号或者对比符时，会自带隐式转换，规则如下:

-、\*、/、% ：一律转换成数值后计算

+：

- 数字 + 字符串 = 字符串， 运算顺序是从左到右

- 数字 + 对象， 优先调用对象的 valueOf -> toString

- 数字 + boolean/null -> 数字

- 数字 + undefined -> NaN

- [1].toString() === '1' 内部调用 .join 方法

- {}.toString() === '[object object]'

- NaN !== NaN 、+undefined 为 NaN

## Object.is()与比较操作符`==`、`===`的区别？

- `==`会先进行类型转换再比较
- `===`比较时不会进行类型转换，类型不同则直接返回 false
- `Object.is()`在`===`基础上特别处理了`NaN`,`-0`,`+0`,保证-0 与+0 不相等，但 NaN 与 NaN 相等

## `==`操作符的强制类型转换规则

- 字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。
- 其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。
- null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。
- 对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。
- 如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。
- 如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true，否则，返回
  false。

![img](https://img-blog.csdnimg.cn/img_convert/d5175667072fe77e2182f89306bcdb77.webp?x-oss-process=image/format,png)

## ES6

1. 新增 Symbol 类型 表示独一无二的值，用来定义独一无二的对象属性名;
2. const/let 都是用来声明变量,不可重复声明，具有块级作用域。存在暂时性死区，不存在变量提升。(const 一般用于声明常量);
3. 变量的解构赋值(包含数组、对象、字符串、数字及布尔值,函数参数),剩余运算符(...rest);
4. 模板字符串(`${data}`);
5. `...`扩展运算符(数组、对象);;
6. 箭头函数;
7. Set 和 Map 数据结构;
8. Proxy/Reflect;
9. Promise;
10. async 函数;
11. Class;
12. Module 语法(import/export)。

## let/const

> `const`声明一个只读的常量。一旦声明，常量的值就不能改变 <https://es6.ruanyifeng.com/#docs/let>

var 在全局作用域中声明的变量会变成全局变量

let、const 和 var 的区别

- 不允许重复声明

- 不存在变量提升

  ```js
  // var 的情况
  console.log(foo); // 输出undefined
  var foo = 2;

  // let 的情况
  console.log(bar); // 报错ReferenceError
  let bar = 2;
  ```

- 暂时性死区（不能在未声明之前使用）

  > 注意暂时性死区和不存在变量提升不是同一个东西

  只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

  ```js
  var tmp = 123; // 声明了 tmp

  if (true) {
    tmp = "abc"; // ReferenceError
    let tmp;
  }
  ```

- 块级作用域：用 let 和 const 声明的变量，在这个块中会形成块级作用域

  **es5 只有函数作用域和全局作用域**

  IIFE `立即执行函数表达式`

  ```js
  // IIFE 写法
  (function () {
    var tmp = 1;
  })();

  // 块级作用域写法
  {
    let tmp = 1;
  }
  ```

  ```js
  // 函数声明
  function a() {}
  // 函数表达式
  const b = function () {};
  ```

## ES6 的一些叫法

- reset 参数

  ```js
  function add(...values) {
    let sum = 0;

    for (var val of values) {
      sum += val;
    }

    return sum;
  }

  add(2, 5, 3); // 10
  ```

- 扩展运算符

  ```js
  console.log(...[1, 2, 3]);
  // 1 2 3

  const b = { ...{ a: "2", b: "3" } };
  ```

- `?.` 可选链运算符

  > 左侧的对象是否为`null`或`undefined`。如果是的，就不再往下运算，而是返回`undefined`

  ```js
  a?.b;
  // 等同于
  a == null ? undefined : a.b;
  // 注意 undefined == null ==> true
  ```

- `??` Null 判断运算符

> <https://es6.ruanyifeng.com/#docs/operator#Null-%E5%88%A4%E6%96%AD%E8%BF%90%E7%AE%97%E7%AC%A6>

```js
const headerText = response.settings.headerText ?? "Hello, world!";
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
```

但左侧的为 `undefined`或者`null`是就返回右边的，否则就直接返回左边的

## 箭头函数和普通函数的区别

1. 箭头函数没有`this`，`this`是继承于当前的上下文，不能通过`call`,`apply`,`bind`去改变 this
2. 箭头函数没有自己的 `arguments` 对象，但是可以访问外围函数的 `arguments`对象
3. 不能通过`new` 关键字调用(不能作为构造函数)，同样也没有 `new.target` 和原型

## **如何解决异步回调地狱**

promise、generator、async/await

## **mouseover** **和** **mouseenter** **的区别**

mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，

冒泡的过程。对应的移除事件是 mouseout

mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是

不会冒泡，对应的移除事件是 mouseleave

## setTimeout、setInterval 和 requestAnimationFrame 之间的区别

与 setTimeout 和 setInterval 不同，requestAnimationFrame 不需要设置时间 间隔， 大多数电脑显示器的刷新频率是
60Hz，大概相当于每秒钟重绘 60 次。大多数浏 览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频
率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是 1000ms/60，约 等于 16.6ms。 RAF 采用的是系统时间间隔，不会因为前面的任务，不会影响
RAF，但是如果前 面的任务多的话，会响应 setTimeout 和 setInterval 真正运行时的时间间隔。 特点：

（1）requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次 重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。
（2）在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回 流，这当然就意味着更少的 CPU、GPU 和内存使用量
（3）requestAnimationFrame 是由浏览器专门为动画提供的 API，在运行时浏览 器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，
有效节省了 CPU 开销。

## vue

vue2 是通过`Object.defineProperty`来实现响应式的，所以就会有一些缺陷

1. 当修改一个对象的某个键值属性时，当这个键值没有在这个对象中，vue 不能做响应式处理
2. 但直接修改数组的某一项（`arr[index]='xxx'`）vue 不能做响应式处理

可用下面的解决响应式

1. Vue.set ==> this.$set(对象\数组， key 值、index， value)
2. 修改数组`length`, 调用数据的 `splice` 方法

## vue 生命周期

```text
beforeCreate 实例化之前这里能拿到this，但是还不能拿到data里面的数据
created  实例化之后
beforeMount()
mounted() $el
beforeUpdate
updated

beforeDestroy 清除定时/移除监听事件
destroyed

// 被keep-alive 包裹的
// keep-alive 标签 include exclude max
activated() {},
deactivated() {},

// 父子
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted。

// 离开页面：实例销毁 --> DOM卸载
parent  beforeDestroy
child   beforeDestroy
child   destroyed
parent  destroyed
```

## Vue 的 data 为什么是一个函数

因为 Vue 的组件可能会在很多地方使用， 会产生多个实例，如果返回的是对象的，
这些组件之间的数据是同一份（引用关系），那么修改其中一个组件的数据，另外一个组件的数据都会被修改到

## Vue key 值的作用

> [https://www.bilibili.com/video/BV1wy4y1D7JT?p=48](https://www.bilibili.com/video/BV1wy4y1D7JT?p=48)

...待更新

## Vue 双向数据绑定原理

> 下面是照抄的一段话，个人觉得这个主要看个人理解，如果看过源码理解 MVVM 这方面的，就很简单

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持

各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：

第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter

和 getter

这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化

第二步：compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，

并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通

知，更新视图

第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

1、在自身实例化时往属性订阅器(dep)里面添加自己

2、自身必须有一个 update()方法

3、待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的

回调，则功成身退。

第四步：MVVM 作为数据绑定的入口，整合 Observer、

Compile 和 Watcher 三者，通过 Observer

来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起

Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数

据 model 变更的双向绑定效果。

所以也可以根据这个来说明为什么 给`Vue`对象不存在的属性设置值的时候不生效，直接修改数组的`index`不生效

Vue 提供了 `Vue.set(对象|数组, key|index, 值)`修改触发响应式，重新数组的原型方法实现响应式

## Vue extend 和 mixins

vue extend 和 mixins 的区别， mixins 里面的 函数和本身的函数重名了使用哪一个，mixins 里面的生命周期和本身的生命周期哪一个先执行

## 动态组件

```js
// component 动态组件，通过is设置要显示的组件
<component is="UserInfo" >
```

## 递归组件

就是给组件设置`name`，之后就可以在当前组件去递归使用组件

## Vue 组件间的传值的几种方式

```text
// Vue组件间的传值的几种方式
1. props/emit
2. $attrs/$listeners // $attrs 除了父级作用域 props、class、style 之外的属性
// $listeners 父组件里面的所有的监听方法
3. $refs/$parent/$children/$root/
4. vuex
5. 事件总线，通过new Vue去实现 / mitt <==> vue3
6. provide/inject
    // 父组件
    props: {},
    provide() {
        name: this.name,
        user: this.user
    }
    // 子组件
    props: {},
    inject: ['user']
7. 本地存储、全局变量
```

## watch、mixins、组件顺序、组件配置

```js
export default {
  name: "MyComponentName",
  mixins: [tableMixin],
  components: {},
  inject: ["xxx"],
  // props: ['value', 'visible'],
  props: {
    id: String,
    type: {
      // required: true,
      type: String,
      default: "warning",
      validator(val) {
        return ["primary", "warning", "danger", "success", "info"].includes(
          val
        );
      },
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: "张三",
      user: { name: "张三", age: 18 },
      loading: true,

      // vue2
      obj: {
        name: "李四~",
      },
      // vue2 会进行深度合并
      // obj  {"name":"李四~","age":19}

      // vue3 { name: "李四~" }
    };
  },
  // provide 不支持响应式，想支持响应式的话我们要传对象
  provide() {
    return {
      userName: this.name,
      user: this.user,
    };
  },
  computed: {
    // fullName() {
    //   return 'xxxxx'
    // }
    fullName: {
      get() {
        return this.$store.state.userName;
        // return '李四'
      },
      set(val) {
        this.$store.commit("SET_NAME", val);
      },
    },
  },

  watch: {
    // name(value) {
    //   this.handlerName()
    // }
    // name: {
    //   immediate: true,
    //   deep: true, //
    //   handler(val, oldValue) {
    //     this.handlerName()
    //   },
    // },
    // this.obj.name = 'xxxx' 这样不会执行
    // this.obj = {name: 'xxx'} 这样才会执行
    // obj(value) {
    //   console.log(' value: ', value)
    // }
    //  和上面等价
    // obj: {
    //   handler(value) {
    //     console.log(" value: ", value)
    //   },
    // },
    // this.obj.name = 'xxxx' 这样去修改也能监听
    // obj: {
    //   deep: true, // 深度监听
    //   immediate: true, // 第一次就用执行这个方法，可以理解为在 created 的时候会执行 handler
    //   handler(value) {
    //     console.log(" value: ", value)
    //   },
    // },
    //
    // obj: {
    //   deep: true, // 深度监听
    //   immediate: true, // 第一次就用执行这个方法，可以理解为在 created 的时候会执行 handler
    //   handler: 'handlerName',
    // },
    // ==》
    // obj: 'handlerName'
    // '$route.path': {},
    // 'obj.a' : {}
  },

  beforeCreate() {
    console.log("this", this);
  },
  mounted() {
    // this.handlerName()
    this.fullName = "xxxx";

    //  this.fullName '李四'
  },

  methods: {
    handlerName() {
      this.obj.name = "xxxx";
    },
  },
};
```

## 指令

常用指令

- `v-show` `dispaly none` 的切换

- `v-if`/`v-else`

- `v-html`

- `v-text`

- `v-for` (vue2 `v-for`比`v-if`优先级高，vu3`v-if`优先级比`v-for`高 )

- `v-cloak` `[v-cloak] {dispaly:none}`

- `v-once` 静态内容

- `v-bind`=> `:` `v-on` => `@`

  ```html
  <!--- 可以直接 v-bind="object" v-on="object" -->
  <Child v-bind="$attrs" v-on="$listeners"></Child>
  ```

- v-model

  ```html
  <el-input v-model="keyword"></el-input>
  <!--- 等价下面这个 -->
  <el-input :value="keyword" @input="keyword = $event"></el-input>
  ```

```js
Vue.directive("指令名", {
  // 生命周期
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, binding, vnode, oldVnode) {
    //
    // binging.value 拿到指令值
    // binding.modifiers 修饰符对象
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  inserted() {},
  update() {},
  componentUpdated() {},
  // 只调用一次，指令与元素解绑时调用
  unbind() {},
});

// 默认绑定 bind update 的生命周期
Vue.directive("指令名", function (el, binding, vnode, oldVnode) {});
```

## 修饰符

- .lazy、.number、.trim、.enter、.prevent、.self

- `.sync`

  ```html
  <Dialog  :visible.sync="visible"></Child>
  <!--- 等价下面这个 -->
  <Dialog  :visible="visible" @update:visible="visible = $event"></Child>
  ```

## scoped

加了 scoped 就只作用于当前组件

```html
<style scoped></style>
```

渲染规则

```text
.a .b {
}
== > .a .b[data-v-xx] {
}
.a /deep/ .b {
}
== > .a[data-v-xxx] .b {
}
.a >>> .b {
}
== > .a[data-v-xxx] .b {
}
.a ::v-deep .b {
}
== > .a[data-v-xxx] .b {
}
```

## `vue-router`

```js
// 全局路由守卫
router.beforeEach((to, from, next) => {});
router.afterEach((to, from) => {});

new VueRouter({
  mode: "hash", // hash | history | abstract
  // 滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { y: 0 };
  },
  routes: [
    {
      path: "/",
      // 路由独享守卫
      beforeEnter(to, from, next) {},
    },
  ],
});

// 组件内的路由
beforeRouteEnter(to, from, next);
beforeRouteUpdate(to, from, next);
beforeRouteLeave(to, from, next);

// 跳转
this.$router.push({ name: "", path: "", query: {} });
// 路由信息
this.$route.query;
this.$route.params;
```

## `vuex`

state getters mutations actions modules

```js
// state
this.$store.state.userInfo;
// getters
this.$store.getters.userInfo;

// mutations
this.$store.commit("SET_USER_INFO", "传递数据");

// actions
this.$store.dispatch("logout").then((res) => {});

// -----------------------------------
// modules > user
// namespaced: true,

// state 拿 name
this.$store.state.user.avatar;
// getters
this.$store.getters.user.avatar;

// mutations
this.$store.commit("user/SET_TOKEN", "传递数据");

// actions
this.$store.dispatch("user/login").then((res) => {});

// -----------------------------------
// modules > user
// namespaced: false,

// state 拿 name
this.$store.state.user.avatar;
// getters
this.$store.getters.user.avatar;

// mutations
this.$store.commit("SET_TOKEN", "传递数据");

// actions
this.$store.dispatch("login").then((res) => {});
```

辅助函数

```js
mapState, mapGetters, mapMutations, mapActions;
```

## vue3

> [Vue3 的 8 种和 Vue2 的 12 种组件通信，值得收藏](https://juejin.cn/post/6999687348120190983)
>
> [聊一聊 Vue3 的 9 个知识点](https://juejin.cn/post/7026249448233631752)

## Vue3 有哪些变化

- 新增了三个组件：`Fragment` 支持多个根节点、`Suspense` 可以在组件渲染之前的等待时间显示指定内容、`Teleport`
  可以让子组件能够在视觉上跳出父组件(如父组件 overflow:hidden)
- 新增指令 `v-memo`，可以缓存 html 模板，比如 v-for 列表不会变化的就缓存，简单说就是用内存换时间
- 支持 `Tree-Shaking`，会在打包时去除一些无用代码，没有用到的模块，使得代码打包体积更小
- 新增 `Composition API` 可以更好的逻辑复用和代码组织，同一功能的代码不至于像以前一样太分散，虽然 Vue2 中可以用 minxin
  来实现复用代码，但也存在问题，比如方法或属性名会冲突，代码来源也不清楚等
- 用 `Proxy` 代替 `Object.defineProperty` 重构了响应式系统，可以监听到数组下标变化，及对象新增属性，因为监听的不是对象属性，而是对象本身，还可拦截
  apply、has 等 13 种方法
- 重构了虚拟 DOM，在编译时会将事件缓存、将 slot 编译为 lazy 函数、保存静态节点直接复用(静态提升)、以及添加静态标记、Diff 算法使用
  最长递增子序列 优化了对比流程，使得虚拟 DOM 生成速度提升 `200%`
- 支持在 `<style></style>` 里使用 `v-bind`，给 CSS 绑定 JS 变量(`color: v-bind(str)`)
- 用 `setup` 代替了 beforeCreate 和 created 这两个生命周期
- 新增了**开发环境**的两个钩子函数，在组件更新时 `onRenderTracked`
  会跟踪组件里所有变量和方法的变化、每次触发渲染时 `onRenderTriggered` 会返回发生变化的新旧值，可以让我们进行有针对性调试
- 毕竟 Vue3 是用 `TS` 写的，所以对 `TS` 的支持度更好
- Vue3 不兼容 `IE11`

## vue3 生命周期

## git

## 常用命令

- <https://shfshanyue.github.io/cheat-sheets/git>

## git pull 和 git featch 的区别

## 怎么样进行合并，比如把 mater 分支合并到 dev 分支

## Webpack 一些核心概念

> [【万字】透过分析 webpack 面试题，构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)

- `Entry`：入口，指示 Webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。

- `Output`：输出结果，告诉 Webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

- `Module`：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

- `Chunk`：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

- `Loader`：模块代码转换器，让 webpack 能够去处理除了 JS、JSON 之外的其他类型的文件，并将它们转换为有效
  模块，以供应用程序使用，以及被添加到依赖图中。

- `Plugin`：扩展插件。在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的
  api 改变输出结果。常见的有：打包优化，资源管理，注入环境变量。

- `Mode`：模式，告知 webpack 使用相应模式的内置优化

  ***

- `hash`: 每次构建的生成唯一的一个 hash，且所有的文件 hash 串是一样的

- `chunkhash`: 每个**入口文件**都是一个 chunk，每个 chunk 是由入口文件与其依赖所构成，**异步加载**的文件也被视为是一个
  chunk, **chunkhash**是由每次编译模块，根据模块及其依赖模块构成 chunk 生成对应的 chunkhash, 这也就表明了**每个 chunk 的
  chunkhash 值**都不一样， 也就是说每个 chunk 都是独立开来的，互不影响，每个 chunk 的更新不会影响其他 chunk 的编译构建

- `contenthash`：由文件内容决定，文件变化 contenthash 才会变化，一般配合 `mini-css-extract-plugin`插件提取出 css

  ```js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const HTMLWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              // 把 style-loader替换掉，不要使用 style-loader了
              loader: MiniCssExtractPlugin.loader,
              options: {
                outputPath: "css/",
              },
            },
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      // ....
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
    ],
  };
  ```

## 提升 webpack 打包速度

> [一套骚操作下来，webpack 项目打包速度飞升 🚀、体积骤减 ↓](https://juejin.cn/post/7046616302521155614)
>
> [玩转 webpack，使你的打包速度提升 90%](https://juejin.cn/post/6844904071736852487)
>
> [带你深度解锁 Webpack 系列(优化篇)](https://juejin.cn/post/6844904093463347208)
>
> [学习 Webpack5 之路（优化篇）- 近 7k 字](https://juejin.cn/post/6996816316875161637)

- 速度分析，可以使用 `speed-measure-webpack-plugin`

- 提升基础环境，nodejs 版本，webpack 版本

- `CDN` 分包 `html-webpack-externals-plugin`, `externals`

- 多进程、多实例构建 `thread-loader` `happypack(不再维护)`

- 多进程并行构建打包`uglifyjs-webpack-plugin` `terser-webpack-plugin`

- 缓存: webpack5 内置了`cache`模块 、`babel-loader` 的 `cacheDirectory` 标志、`cache-loader`, `HardSourceWebpackPlugin`

  ```js
  module.exports = {
    // webpack5内置缓存
    cache: {
      type: "filesystem", // 使用文件缓存
    },
  };
  ```

- 构建缩小范围 `include`,`exclude`

- 加快文件查找速度`resolve.alias`,`resolve.extensions`, `module.noParse`

- `DllPlugin`

- `babel`配置的优化

## webpack 常用 loader，plugin

## **loader**

- `babel-loader` 将 `es6` 转换成 `es5` , `ts-loader`、`vue-loader`
- `eslint-loader` 配置 `enforce: 'pre'` 这个 loader 最先执行
- `css-loader`、`style-loader`、`postcss-loader`、`less-loader`、`sass-loader`
- `file-loader` 把文件转换成路径引入, `url-loader`（比`file-loader`多了小于多少的能转换成 base64）
- `image-loader`
- `svg-sprite-loader` 处理 svg
- `thread-loader` 开启多进程 ，会在一个单独的 worker 池（worker pool）中运行
- `cache-loader` 缓存一些性能开销比较大的 loader 的处理结果

## **plugin**

- `html-webpack-plugin` 将生成的 css，js 自动注入到 html 文件中，能对 html 文件压缩

- `copy-webpack-plugin` 拷贝某个目录

- `clean-webpack-plugin` 清空某个目录

- `webpack.HotModuleReplacementPlugin` 热重载

- `webpack.DefinePlugin` 定义全局变量

- `mini-css-extract-plugin` 提取 CSS 到独立 bundle 文件。 `extract-text-webpack-plugin`

- `optimize-css-assets-webpack-plugin` 压缩 css webpack5 推荐`css-minimizer-webpack-plugin`

- `purgecss-webpack-plugin` 会单独提取 CSS 并清除用不到的 CSS（会有问题把有用的 css 删除）

- `uglifyjs-webpack-plugin` ❌（不推荐） 压缩 js、多进程 `parallel: true`

- `terser-webpack-plugin` 压缩 js， 可开启多进程压缩、推荐使用

  ```js
  module.exports = {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true, // 多进程压缩
        }),
      ],
    },
  };
  ```

- `Happypack` ❌（不再维护） 可开启多进程

- `HardSourceWebpackPlugin` 缓存

- `speed-measure-webpack-plugin` 打包构建速度分析、查看编译速度

- `webpack-bundle-analyzer`打包体积分析

- `compression-webpack-plugin` gzip 压缩

## 前端性能优化

> [前端性能优化 24 条建议（2020）](https://juejin.cn/post/6892994632968306702)

1. 减少 http 请求
2. 使用 http2
3. 静态资源使用 CDN
4. 将 CSS 放在文件头部，JavaScript 文件放在底部
5. 使用字体图标 iconfont 代替图片图标
6. 设置缓存，强缓存，协商缓存
7. 压缩文件，css(`MiniCssExtractPlugin`),js(`UglifyPlugin`),html(`html-webpack-plugin`)
   文件压缩，清除无用的代码，`tree-shaking`（需要 es6 的 import 才支持），gzip 压缩(`compression-webpack-plugin`)
8. splitChunks 分包配置，optimization.splitChunks
   是基于 [SplitChunksPlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F)
   插件实现的
9. 图片优化、图片压缩
10. webpack 按需加载代码，`hash`，`contenthash`
11. 减少重排重绘
12. 降低 css 选择器的复杂性

## babel

> [不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)

核心库 `@babel/core`

`Polyfill` 垫片

CLI 命令行工具 `@babel/cli`

插件

预设：包含了很多插件的一个组合，`@babel/preset-env` `@babel/preset-react` `@babel/preset-typescript`

## **polyfill**

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`
、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用`core-js`
和`regenerator-runtime`(后者提供 generator 函数的转码)，为当前环境提供一个垫片。

**`@babel/plugin-transform-runtime`**

`Babel` 会使用很小的辅助函数来实现类似 `_createClass` 等公共方法。默认情况下，它将被添加(`inject`)到需要它的每个文件中。

如果你有 10 个文件中都使用了这个 `class`，是不是意味着 `_classCallCheck`、`_defineProperties`、`_createClass`
这些方法被 `inject` 了 10 次。这显然会导致包体积增大，最关键的是，我们并不需要它 `inject` 多次。

`@babel/plugin-transform-runtime` 是一个可以重复使用 `Babel` 注入的帮助程序，以节省代码大小的插件。

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

```text
//.babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage", // 配置 polyfill 动态导入
                "corejs": 3 // core-js@3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
}
```

## 浏览器

## 跨域、同源策略

参考：<https://blog.csdn.net/weixin_43745075/article/details/115482227>

> 同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSRF
> 等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

![img](https://img-blog.csdnimg.cn/20210407114820178.png)

**同源策略限制内容有：**

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

```html
<img src="XXX">
<link href="XXX">
<script src="XXX">
```

## 跨域解决方案

1. `JSONP`：通 过 动 态 创 建 `script` ， 再 请 求 一 个 带 参 网 址 实 现 跨 域 通 信 。

2. 开发环境：前端做代理

3. `nginx`反向代理

4. `CORS`: 服务端设置 `Access-Control-Allow-Origin` 即可，前端无须设置，若要带 `cookie` 请求，前后端都需要设置。

5. `websocket`

   ---下面的跨域通信、注意只是页面之间的跨域，不是前后端服务跨域，别人问前后端跨域就不要回答下面的了

6. `postMessage`

7. window.name + iframe

8. document.domain + iframe

9. location.hash + iframe

## 垃圾回收机制

- 标记清除： 进入环境、离开环境
- 引用计数（不常用）：值被引用的次数， 当引用次数为零时会被清除（缺陷，相互引用的会有问题）

## 缓存机制

## 强缓存

> 如果命中强缓存--就不用像服务器去请求

1. `Expires` 设置时间，过期时间 `expires: Tue, 15 Oct 2019 13:30:54 GMT`

   通过本地时间和 expires 比较是否过期，如果过期了就去服务器请求，没有过期的话就直接使用本地的

   缺点：本地时间可能会更改， 导致缓存出错

2. `Cache-Control` HTTP1.1 中新增的

   - max-age 最大缓存多少毫秒，列如 `Cache-Control: max-age=2592000`

   - no-store (每次都要请求，就连协商缓存都不走)表示不进行缓存，缓存中不得存储任何关于客户端请求和服务端响应的内容。每次
     由客户端发起的请求都会下载完整的响应内容。`Cache-Control: no-store`

   - no-cache（默认值）表示不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称 为
     do-notserve-from-cache-without-revalidation 更合适。浏览器默认开启的是 no-cache，其 实这里也可理解为开启协商缓存

   - public 和 private

     public 与 private 是针对资源是否能够被代理服务缓存而存在的一组对立概念

     当我们为资源设置了 pubile，那么它既可以被浏览器缓存也可被代理服务器缓存。设置为

     private 的时候，则该资源只能被浏览器缓存，其中默认值是 private。

   - max-age 和 s-maxage

     s-maxage 只适用于供多用户使用的公共服务器上(如 CND cache)，并只对 public 缓存有效

## 协商缓存

> 需要向服务器请求，如果没有过期，服务器会返回 304，

1. **ETag 和 If-None-Match 唯一标识**

- 服务器响应 ETag 值，浏览器携带的是 If-None-Match（携带的是上一次响应的 ETag），服务拿到这 If-None-Match 值后判断过期-->
  没有过期 304，并且返回 ETag

  ***

  二者的值都是服务器为每份资源分配的唯一标识字符串。

  • 浏览器请求资源，服务器会在响应报文头中加入 ETag 字段。资源更新的时候，服务端的

  ETag 值也随之更新

  • 浏览器再次请求资源，会在请求报文头中添加 If-None-Match 字段，它的值就是上次响应

  报文中的 ETag 值，服务器会对比 ETag 和 If-None-Match 的值是否一致。如果不一致，服务

  器则接受请求，返回更新后的资源，状态码返回 200；如果一致，表明资源未更新，则返回

  状态码 304，可继续使用本地缓存，值得注意的是此时响应头会加上 ETag 字段，即使它没

  有变化

  ***

- **Last-Modified 和 If-Modified-Since 时间戳**
  缺点： 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，

  If-Modified-Since 可查到的是秒级，这种修改无法判断

## event-loop(事件循环)

> [一次弄懂 Event Loop（彻底解决此类面试问题）](https://juejin.cn/post/6844903764202094606)

`JS` 是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，所以会先将同步代码压入执行栈中，依次执行，将异步代码推入异步队列，异步队列又分为宏任务队列和微任务队列，因为宏任务队列的执行时间较长，所以微任务队列要优先于宏任务队列。微任务队列的代表就是，`Promise.then`
，`MutationObserver`，宏任务的话就是`setImmediate setTimeout setInterval`

MacroTask（宏任务）

- `script`全部代码、`setTimeout`、`setInterval`、`setImmediate`、`I/O`、`UI Rendering`。

MicroTask（微任务）

- `Process.nextTick（Node独有）`、`Promise.then`、`Object.observe(废弃)`、`MutationObserver`

## 浏览器中

> 执行完一个宏任务，会执行所有的微任务

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
```

执行结果

```text
script start
promise1
script end
promise2
setTimeout
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/608a4edf58d141c88e75262938c3ac66.gif)

## nodejs 中

> 在 11 之前的版本，会在每个阶段之后执行所有的微任务
>
> 在 11 版本及之后，会每执行完一个宏任务，就会清空所用的微任务（和浏览器保存一致）

```js
new Promise((resolve) => {
  console.log("new Promise 1");
  resolve();
}).then(() => {
  console.log("new Promise then");
});

setTimeout(() => {
  console.log("timer1");
  new Promise((resolve) => {
    console.log("timer1 new Promise");
    resolve();
  }).then(() => {
    console.log("timer1 new Promise then");
  });
  Promise.resolve().then(() => {
    console.log("timer1 Promise then");
  });
});

setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(() => {
    console.log("timer2 Promise then");
  });
});

console.log("start end");
```

在 node11 版本之前（不包含 11）

```text
new Promise 1
start end
new Promise then
timer1
timer1 new Promise
timer2
timer1 new Promise then
timer1 Promise then
timer2 Promise then
```

在 node11 版本及之后

```text
new Promise 1
start end
new Promise then
timer1
timer1 new Promise
timer1 new Promise then
timer1 Promise then
timer2
timer2 Promise then
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b222442fa0904f0d956565597e1fab17~tplv-k3u1fbpfcp-zoom-1.image)

`Node`的`Event loop`一共分为 6 个阶段，每个细节具体如下：

1. `timers`: 执行`setTimeout`和`setInterval`中到期的`callback`。
2. `pending callback`: 上一轮循环中少数的`callback`会放在这一阶段执行。
3. `idle, prepare`: 仅在内部使用。
4. `poll`: 最重要的阶段，执行`pending callback`，在适当的情况下回阻塞在这个阶段。
5. `check`: 执行`setImmediate`(`setImmediate()`
   是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行`setImmediate`指定的回调函数)的`callback`。
6. `close callbacks`: 执行`close`事件的`callback`，例如`socket.on('close'[,fn])`或者`http.server.on('close, fn)`。

## 常见状态码

## TCP

> [面试官，不要再问我三次握手和四次挥手](https://juejin.cn/post/6844903958624878606)

## **三次握手**

![三次握手.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/8/16da9fd28a45bd19~tplv-t2oaga2asx-watermark.awebp)

为什么需要三次握手，两次不可以吗

```text
为了防止失效的连接请求又传送到主机，因而产生错误。
如果使用的是两次握手建立连接，假设有这样一种场景，客户端发送了第一个请
求连接并且没有丢失，只是因为在网络结点中滞留的时间太长了，由于 TCP 的客
户端迟迟没有收到确认报文，以为服务器没有收到，此时重新向服务器发送这条
报文，此后客户端和服务器经过两次握手完成连接，传输数据，然后关闭连接。
此时此前滞留的那一次请求连接，网络通畅了到达了服务器，这个报文本该是失
效的，但是，两次握手的机制将会让客户端和服务器再次建立连接，这将导致不
必要的错误和资源的浪费。

如果采用的是三次握手，就算是那一次失效的报文传送过来了，服务端接受到了
那条失效报文并且回复了确认报文，但是客户端不会再次发出确认。由于服务器
收不到确认，就知道客户端并没有请求连接。
```

## 四次挥手

![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/8/16da9fd28b49f652~tplv-t2oaga2asx-watermark.awebp)

**挥手为什么需要四次？**

因为当服务端收到客户端的 SYN 连接请求报文后，可以直接发送 SYN+ACK 报文。其中**ACK 报文是用来应答的，SYN 报文是用来同步的**
。但是关闭连接时，当服务端收到 FIN 报文时，很可能并不会立即关闭 SOCKET，所以只能先回复一个 ACK 报文，告诉客户端，"你发的 FIN
报文我收到了"。只有等到我服务端所有的报文都发送完了，我才能发送 FIN 报文，因此不能一起发送。故需要四次挥手。

**`2MSL`等待状态**

TIME_WAIT 状态也成为`2MSL`等待状态。每个具体 TCP 实现必须选择一个报文段最大生存时间 MSL（Maximum Segment
Lifetime），它是任何报文段被丢弃前在网络内的最长时间。这个时间是有限的，因为 TCP 报文段以 IP 数据报在网络内传输，而 IP
数据报则有限制其生存时间的 TTL 字段。

对一个具体实现所给定的 MSL 值，处理的原则是：当 TCP 执行一个主动关闭，并发回最后一个 ACK，该连接必须在 TIME_WAIT 状态停留的时间为
2 倍的 MSL。这样可让 TCP 再次发送最后的 ACK 以防这个 ACK 丢失（另一端超时并重发最后的 FIN）。

这种 2MSL 等待的另一个结果是这个 TCP 连接在 2MSL 等待期间，定义这个连接的插口（客户的 IP 地址和端口号，服务器的 IP
地址和端口号）不能再被使用。这个连接只能在 2MSL 结束后才能再被使用。

## HTTP

HTTP/1.0

最早的 http 只是使用一些简单的网页上和网络请求上，每次请求都打开一个新的 TCP 连接， 收到响应后立即断开连接

HTTP/1.1
缓存处理，HTTP/1.1 更多的引入了缓存策略，如 Cache-Control，Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等

宽带优化及网络连接的使用，在 HTTP/1.0 中，存在一些浪费宽带的现象，列如客户端只需要某个对象的一部分，而服务器把整个对象都送过来了，并且不支持断点续传，HTTP1.1
则

在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（PartialContent），这样就方便了开发者自由的选择以便于充分利用带宽和连接。

错误通知的管理，在 HTTP/1.1 中新增了 24 个错误状态响应码，如 409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。

Host 头处理，在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中

的 URL 并没有传递主机名。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多

个虚拟主机（Multi-homed Web Servers），并且它们共享一个 IP 地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有
Host 头域会报告一个错误（400 Bad Request）

长连接， HTTP/1.1 默认开启持久连接（默认：keep-alive），在一个 TCP 连接上可以传递多

个 HTTP 请求和响应，减少了建立与关闭连接的消耗和延迟

HTTP/2.0

在 HTTP/2.0 中，有两个重要的概念，分别是帧（frame） 和 流（stream），帧代表数据传输

的最小单位，每个帧都有序列标识标明该帧属于哪个流，流也就是多个帧组成的数据流，每

个流表示一个请求。

新的二进制格式： HTTP/1.x 的解析是基于文本的。基于文本协议的格式解析存在天然缺陷，

文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认 0 和 1

的组合。基于这种考虑 HTTP2.0 的协议解析决定采用二进制格式，实现方便且健壮。

多路复用： HTTP/2.0 支持多路复用，这是 HTTP/1.1 持久连接的升级版。多路复用，就是在

一个 TCP 连接中存在多个条流，也就是多个请求，服务器则可以通过帧中的标识知道该帧属

于哪个流（即请求），通过重新排序还原请求。多路复用允许并发多个请求，每个请求及该

请求的响应不需要等待其他的请求或响应，避免了线头阻塞问题。这样某个请求任务耗时严

重，不会影响到其它连接的正常执行,极大的提高传输性能。

头部压缩： 对前面提到的 HTTP/1.x 的 header 带有大量信息，而且每次都要重复发送，

HTTP/2.0 使用 encoder 来减少需要传输的头部大小，通讯双方各自 cache 一份头部 fields 表，

既避免了重复头部的传输，又减小了需要传输的大小。

服务端推送： 服务端推送指把客户端所需要的 css/js/img 资源伴随着 index.html 一起发送

到客户端，省去了客户端重复请求的步骤（从缓存中取）。正因为没有发起请求，建立连接

等操作，所以静态资源通过服务端推送的方式极大的提升了速度 HTTP/3.0

HTTP/2.0 使用了多路复用，一般来说同一域名下只需要使用一个 TCP 连接。但当这个连接中

出现了丢包的情况，会导致整个 TCP 都要开始等待重传，也就导致了后面所有的数据都阻塞了。

避免包阻塞： 多个流的数据包在 TCP 连接上传输时，若一个流中的数据包传输出现问题，

TCP 需要等待该包重传后，才能继续传输其它流的数据包。但在基于 UDP 的 QUIC 协议中，

不同的流之间的数据传输真正实现了相互独立互不干扰，某个流的数据包在出问题需要重传

时，并不会对其他流的数据包传输产生影响。

快速重启会话: 普通基于 tcp 的连接，是基于两端的 ip 和端口和协议来建立的。在网络切换

场景，例如手机端切换了无线网，使用 4G 网络，会改变本身的 ip，这就导致 tcp 连接必须

重新创建。而 QUIC 协议使用特有的 UUID 来标记每一次连接，在网络环境发生变化的时候，

只要 UUID 不变，就能不需要握手，继续传输数据。

HTTP2.0 的多路复用和 HTTP1.X 中的长连接有什么区别？

HTTP/1.\* 一次请求-响应，建立一个连接，用完关闭；每一个请求都要建立一个连接；

HTTP/1.1 在一个 TCP 连接上可以传递多个 HTTP 请求和响应，后面的请求等待前面的请求返

回才能获得执行机会，一旦有某个请求超时，后续请求只能被阻塞，毫无办法，也就是常说

的线头阻塞

HTTP/2.0 多个请求可同时在一个连接上并行执行.某个请求任务耗时严重，不影响其他连接

的正常执行。

## https(http + ssl/tls)

http: 最广泛网络协议，BS 模型，浏览器高效。

https: 安全版，通过 SSL 加密，加密传输，身份认证，密钥

1 https 相对于 http 加入了 ssl 层, 加密传输, 身份认证;

2 需要到 ca 申请收费的证书;

3 安全但是耗时多，缓存不是很好;

4 注意兼容 http 和 https;

5 连接方式不同, 端口号也不同, http 是 80, https 是 443

- 明文： 普通的文本

- 密钥：把明文加密的那个钥匙

- 密文： 把明文加密

  明文+密钥==>密文==>密钥==解密=>明文

- 对称加密 解密的 key（密钥）和解密的 key 是同一个 3 + 1

- 非对称加密 私钥和公钥

![无标题.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/489428dbcc4840d689ed717d4335a833~tplv-k3u1fbpfcp-watermark.image?)

## 手写

> [10 个常见的前端手写功能，你全都会吗](https://juejin.cn/post/7031322059414175774)

最近面试 2022 年 3 月问到了很多手写，这个一定要准备下

## 防抖

```js
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流

```js
function throttle(fn, wait) {
  let pre = 0;
  return function (...args) {
    let now = Date.now();
    if (now - pre >= wait) {
      fn.apply(this, args);
      pre = now;
    }
  };
}
```

## event bus 事件总线 | 发布订阅模式

```js
// event bus

class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, callback) {
    const { events } = this;
    if (!events[name]) {
      events[name] = [];
    }
    events[name].push(callback);
  }
  emit(name, ...args) {
    const handlers = this.events[name];
    handlers &&
      handlers.forEach((fn) => {
        fn.apply(this, args);
      });
  }
  off(name, callback) {
    const { events } = this;
    if (!events[name]) return;
    events[name] = events[name].filter((fn) => fn !== callback);
  }
  once(name, callback) {
    const handler = function () {
      callback.apply(this, arguments);
      this.off(name, handler);
    };
    this.on(name, handler);
  }
  clear() {
    this.events = {};
  }
}
```

## 数据偏平化

```js
// 数据偏平化
function flatter(arr) {
  return arr.reduce((prev, curr) => {
    return Array.isArray(curr) ? [...prev, ...flatter(curr)] : [...prev, curr];
  }, []);
}
```

## 手写 new

```js
// 手写 new
function myNew(ctr, ...args) {
  const obj = Object.create(ctr.prototype);
  myNew.target = ctr;
  const result = ctr.apply(obj, args);
  if (
    result &&
    (typeof result === "function" || typeof result === "function")
  ) {
    return result;
  }
  return obj;
}
```

## call、bind

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

//bind实现要复杂一点  因为他考虑的情况比较多 还要涉及到参数合并(类似函数柯里化)

Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  let _this = this;
  //  bind情况要复杂一点
  const result = function (...innerArgs) {
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};
```

## 异步控制并发数

```js
function limitRequest(requests, limit = 3) {
  requests = requests.slice();
  return new Promise((resolve, reject) => {
    let count = 0;
    const len = requests.length;
    while (limit > 0) {
      start();
      limit--;
    }

    function start() {
      const promiseFn = requests.shift();

      promiseFn?.().finally(() => {
        count++; // 一定要通过 count 判断、不能通过 requests.length 判断是否为空，这样不对的
        if (count === len) {
          // 最后一个
          resolve();
        } else {
          start();
        }
      });
    }
  });
}
// 测试
const arr = [];
for (let value of "12345") {
  arr.push(() => fetch(`https://www.baidu.com/s?ie=UTF-8&wd=${value}`));
}
limitRequest(arr);
```

## 台阶问题

有 N 个台阶，一步可以走一梯或者两梯，请问有多少种走法

解答：<https://blog.csdn.net/z1832729975/article/details/123836190>

## 有效括号 <https://leetcode-cn.com/problems/valid-parentheses/>

实现

我们可以通过栈来实现、当遇到左括号的时候就把对应的右括号值`push`到栈中，否则的话我们就把栈定的元素`pop`
和当前字符比较是否相等，不相信的话直接返回 `false`

## 现在时间 07:15，请问分针和时针的夹角是多少

先看看时钟，要了解 07:15 在哪，这个不知道在哪就尴尬了

![在这里插入图片描述](https://img-blog.csdnimg.cn/833a03cad6e346789184fbe5643ec241.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemjpmL_po54=,size_20,color_FFFFFF,t_70,g_se,x_16)

画图，结果如下

7 点 15 分时针和分针所形成的角是

120 + 30\*1/4=127.5

这题需要注意时针还好继续走，不会固定，不然容易被坑

## 写 IP 地址的正则表达式

分析`ip`地址

## 让 `a==1 && a==2 && a==3` 为 `true`

> 因为这个是 ==, 会存在隐式类型转换

- 利用对象

  `Symbol.toString`

  `valueOf`

  `toString`

  ```js
  var a = {
    value: 1,
    // 这三种方法都可以，优先级也是这个顺序
    [Symbol.toString]() {
      return a.value++;
    },
    // valueOf() {
    //   return a.value++
    // },
    // toString() {
    //   return a.value++
    // }
  };
  ```

- 利用数组

  ```js
  a.valueOf = a.shift;
  // 一样有
  //a[Symbol.toPrimitive] = a.shift
  //a.toString = a.shift
  ```

- 通过`Object.defineProperty`拦截

  ```js
  let value = 1;
  Object.defineProperty(window, "a", {
    get() {
      return value++;
    },
  });
  ```

- 通过 Proxy 拦截

  ```js
  let value = 1;
  const a = new Proxy(
    {},
    {
      get() {
        return function () {
          return value++;
        };
      },
    }
  );
  ```

## typescript

> [2021 typescript 史上最强学习入门文章(2w 字)](https://juejin.cn/post/7018805943710253086)

## `const`和`readonly`的区别

`const`常量：表示这个变量的指针地址不可以在改变，可以更改对象内部的属性

`readonly`只读：指针地址不可以改变，并且对象内部的属性也不可以改变

1. const 用于变量，readonly 用于属性
2. const 在运行时检查，readonly 在编译时检查
3. 使用 const 变量保存的数组，可以使用 push，pop 等方法。但是如果使用`ReadonlyArray`声明的数组不能使用 push，pop 等方法。

## `type`和`interface`的区别

参考：<https://juejin.cn/post/7018805943710253086#heading-63>

type-类型别名

interface-接口

- 接口重名会合并、类型别名重名会报错

  ```typescript
  interface Person {
    name: string;
  }
  interface Person {
    age: number;
  }

  // 这个接口合并，变成下面的
  interface Person {
    name: string;
    age: number;
  }

  type Aanimal = { name: string };
  type Aanimal = { age: number }; // 会报错、重名了
  ```

- 两者都可以用来描述对象或函数的类型，但是语法不同

  interface

  ```typescript
  interface Point {
    x: number;
    y: number;
  }

  interface SetPoint {
    (x: number, y: number): void;
  }
  ```

  type

  ```typescript
  type Point = {
    x: number;
    y: number;
  };

  type SetPoint = (x: number, y: number) => void;
  ```

- 类型别名可以为任何类型引入名称。例如基本类型，联合类型等

  ```typescript
  // primitive
  type Name = string;

  // object
  type PartialPointX = { x: number };
  type PartialPointY = { y: number };

  // union
  type PartialPoint = PartialPointX | PartialPointY;

  // tuple
  type Data = [number, string];

  // dom
  let div = document.createElement("div");
  type B = typeof div;
  ```

- 扩展

  两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。

  接口的扩展就是继承，通过 `extends` 来实现。类型别名的扩展就是交叉类型，通过 `&` 来实现。

  接口扩展接口

  ```typescript
  interface PointX {
    x: number;
  }

  interface Point extends PointX {
    y: number;
  }
  ```

类型别名扩展类型别名

```typescript
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};
```

接口扩展类型别名

```typescript
type PointX = {
  x: number;
};
interface Point extends PointX {
  y: number;
}
```

类型别名扩展接口

```typescript
interface PointX {
  x: number;
}
type Point = PointX & {
  y: number;
};
```

## **keyof 和 typeof 关键字的作用？**

> `keyof 索引类型查询操作符` 获取索引类型的属性名，构成联合类型。
> `typeof` 获取一个变量或对象的类型。

## unknown, any 的区别

> unknown 类型和 any 类型类似。与 any 类型不同的是。unknown 类型可以接受任意类型赋值，但是 unknown 类型赋值给其他类型前，必须被断言

## CDN

## 1. CDN 的概念

CDN（Content Delivery Network，**内容分发网络**）是指一种通过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。

CDN 一般会用来托管 Web 资源（包括文本、图片和脚本等），可供下载的资源（媒体文件、软件、文档等），应用程序（门户网站等）。使用 CDN 来加速这些资源的访问。

（1）在性能方面，引入 CDN 的作用在于：

- 用户收到的内容来自最近的数据中心，延迟更低，内容加载更快
- 部分资源请求分配给了 CDN，减少了服务器的负载

（2）在安全方面，CDN 有助于防御 DDoS、MITM 等网络攻击：

- 针对 DDoS：通过监控分析异常流量，限制其请求频率
- 针对 MITM：从源服务器到 CDN 节点到 ISP（Internet Service Provider），全链路 HTTPS 通信

除此之外，CDN 作为一种基础的云服务，同样具有资源托管、按需扩展（能够应对流量高峰）等方面的优势。

CDN 的工作原理：

（1）用户未使用 CDN 缓存资源的过程：

1. 浏览器通过 DNS 对域名进行解析（就是上面的 DNS 解析过程），依次得到此域名对应的 IP 地址
2. 浏览器根据得到的 IP 地址，向域名的服务主机发送数据请求
3. 服务器向浏览器返回响应数据

（2）用户使用 CDN 缓存资源的过程：

1. 对于点击的数据的 URL，经过本地 DNS 系统的解析，发现该 URL 对应的是一个 CDN 专用的 DNS 服务器，DNS 系统就会将域名解析权交给 CNAME 指向的 CDN 专用的 DNS 服务器。
2. CND 专用 DNS 服务器将 CND 的全局负载均衡设备 IP 地址返回给用户
3. 用户向 CDN 的全局负载均衡设备发起数据请求
4. CDN 的全局负载均衡设备根据用户的 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求
5. 区域负载均衡设备选择一台合适的缓存服务器来提供服务，将该缓存服务器的 IP 地址返回给全局负载均衡设备
6. 全局负载均衡设备把服务器的 IP 地址返回给用户
7. 用户向该缓存服务器发起请求，缓存服务器响应用户的请求，将用户所需内容发送至用户终端。

如果缓存服务器没有用户想要的内容，那么缓存服务器就会向它的上一级缓存服务器请求内容，以此类推，直到获取到需要的资源。最后如果还是没有，就会回到自己的服务器去获取资源。

## 懒加载

## 1. 懒加载的概念

懒加载也叫做延迟加载、按需加载，指的是在长网页中延迟加载图片数据，是一种较好的网页性能优化的方式。在比较长的网页或应用中，如果图片很多，所有的图片都被加载出来，而用户只能看到可视窗口的那一部分图片数据，这样就浪费了性能。

如果使用图片的懒加载就可以解决以上问题。在滚动屏幕之前，可视化区域之外的图片不会进行加载，在滚动屏幕时才加载。这样使得网页的加载速度更快，减少了服务器的负载。懒加载适用于图片较多，页面列表较长（长列表）的场景中。

## 2. 懒加载的特点

- **减少无用资源的加载**：使用懒加载明显减少了服务器的压力和流量，同时也减小了浏览器的负担。
- **提升用户体验**: 如果同时加载较多图片，可能需要等待的时间较长，这样影响了用户体验，而使用懒加载就能大大的提高用户体验。
- **防止加载过多图片而影响其他资源文件的加载** ：会影响网站应用的正常使用。

## 3. 懒加载的实现原理

图片的加载是由`src`引起的，当对`src`赋值时，浏览器就会请求图片资源。根据这个原理，我们使用 HTML5 的`data-xxx`属性来储存图片的路径，在需要加载图片的时候，将`data-xxx`中图片的路径赋值给`src`，这样就实现了图片的按需加载，即懒加载。

注意：`data-xxx` 中的`xxx`可以自定义，这里我们使用`data-src`来定义。

懒加载的实现重点在于确定用户需要加载哪张图片，在浏览器中，可视区域内的资源就是用户需要的资源。所以当图片出现在可视区域时，获取图片的真实地址并赋值给图片即可。

**使用原生 JavaScript 实现懒加载：**

**知识点：**

（1）`window.innerHeight` 是浏览器可视区的高度

（2）`document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动的过的距离

（3）`imgs.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距离）

（4）图片加载条件：`img.offsetTop < window.innerHeight + document.body.scrollTop;`

```html
<div class="container">
  <img src="loading.gif" data-src="pic.png" />
  <img src="loading.gif" data-src="pic.png" />
  <img src="loading.gif" data-src="pic.png" />
  <img src="loading.gif" data-src="pic.png" />
  <img src="loading.gif" data-src="pic.png" />
  <img src="loading.gif" data-src="pic.png" />
</div>
<script>
  var imgs = document.querySelectorAll("img");
  function lozyLoad() {
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    var winHeight = window.innerHeight;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].offsetTop < scrollTop + winHeight) {
        imgs[i].src = imgs[i].getAttribute("data-src");
      }
    }
  }
  window.onscroll = lozyLoad();
</script>
```

## 4. 懒加载与预加载的区别

这两种方式都是提高网页性能的方式，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。

- **懒加载也叫延迟加载，指的是在长网页中延迟加载图片的时机，当用户需要访问时，再去加载**，这样可以提高网站的首屏加载速度，提升用户的体验，并且可以减少服务器的压力。它适用于图片很多，页面很长的电商网站的场景。懒加载的实现原理是，将页面上的图片的 src 属性设置为空字符串，将图片的真实路径保存在一个自定义属性中，当页面滚动的时候，进行判断，如果图片进入页面可视区域内，则从自定义属性中取出真实路径赋值给图片的 src 属性，以此来实现图片的延迟加载。
- **预加载指的是将所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。**通过预加载能够减少用户的等待时间，提高用户的体验。我了解的预加载的最常用的方式是使用 js 中的 image 对象，通过为 image 对象来设置 scr 属性，来实现图片的预加载。

## 回流与重绘

## 1. 回流与重绘的概念及触发条件

## （1）回流

当渲染树中部分或者全部元素的尺寸、结构或者属性发生变化时，浏览器会重新渲染部分或者全部文档的过程就称为**回流**。

下面这些操作会导致回流：

- 页面的首次渲染
- 浏览器的窗口大小发生变化
- 元素的内容发生变化
- 元素的尺寸或者位置发生变化
- 元素的字体大小发生变化
- 激活 CSS 伪类
- 查询某些属性或者调用某些方法
- 添加或者删除可见的 DOM 元素

在触发回流（重排）的时候，由于浏览器渲染页面是基于流式布局的，所以当触发回流时，会导致周围的 DOM 元素重新排列，它的影响范围有两种：

- 全局范围：从根节点开始，对整个渲染树进行重新布局
- 局部范围：对渲染树的某部分或者一个渲染对象进行重新布局

## （2）重绘

当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是**重绘**。

下面这些操作会导致重绘：

- color、background 相关属性：background-color、background-image 等
- outline 相关属性：outline-color、outline-width 、text-decoration
- border-radius、visibility、box-shadow

注意： **当触发回流时，一定会触发重绘，但是重绘不一定会引发回流。**

## 2. 如何避免回流与重绘？

**减少回流与重绘的措施：**

- 操作 DOM 时，尽量在低层级的 DOM 节点进行操作
- 不要使用`table`布局， 一个小的改动可能会使整个`table`进行重新布局
- 使用 CSS 的表达式
- 不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式。
- 使用 absolute 或者 fixed，使元素脱离文档流，这样他们发生变化就不会影响其他元素
- 避免频繁操作 DOM，可以创建一个文档片段`documentFragment`，在它上面应用所有 DOM 操作，最后再把它添加到文档中
- 将元素先设置`display: none`，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
- 将 DOM 的多个读操作（或者写操作）放在一起，而不是读写操作穿插着写。这得益于**浏览器的渲染队列机制**。

## 3. 如何优化动画？

对于如何优化动画，我们知道，一般情况下，动画需要频繁的操作 DOM，就就会导致页面的性能问题，我们可以将动画的`position`属性设置为`absolute`或者`fixed`，将动画脱离文档流，这样他的回流就不会影响到页面了。

## 节流与防抖

## 1. 对节流与防抖的理解

- **函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。**这可以使用在一些点击请求的事件上，**避免因为用户的多次点击向后端发送多次请求。**
- **函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。**节流可以使用在 scroll 函数的事件监听上，通过事件**节流来降低事件调用的频率。**

**防抖函数的应用场景：**

- 按钮提交场景：防⽌多次提交按钮，只执⾏最后提交的⼀次
- 服务端验证场景：表单验证需要服务端配合，只执⾏⼀段连续的输⼊事件的最后⼀次，还有搜索联想词功能类似⽣存环境请⽤ lodash.debounce

**节流函数的\*\***适⽤场景：\*\*

- 拖拽场景：固定时间内只执⾏⼀次，防⽌超⾼频次触发位置变动
- 缩放场景：监控浏览器 resize
- 动画场景：避免短时间内多次触发动画引起性能问题

## 图片优化

## 1. 如何对项目中的图片进行优化？

1. 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。
2. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。
3. 小图使用 base64 格式
4. 将多个图标文件整合到一张图片中（雪碧图）
5. 选择正确的图片格式：

对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好

小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替

照片使用 JPEG

## Webpack 优化

## 1. 如何提⾼**webpack**的打包速度**?**

## （1）优化 Loader

对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，**转换代码越多，效率就越低**。当然了，这是可以优化的。

首先我们**优化 Loader 的文件搜索范围**

```javascript
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: "babel-loader",
        // 只在 src 文件夹下查找
        include: [resolve("src")],
        // 不会去查找的路径
        exclude: /node_modules/,
      },
    ],
  },
};
```

对于 Babel 来说，希望只作用在 JS 代码上的，然后 `node_modules` 中使用的代码都是编译过的，所以完全没有必要再去处理一遍。

当然这样做还不够，还可以将 Babel 编译过的文件**缓存**起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间

```javascript
loader: "babel-loader?cacheDirectory=true";
```

## （2）HappyPack

受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。

**HappyPack 可以将 Loader 的同步执行转换为并行的**，这样就能充分利用系统资源来加快打包效率了

```js
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```

## （3）DllPlugin

**DllPlugin 可以将特定的类库提前打包然后引入**。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。DllPlugin 的使用方法如下：

```javascript
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ["react"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].dll.js",
    library: "[name]-[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: "[name]-[hash]",
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
    }),
  ],
};
```

然后需要执行这个配置文件生成依赖文件，接下来需要使用 `DllReferencePlugin` 将依赖文件引入项目中

```javascript
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require("./dist/vendor-manifest.json"),
    }),
  ],
};
```

## （4）代码压缩

在 Webpack3 中，一般使用 `UglifyJS` 来压缩代码，但是这个是单线程运行的，为了加快效率，可以使用 `webpack-parallel-uglify-plugin` 来并行运行 `UglifyJS`，从而提高效率。

在 Webpack4 中，不需要以上这些操作了，只需要将 `mode` 设置为 `production` 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 `console.log` 这类代码的功能。

## （5）其他

可以通过一些小的优化点来加快打包速度

- `resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- `resolve.alias`：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
- `module.noParse`：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

## 2. 如何减少 Webpack 打包体积

## （1）按需加载

在开发 SPA 项目的时候，项目中都会存在很多路由页面。如果将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，希望首页能加载的文件体积越小越好，**这时候就可以使用按需加载，将每个路由页面单独打包为一个文件**。当然不仅仅路由可以按需加载，对于 `loadash` 这种大型类库同样可以使用这个功能。

按需加载的代码实现这里就不详细展开了，因为鉴于用的框架不同，实现起来都是不一样的。当然了，虽然他们的用法可能不同，但是底层的机制都是一样的。都是当使用的时候再去下载对应文件，返回一个 `Promise`，当 `Promise` 成功以后去执行回调。

## （2）Scope Hoisting

**Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。**

比如希望打包两个文件：

```javascript
// test.js
export const a = 1;
// index.js
import { a } from "./test.js";
```

对于这种情况，打包出来的代码会类似这样：

```javascript
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  },
];
```

但是如果使用 Scope Hoisting ，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码：

```javascript
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
];
```

这样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 `optimization.concatenateModules` 就可以了：

```javascript
module.exports = {
  optimization: {
    concatenateModules: true,
  },
};
```

## （3）Tree Shaking

**Tree Shaking 可以实现删除项目中未被引用的代码**，比如：

```text
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```

对于以上情况，`test` 文件中的变量 `b` 如果没有在项目中使用到的话，就不会被打包到文件中。

如果使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。

## 3. 如何⽤**webpack**来优化前端性能？

⽤ webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- **压缩代码**：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤ webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS ⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css
- **利⽤\*\***CDN\***\*加速**: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤ webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- **Tree Shaking**: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 webpack 时追加参数 --optimize-minimize 来实现
- **Code Splitting:** 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利⽤浏览器缓存
- **提取公共第三⽅库**: SplitChunksPlugin 插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

## 4. 如何提⾼**webpack**的构建速度？

1. 多⼊⼝情况下，使⽤ CommonsChunkPlugin 来提取公共代码
2. 通过 externals 配置来提取常⽤库
3. 利⽤ DllPlugin 和 DllReferencePlugin 预编译资源模块 通过 DllPlugin 来对那些我们引⽤但是绝对不会修改的 npm 包来进⾏预编译，再通过 DllReferencePlugin 将预编译的模块加载进来。
4. 使⽤ Happypack 实现多线程加速编译
5. 使⽤ webpack-uglify-parallel 来提升 uglifyPlugin 的压缩速度。 原理上 webpack-uglify-parallel 采⽤了多核并⾏压缩来提升压缩速度
6. 使⽤ Tree-shaking 和 Scope Hoisting 来剔除多余代码
