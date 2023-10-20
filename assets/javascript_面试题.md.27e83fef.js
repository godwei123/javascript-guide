import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.00751356.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/面试题.md","filePath":"javascript/面试题.md"}'),p={name:"javascript/面试题.md"},e=l(`<h2 id="问-0-1-0-2-0-3-嘛-为什么" tabindex="-1">问：0.1 + 0.2 === 0.3 嘛？为什么？ <a class="header-anchor" href="#问-0-1-0-2-0-3-嘛-为什么" aria-label="Permalink to &quot;问：0.1 + 0.2 === 0.3 嘛？为什么？&quot;">​</a></h2><p>JavaScirpt 使用 Number 类型来表示数字（整数或浮点数），遵循 IEEE 754 标准，通过 64 位来表示一个数字（1 + 11 + 52）</p><ul><li>1 符号位，0 表示正数，1 表示负数 s</li><li>11 指数位（e）</li><li>52 尾数，小数部分（即有效数字）</li></ul><p>最大安全数字：Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1，转换成整数就是 16 位，所以 0.1 === 0.1，是因为通过 toPrecision(16) 去有效位之后，两者是相等的。</p><p>在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。</p><p>所以总结：<strong>精度丢失可能出现在进制转换和对阶运算中</strong></p><h2 id="问-js-数据类型" tabindex="-1">问：JS 数据类型 <a class="header-anchor" href="#问-js-数据类型" aria-label="Permalink to &quot;问：JS 数据类型&quot;">​</a></h2><p>基本类型：Number、Boolean、String、null、undefined、symbol（ES6 新增的），BigInt（ES2020）</p><p>引用类型：Object，对象子类型（Array，Function）</p><h2 id="问-js-整数是怎么表示的" tabindex="-1">问：JS 整数是怎么表示的？ <a class="header-anchor" href="#问-js-整数是怎么表示的" aria-label="Permalink to &quot;问：JS 整数是怎么表示的？&quot;">​</a></h2><ul><li>通过 Number 类型来表示，遵循 IEEE754 标准，通过 64 位来表示一个数字，（1 + 11 + 52），最大安全数字是 Math.pow(2, 53) - 1，对于 16 位十进制。（符号位 + 指数位 + 小数部分有效位）</li></ul><h2 id="问-number-的存储空间是多大-如果后台发送了一个超过最大自己的数字怎么办" tabindex="-1">问：Number() 的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办 <a class="header-anchor" href="#问-number-的存储空间是多大-如果后台发送了一个超过最大自己的数字怎么办" aria-label="Permalink to &quot;问：Number() 的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办&quot;">​</a></h2><p>Math.pow(2, 53) ，53 为有效数字，会发生截断，等于 JS 能支持的最大数字。</p><h2 id="写代码-实现函数能够深度克隆基本类型" tabindex="-1">写代码：实现函数能够深度克隆基本类型 <a class="header-anchor" href="#写代码-实现函数能够深度克隆基本类型" aria-label="Permalink to &quot;写代码：实现函数能够深度克隆基本类型&quot;">​</a></h2><p>浅克隆：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shallowClone</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cloneObj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> obj) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cloneObj[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> cloneObj;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shallowClone</span><span style="color:#24292E;">(</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cloneObj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> obj) {</span></span>
<span class="line"><span style="color:#24292E;">    cloneObj[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj[i];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> cloneObj;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>深克隆：</p><ul><li><p>考虑基础类型</p></li><li><p>引用类型</p></li><li><ul><li>RegExp、Date、函数 不是 JSON 安全的</li><li>会丢失 constructor，所有的构造函数都指向 Object</li><li>破解循环引用</li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepCopy</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.</span><span style="color:#79B8FF;">constructor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> Array </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> [] </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> obj) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      result[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> obj[i] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepCopy</span><span style="color:#E1E4E8;">(obj[i]) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> obj[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepCopy</span><span style="color:#24292E;">(</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.</span><span style="color:#005CC5;">constructor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Array </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> [] </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> obj) {</span></span>
<span class="line"><span style="color:#24292E;">      result[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> obj[i] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepCopy</span><span style="color:#24292E;">(obj[i]) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> obj[i];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="问-事件流" tabindex="-1">问：事件流 <a class="header-anchor" href="#问-事件流" aria-label="Permalink to &quot;问：事件流&quot;">​</a></h2><p>事件流是网页元素接收事件的顺序，&quot;DOM2 级事件&quot;规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。虽然捕获阶段在规范中规定不允许响应事件，但是实际上还是会执行，所以有两次机会获取到目标对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;title&gt;事件冒泡&lt;/title&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;p id=&quot;parEle&quot;&gt;我是父元素    &lt;span id=&quot;sonEle&quot;&gt;我是子元素&lt;/span&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">var sonEle = document.getElementById(&#39;sonEle&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">var parEle = document.getElementById(&#39;parEle&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">parEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alert(&#39;父级 冒泡&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">}, false);</span></span>
<span class="line"><span style="color:#e1e4e8;">parEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alert(&#39;父级 捕获&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">}, true);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sonEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alert(&#39;子级冒泡&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">}, false);</span></span>
<span class="line"><span style="color:#e1e4e8;">sonEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alert(&#39;子级捕获&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">}, true);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;title&gt;事件冒泡&lt;/title&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;p id=&quot;parEle&quot;&gt;我是父元素    &lt;span id=&quot;sonEle&quot;&gt;我是子元素&lt;/span&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">var sonEle = document.getElementById(&#39;sonEle&#39;);</span></span>
<span class="line"><span style="color:#24292e;">var parEle = document.getElementById(&#39;parEle&#39;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">parEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#24292e;">    alert(&#39;父级 冒泡&#39;);</span></span>
<span class="line"><span style="color:#24292e;">}, false);</span></span>
<span class="line"><span style="color:#24292e;">parEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#24292e;">    alert(&#39;父级 捕获&#39;);</span></span>
<span class="line"><span style="color:#24292e;">}, true);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sonEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#24292e;">    alert(&#39;子级冒泡&#39;);</span></span>
<span class="line"><span style="color:#24292e;">}, false);</span></span>
<span class="line"><span style="color:#24292e;">sonEle.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span style="color:#24292e;">    alert(&#39;子级捕获&#39;);</span></span>
<span class="line"><span style="color:#24292e;">}, true);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;/script&gt;</span></span></code></pre></div><p>当容器元素及嵌套元素，即在<code>捕获阶段</code>又在<code>冒泡阶段</code>调用事件处理程序时：<strong>事件按 DOM 事件流的顺序</strong>执行事件处理程序：</p><ul><li>父级捕获</li><li>子级冒泡</li><li>子级捕获</li><li>父级冒泡</li></ul><p>且当事件处于目标阶段时，事件调用顺序决定于绑定事件的<strong>书写顺序</strong>，按上面的例子为，先调用冒泡阶段的事件处理程序，再调用捕获阶段的事件处理程序。依次 alert 出“子集冒泡”，“子集捕获”。</p><h3 id="ie-兼容" tabindex="-1">IE 兼容 <a class="header-anchor" href="#ie-兼容" aria-label="Permalink to &quot;IE 兼容&quot;">​</a></h3><ul><li>attchEvent(&#39;on&#39; + type, handler)</li><li>detachEvent(&#39;on&#39; + type, handler)</li></ul><h3 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://juejin.im/entry/5826ba9d0ce4630056f85e07" target="_blank" rel="noreferrer">https://juejin.im/entry/5826ba9d0ce4630056f85e07</a></li></ul><h2 id="问-事件是如何实现的" tabindex="-1">问：事件是如何实现的？ <a class="header-anchor" href="#问-事件是如何实现的" aria-label="Permalink to &quot;问：事件是如何实现的？&quot;">​</a></h2><p>基于发布订阅模式，就是在浏览器加载的时候会读取事件相关的代码，但是只有实际等到具体的事件触发的时候才会执行。</p><p>比如点击按钮，这是个事件（Event），而负责处理事件的代码段通常被称为事件处理程序（Event Handler），也就是「启动对话框的显示」这个动作。</p><p>在 Web 端，我们常见的就是 DOM 事件：</p><ul><li>DOM0 级事件，直接在 html 元素上绑定 on-event，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。</li><li>DOM2 级事件，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件</li><li>DOM3 级事件，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件</li></ul><h3 id="参考链接-1" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接-1" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://zhuanlan.zhihu.com/p/73091706" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/73091706</a></li></ul><h2 id="问-new-一个函数发生了什么" tabindex="-1">问：new 一个函数发生了什么 <a class="header-anchor" href="#问-new-一个函数发生了什么" aria-label="Permalink to &quot;问：new 一个函数发生了什么&quot;">​</a></h2><p>构造调用：</p><ul><li>创造一个全新的对象</li><li>这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象</li><li>这个新对象会绑定到函数调用的 this</li><li>如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">_new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> constructor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Array</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.shift.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> constructor </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">constructor</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> constructor.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> flag </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">    result </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;function&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断返回结果</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flag </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> obj;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">_new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> constructor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Array</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.shift.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> constructor </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">constructor</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> constructor.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(obj, </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> flag </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">    result </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;function&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断返回结果</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flag </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> obj;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="问-new-一个构造函数-如果函数返回-return-、-return-null-return-1-return-true-会发生什么情况" tabindex="-1">问：new 一个构造函数，如果函数返回 <code>return {}</code> 、 <code>return null</code> ， <code>return 1</code>， <code>return true</code> 会发生什么情况？ <a class="header-anchor" href="#问-new-一个构造函数-如果函数返回-return-、-return-null-return-1-return-true-会发生什么情况" aria-label="Permalink to &quot;问：new 一个构造函数，如果函数返回 \`return {}\` 、 \`return null\` ， \`return 1\`， \`return true\` 会发生什么情况？&quot;">​</a></h2><p>如果函数返回一个对象，那么 new 这个函数调用返回这个函数的返回对象，否则返回 new 创建的新对象</p><h2 id="问-symbol-有什么用处" tabindex="-1">问：<code>symbol</code> 有什么用处 <a class="header-anchor" href="#问-symbol-有什么用处" aria-label="Permalink to &quot;问：\`symbol\` 有什么用处&quot;">​</a></h2><p>可以用来表示一个独一无二的变量防止命名冲突。</p><p>可以利用 <code>symbol</code> 不会被常规的方法（除了 <code>Object.getOwnPropertySymbols</code> 外）遍历到，所以可以用来模拟私有变量。</p><p>主要用来提供遍历接口，布置了 <code>symbol.iterator</code> 的对象才可以使用 <code>for···of</code> 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。</p><p>Symbol.for() 可以在全局访问 symbol</p><h2 id="_3-问-闭包是什么" tabindex="-1">（3）问：闭包是什么？ <a class="header-anchor" href="#_3-问-闭包是什么" aria-label="Permalink to &quot;（3）问：闭包是什么？&quot;">​</a></h2><p>闭包是指有权访问另外一个函数作用域中的变量的函数</p><p>JavaScript 代码的整个执行过程，分为两个阶段，代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码，这个阶段作用域规则会确定。执行阶段由引擎完成，主要任务是执行可执行代码，执行上下文在这个阶段创建。</p><h3 id="什么是作业域" tabindex="-1">什么是作业域？ <a class="header-anchor" href="#什么是作业域" aria-label="Permalink to &quot;什么是作业域？&quot;">​</a></h3><p>ES5 中只存在两种作用域：<strong>全局作用域和函数作用域</strong>。在 JavaScript 中，我们将作用域定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套子作用域中根据标识符名称进行变量（变量名或者函数名）查找</p><h3 id="什么是作用域链" tabindex="-1">什么是作用域链？ <a class="header-anchor" href="#什么是作用域链" aria-label="Permalink to &quot;什么是作用域链？&quot;">​</a></h3><p>首先要了解作用域链，当访问一个变量时，编译器在执行这段代码时，会首先从当前的作用域中查找是否有这个标识符，如果没有找到，就会去父作用域查找，如果父作用域还没找到继续向上查找，直到全局作用域为止,，而作用域链，就是有当前作用域与上层作用域的一系列变量对象组成，它保证了当前执行的作用域对符合访问权限的变量和函数的有序访问。</p><h3 id="闭包产生的本质" tabindex="-1">闭包产生的本质 <a class="header-anchor" href="#闭包产生的本质" aria-label="Permalink to &quot;闭包产生的本质&quot;">​</a></h3><p>当前环境中存在指向父级作用域的引用</p><h3 id="什么是闭包" tabindex="-1">什么是闭包 <a class="header-anchor" href="#什么是闭包" aria-label="Permalink to &quot;什么是闭包&quot;">​</a></h3><p>闭包是一种特殊的对象，它由两部分组成：执行上下文（代号 A），以及在该执行上下文中创建的函数 （代号 B），当 B 执行时，如果访问了 A 中变量对象的值，那么闭包就会产生，且在 Chrome 中使用这个执行上下文 A 的函数名代指闭包。</p><h3 id="一般如何产生闭包" tabindex="-1">一般如何产生闭包 <a class="header-anchor" href="#一般如何产生闭包" aria-label="Permalink to &quot;一般如何产生闭包&quot;">​</a></h3><ul><li>返回函数</li><li>函数当做参数传递</li></ul><h3 id="闭包的应用场景" tabindex="-1">闭包的应用场景 <a class="header-anchor" href="#闭包的应用场景" aria-label="Permalink to &quot;闭包的应用场景&quot;">​</a></h3><ul><li>柯里化 bind</li><li>模块</li></ul><h3 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h3><ul><li><a href="https://segmentfault.com/a/1190000012646221" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000012646221</a></li></ul><h2 id="问-nan-是什么-用-typeof-会输出什么" tabindex="-1">问：NaN 是什么，用 typeof 会输出什么？ <a class="header-anchor" href="#问-nan-是什么-用-typeof-会输出什么" aria-label="Permalink to &quot;问：NaN 是什么，用 typeof 会输出什么？&quot;">​</a></h2><p>Not a Number，表示非数字，typeof NaN === &#39;number&#39;</p><h2 id="问-js-隐式转换-显示转换" tabindex="-1">问：JS 隐式转换，显示转换 <a class="header-anchor" href="#问-js-隐式转换-显示转换" aria-label="Permalink to &quot;问：JS 隐式转换，显示转换&quot;">​</a></h2><p>一般非基础类型进行转换时会先调用 valueOf，如果 valueOf 无法返回基本类型值，就会调用 toString</p><h3 id="字符串和数字" tabindex="-1">字符串和数字 <a class="header-anchor" href="#字符串和数字" aria-label="Permalink to &quot;字符串和数字&quot;">​</a></h3><ul><li>&quot;+&quot; 操作符，如果有一个为字符串，那么都转化到字符串然后执行字符串拼接</li><li>&quot;-&quot; 操作符，转换为数字，相减 (-a, a * 1 a/1) 都能进行隐式强制类型转换</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> {}; </span><span style="color:#6A737D;">// &#39;[object Object]&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">[](</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  {}</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">()(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &#39;[object Object]&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;">()(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//  {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    []</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;">()(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//  []</span></span>
<span class="line"><span style="color:#E1E4E8;">    []</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">//  &#39;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> {}; </span><span style="color:#6A737D;">// &#39;[object Object]&#39;</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">+</span><span style="color:#24292E;">[](</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  {}</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">()(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &#39;[object Object]&#39;</span></span>
<span class="line"><span style="color:#24292E;">    {}</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;">()(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//  {}</span></span>
<span class="line"><span style="color:#24292E;">    []</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;">()(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//  []</span></span>
<span class="line"><span style="color:#24292E;">    []</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">//  &#39;&#39;</span></span></code></pre></div><h3 id="布尔值到数字" tabindex="-1">布尔值到数字 <a class="header-anchor" href="#布尔值到数字" aria-label="Permalink to &quot;布尔值到数字&quot;">​</a></h3><ul><li>1 + true = 2</li><li>1 + false = 1</li></ul><h3 id="转换为布尔值" tabindex="-1">转换为布尔值 <a class="header-anchor" href="#转换为布尔值" aria-label="Permalink to &quot;转换为布尔值&quot;">​</a></h3><ul><li>for 中第二个</li><li>while</li><li>if</li><li>三元表达式</li><li>|| （逻辑或） &amp;&amp; （逻辑与）左边的操作数</li></ul><h3 id="符号" tabindex="-1">符号 <a class="header-anchor" href="#符号" aria-label="Permalink to &quot;符号&quot;">​</a></h3><ul><li>不能被转换为数字</li><li>能被转换为布尔值（都是 true）</li><li>可以被转换成字符串 &quot;Symbol(cool)&quot;</li></ul><h3 id="宽松相等和严格相等" tabindex="-1">宽松相等和严格相等 <a class="header-anchor" href="#宽松相等和严格相等" aria-label="Permalink to &quot;宽松相等和严格相等&quot;">​</a></h3><p>宽松相等允许进行强制类型转换，而严格相等不允许</p><h4 id="字符串与数字" tabindex="-1">字符串与数字 <a class="header-anchor" href="#字符串与数字" aria-label="Permalink to &quot;字符串与数字&quot;">​</a></h4><p>转换为数字然后比较</p><h4 id="其他类型与布尔类型" tabindex="-1">其他类型与布尔类型 <a class="header-anchor" href="#其他类型与布尔类型" aria-label="Permalink to &quot;其他类型与布尔类型&quot;">​</a></h4><ul><li>先把布尔类型转换为数字，然后继续进行比较</li></ul><h4 id="对象与非对象" tabindex="-1">对象与非对象 <a class="header-anchor" href="#对象与非对象" aria-label="Permalink to &quot;对象与非对象&quot;">​</a></h4><ul><li>执行对象的 ToPrimitive(对象）然后继续进行比较</li></ul><h4 id="假值列表" tabindex="-1">假值列表 <a class="header-anchor" href="#假值列表" aria-label="Permalink to &quot;假值列表&quot;">​</a></h4><ul><li>undefined</li><li>null</li><li>false</li><li>+0, -0, NaN</li><li>&quot;&quot;</li></ul><h2 id="_2-问-了解-this-嘛-bind-call-apply-具体指什么" tabindex="-1">（2）问：了解 this 嘛，bind，call，apply 具体指什么 <a class="header-anchor" href="#_2-问-了解-this-嘛-bind-call-apply-具体指什么" aria-label="Permalink to &quot;（2）问：了解 this 嘛，bind，call，apply 具体指什么&quot;">​</a></h2><p>它们都是函数的方法</p><p><code>call: Array.prototype.call(this, args1, args2])\`\`apply: Array.prototype.apply(this, [args1, args2])</code>：ES6 之前用来展开数组调用, <code>foo.appy(null, [])</code>，ES6 之后使用 ... 操作符</p><ul><li>New 绑定 &gt; 显示绑定 &gt; 隐式绑定 &gt; 默认绑定</li><li>如果需要使用 bind 的柯里化和 apply 的数组解构，绑定到 null，尽可能使用 Object.create(null) 创建一个 DMZ 对象</li></ul><p>四条规则：</p><ul><li>默认绑定，没有其他修饰（bind、apply、call)，在非严格模式下定义指向全局对象，在严格模式下定义指向 undefined</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var a = 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">foo();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo() {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var a = 2;</span></span>
<span class="line"><span style="color:#24292e;">foo();</span></span></code></pre></div><ul><li>隐式绑定：调用位置是否有上下文对象，或者是否被某个对象拥有或者包含，那么隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。而且，对象属性链只有上一层或者说最后一层在调用位置中起作用</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  a: 2,</span></span>
<span class="line"><span style="color:#e1e4e8;">  foo: foo,</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">obj.foo(); // 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo() {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var obj = {</span></span>
<span class="line"><span style="color:#24292e;">  a: 2,</span></span>
<span class="line"><span style="color:#24292e;">  foo: foo,</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">obj.foo(); // 2</span></span></code></pre></div><ul><li>显示绑定：通过在函数上运行 call 和 apply ，来显示的绑定 this</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  a: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">foo.call(obj);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo() {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(this.a);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var obj = {</span></span>
<span class="line"><span style="color:#24292e;">  a: 2</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">foo.call(obj);</span></span></code></pre></div><p>显示绑定之硬绑定</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo(something) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(this.a, something);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return this.a + something;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function bind(fn, obj) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return fn.apply(obj, arguments);</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  a: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var bar = bind(foo, obj);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo(something) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(this.a, something);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return this.a + something;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function bind(fn, obj) {</span></span>
<span class="line"><span style="color:#24292e;">  return function() {</span></span>
<span class="line"><span style="color:#24292e;">    return fn.apply(obj, arguments);</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var obj = {</span></span>
<span class="line"><span style="color:#24292e;">  a: 2</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var bar = bind(foo, obj);</span></span></code></pre></div><p>New 绑定，new 调用函数会创建一个全新的对象，并将这个对象绑定到函数调用的 this。</p><ul><li>New 绑定时，<strong>如果是 new 一个硬绑定函数，那么会用 new 新建的对象替换这个硬绑定 this</strong>，</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo(a) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.a = a;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var bar = new foo(2);</span></span>
<span class="line"><span style="color:#e1e4e8;">console.log(bar.a)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo(a) {</span></span>
<span class="line"><span style="color:#24292e;">  this.a = a;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var bar = new foo(2);</span></span>
<span class="line"><span style="color:#24292e;">console.log(bar.a)</span></span></code></pre></div><h3 id="_4-问-手写-bind、apply、call" tabindex="-1">（4）问：手写 bind、apply、call <a class="header-anchor" href="#_4-问-手写-bind、apply、call" aria-label="Permalink to &quot;（4）问：手写 bind、apply、call&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// call</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> window;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fnSymbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fn&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  context[fnSymbol] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  context[fnSymbol](</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">// apply</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">argsArr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> window;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fnSymbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fn&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  context[fnSymbol] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  context[fnSymbol](</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">argsArr);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">// bind</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> window;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fnSymbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fn&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  context[fnSymbol] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">_args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(_args);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    context[fnSymbol](</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// call</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">context</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> window;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fnSymbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fn&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  context[fnSymbol] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  context[fnSymbol](</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">// apply</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">context</span><span style="color:#24292E;">, </span><span style="color:#E36209;">argsArr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> window;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fnSymbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fn&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  context[fnSymbol] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  context[fnSymbol](</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">argsArr);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">// bind</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">context</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> window;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fnSymbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fn&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  context[fnSymbol] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">...</span><span style="color:#E36209;">_args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(_args);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    context[fnSymbol](</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> context[fnSymbol];</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="_3-问-settimeout-fn-0-多久才执行-event-loop" tabindex="-1">（3）问：<code>setTimeout(fn, 0)</code>多久才执行，Event Loop <a class="header-anchor" href="#_3-问-settimeout-fn-0-多久才执行-event-loop" aria-label="Permalink to &quot;（3）问：\`setTimeout(fn, 0)\`多久才执行，Event Loop&quot;">​</a></h2><p>setTimeout 按照顺序放到队列里面，然后等待函数调用栈清空之后才开始执行，而这些操作进入队列的顺序，则由设定的延迟时间来决定</p><h2 id="手写题-promise-原理" tabindex="-1">手写题：Promise 原理 <a class="header-anchor" href="#手写题-promise-原理" aria-label="Permalink to &quot;手写题：Promise 原理&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyPromise</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resolvedCallbacks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rejectedCallbacks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;PENDING&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resolve.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.reject.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;PENDING&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;RESOLVED&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resolvedCallbacks.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(value));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">reject</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;PENDING&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;REJECTED&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rejectedCallbacks.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(value));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">onFulfilled</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onRejected</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;PENDING&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resolvedCallbacks.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(onFulfilled);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.rejectedCallbacks.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(onRejected);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;RESOLVED&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onFulfilled</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;REJECTED&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onRejected</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyPromise</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resolvedCallbacks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rejectedCallbacks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;PENDING&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resolve.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.reject.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;PENDING&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;RESOLVED&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resolvedCallbacks.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(value));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">reject</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;PENDING&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;REJECTED&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rejectedCallbacks.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(value));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#E36209;">onFulfilled</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onRejected</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;PENDING&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resolvedCallbacks.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(onFulfilled);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.rejectedCallbacks.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(onRejected);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;RESOLVED&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onFulfilled</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;REJECTED&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onRejected</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="问-js-脚本加载问题-async、defer-问题" tabindex="-1">问：js 脚本加载问题，async、defer 问题 <a class="header-anchor" href="#问-js-脚本加载问题-async、defer-问题" aria-label="Permalink to &quot;问：js 脚本加载问题，async、defer 问题&quot;">​</a></h2><ul><li>如果依赖其他脚本和 DOM 结果，使用 defer</li><li>如果与 DOM 和其他脚本依赖不强时，使用 async</li></ul><h3 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h3><ul><li><a href="https://mp.weixin.qq.com/s?__biz=MzU3OTg0Njc0MA==&amp;mid=2247484284&amp;idx=1&amp;sn=52ba03c9fa0cf65c89737b75cb0e3f26&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/pw5lfFeNagmjFj45ygl2dQ</a></li></ul><h2 id="问-如何判断一个对象是不是空对象" tabindex="-1">问：如何判断一个对象是不是空对象？ <a class="header-anchor" href="#问-如何判断一个对象是不是空对象" aria-label="Permalink to &quot;问：如何判断一个对象是不是空对象？&quot;">​</a></h2><p>Object.keys(obj).length === 0</p><h2 id="问-script-src-xxx-xxx-外部-js-文件先加载还是-onload-先执行-为什么" tabindex="-1">问： &lt;script src=’xxx’ ’xxx’/&gt;外部 js 文件先加载还是 onload 先执行，为什么？ <a class="header-anchor" href="#问-script-src-xxx-xxx-外部-js-文件先加载还是-onload-先执行-为什么" aria-label="Permalink to &quot;问： &lt;script src=’xxx’ ’xxx’/&gt;外部 js 文件先加载还是 onload 先执行，为什么？&quot;">​</a></h2><p>onload 是所以加载完成之后执行的</p><h2 id="问-怎么加事件监听-两种" tabindex="-1">问：怎么加事件监听，两种 <a class="header-anchor" href="#问-怎么加事件监听-两种" aria-label="Permalink to &quot;问：怎么加事件监听，两种&quot;">​</a></h2><p>onclick 和 addEventListener</p><h2 id="问-事件传播机制-事件流" tabindex="-1">问：事件传播机制（事件流） <a class="header-anchor" href="#问-事件传播机制-事件流" aria-label="Permalink to &quot;问：事件传播机制（事件流）&quot;">​</a></h2><p>冒泡和捕获</p><h2 id="问-说一下原型链和原型链的继承吧" tabindex="-1">问：说一下原型链和原型链的继承吧 <a class="header-anchor" href="#问-说一下原型链和原型链的继承吧" aria-label="Permalink to &quot;问：说一下原型链和原型链的继承吧&quot;">​</a></h2><ul><li>所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype，其包含了 JavaScript 中许多通用的功能</li><li>为什么能创建 “类”，借助一种特殊的属性：<strong>所有的函数默认都会拥有一个名为 prototype 的共有且不可枚举的属性，它会指向另外一个对象，这个对象通常被称为函数的原型</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function Person(name) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.name = name;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Person.prototype.constructor = Person</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function Person(name) {</span></span>
<span class="line"><span style="color:#24292e;">  this.name = name;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Person.prototype.constructor = Person</span></span></code></pre></div><ul><li>在发生 new 构造函数调用时，会将创建的新对象的 [[Prototype]] 链接到 Person.prototype 指向的对象，这个机制就被称为原型链继承</li><li>方法定义在原型上，属性定义在构造函数上</li><li>首先要说一下 JS 原型和实例的关系：每个构造函数 （constructor）都有一个原型对象（prototype），这个原型对象包含一个指向此构造函数的指针属性，通过 new 进行构造函数调用生成的实例，此实例包含一个指向原型对象的指针，也就是通过 [[Prototype]] 链接到了这个原型对象</li><li>然后说一下 JS 中属性的查找：当我们试图引用实例对象的某个属性时，是按照这样的方式去查找的，首先查找实例对象上是否有这个属性，如果没有找到，就去构造这个实例对象的构造函数的 prototype 所指向的对象上去查找，如果还找不到，就从这个 prototype 对象所指向的构造函数的 prototype 原型对象上去查找</li><li>什么是原型链：这样逐级查找形似一个链条，且通过 [[Prototype]] 属性链接，所以被称为原型链</li><li>什么是原型链继承，类比类的继承：<strong>当有两个构造函数 A 和 B，将一个构造函数 A 的原型对象的，通过其 [[Prototype]] 属性链接到另外一个 B 构造函数的原型对象时，这个过程被称之为原型继承。</strong></li></ul><p><strong>什么是原型链？</strong></p><p>当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。这种通过 通过原型链接的逐级向上的查找链被称为原型链</p><p><strong>什么是原型继承？</strong></p><p>一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。</p><h3 id="参考链接-2" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接-2" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://zhuanlan.zhihu.com/p/35790971" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/35790971</a></li></ul><h2 id="问-说下对-js-的了解吧" tabindex="-1">问：说下对 JS 的了解吧 <a class="header-anchor" href="#问-说下对-js-的了解吧" aria-label="Permalink to &quot;问：说下对 JS 的了解吧&quot;">​</a></h2><p>是基于原型的动态语言，主要独特特性有 this、原型和原型链。</p><p>JS 严格意义上来说分为：语言标准部分（ECMAScript）+ 宿主环境部分</p><h3 id="宿主环境部分" tabindex="-1">宿主环境部分 <a class="header-anchor" href="#宿主环境部分" aria-label="Permalink to &quot;宿主环境部分&quot;">​</a></h3><ul><li>在浏览器宿主环境包括 DOM + BOM 等</li><li>在 Node，宿主环境包括一些文件、数据库、网络、与操作系统的交互等</li></ul><h2 id="问-数组能够调用的函数有那些" tabindex="-1">问：数组能够调用的函数有那些？ <a class="header-anchor" href="#问-数组能够调用的函数有那些" aria-label="Permalink to &quot;问：数组能够调用的函数有那些？&quot;">​</a></h2><ul><li>push</li><li>pop</li><li>splice</li><li>slice</li><li>shift</li><li>unshift</li><li>sort</li><li>find</li><li>findIndex</li><li>map/filter/reduce 等函数式编程方法</li><li>还有一些原型链上的方法：toString/valueOf</li></ul><h2 id="问-如何判断数组类型" tabindex="-1">问：如何判断数组类型 <a class="header-anchor" href="#问-如何判断数组类型" aria-label="Permalink to &quot;问：如何判断数组类型&quot;">​</a></h2><p>Array.isArray</p><h2 id="问-函数中的-arguments-是数组吗-类数组转数组的方法了解一下" tabindex="-1">问： 函数中的 arguments 是数组吗？类数组转数组的方法了解一下？ <a class="header-anchor" href="#问-函数中的-arguments-是数组吗-类数组转数组的方法了解一下" aria-label="Permalink to &quot;问： 函数中的 arguments 是数组吗？类数组转数组的方法了解一下？&quot;">​</a></h2><ul><li>... 运算符</li><li>Array.from</li><li>Array.prototype.slice.apply(arguments)</li></ul><h2 id="问-用过-typescript-吗-它的作用是什么" tabindex="-1">问：用过 TypeScript 吗？它的作用是什么？ <a class="header-anchor" href="#问-用过-typescript-吗-它的作用是什么" aria-label="Permalink to &quot;问：用过 TypeScript 吗？它的作用是什么？&quot;">​</a></h2><p>为 JS 添加类型支持，以及提供最新版的 ES 语法的支持，是的利于团队协作和排错，开发大型项目</p><h2 id="问-pwa-使用过吗-serviceworker-的使用原理是啥" tabindex="-1">问：PWA 使用过吗？serviceWorker 的使用原理是啥？ <a class="header-anchor" href="#问-pwa-使用过吗-serviceworker-的使用原理是啥" aria-label="Permalink to &quot;问：PWA 使用过吗？serviceWorker 的使用原理是啥？&quot;">​</a></h2><p><code>渐进式网络应用（PWA）</code>是谷歌在 2015 年底提出的概念。基本上算是 web 应用程序，但在外观和感觉上与<code>原生app</code>类似。支持<code>PWA</code>的网站可以提供脱机工作、推送通知和设备硬件访问等功能。</p><p><code>Service Worker</code>是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门。现在，它们已包括如推送通知和后台同步等功能。将来，<code>Service Worker</code>将会支持如定期同步或地理围栏等其他功能。本教程讨论的核心功能是拦截和处理网络请求，包括通过程序来管理缓存中的响应。</p><h3 id="参考链接-3" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接-3" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://juejin.im/post/5e26aa785188254c257c462d#heading-8" target="_blank" rel="noreferrer">https://juejin.im/post/5e26aa785188254c257c462d#heading-8</a></li></ul><h2 id="问-es6-之前使用-prototype-实现继承" tabindex="-1">问：ES6 之前使用 prototype 实现继承 <a class="header-anchor" href="#问-es6-之前使用-prototype-实现继承" aria-label="Permalink to &quot;问：ES6 之前使用 prototype 实现继承&quot;">​</a></h2><p>Object.create() 会创建一个 “新” 对象，然后将此对象内部的 [[Prototype]] 关联到你指定的对象（Foo.prototype）。Object.create(null) 创建一个空 [[Prototype]] 链接的对象，这个对象无法进行委托。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function Foo(name) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.name = name;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Foo.prototype.myName = function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return this.name;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 继承属性，通过借用构造函数调用</span></span>
<span class="line"><span style="color:#e1e4e8;">function Bar(name, label) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  Foo.call(this, name);</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.label = label;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 继承方法，创建备份</span></span>
<span class="line"><span style="color:#e1e4e8;">Bar.prototype = Object.create(Foo.prototype);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 必须设置回正确的构造函数，要不然在会发生判断类型出错</span></span>
<span class="line"><span style="color:#e1e4e8;">Bar.prototype.constructor = Bar;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> // 必须在上一步之后</span></span>
<span class="line"><span style="color:#e1e4e8;">Bar.prototype.myLabel = function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return this.label;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var a = new Bar(&quot;a&quot;, &quot;obj a&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">a.myName(); // &quot;a&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">a.myLabel(); // &quot;obj a&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function Foo(name) {</span></span>
<span class="line"><span style="color:#24292e;">  this.name = name;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Foo.prototype.myName = function () {</span></span>
<span class="line"><span style="color:#24292e;">  return this.name;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 继承属性，通过借用构造函数调用</span></span>
<span class="line"><span style="color:#24292e;">function Bar(name, label) {</span></span>
<span class="line"><span style="color:#24292e;">  Foo.call(this, name);</span></span>
<span class="line"><span style="color:#24292e;">  this.label = label;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 继承方法，创建备份</span></span>
<span class="line"><span style="color:#24292e;">Bar.prototype = Object.create(Foo.prototype);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 必须设置回正确的构造函数，要不然在会发生判断类型出错</span></span>
<span class="line"><span style="color:#24292e;">Bar.prototype.constructor = Bar;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> // 必须在上一步之后</span></span>
<span class="line"><span style="color:#24292e;">Bar.prototype.myLabel = function () {</span></span>
<span class="line"><span style="color:#24292e;">  return this.label;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var a = new Bar(&quot;a&quot;, &quot;obj a&quot;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">a.myName(); // &quot;a&quot;</span></span>
<span class="line"><span style="color:#24292e;">a.myLabel(); // &quot;obj a&quot;</span></span></code></pre></div><h2 id="问-如果一个构造函数-bind-了一个对象-用这个构造函数创建出的实例会继承这个对象的属性吗-为什么" tabindex="-1">问:如果一个构造函数，bind 了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？ <a class="header-anchor" href="#问-如果一个构造函数-bind-了一个对象-用这个构造函数创建出的实例会继承这个对象的属性吗-为什么" aria-label="Permalink to &quot;问:如果一个构造函数，bind 了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？&quot;">​</a></h2><p>不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象</p><h2 id="_3-箭头函数和普通函数有啥区别-箭头函数能当构造函数吗" tabindex="-1">(3)箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？ <a class="header-anchor" href="#_3-箭头函数和普通函数有啥区别-箭头函数能当构造函数吗" aria-label="Permalink to &quot;(3)箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？&quot;">​</a></h2><ul><li><p>普通函数通过 function 关键字定义， this 无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。（取决于调用者，和是否独立运行）</p></li><li><p>箭头函数使用被称为 “胖箭头” 的操作 <code>=&gt;</code> 定义，箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。</p></li><li><ul><li>一个函数内部有两个方法：[[Call]] 和 [[Construct]]，在通过 new 进行函数调用时，会执行 [[construct]] 方法，创建一个实例对象，然后再执行这个函数体，将函数的 this 绑定在这个实例对象上</li><li>当直接调用时，执行 [[Call]] 方法，直接执行函数体</li><li>箭头函数没有 [[Construct]] 方法，不能被用作构造函数调用，当使用 new 进行函数调用时会报错。</li><li>箭头函数常用于回调函数中，包括事件处理器或定时器</li><li>箭头函数和 var self = this，都试图取代传统的 this 运行机制，将 this 的绑定拉回到词法作用域</li><li>没有原型、没有 this、没有 super，没有 arguments，没有 new.target</li><li>不能通过 new 关键字调用</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function foo() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return (a) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(this.a);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var obj1 = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  a: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var obj2 = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  a: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">var bar = foo.call(obj1);</span></span>
<span class="line"><span style="color:#e1e4e8;">bar.call(obj2);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function foo() {</span></span>
<span class="line"><span style="color:#24292e;">  return (a) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(this.a);</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var obj1 = {</span></span>
<span class="line"><span style="color:#24292e;">  a: 2</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var obj2 = {</span></span>
<span class="line"><span style="color:#24292e;">  a: 3</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">var bar = foo.call(obj1);</span></span>
<span class="line"><span style="color:#24292e;">bar.call(obj2);</span></span></code></pre></div><h3 id="参考资料-1" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料-1" aria-label="Permalink to &quot;参考资料&quot;">​</a></h3><ul><li><a href="https://segmentfault.com/a/1190000015162781" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000015162781</a></li></ul><h2 id="问-知道-es6-的-class-嘛-static-关键字有了解嘛" tabindex="-1">问：知道 ES6 的 Class 嘛？Static 关键字有了解嘛 <a class="header-anchor" href="#问-知道-es6-的-class-嘛-static-关键字有了解嘛" aria-label="Permalink to &quot;问：知道 ES6 的 Class 嘛？Static 关键字有了解嘛&quot;">​</a></h2><p>为这个类的函数对象直接添加方法，而不是加在这个函数对象的原型对象上</p><h2 id="_3-问-事件循环机制-event-loop" tabindex="-1">（3）问：事件循环机制 （Event Loop） <a class="header-anchor" href="#_3-问-事件循环机制-event-loop" aria-label="Permalink to &quot;（3）问：事件循环机制 （Event Loop）&quot;">​</a></h2><p>事件循环机制从整体上告诉了我们 JavaScript 代码的执行顺序<code>Event Loop</code>即事件循环，是指浏览器或<code>Node</code>的一种解决<code>javaScript</code>单线程运行时不会阻塞的一种机制，也就是我们经常使用<strong>异步</strong>的原理。</p><p>先执行宏任务队列，然后执行微任务队列，然后开始下一轮事件循环，继续先执行宏任务队列，再执行微任务队列。</p><ul><li>宏任务：script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering</li><li>微任务：process.nextTick()/Promise</li></ul><p>上诉的 setTimeout 和 setInterval 等都是任务源，真正进入任务队列的是他们分发的任务。</p><h3 id="优先级" tabindex="-1">优先级 <a class="header-anchor" href="#优先级" aria-label="Permalink to &quot;优先级&quot;">​</a></h3><ul><li>setTimeout = setInterval 一个队列</li><li>setTimeout &gt; setImmediate</li><li>process.nextTick &gt; Promise</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">for (const macroTask of macroTaskQueue) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  handleMacroTask();</span></span>
<span class="line"><span style="color:#e1e4e8;">  for (const microTask of microTaskQueue) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   handleMicroTask(microTask);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">for (const macroTask of macroTaskQueue) {</span></span>
<span class="line"><span style="color:#24292e;">  handleMacroTask();</span></span>
<span class="line"><span style="color:#24292e;">  for (const microTask of microTaskQueue) {</span></span>
<span class="line"><span style="color:#24292e;">   handleMicroTask(microTask);</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="参考链接-4" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接-4" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://juejin.im/post/59e85eebf265da430d571f89" target="_blank" rel="noreferrer">https://juejin.im/post/59e85eebf265da430d571f89</a></li></ul><h2 id="_2-手写题-数组扁平化" tabindex="-1">（2）手写题：数组扁平化 <a class="header-anchor" href="#_2-手写题-数组扁平化" aria-label="Permalink to &quot;（2）手写题：数组扁平化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  let result = [];</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  for (let i = 0; i &lt; arr.length; i++) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (Array.isArray(arr[i])) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      result = result.concat(flatten(arr[i]));</span></span>
<span class="line"><span style="color:#e1e4e8;">    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">      result = result.concat(arr[i]);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return result;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const a = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#e1e4e8;">console.log(flatten(a));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#24292e;">  let result = [];</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  for (let i = 0; i &lt; arr.length; i++) {</span></span>
<span class="line"><span style="color:#24292e;">    if (Array.isArray(arr[i])) {</span></span>
<span class="line"><span style="color:#24292e;">      result = result.concat(flatten(arr[i]));</span></span>
<span class="line"><span style="color:#24292e;">    } else {</span></span>
<span class="line"><span style="color:#24292e;">      result = result.concat(arr[i]);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return result;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const a = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#24292e;">console.log(flatten(a));</span></span></code></pre></div><h2 id="手写题-实现柯里化" tabindex="-1">手写题：实现柯里化 <a class="header-anchor" href="#手写题-实现柯里化" aria-label="Permalink to &quot;手写题：实现柯里化&quot;">​</a></h2><p>预先设置一些参数</p><p>柯里化是什么：是指这样一个函数，它接收函数 A，并且能返回一个新的函数，这个新的函数能够处理函数 A 的剩余参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function createCurry(func, args) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  var argity = func.length;</span></span>
<span class="line"><span style="color:#e1e4e8;">  var args = args || [];</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    var _args = [].slice.apply(arguments);</span></span>
<span class="line"><span style="color:#e1e4e8;">    args.push(..._args);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if (args.length &lt; argity) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      return createCurry.call(this, func, args);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    return func.apply(this, args);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function createCurry(func, args) {</span></span>
<span class="line"><span style="color:#24292e;">  var argity = func.length;</span></span>
<span class="line"><span style="color:#24292e;">  var args = args || [];</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return function () {</span></span>
<span class="line"><span style="color:#24292e;">    var _args = [].slice.apply(arguments);</span></span>
<span class="line"><span style="color:#24292e;">    args.push(..._args);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if (args.length &lt; argity) {</span></span>
<span class="line"><span style="color:#24292e;">      return createCurry.call(this, func, args);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    return func.apply(this, args);</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="手写题-数组去重" tabindex="-1">手写题：数组去重 <a class="header-anchor" href="#手写题-数组去重" aria-label="Permalink to &quot;手写题：数组去重&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Array.from(new Set([1, 1, 2, 2]))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Array.from(new Set([1, 1, 2, 2]))</span></span></code></pre></div><h2 id="问-let-闭包" tabindex="-1">问：let 闭包 <a class="header-anchor" href="#问-let-闭包" aria-label="Permalink to &quot;问：let 闭包&quot;">​</a></h2><p>let 会产生临时性死区，在当前的执行上下文中，会进行变量提升，但是未被初始化，所以在执行上下文执行阶段，执行代码如果还没有执行到变量赋值，就引用此变量就会报错，此变量未初始化。</p><h2 id="问-变量提升" tabindex="-1">问：变量提升 <a class="header-anchor" href="#问-变量提升" aria-label="Permalink to &quot;问：变量提升&quot;">​</a></h2><p>函数在运行的时候，会首先创建执行上下文，然后将执行上下文入栈，然后当此执行上下文处于栈顶时，开始运行执行上下文。</p><p>在创建执行上下文的过程中会做三件事：创建变量对象，创建作用域链，确定 this 指向，其中创建变量对象的过程中，首先会为 arguments 创建一个属性，值为 arguments，然后会扫码 function 函数声明，创建一个同名属性，值为函数的引用，接着会扫码 var 变量声明，创建一个同名属性，值为 undefined，这就是变量提升。</p><h2 id="instance-如何使用" tabindex="-1">instance 如何使用 <a class="header-anchor" href="#instance-如何使用" aria-label="Permalink to &quot;instance 如何使用&quot;">​</a></h2><p>基本类型不能使用 instanceof</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&#39;hello tuture&#39; instanceof String // false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&#39;hello tuture&#39; instanceof String // false</span></span></code></pre></div><h2 id="为什么引用值要放在堆中-而原始值要放在栈中的问题" tabindex="-1">为什么引用值要放在堆中，而原始值要放在栈中的问题 <a class="header-anchor" href="#为什么引用值要放在堆中-而原始值要放在栈中的问题" aria-label="Permalink to &quot;为什么引用值要放在堆中，而原始值要放在栈中的问题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">记住一句话：能量是守衡的，无非是时间换空间，空间换时间的问题</span></span>
<span class="line"><span style="color:#e1e4e8;">堆比栈大，栈比堆的运算速度快,对象是一个复杂的结构，并且可以自由扩展，如：数组可以无限扩充，对象可以自由添加属性。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。</span></span>
<span class="line"><span style="color:#e1e4e8;">相对于简单数据类型而言，简单数据类型就比较稳定，并且它只占据很小的内存。</span></span>
<span class="line"><span style="color:#e1e4e8;">不将简单数据类型放在堆是因为通过引用到堆中查找实际对象是要花费时间的，而这个综合成本远大于直接从栈中取得实际值的成本。</span></span>
<span class="line"><span style="color:#e1e4e8;">所以简单数据类型的值直接存放在栈中。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">记住一句话：能量是守衡的，无非是时间换空间，空间换时间的问题</span></span>
<span class="line"><span style="color:#24292e;">堆比栈大，栈比堆的运算速度快,对象是一个复杂的结构，并且可以自由扩展，如：数组可以无限扩充，对象可以自由添加属性。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。</span></span>
<span class="line"><span style="color:#24292e;">相对于简单数据类型而言，简单数据类型就比较稳定，并且它只占据很小的内存。</span></span>
<span class="line"><span style="color:#24292e;">不将简单数据类型放在堆是因为通过引用到堆中查找实际对象是要花费时间的，而这个综合成本远大于直接从栈中取得实际值的成本。</span></span>
<span class="line"><span style="color:#24292e;">所以简单数据类型的值直接存放在栈中。</span></span></code></pre></div><h2 id="封装一个-javascript-的类型判断函数" tabindex="-1">封装一个 javascript 的类型判断函数 <a class="header-anchor" href="#封装一个-javascript-的类型判断函数" aria-label="Permalink to &quot;封装一个 javascript 的类型判断函数&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getType</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断数据是 null 的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断数据是引用类型的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> valueClass </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Object</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.toString.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(value),</span></span>
<span class="line"><span style="color:#E1E4E8;">      type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> valueClass.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot; &quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    type.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> type.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断数据是基本数据类型的情况和函数的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getType</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断数据是 null 的情况</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断数据是引用类型的情况</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> valueClass </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Object</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.toString.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(value),</span></span>
<span class="line"><span style="color:#24292E;">      type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> valueClass.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot; &quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    type.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> type.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断数据是基本数据类型的情况和函数的情况</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,191),o=[e];function t(c,r,i,y,E,u){return n(),a("div",null,o)}const b=s(p,[["render",t]]);export{d as __pageData,b as default};
