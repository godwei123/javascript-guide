# vue 原理相关总结

## **一、vue2.0 的双向绑定是怎么实现的**

```
1、view和model相互实时更新原理：Object.defineProperty数据劫持+发布者-订阅者(依赖收集)模式
2、observer，compile，watcher
（1）observe是一个数据监听器，核心方法是Object.defineProperty
（2）watcher是一个订阅者，将Observer发来的update消息处理，执行更新
（3）compile是一个指令解析器，对需要监听的节点和属性进行扫描和解析。
3、此模式的优点：不需要显式调用，可以直接通知变化，更新视图；劫持了属性setter，不需要额外的diff操作
4、Object.defineProperty缺点
（1）不能监听数组
（2）不能监听整个对象，只能监听属性
（3）不能监听属性的增删，只能监听变化
5、3.0版本使用Proxy
（1）可以监听数组
（2）可直接监听整个对象，不用层层递归属性
（3）get和set时候直接有参数，不需要单独存储变量
（4）new Proxy()会返回一个新对象，不会污染源对象。
6、参考文档：https://blog.nowcoder.net/n/8517450fe4fd4220b4078f9c61e42ec1#:~:text=Vue%20%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A,%E6%89%A7%E8%A1%8C%E5%AF%B9%E5%BA%94%E7%9A%84%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%E3%80%82
```

## **二、数据不更新的问题**

```
1、更新的原理：在数据读取时收集依赖，在赋值时通知依赖更新。
2、object有defineProperty方法，通过getter，setter只监听了属性的读取和赋值，但是新增属性和删除属性没有检测，所以专门提供了$set和$delete来实现

3、array，没有defineProperty方法，没有setter，通过get和新建数组方法拦截器修改原生方法push,pop,shift,unshift,splice,sort,reserve来实现监听，而通过修改数组下标操作数组的不会被检测，所以专门提供了$set和$delete来实现

4、$set(target, key, value)和$delete(target, propertyName/index)方法原理
（1）判断target是否是undefined，null，或者原始类型,或者vue实例，或者vue实例的跟数据对象
（2）target为数组，则还是通过调用splice操作索引更新数据
（3）target为对象，且为响应式，则调用defineReactive操作数据
（4）更新完数据后通知依赖更新
```

## **三、computed 和 watch 和 methods**

```
1、computed
（1）设计初衷：为了使模板中的逻辑运算更简单
（2）适用于数据被重复使用或者计算复杂费时的场景；依赖其他数据的场景
（3）读取缓存，依赖不变，则不需重新计算。（根据dirty标志判断）
2、watch是对数据的监听回调
3、computed和watch的区别
相同点：都会观察页面的数据变化
不同点：（1）computed是读取缓存，watch每次都要重新执行；
（2）watch更适合数据变化时的异步操作和开销较大的操作。
4、computed和methods的区别
computed依赖缓存，可以定义getter和setter，但是methods不行
```

## **四、vue-router 的模式区别**

```
1、abstract：非浏览器环境下使用
2、hash：
（1）默认。监听hashchange实现。
（2）有点，兼容性好，ie8支持
（3）缺点：看起来奇怪
3、history：
（1）h5新增的。允许开发者直接修改前端路由而不重新触发请求页面
（2）实现原理：监听popstate事件。能监听到用户点击浏览器的前进后退事件或者手动调用go，back，forward事件；不能监听到pushState和replaceState事件。
（3）为了避免浏览器刷新出现的404页面，需要在服务端配置兼容。
（4）如果浏览器不支持，会降级到hash模式
* 通过vue.use插件机制和vue.mixin将store在beforeCreate和destroyed生命周期进行混入。

```

## **五、vuex 解决了什么问题**

```
1、vuex解决了vue项目中的数据状态管理问题
2、是组件通信的一种方式。
3、原理：创建了单一的状态树，包含state，mutation，action，getter，module。
4、view(dispatch)action(commit)mutation(mutate)state(render)view
5、通过vue的data和computed，让state变成响应式，
6、通过vue.use插件机制和vue.mixin将store在beforeCreate生命周期进行混入。
```

## **六、nextTick 是怎么是实现的**

```
1、作用：将回调延迟到下次DOM更新循环之后执行
2、原因：VUE在更新DOM时是异步的，vue检测到数据变化后，不会立即更新DOM，而是会开启一个事件队列，并缓冲同一时间循环中的所有数据变更，在下一次tick中，执行更新DOM。
3、js的运行机制：js是单线程的，基于事件循环，有宏任务和微任务。
4、内部原理：
    （1）能力检测：Promise.then(微), MutationObserve(微)，setImmediate(微),setTimeout(宏)
    （2）将回调函数推入回调队列，锁上易步锁，执行回调。
```

## **七、keep-alive 内置组件和 LRU 算法（队列）**

```
1、自身不会渲染成DOM，没有常规的<template>标签，是个函数组件，被他包裹的组件，切换时会被缓存在内存中，而不是销毁。
    （1）可以有条件的缓存:include（匹配到的缓存）,exclude（匹配到的不缓存）,max(最多可以缓存多少组件实例)
2、原理：内部维护了this.cache（缓存的组件对象）和this.keys（this.cache中的key），运用LRU策略。
    （1）命中了缓存的组件要调整组件key的顺序。
    （2）缓存的组件数量如果超过this.max时，要删除第一个缓存组件。
    （3）LRU(Least recently used，最近最少使用)：根据数据的历史访问记录来进行淘汰数据。“如果数据最近被访问过，那么将来被访问的几率也更高。”
3、生命周期钩子：activated和deactivated，被keep-alive包括的组件激活和停用时调用。先停用组件的deactivated，再激活组件的activated
```

## **八、Vue3 的七种组件通信方式**

- props
- emit
- v-model
- refs
- provide/inject
- eventBus
- vuex/pinia(状态管理工具)

**1、Props 方式**

`Props`方式是 Vue 中最常见的一种**父传子**的一种方式，使用也比较简单。

根据上面的 demo，我们将数据以及对数据的操作定义在父组件，子组件仅做列表的一个渲染；

父组件代码如下：

```
<template>
  <!-- 子组件 -->
  <child-components :list="list"></child-components>
  <!-- 父组件 -->
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
</script>

复制代码
```

子组件只需要对父组件传递的值进行渲染即可，代码如下：

```
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in props.list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

复制代码
```

**2、emit 方式**

`emit`方式也是 Vue 中最常见的组件通信方式，该方式用于**子传父**；

根据上面的 demo，我们将列表定义在父组件，子组件只需要传递添加的值即可。

子组件代码如下：

```
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleSubmit" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
const value = ref('')
const emits = defineEmits(['add'])
const handleSubmit = () => {
  emits('add', value.value)
  value.value = ''
}
</script>
复制代码
```

在子组件中点击【添加】按钮后，`emit`一个自定义事件，并将添加的值作为参数传递。

父组件代码如下：

```
<template>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components @add="handleAdd"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
// add 触发后的事件处理函数
const handleAdd = value => {
  list.value.push(value)
}
</script>

复制代码
```

在父组件中只需要监听子组件自定义的事件，然后执行对应的添加操作。

**3、v-model 方式**

`v-model`是 Vue 中一个比较出色的语法糖，就比如下面这段代码

```
<ChildComponent v-model:title="pageTitle" />

复制代码
```

就是下面这段代码的简写形势

```
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
复制代码
```

`v-model`确实简便了不少，现在我们就来看一下上面那个 demo，如何用 v-model 实现。

子组件

```
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue'
const value = ref('')
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const emits = defineEmits(['update:list'])
// 添加操作
const handleAdd = () => {
  const arr = props.list
  arr.push(value.value)
  emits('update:list', arr)
  value.value = ''
}
</script>

复制代码
```

在子组件中我们首先定义`props`和`emits`，然后添加完成之后`emit`指定事件。

> 注：`update:*`是 Vue 中的固定写法，`*`表示`props`中的某个属性名。

父组件中使用就比较简单，代码如下：

```
<template>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components v-model:list="list"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
</script>

复制代码
```

**4、refs 方式**

在使用选项式 API 时，我们可以通过`this.$refs.name`的方式获取指定元素或者组件，但是组合式 API 中就无法使用哪种方式获取。如果我们想要通过`ref`的方式获取组件或者元素，需要定义一个同名的 Ref 对象，在组件挂载后就可以访问了。

示例代码如下：

```
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in childRefs?.list" :key="i">
      {{ i }}
    </li>
  </ul>
  <!-- 子组件 ref的值与<script>中的保持一致 -->
  <child-components ref="childRefs"></child-components>
  <!-- 父组件 -->
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const childRefs = ref(null)
</script>

复制代码
```

子组件代码如下：

```
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
defineExpose({ list })
</script>

复制代码
```

`setup`组件默认是关闭的，也即通过模板`ref`获取到的组件的公开实例，**不会暴露任何在\*\***`<script setup>`\***\*中声明的绑定**。如果需要**公开需要通过\*\***`defineExpose`\***\* API 暴露**。

**5、provide/inject 方式**

`provide`和`inject`是 Vue 中提供的一对 API，该 API 可以实现父组件向子组件传递数据，无论层级有多深，都可以通过这对 API 实现。示例代码如下所示：

父组件

```
<template>
  <!-- 子组件 -->
  <child-components></child-components>
  <!-- 父组件 -->
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
// 向子组件提供数据
provide('list', list.value)
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
</script>

复制代码
```

子组件

```
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
import { inject } from 'vue'
// 接受父组件提供的数据
const list = inject('list')
</script>
复制代码
```

值得注意的是**使用`provide`进行数据传递时，尽量`readonly`进行数据的包装，避免子组件修改父级传递过去的数据**。

**6、事件总线**

Vue3 中移除了事件总线，但是可以借助于第三方工具来完成，Vue 官方推荐**mitt**[2]或**tiny-emitter**[3]；

在大多数情况下不推荐使用全局事件总线的方式来实现组件通信，虽然比较简单粗暴，但是长久来说维护事件总线是一个大难题，所以这里就不展开讲解了，具体可以阅读具体工具的文档

**7、状态管理工具**

**Vuex**[4]和**Pinia**[5]是 Vue3 中的状态管理工具，使用这两个工具可以轻松实现组件通信，由于这两个工具功能比较强大，这里就不做展示了，具体可以查阅文档

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

![image-20220715224607703](../public/20220715224607703.png)

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

# Vue 面试题

## MVVM

传统组件，只是静态渲染，更新依赖于 DOM 操作。数据驱动视图，更关注于业务数据和业务逻辑，框架去操作 DOM 和更新页面。

MVVM 是 Model-View-ViewModel 缩写，也就是把 MVC 中的 Controller 演变成 ViewModel。Model 层代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 层的桥梁，数据会绑定到 viewModel 层并自动将数据渲染到页面中，视图变化的时候会通知 viewModel 层更新数据。

## Vue2.x 响应式数据原理

Vue 在初始化数据时，会使用 Object.defineProperty 重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的 watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。

众所周知 `Vue2` 数据响应式是通过 `Object.defineProperty()` 劫持各个属性 getter 和 setter，在数据变化时发布消息给订阅者，触发相应的监听回调，而这之间存在几个问题

- 初始化时需要遍历对象所有 key，如果对象层次较深，性能不好
- 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
- Object.defineProperty 无法监听到数组元素的变化，只能通过劫持重写数方法
- 动态新增，删除对象属性无法拦截，只能用特定 set/delete API 代替
- 不支持 Map、Set 等数据结构

## Vue3.x 响应式数据原理

Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。

监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？

我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。

## Vue2 & Vue3

`Vue2`内部通过观察者模式处理数据与依赖的关系，观察者模式的特点：

- 一对多。多个对象之间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于他的对象都得到通知并被自动更新
- 降低目标数据与依赖之间的耦合关系
- 属于行为型设计模式

**代理模式**属于设计模式中的一种结构型模式。通过代理模式我们可以基于原始对象，创建一个与之拥有相同接口的代理对象，在代理对象的接口中，我们可以做一些扩展性的操作，但是并不破坏原始对象。

当我们需要对原始对象的访问做一些**控制或者加强**时，就可以使用代理模式。

代理模式的特点：

- 可以控制外部对于原始对象的访问，可以代表原始对象，通过代理对象以控制对原始对象的访问。
- 职责清晰、高扩展性、智能化
  - 代理对象用于控制外界对原始对象的访问
  - 可以借助代理对象，增强或扩展接口功能
- 属于结构型设计模式
- 例：使用虚拟代理加载图片、正/反向代理、静/动态代理、属性校验。

`Vue3`响应式是基于`Proxy`的代理模式。通过**配置`handler`\*\*我们就可以对原始对象的访问\*\*进行控制 & 增强**。

## vue2.x 中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

## defineProperty 和 Proxy 的区别

为什么要用 Proxy 代替 defineProperty ？好在哪里？

- Object.defineProperty 是 Es5 的方法，Proxy 是 Es6 的方法
- defineProperty 不能监听到数组下标变化和对象新增属性，Proxy 可以
- defineProperty 是劫持对象属性，Proxy 是代理整个对象
- defineProperty 局限性大，只能针对单属性监听，所以在一开始就要全部递归监听。Proxy 对象嵌套属性运行时递归，用到才代理，也不需要维护特别多的依赖关系，性能提升很大，且首次渲染更快
- defineProperty 会污染原对象，修改时是修改原对象，Proxy 是对原对象进行代理并会返回一个新的代理对象，修改的是代理对象
- defineProperty 不兼容 IE8，Proxy 不兼容 IE11

## Vue3 Diff 算法和 Vue2 的区别

我们知道在数据变更触发页面重新渲染，会生成虚拟 DOM 并进行 patch 过程，这一过程在 Vue3 中的优化有如下

编译阶段的优化：

- 事件缓存：将事件缓存(如: @click)，可以理解为变成静态的了
- 静态提升：第一次创建静态节点时保存，后续直接复用
- 添加静态标记：给节点添加静态标记，以优化 Diff 过程

由于编译阶段的优化，除了能更快的生成虚拟 DOM 以外，还使得 Diff 时可以跳过"永远不会变化的节点"，Diff 优化如下

- Vue2 是全量 Diff，Vue3 是静态标记 + 非全量 Diff
- 使用最长递增子序列优化了对比流程

## nextTick 知道吗，实现原理是什么？

在下次 DOM 更新循环结束之后执行延迟回调。nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试采用 Promise、MutationObserver、setImmediate，如果以上都不行则采用 setTimeout

定义了一个异步方法，多次调用 nextTick 会将方法存入队列中，通过这个异步方法清空当前队列。

## Vue 的生命周期

beforeCreate 是 new Vue()之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。

created 在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 Dom 进行交互，如果非要想，可以通过 vm.$nextTick 来访问 Dom。

beforeMount 发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated。

mounted 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用$refs 属性对 Dom 进行操作。

beforeUpdate 发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

updated 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

beforeDestroy 发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。（beforeUnmounted）

destroyed 发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。(unmounted)

activated、deactivated

setup = beforeCreate + created

## 接口请求一般放在哪个生命周期中？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

能更快获取到服务端数据，减少页面 loading 时间；

ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## Computed 和 Watch

Computed 本质是一个具备缓存的 watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

Watch 没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开 deep：true 选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用 unWatch 手动注销哦。

## v-if 和 v-show 的区别

当条件不成立时，v-if 不会渲染 DOM 元素，

v-show 操作的是样式(display)，切换当前 DOM 的显示和隐藏。

## 组件中的 data 为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果 data 是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间 data 不冲突，data 必须是一个函数。

## v-model 的原理

v-model 本质就是一个语法糖，可以看成是 value + input 方法的语法糖。可以通过 model 属性的 prop 和 event 属性来进行自定义。原生的 v-model，会根据标签的不同生成不同的事件和属性。

onfocus -> 键盘输入 -> onkeydown -> onkeypress -> onkeyup -> oninput -> 失去焦点 -> onchange -> onblur

文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` property 并侦听 `input` 事件；

`<input type="checkbox">` 和 `<input type="radio">` 会绑定 `checked` property 并侦听 `change` 事件；

`<select>` 会绑定 `value` property 并侦听 `change` 事件.

- 默认情况下，`v-model` 会在每次 `input` 事件后更新数据 ([IME 拼字阶段的状态](https://cn.vuejs.org/guide/essentials/forms.html#vmodel-ime-tip)例外)。**你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据**：

- 如果你想让用户输入自动转换为数字，你可以在 `v-model` 后添加 `.number` 修饰符来管理输入;

- 如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim` 修饰符

**在自定义组件中使用**：

1. 将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop

2. 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

3. 组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到。

4. 对于又有参数又有修饰符的 `v-model` 绑定，生成的 prop 名将是 `arg + "Modifiers"`。举例来说：

   `<MyComponent v-model:title.capitalize="myText">`

   => “titleModifiers”

5.

## Vue 事件绑定原理

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on 实现的。

## Vue 模版编译原理知道吗，能简单说一下吗？

简单说，Vue 的编译过程就是将 template 转化为 render 函数的过程。会经历以下阶段：

- 生成 AST 树
- 优化
- codegen

首先解析模版，生成 AST 语法树(一种用 JavaScript 对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue 的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的 DOM 也不会变化。那么优化过程就是深度遍历 AST 树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。

编译的最后一步是将优化后的 AST 树转换为可执行的代码。

## Vue2.x 和 Vue3.x 渲染器的 diff 算法分别说一下

简单来说，diff 算法有以下过程

- 同级比较，再比较子节点
- 先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)
- 比较都有子节点的情况(核心 diff)
- 递归比较子节点

正常 Diff 两个树的时间复杂度是 O(n^3)，但实际情况下我们很少会进行跨层级的移动 DOM，所以 Vue 将 Diff 进行了优化，从 O(n^3) -> O(n)，只有当新旧 children 都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。

Vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的 Diff 算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x 借鉴了 ivi 算法和 inferno 算法

在创建 VNode 时就确定其类型，以及在 mount/patch 的过程中采用位运算来判断一个 VNode 的类型，在这个基础之上再配合核心的 Diff 算法，使得性能上较 Vue2.x 有了提升。(实际的实现可以结合 Vue3.x 源码看。)

该算法中还运用了动态规划的思想求解最长递归子序列。

## 虚拟 Dom 以及 key 属性的作用

由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。

Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现。

Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点。是对真实 DOM 的一层抽象。(也就是源码中的 VNode 类，它定义在 src/core/vdom/vnode.js 中。)

VirtualDOM 映射到真实 DOM 要经历 VNode 的 create、diff、patch 等阶段。

「key 的作用是尽可能的复用 DOM 元素。」

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key 也就是 children 中节点的唯一标识。

## keep-alive 了解吗

keep-alive 可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性 include/exclude，允许组件有条件的进行缓存。

两个生命周期 activated/deactivated，用来得知当前组件是否处于活跃状态。

keep-alive 的中还运用了 LRU(Least Recently Used)算法。

## Vue 中组件生命周期调用顺序说一下

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount- >子 mounted->父 mounted

子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

## Vue3.x 组件通信有哪些方式？

- props, defineProps
- $emit, defineEmits
- expose / ref, defineExpose(暴露子组件的属性和方法，父组件中可以通过 ref 获取)
- $attrs, useAttrs() 包含父作用域里除 class 和 style 除外的非 props **属性集合**
- v-model, 可以支持多个数据双向绑定
- provide / inject, 依赖注入
- Vuex/Pina,，状态管理
- mitt, EventBus 跨组件通信

## Vue2.x 组件通信有哪些方式？

- props

- $emit / v-on,子组件通过派发事件的方式给父组件数据，或者触发父组件更新等操作,this.emit(“update:xxx”)

- .sync, 可以帮我们实现父组件向子组件传递的数据 的双向绑定，所以子组件接收到数据后**可以直接修改**，并且会同时修改父组件的数据(已废弃)

- v-model, 和 .sync 类似，可以实现将父组件传给子组件的数据为双向绑定，子组件通过 $emit 修改父组件的数据

- ref, ref 如果在普通的 DOM 元素上，引用指向的就是该 DOM 元素;如果在子组件上，引用的指向就是子组件实例，然后父组件就可以通过 ref 主动获取子组件的属性或者调用子组件的方法

- \$children / $parent,

  `$children`：获取到一个包含所有子组件(不包含孙子组件)的 VueComponent 对象数组，可以直接拿到子组件中所有数据和方法等

  `$parent`：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等

- \$attrs / $listeners,多层嵌套组件传递数据时，如果只是传递数据，而不做中间处理的话就可以用这个.

  `$attrs`：包含父作用域里除 class 和 style 除外的非 props **属性集合**。通过 this.\$attrs 获取父作用域中所有符合条件的属性集合，然后还要继续传给子组件内部的其他组件，就可以通过 v-bind="$attrs"

  `$listeners`：包含父作用域里 .native 除外的监听**事件集合**。如果还要继续传给子组件内部的其他组件，就可以通过 v-on="$linteners"

- provide / inject

- EventBus

- Vuex

- $root, `$root` 可以拿到 App.vue 里的数据和方法

- slot

## Vue 的性能优化（概述）

1、编码阶段

- 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
- v-if 和 v-for 不能连用
- 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
- SPA 页面采用 keep-alive 缓存组件
- 在更多的情况下，使用 v-if 替代 v-show
- key 保证唯一
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- 图片懒加载
- SEO 优化

2、预渲染

- 服务端渲染 SSR
- 打包优化

3、压缩代码

- Tree Shaking/Scope Hoisting
- 使用 cdn 加载第三方模块
- 多线程打包 happypack
- splitChunks 抽离公共文件
- sourceMap 优化

4、用户体验

- 骨架屏
- PWA
- 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 gzip 压缩等。

## hash 路由和 history 路由实现原理说一下

**location.hash** 的值实际就是 URL 中#后面的东西。

window.onhashchange = function(){}

hash 会引起浏览器前进和后退

history 实际采用了 HTML5 中提供的 API 来实现，主要有 history.pushState()和 history.replaceState()、window.onpopstate()。

需要后端支持

vue 或 react 框架相关

vue 响应式原理以及双向绑定实现代码 ?

vue3 响应式原理，有什么不同？

vue 的 diff 算法思路，怎么对比节点？

vue 的 compile 实现？

vue 如何自定义指令？具体的 api 写法？

vue3 对于 vue2 在性能上的优化（从 compile 和 runtime 两方面）？

## Vue 父组件可以监听到子组件的生命周期吗?

1）实现方式一

比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```jsx
// Parent.vue
<Child @mounted="doSomething"/>

// Child.vue
mounted() {
  this.$emit("mounted");
}
```

2）实现方式二

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```jsx
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

## Vue 为什么要用 vm.$set() 解决对象新增属性不能响应的问题 ？你能说说如下代码的实现原理么

Vue.set (object, propertyName, value)

vm.$set (object, propertyName, value)

1）Vue 为什么要用 vm.$set() 解决对象新增属性不能响应的问题

Vue 使用了 Object.defineProperty 实现双向数据绑定,在初始化实例时对属性执行 getter/setter 转化,属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的（这也就造成了 Vue 无法检测到对象属性的添加或删除）

所以 Vue 提供了 Vue.set (object, propertyName, value) / vm.\$set (object, propertyName, value)

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // target 为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key);
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val);
    return val;
  }
  // key 已经存在，直接修改属性值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

1.如果目标是数组，直接使用数组的 splice 方法触发相应式；

2.如果目标是对象，会先判读属性是否存在、对象是否是响应式，

3.最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理

## keep-alive

- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

原理：

```js
// 源码位置：src/core/packages/keep-alive.js
export default {
  name: "keep-alive",
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number], // 缓存的组件实例数量上限
  },

  created() {
    this.cache = Object.create(null); // 缓存虚拟dom
    this.keys = []; // 缓存的虚拟dom的健集合
  },

  destroyed() {
    for (const key in this.cache) {
      // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    // 实时监听黑白名单的变动
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },

  render() {
    // .....
  },
};
```

大概的分析源码，我们发现与我们定义组件的过程一样，先是设置组件名为 keep-alive，其次定义了一个 abstract 属性，值为 true。这个属性在 vue 的官方教程并未提及，其实是一个虚组件，后面渲染过程会利用这个属性。props 属性定义了 keep-alive 组件支持的全部参数。

接下来重点就是 keep-alive 在它生命周期内定义了三个钩子函数了

- created

初始化两个对象分别缓存 VNode（虚拟 DOM）和 VNode 对应的键集合

- destroyed

删除缓存 VNode 还要对应执行组件实例的 destory 钩子函数。

删除 this.cache 中缓存的 VNode 实例。不是简单地将 this.cache 置为 null，而是遍历调用 pruneCacheEntry 函数删除。

```js
// src/core/packages/keep-alive.js
function pruneCacheEntry(cache: VNodeCache, key: string, keys: Array<string>, current?: VNode) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy(); // 执行组件的 destory 钩子函数
  }
  cache[key] = null;
  remove(keys, key);
}
```

- mounted

在 mounted 这个钩子中对 include 和 exclude 参数进行监听，然后实时地更新（删除）this.cache 对象数据。pruneCache 函数的核心也是去调用 pruneCacheEntry。

**render**

```js
// src/core/packages/keep-alive.js
render () {
const slot = this.$slots.default
const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
if (componentOptions) { // 存在组件参数
    // check pattern
    const name: ?string = getComponentName(componentOptions) // 组件名
    const { include, exclude } = this
    if ( // 条件匹配
    // not included
    (include && (!name || !matches(include, name))) ||
    // excluded
    (exclude && name && matches(exclude, name))
    ) {
    return vnode
    }

    const { cache, keys } = this
    const key: ?string = vnode.key == null // 定义组件的缓存key
    // same constructor may get registered as different local packages
    // so cid alone is not enough (#3269)
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : vnode.key
    if (cache[key]) { // 已经缓存过该组件
    vnode.componentInstance = cache[key].componentInstance
    // make current key freshest
    remove(keys, key)
    keys.push(key) // 调整key排序
    } else {
    cache[key] = vnode // 缓存组件对象
    keys.push(key)
    // prune oldest entry
    if (this.max && keys.length > parseInt(this.max)) {
        // 超过缓存数限制，将第一个删除（LRU缓存算法）
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
    }

    vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
}
return vnode || (slot && slot[0])
}
```

第一步：获取 keep-alive 包裹着的第一个子组件对象及其组件名；

第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；

第三步：根据组件 ID 和 tag 生成缓存 Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该 key 在 this.keys 中的位置（更新 key 的位置是实现 LRU 置换策略的关键），否则执行第四步；

第四步：在 this.cache 对象中存储该组件实例并保存 key 值，之后检查缓存的实例数量是否超过 max 的设置值，超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）。

第五步：最后并且很重要，将该组件实例的 keepAlive 属性值设置为 true。

最后就是再次渲染执行缓存和对应钩子函数了

## Vue v-model 是如何实现的，语法糖

在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件

本质是一个父子组件通信的语法糖，通过 prop 和\$.emit 实现

## 对虚拟 DOM 的理解

### 一、什么是虚拟 Dom

从本质上来说，Virtual Dom 是一个 JavaScript 对象，通过对象的方式来表示 DOM 结构。将页面的状态抽象为 JS 对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能。

虚拟 dom 是对 DOM 的抽象，这个对象是更加轻量级的对 DOM 的描述。它设计的最初目的，就是更好的跨平台，比如 Node.js 就没有 DOM,如果想实现 SSR,那么一个方式就是借助虚拟 dom, 因为虚拟 dom 本身是 js 对象。

在代码渲染到页面之前，vue 或者 react 会把代码转换成一个对象（虚拟 DOM）。以对象的形式来描述真实 dom 结构，最终渲染到页面。在每次数据发生变化前，虚拟 dom 都会缓存一份，变化之时，现在的虚拟 dom 会与缓存的虚拟 dom 进行比较。

在 vue 或者 react 内部封装了 diff 算法，通过这个算法来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。

另外现代前端框架的一个基本要求就是无须手动操作 DOM,一方面是因为手动操作 DOM 无法保证程序性能，多人协作的项目中如果 review 不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动 DOM 操作可以大大提高开发效率。

### 二、为什么要用 Virtual DOM

1.保证性能下限，在不进行手动优化的情况下，提供过得去的性能

看一下页面渲染的一个流程：

解析 HTNL ☞ 生成 DOM🌲 ☞ 生成 CSSOM ☞ Layout ☞ Paint ☞ Compiler

下面对比一下修改 DOM 时真实 DOM 操作和 Virtual DOM 的过程，来看一下它们重排重绘的性能消耗：

真实 DOM： 生成 HTML 字符串 + 重建所有的 DOM 元素

Virtual DOM： 生成 vNode + DOMDiff + 必要的 dom 更新

Virtual DOM 的更新 DOM 的准备工作耗费更多的时间，也就是 JS 层面，相比于更多的 DOM 操作它的消费是极其便宜的。尤雨溪在社区论坛中说道： 框架给你的保证是，你不需要手动优化的情况下，我依然可以给你提供过得去的性能。

2.跨平台

Virtual DOM 本质上是 JavaScript 的对象，它可以很方便的跨平台操作，比如服务端渲染、uniapp 等。

### 三、Virtual DOM 真的比真实 DOM 性能好吗

首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。
正如它能保证性能下限，在真实 DOM 操作的时候进行针对性的优化时，还是更快的。

## vue-router 的原理

实现原理
vue-router 的原理就是更新视图而不重新请求页面。

vue-router 可以通过 mode 参数设置为三种模式：hash 模式、history 模式、abstract 模式 。

### 1.hash 模式

默认是 hash 模式,基于浏览器 history api，使用 window.addEventListener("hashchange",callback,false) 对浏览器地址进行监听。当调用 push 时，把新路由添加到浏览器访问历史的栈顶。使用 replace 时，把浏览器访问历史的栈顶路由替换成新路由。

hash 值等于 url 中#及其以后的内容。浏览器是根据 hash 值的变化，将页面加载到相应的 DOM 位置。锚点变化只是浏览器的行为，每次锚点变化后依然会在浏览器中留下一条历史记录，可以通过浏览器的后退按钮回到上一个位置。

### 2.History

history 模式，基于浏览器 history api，使用 window.onpopstate 对浏览器地址进行监听。对浏览器 history api 中 pushState()、replaceState() 进行封装，
当方法调用，会对浏览器历史栈进行修改。从而实现 URL 的跳转而无需重新加载页面。

但是它的问题在于当刷新页面的时候会走后端路由，所以需要服务端的辅助来兜底，避免 URL 无法匹配到资源时能返回页面。

### 3.abstract

不涉及和浏览器地址的相关记录。流程跟 hash 模式一样，通过数组维护模拟浏览器的历史记录栈。

服务端下使用。使用一个不依赖于浏览器的浏览历史虚拟管理后台。

4.总结
hash 模式和 history 模式都是通过 window.addEventListenter() 方法监听 hashchange 和 popState 进行相应路由的操作。可以通过 back、foward、go 等方法访问浏览器的历史记录栈，进行各种跳转。而 abstract 模式是自己维护一个模拟的浏览器历史记录栈的数组。

## Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

异步更新队列,Vue 在更新 DOM 时是异步执行的，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。

## Vue3 与 Vue2 的对比

**Vue2 的缺点：**

1. Mixin,特别容易发生命名冲突，暴露出来的变量意图不是很明显，重用到其他组件容易冲突。
2. vue2 对于 typeScript 的支持非常有限，没有考虑到 ts 的集成。
3. vue3 的出现就是为了解决 vue2 的弊端，其 composition API 很好的解决了逻辑复用的问题，而且 vue3 源码就是用 ts 写的，对 ts 的支持非常好。我们在开发项目过程中可以使用 ts 的加持，使代码更加健壮。

**vue3 的优点**

1. vue3 支持 vue2 的大多数特性，实现对 vue2 的兼容
2. vue3 对比 vue2 具有明显的性能提升
3. 打包大小减少 41%
4. 初次渲染快 55%，更新快 133%
5. 内存使用减少 54%
6. vue3 具有的 composition API 实现逻辑模块化和重用
7. 增加了新特性，如 Teleport 组件，全局 API 的修改和优化等

**响应式原理的不同**
Vue2.x 实现双向数据绑定原理，是通过 es5 的 Object.defineProperty，根据具体的 key 去读取和修改。其中的 setter 方法来实现数据劫持的，getter 实现数据的修改。但是必须先知道想要拦截和修改的 key 是什么，所以 vue2 对于新增的属性无能为力，比如无法监听属性的添加和删除、数组索引和长度的变更，vue2 的解决方法是使用 Vue.set(object, propertyName, value) 等方法向嵌套对象添加响应式。

Vue3.x 使用了 ES2015 的更快的原生 proxy 替代 Object.defineProperty。Proxy 可以理解成，在对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 可以直接监听对象而非属性，并返回一个新对象，具有更好的响应式支持

**生命周期的不同**

```javascript
beforeCreate -> 请使用 setup()
created -> 请使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
```

如果要想在页面中使用生命周期函数，以往 vue2 的操作是直接在页面中写入生命周期，而 vue3 是需要去引用的，这就是为什么 3 能够将代码压缩到更低的原因

**默认项目目录结构的不同**
vue3 移除了配置文件目录，config 和 build 文件夹，移除了 static 文件夹，新增 public 文件夹，并且 index.html 移动到 public 中，在 src 文件夹中新增了 views 文件夹，用于分类视图组件和公共组件

**vue3 对全局 API 的优化**
在 Vue3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问。

```javascript
import { nextTick } from "vue";
nextTick(() => {
  // 一些和DOM有关的东西
});
```

vue2 写法
vue2 全局配置的修改，会修改 Vue 对象的属性
在不同的 app 中，共享一份有着不同配置的 Vue 对象，也变得非常困难

```javascript
import Vue from 'vue'
import App from './App.vue'
Vue.config.xx=xx
Vue.use(...)
Vue.mixin(...)

new Vue({
  render:h=>h(app)
}).$mount('#app')

// vue3写法
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(APP) // 创建一个app实例
app.config.xx=xx  // 在实例上修改配置，不会发生冲突
app.use(...)
app.mixin(...)
app.mount('#app')
```

## 真实 dom 转变为虚拟 dom，代码实现

## Vue 定义全局方法

`Vue.prototype[method]=method`

`通过mixin，Vue.mixin(mixins)`

`通过插件Vue.use(plugin)`

## 显示内容，为什么？

```
<template>
  <div>{{a.b}}</div>
</template>

<script>
export default {
  data () {
    return {
      a: {}
    }
  },
  created () {
    this.a.b = 1
  },
  mounted () {
    this.a.b = 2
  }
}
</script>
```

答案：1
vue 初始化实例是，对 data 对象上的属性，进行 property 执行 setter、getter 监听，所以 b 属性未被监听到

## Vue attribute 透传

如果你**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置

`inheritAttrs: false`

`v-bind = "$attrs"`

1. 透传的 attribute 不会包含 `<MyButton>` 上声明过的 props 或是针对 `emits` 声明事件的 `v-on` 侦听函数，换句话说，声明过的 props 和侦听函数被 `<MyButton>`“消费”了。
2. 透传的 attribute 若符合声明，也可以作为 props 传入 `<BaseButton>`。

3. `$listeners`被移除，事件监听器整合到`$attrs`中
4. $attrs 包含 style、class 属性
5. .native 修饰符移除，子组件未定义触发的事件，将被作为子组件的根元素的原生事件监听

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

## 对 Vue3 的理解

## 在项目当中，用到的 Vue 的周边

## 路由 404 的原因，如何解决

## Vue 组件通信方式

## vue 路由 history 和 hash 两种模式的区别

## Vue 响应式原理

先手写了观察者模式（网上说是发布订阅模式，我觉得还是有区别的，发布订阅模式是 Vue 的 emit 和 $on 的实现原理），之后讲 Vue 如何递归去把数据添加到响应式系统 【Object.defineProperty】，然后讲 Dep 和 Watcher 类，Vue 在 Compile 阶段如何识别 data 数据，实例化 Watcher 的过程【Dep.target】

## Vue 组件间通信方式

（9 种，1. props 父传子 2. emit 子传父 3. bus 公共事件总线 4. Vuex 5. parent/children 6. Storage 7.
provide/inject 8. attrs 9. ref 和 refs）

## Vue 中 key 的作用，为什么有高效性？（就地复用、Diff 算法）

## vue 中 v-if 和 v-show 的区别

## vue 中的 nextTick 是什么

## nextTick 底层使怎么实现的

## Vue 中 key 值为什么不能用索引(diff 算法)

## Vue 常见的组件通信方法

## 兄弟组件通信你会考虑用哪些方法

## Vue MVVM 实现思路

## vue 有一个很深的子组件，父组件怎么给它传值（想问 inject，没学）

## Vue data 为什么是函数，深拷贝、浅拷贝

## Vue 使用 nextTick 的原因和作用，项目哪些场景用到了 nextTick

## vue 组件封装，写逻辑部分。大概是：全选单选，就像购物车的全选按钮，四个商品四个按钮，一个全选按钮，点击全选，商品都选中，反之，商品都选中则全选按钮亮

## vue 中怎么拦截路由

## vue3 和 vue2 的区别

## vue 的双向数据绑定,底层怎么实现

## v-if、v-show、v-html 的原理

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

## v-if, v-show 区别; v-if 缓存

v-if 是插入或移除元素，在 html 模板里是插入，或者不存在。v-show 只是简单的基于 css 切换.

v-if 是可以和 `<template>` 标签配合使用的。但 v-show 不行。

v-if 是有缓存的。v-show 没有缓存。

v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show
是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且 DOM 元素保留；

v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗；

v-if 适合运营条件不大可能改变；v-show 适合频繁切换。

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
