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
