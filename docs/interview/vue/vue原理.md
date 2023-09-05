## Vue 原理

watch 和 computed

### 响应式原理

组件中 data 数据变化会触发视图的更新。监听 data 属性的 getter 和 setter

实现数据驱动视图第一步。

核心 API：Object.defineProperty / Proxy

Object.defineProperty(对象, 属性, {配置})

- 深度监听，递归实现，计算量大
- 无法监听新增和删除属性（Vue.set / Vue.delete）
- 无法原生监听数组，需要重新定义数组的原型进行监听

### 双向绑定的原理

### 虚拟 DOM / diff

使用 JS 模拟 DOM 结构，计算最小变更，然后有效操作 DOM

虚拟 DOM 是一个对象（标签/属性/子元素）

优点：

- DOM 操作比较耗时
- 有了 vdom 之后，就没有和 dom 强绑定了，可以渲染到别的平台。

```js
{
  type:'div',
  props:{
    id:'a',
    className:['b','c'],
    onClick:function(){}
  },
  children:[]
}
```

直接写 vdom 太麻烦了，所以前端框架都会设计一套 dsl，然后编译成 render function，执行后产生 vdom。

渲染 vdom 也就是通过 dom api 增删改 dom。

diff 算法是 vdom 的核心、最关键的部分。

- 只比较同层节点
- tag 不同，则直接删除，不在删除重建
- tag 和 key 都相同，则认为是同一个节点
- h，vnode，patch，diff，key

patch(elem, vnode)

patch(vnode, newVnode)

### 模板编译

**组件渲染和更新过程**

vue template complier 编译为 render 函数

执行 render 函数生成 vnode，基于 vnode 执行 patch 和 diff

使用 webpack，vue-loader 会在开发环境下编译模板，运行时已经不存在模板了

部分复杂情况，可能不能使用 template，会使用 render

- 初次渲染：解析模板为 render 函数；触发响应式，监听 data 属性 getter 和 setter；执行 render 函数，生成 vnode，patch
- 更新渲染：修改 data，触发 setter（此前 getter 中已被监听）；重新执行 render，生成 newVnode；执行 patch
- 异步渲染：

nextTick 待 DOM 渲染完成后回调。页面渲染会将 data 做整合，多次 data 修改只会渲染一次，减少 DOM 操作次数，提高性能。

![image-20220715224607703](../../public/20220715224607703.png)

我们无法直接追踪局部变量的读写过程，在原生 JavaScript 中没有提供这样一种机制。**但是**，我们是可以追踪一个**对象的属性**
进行读和写的。

在 JavaScript
中有两种劫持属性访问的方式：[getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
/[setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
和 [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。Vue 2 使用
getter/setters 完全由于需支持更旧版本浏览器的限制。而在 Vue 3 中使用了 Proxy 来创建响应式对象，将 getter/setter 用于 ref。

- 当你将一个响应性对象的属性解构为一个局部变量时，响应性就会“断开连接”，因为对局部变量的访问不再触发 get / set 代理捕获。
- 从 `reactive()` 返回的代理尽管行为上表现得像原始对象，但我们通过使用 `===` 运算符还是能够比较出它们的不同。

一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为**挂载 (mount)**。

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM
上。这个过程被称为**修补 (patch)**，又被称为“比较差异 (diffing)”或“协调 (reconciliation)”。

虚拟 DOM 带来的主要收益是它赋予了开发者编程式地、声明式地创建、审查和组合所需 UI 结构的能力，而把直接与 DOM 相关的操作交给了渲染器。

以更高层面的视角看，Vue 组件挂载后发生了如下这几件事：

1. **编译**：Vue 模板被编译为了**渲染函数**：即用来返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
2. **挂载**：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM
   节点。这一步会作为[响应式副作用](https://staging-cn.vuejs.org/guide/extras/reactivity-in-depth.html)
   执行，因此它会追踪其中所用到的所有响应式依赖。
3. **修补**：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM
   树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

Vue 编译器用来提高虚拟 DOM 运行时性能的主要优化：

1. **静态提升** 在模板中常常有部分内容是不带任何动态绑定的，没有必要在重新渲染时再次创建和比对它们。此外，当有足够多连续的静态元素时，它们还会再被压缩为一个“静态
   vnode”，其中包含的是这些节点相应的纯 HTML 字符串。这些静态节点会直接通过 `innerHTML` 来挂载。同时还会在初次挂载后缓存相应的
   DOM 节点。如果这部分内容在应用中其他地方被重用，那么将会使用原生的 `cloneNode()` 方法来克隆新的 DOM 节点，这会非常高效。

2. **修补标记 Flags**

   对于单个有动态绑定的元素来说，我们可以在编译时推断出大量信息：一个元素可以有多个修补标记，会被合并成一个数字。运行时渲染器也将会使用位运算来检查这些标记，确定相应的更新操作。

3. **树结构打平**

   这里我们引入一个概念“区块”，内部结构是稳定的一个部分可被称之为一个区块。每一个块都会追踪其所有带修补标记的后代节点 (
   不只是直接子节点)
   。编译的结果会被打平为一个数组，仅包含所有动态的后代节点。当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。这也就是我们所说的**
   树结构打平**，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。模板中任何的静态部分都会被高效地略过。`v-if`
   和 `v-for` 指令会创建新的区块节点

Vue2 与 Vue3 有哪些变化

1. 生命周期变化，功能上类似，写法上 on+名称；Vue3 组合式 API 需要先引入，选项 API 可直接调用；beforeCreate/created 在 Vue3
   中取消，在 setup 中运行

2. 多根节点，也就是`fragment`，Vue2 中，编写页面的时候，我们需要去将组件包裹在`<div>`中，否则报错警告。

3. 异步组件。Vue3 提供 `Suspense`组件，允许程序在等待异步组件时渲染兜底的内容，如 loading ，使用户体验更平滑。
   使用它，需在模板中声明，并包括两个命名插槽：`default`和`fallback`。`Suspense`
   确保加载完异步内容时显示默认插槽，并将`fallback`插槽用作加载状态。

4. `teleport` . Vue3 提供`Teleport`组件可将部分 DOM 移动到 Vue app 之外的位置。

5. 组合式 API。Vue2 中一个逻辑会散乱在文件不同位置（data、props、computed、watch、生命周期函数等），导致代码的可读性变差，需要上下来回跳转文件位置。组合式
   API 还提供了较为完美的逻辑复用性方案，解决了 Vue2 `Mixin`的存在的命名冲突隐患，依赖关系不明确，不同组件间配置化使用不够灵活。

6. 响应式原理。Vue2 响应式原理基础是`Object.defineProperty`；Vue3 响应式原理基础是 `Proxy`。

   主要原因：无法监听对象或数组新增、删除的元素。 Vue2 方案：针对常用数组原型方法`push`、`pop`、`shift`、`unshift`、`splice`
   、`sort`、`reverse`进行了 hack 处理；提供`Vue.set`监听对象/数组新增属性。对象的新增/删除响应，还可以`new`
   个新对象，新增则合并新属性和旧对象；删除则将删除属性后的对象深拷贝给新对象。

   **Tips：** `Object.defineOProperty`是可以监听数组已有元素，但 Vue2 没有提供的原因是`性能`问题

   对象/数组的新增、删除。

   监测.length 修改。

   Map、Set、WeakMap、WeakSet 的支持。

7. 虚拟 DOM。Vue3 相比于 Vue2 虚拟 DOM 上增加`patchFlag`字段。

8. 事件缓存。Vue3 的 `cacheHandler`可在第一次渲染后缓存我们的事件。相比于 Vue2 无需每次渲染都传递一个新函数。加一个`click`
   事件。

9. Diff 优化。patchFlag 帮助 diff 时区分静态节点，以及不同类型的动态节点。一定程度地减少节点本身及其属性的比对。

10. 打包优化。tree-shaking，移除 JavaScript 上下文中未引用的代码。以`nextTick`为例子，在 Vue2 中，全局 API 暴露在 Vue
    实例上，即使未使用，也无法通过`tree-shaking`进行消除。Vue3 中针对全局 和内部的 API 进行了重构，并考虑到`tree-shaking`
    的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问。

11. TS 支持

react 是通过 setState 的 api 触发状态更新的，更新以后就重新渲染整个 vdom。

而 vue 是通过对状态做代理，get 的时候收集以来，然后修改状态的时候就可以触发对应组件的 render 了。

那 vue 为啥可以做到精准的更新变化的组件呢？因为响应式的代理呀，不管是子组件、父组件、还是其他位置的组件，只要用到了对应的状态，那就会被作为依赖收集起来，状态变化的时候就可以触发它们的
render，不管是组件是在哪里的。

react 的 setState 会渲染整个 vdom，而一个应用的所有 vdom 可能是很庞大的，计算量就可能很大。

### **fiber 架构**

优化的目标是打断计算，分多次进行，但现在递归的渲染是不能打断的，有两个方面的原因导致的：

- 渲染的时候直接就操作了 dom 了，这时候打断了，那已经更新到 dom 的那部分怎么办？
- 现在是直接渲染的 vdom，而 vdom 里只有 children 的信息，如果打断了，怎么找到它的父节点呢？

第一个问题的解决还是容易想到的：渲染的时候不要直接更新到 dom 了，只找到变化的部分，打个增删改的标记，创建好
dom，等全部计算完了一次性更新到 dom 就好了。

所以 react 把渲染流程分为了两部分：render 和 commit。

render 阶段会找到 vdom 中变化的部分，创建 dom，打上增删改的标记，这个叫做 reconcile，调和。

reconcile 是可以打断的，由 schedule 调度。

之后全部计算完了，就一次性更新到 dom，叫做 commit。

这样，react 就把之前的和 vue 很像的递归渲染，改造成了 render（reconcile + schdule） + commit 两个阶段的渲染。

第二个问题，如何打断以后还能找到父节点、其他兄弟节点呢？

现有的 vdom 是不行的，需要再记录下 parent、silbing 的信息。所以 react 创造了 fiber 的数据结构。

除了 children 信息外，额外多了 sibling、return，分别记录着兄弟节点、父节点的信息。

这个数据结构也叫做 fiber。（fiber 既是一种数据结构，也代表 render + commit 的渲染流程）

react 会先把 vdom 转换成 fiber，再去进行 reconcile，这样就是可打断的了。

reconcile 的时候把有 effectTag 的节点收集到一个队列里，然后 commit 阶段直接遍历这个队列就行了。这个队列叫做
effectList。react 会在 commit 阶段遍历 effectList，根据 effectTag 来增删改 dom。

useEffect 被设计成了在 dom 操作前异步调用，useLayoutEffect 是在 dom 操作后同步调用。
