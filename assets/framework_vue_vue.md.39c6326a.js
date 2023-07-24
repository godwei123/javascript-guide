import{_ as s,o as n,c as a,U as l}from"./chunks/framework.c99fcb40.js";const d=JSON.parse('{"title":"vue 原理相关总结","description":"","frontmatter":{},"headers":[],"relativePath":"framework/vue/vue.md","filePath":"framework/vue/vue.md"}'),p={name:"framework/vue/vue.md"},e=l(`<h1 id="vue-原理相关总结" tabindex="-1">vue 原理相关总结 <a class="header-anchor" href="#vue-原理相关总结" aria-label="Permalink to &quot;vue 原理相关总结&quot;">​</a></h1><h2 id="一、vue2-0-的双向绑定是怎么实现的" tabindex="-1"><strong>一、vue2.0 的双向绑定是怎么实现的</strong> <a class="header-anchor" href="#一、vue2-0-的双向绑定是怎么实现的" aria-label="Permalink to &quot;**一、vue2.0 的双向绑定是怎么实现的**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">1、view和model相互实时更新原理：Object.defineProperty数据劫持+发布者-订阅者(依赖收集)模式</span></span>
<span class="line"><span style="color:#A6ACCD;">2、observer，compile，watcher</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）observe是一个数据监听器，核心方法是Object.defineProperty</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）watcher是一个订阅者，将Observer发来的update消息处理，执行更新</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）compile是一个指令解析器，对需要监听的节点和属性进行扫描和解析。</span></span>
<span class="line"><span style="color:#A6ACCD;">3、此模式的优点：不需要显式调用，可以直接通知变化，更新视图；劫持了属性setter，不需要额外的diff操作</span></span>
<span class="line"><span style="color:#A6ACCD;">4、Object.defineProperty缺点</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）不能监听数组</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）不能监听整个对象，只能监听属性</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）不能监听属性的增删，只能监听变化</span></span>
<span class="line"><span style="color:#A6ACCD;">5、3.0版本使用Proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）可以监听数组</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）可直接监听整个对象，不用层层递归属性</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）get和set时候直接有参数，不需要单独存储变量</span></span>
<span class="line"><span style="color:#A6ACCD;">（4）new Proxy()会返回一个新对象，不会污染源对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">6、参考文档：https://blog.nowcoder.net/n/8517450fe4fd4220b4078f9c61e42ec1#:~:text=Vue%20%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A,%E6%89%A7%E8%A1%8C%E5%AF%B9%E5%BA%94%E7%9A%84%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%E3%80%82</span></span></code></pre></div><h2 id="二、数据不更新的问题" tabindex="-1"><strong>二、数据不更新的问题</strong> <a class="header-anchor" href="#二、数据不更新的问题" aria-label="Permalink to &quot;**二、数据不更新的问题**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、更新的原理：在数据读取时收集依赖，在赋值时通知依赖更新。</span></span>
<span class="line"><span style="color:#A6ACCD;">2、object有defineProperty方法，通过getter，setter只监听了属性的读取和赋值，但是新增属性和删除属性没有检测，所以专门提供了$set和$delete来实现</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">3、array，没有defineProperty方法，没有setter，通过get和新建数组方法拦截器修改原生方法push,pop,shift,unshift,splice,sort,reserve来实现监听，而通过修改数组下标操作数组的不会被检测，所以专门提供了$set和$delete来实现</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">4、$set(target, key, value)和$delete(target, propertyName/index)方法原理</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）判断target是否是undefined，null，或者原始类型,或者vue实例，或者vue实例的跟数据对象</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）target为数组，则还是通过调用splice操作索引更新数据</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）target为对象，且为响应式，则调用defineReactive操作数据</span></span>
<span class="line"><span style="color:#A6ACCD;">（4）更新完数据后通知依赖更新</span></span></code></pre></div><h2 id="三、computed-和-watch-和-methods" tabindex="-1"><strong>三、computed 和 watch 和 methods</strong> <a class="header-anchor" href="#三、computed-和-watch-和-methods" aria-label="Permalink to &quot;**三、computed 和 watch 和 methods**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、computed</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）设计初衷：为了使模板中的逻辑运算更简单</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）适用于数据被重复使用或者计算复杂费时的场景；依赖其他数据的场景</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）读取缓存，依赖不变，则不需重新计算。（根据dirty标志判断）</span></span>
<span class="line"><span style="color:#A6ACCD;">2、watch是对数据的监听回调</span></span>
<span class="line"><span style="color:#A6ACCD;">3、computed和watch的区别</span></span>
<span class="line"><span style="color:#A6ACCD;">相同点：都会观察页面的数据变化</span></span>
<span class="line"><span style="color:#A6ACCD;">不同点：（1）computed是读取缓存，watch每次都要重新执行；</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）watch更适合数据变化时的异步操作和开销较大的操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">4、computed和methods的区别</span></span>
<span class="line"><span style="color:#A6ACCD;">computed依赖缓存，可以定义getter和setter，但是methods不行</span></span></code></pre></div><h2 id="四、vue-router-的模式区别" tabindex="-1"><strong>四、vue-router 的模式区别</strong> <a class="header-anchor" href="#四、vue-router-的模式区别" aria-label="Permalink to &quot;**四、vue-router 的模式区别**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、abstract：非浏览器环境下使用</span></span>
<span class="line"><span style="color:#A6ACCD;">2、hash：</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）默认。监听hashchange实现。</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）有点，兼容性好，ie8支持</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）缺点：看起来奇怪</span></span>
<span class="line"><span style="color:#A6ACCD;">3、history：</span></span>
<span class="line"><span style="color:#A6ACCD;">（1）h5新增的。允许开发者直接修改前端路由而不重新触发请求页面</span></span>
<span class="line"><span style="color:#A6ACCD;">（2）实现原理：监听popstate事件。能监听到用户点击浏览器的前进后退事件或者手动调用go，back，forward事件；不能监听到pushState和replaceState事件。</span></span>
<span class="line"><span style="color:#A6ACCD;">（3）为了避免浏览器刷新出现的404页面，需要在服务端配置兼容。</span></span>
<span class="line"><span style="color:#A6ACCD;">（4）如果浏览器不支持，会降级到hash模式</span></span>
<span class="line"><span style="color:#A6ACCD;">* 通过vue.use插件机制和vue.mixin将store在beforeCreate和destroyed生命周期进行混入。</span></span></code></pre></div><h2 id="五、vuex-解决了什么问题" tabindex="-1"><strong>五、vuex 解决了什么问题</strong> <a class="header-anchor" href="#五、vuex-解决了什么问题" aria-label="Permalink to &quot;**五、vuex 解决了什么问题**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、vuex解决了vue项目中的数据状态管理问题</span></span>
<span class="line"><span style="color:#A6ACCD;">2、是组件通信的一种方式。</span></span>
<span class="line"><span style="color:#A6ACCD;">3、原理：创建了单一的状态树，包含state，mutation，action，getter，module。</span></span>
<span class="line"><span style="color:#A6ACCD;">4、view(dispatch)action(commit)mutation(mutate)state(render)view</span></span>
<span class="line"><span style="color:#A6ACCD;">5、通过vue的data和computed，让state变成响应式，</span></span>
<span class="line"><span style="color:#A6ACCD;">6、通过vue.use插件机制和vue.mixin将store在beforeCreate生命周期进行混入。</span></span></code></pre></div><h2 id="六、nexttick-是怎么是实现的" tabindex="-1"><strong>六、nextTick 是怎么是实现的</strong> <a class="header-anchor" href="#六、nexttick-是怎么是实现的" aria-label="Permalink to &quot;**六、nextTick 是怎么是实现的**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、作用：将回调延迟到下次DOM更新循环之后执行</span></span>
<span class="line"><span style="color:#A6ACCD;">2、原因：VUE在更新DOM时是异步的，vue检测到数据变化后，不会立即更新DOM，而是会开启一个事件队列，并缓冲同一时间循环中的所有数据变更，在下一次tick中，执行更新DOM。</span></span>
<span class="line"><span style="color:#A6ACCD;">3、js的运行机制：js是单线程的，基于事件循环，有宏任务和微任务。</span></span>
<span class="line"><span style="color:#A6ACCD;">4、内部原理：</span></span>
<span class="line"><span style="color:#A6ACCD;">    （1）能力检测：Promise.then(微), MutationObserve(微)，setImmediate(微),setTimeout(宏)</span></span>
<span class="line"><span style="color:#A6ACCD;">    （2）将回调函数推入回调队列，锁上易步锁，执行回调。</span></span></code></pre></div><h2 id="七、keep-alive-内置组件和-lru-算法-队列" tabindex="-1"><strong>七、keep-alive 内置组件和 LRU 算法（队列）</strong> <a class="header-anchor" href="#七、keep-alive-内置组件和-lru-算法-队列" aria-label="Permalink to &quot;**七、keep-alive 内置组件和 LRU 算法（队列）**&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1、自身不会渲染成DOM，没有常规的&lt;template&gt;标签，是个函数组件，被他包裹的组件，切换时会被缓存在内存中，而不是销毁。</span></span>
<span class="line"><span style="color:#A6ACCD;">    （1）可以有条件的缓存:include（匹配到的缓存）,exclude（匹配到的不缓存）,max(最多可以缓存多少组件实例)</span></span>
<span class="line"><span style="color:#A6ACCD;">2、原理：内部维护了this.cache（缓存的组件对象）和this.keys（this.cache中的key），运用LRU策略。</span></span>
<span class="line"><span style="color:#A6ACCD;">    （1）命中了缓存的组件要调整组件key的顺序。</span></span>
<span class="line"><span style="color:#A6ACCD;">    （2）缓存的组件数量如果超过this.max时，要删除第一个缓存组件。</span></span>
<span class="line"><span style="color:#A6ACCD;">    （3）LRU(Least recently used，最近最少使用)：根据数据的历史访问记录来进行淘汰数据。“如果数据最近被访问过，那么将来被访问的几率也更高。”</span></span>
<span class="line"><span style="color:#A6ACCD;">3、生命周期钩子：activated和deactivated，被keep-alive包括的组件激活和停用时调用。先停用组件的deactivated，再激活组件的activated</span></span></code></pre></div><h2 id="八、vue3-的七种组件通信方式" tabindex="-1"><strong>八、Vue3 的七种组件通信方式</strong> <a class="header-anchor" href="#八、vue3-的七种组件通信方式" aria-label="Permalink to &quot;**八、Vue3 的七种组件通信方式**&quot;">​</a></h2><ul><li>props</li><li>emit</li><li>v-model</li><li>refs</li><li>provide/inject</li><li>eventBus</li><li>vuex/pinia(状态管理工具)</li></ul><p><strong>1、Props 方式</strong></p><p><code>Props</code>方式是 Vue 中最常见的一种<strong>父传子</strong>的一种方式，使用也比较简单。</p><p>根据上面的 demo，我们将数据以及对数据的操作定义在父组件，子组件仅做列表的一个渲染；</p><p>父组件代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 子组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components :list=&quot;list&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;请输入&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        添加</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add 触发后的事件处理函数</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>子组件只需要对父组件传递的值进行渲染即可，代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in props.list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { defineProps } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const props = defineProps({</span></span>
<span class="line"><span style="color:#A6ACCD;">  list: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: Array,</span></span>
<span class="line"><span style="color:#A6ACCD;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p><strong>2、emit 方式</strong></p><p><code>emit</code>方式也是 Vue 中最常见的组件通信方式，该方式用于<strong>子传父</strong>；</p><p>根据上面的 demo，我们将列表定义在父组件，子组件只需要传递添加的值即可。</p><p>子组件代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;请输入&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleSubmit&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        添加</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineEmits } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const emits = defineEmits([&#39;add&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleSubmit = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  emits(&#39;add&#39;, value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>在子组件中点击【添加】按钮后，<code>emit</code>一个自定义事件，并将添加的值作为参数传递。</p><p>父组件代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 子组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components @add=&quot;handleAdd&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">// add 触发后的事件处理函数</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = value =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>在父组件中只需要监听子组件自定义的事件，然后执行对应的添加操作。</p><p><strong>3、v-model 方式</strong></p><p><code>v-model</code>是 Vue 中一个比较出色的语法糖，就比如下面这段代码</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;ChildComponent v-model:title=&quot;pageTitle&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>就是下面这段代码的简写形势</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;ChildComponent :title=&quot;pageTitle&quot; @update:title=&quot;pageTitle = $event&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p><code>v-model</code>确实简便了不少，现在我们就来看一下上面那个 demo，如何用 v-model 实现。</p><p>子组件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;请输入&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        添加</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineEmits, defineProps } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const props = defineProps({</span></span>
<span class="line"><span style="color:#A6ACCD;">  list: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: Array,</span></span>
<span class="line"><span style="color:#A6ACCD;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">const emits = defineEmits([&#39;update:list&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">// 添加操作</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const arr = props.list</span></span>
<span class="line"><span style="color:#A6ACCD;">  arr.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  emits(&#39;update:list&#39;, arr)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>在子组件中我们首先定义<code>props</code>和<code>emits</code>，然后添加完成之后<code>emit</code>指定事件。</p><blockquote><p>注：<code>update:*</code>是 Vue 中的固定写法，<code>*</code>表示<code>props</code>中的某个属性名。</p></blockquote><p>父组件中使用就比较简单，代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 子组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components v-model:list=&quot;list&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p><strong>4、refs 方式</strong></p><p>在使用选项式 API 时，我们可以通过<code>this.$refs.name</code>的方式获取指定元素或者组件，但是组合式 API 中就无法使用哪种方式获取。如果我们想要通过<code>ref</code>的方式获取组件或者元素，需要定义一个同名的 Ref 对象，在组件挂载后就可以访问了。</p><p>示例代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in childRefs?.list&quot; :key=&quot;i&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      {{ i }}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 子组件 ref的值与&lt;script&gt;中的保持一致 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components ref=&quot;childRefs&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const childRefs = ref(null)</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>子组件代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;请输入&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        添加</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineExpose } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add 触发后的事件处理函数</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">defineExpose({ list })</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p><code>setup</code>组件默认是关闭的，也即通过模板<code>ref</code>获取到的组件的公开实例，<strong>不会暴露任何在**</strong><code>&lt;script setup&gt;</code>*<strong>*中声明的绑定</strong>。如果需要<strong>公开需要通过**</strong><code>defineExpose</code>*<strong>* API 暴露</strong>。</p><p><strong>5、provide/inject 方式</strong></p><p><code>provide</code>和<code>inject</code>是 Vue 中提供的一对 API，该 API 可以实现父组件向子组件传递数据，无论层级有多深，都可以通过这对 API 实现。示例代码如下所示：</p><p>父组件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 子组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;请输入&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        添加</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, provide } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// 向子组件提供数据</span></span>
<span class="line"><span style="color:#A6ACCD;">provide(&#39;list&#39;, list.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add 触发后的事件处理函数</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>子组件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { inject } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">// 接受父组件提供的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = inject(&#39;list&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">复制代码</span></span></code></pre></div><p>值得注意的是<strong>使用<code>provide</code>进行数据传递时，尽量<code>readonly</code>进行数据的包装，避免子组件修改父级传递过去的数据</strong>。</p><p><strong>6、事件总线</strong></p><p>Vue3 中移除了事件总线，但是可以借助于第三方工具来完成，Vue 官方推荐<strong>mitt</strong>[2]或<strong>tiny-emitter</strong>[3]；</p><p>在大多数情况下不推荐使用全局事件总线的方式来实现组件通信，虽然比较简单粗暴，但是长久来说维护事件总线是一个大难题，所以这里就不展开讲解了，具体可以阅读具体工具的文档</p><p><strong>7、状态管理工具</strong></p><p><strong>Vuex</strong>[4]和<strong>Pinia</strong>[5]是 Vue3 中的状态管理工具，使用这两个工具可以轻松实现组件通信，由于这两个工具功能比较强大，这里就不做展示了，具体可以查阅文档</p>`,64),t=[e];function o(c,i,r,C,A,u){return n(),a("div",null,t)}const D=s(p,[["render",o]]);export{d as __pageData,D as default};
