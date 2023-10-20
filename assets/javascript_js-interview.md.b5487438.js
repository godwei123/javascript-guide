import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.00751356.js";const p="/javascript-guide/assets/640-67gd67832dhq89323.8f1b58f6.jpeg",g=JSON.parse('{"title":"JavaScript Interview part-1","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/js-interview.md","filePath":"javascript/js-interview.md"}'),e={name:"javascript/js-interview.md"},o=l(`<h1 id="javascript-interview-part-1" tabindex="-1">JavaScript Interview part-1 <a class="header-anchor" href="#javascript-interview-part-1" aria-label="Permalink to &quot;JavaScript Interview part-1&quot;">​</a></h1><h2 id="函数柯里化" tabindex="-1">函数柯里化 <a class="header-anchor" href="#函数柯里化" aria-label="Permalink to &quot;函数柯里化&quot;">​</a></h2><p>柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分计算函数。柯里化，是一个逐步接收参数的过程。 反柯里化，是一个泛型化的过程。它使得被反柯里化的函数，可以接收更多参数。目的是创建一个更普适性的函数，可以被不同的对象使用。</p><h3 id="柯里化" tabindex="-1">柯里化 <a class="header-anchor" href="#柯里化" aria-label="Permalink to &quot;柯里化&quot;">​</a></h3><p>1、实现<code>add(1)(2,3)(4)()=10</code>的效果</p><p>依题意，有两个关键点要注意：</p><ul><li>传入参数时，代码不执行输出结果，而是先记忆起来</li><li>当传入空的参数时，代表可以进行真正的运算</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">currying</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []; </span><span style="color:#6A737D;">// 用来接收参数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> params </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断是否执行计算</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (params.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(params); </span><span style="color:#6A737D;">// 收集传入的参数，进行缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fn.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, args); </span><span style="color:#6A737D;">// 符合执行条件，执行计算</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> add </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">currying</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> sum </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sum </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> sum;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 已经知道函数参数个数情况</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">curry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (args.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> fn.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fn.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">rest</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">curry</span><span style="color:#E1E4E8;">(fn, </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args, </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">rest);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">currying</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []; </span><span style="color:#6A737D;">// 用来接收参数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> params </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断是否执行计算</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (params.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(params); </span><span style="color:#6A737D;">// 收集传入的参数，进行缓存</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> next;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fn.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, args); </span><span style="color:#6A737D;">// 符合执行条件，执行计算</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> add </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">currying</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> sum </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    sum </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">[i];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> sum;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 已经知道函数参数个数情况</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">curry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (args.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> fn.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fn.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">...</span><span style="color:#E36209;">rest</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">curry</span><span style="color:#24292E;">(fn, </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args, </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">rest);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>2、实现<code>add(1)(2,3)(4)(5)=15</code>的效果</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">    args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(t);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  next.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">prev</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cur</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> prev </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> cur);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  next.</span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">prev</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cur</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> prev </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> cur);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> next;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">    args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(t);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> next;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  next.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">prev</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cur</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> prev </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> cur);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  next.</span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">prev</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cur</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> prev </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> cur);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> next;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="反柯里化" tabindex="-1">反柯里化 <a class="header-anchor" href="#反柯里化" aria-label="Permalink to &quot;反柯里化&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unCurrying</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> args </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [].slice.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> that </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">shift</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fn.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(that, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//============</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">unCurrying</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> self </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.call.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(self, </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unCurrying</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> args </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [].slice.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> that </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">shift</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fn.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(that, args);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//============</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">unCurrying</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> self </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.call.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(self, </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="json" tabindex="-1">JSON <a class="header-anchor" href="#json" aria-label="Permalink to &quot;JSON&quot;">​</a></h2><p>对其中的 undefined，function 将在 JSON.stringify 时会忽略掉</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  b: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  c: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  d: </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">e</span><span style="color:#E1E4E8;">() {},</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {&quot;a&quot;:3,&quot;b&quot;:4,&quot;c&quot;:null}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  b: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  c: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  d: </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">e</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {&quot;a&quot;:3,&quot;b&quot;:4,&quot;c&quot;:null,&quot;e&quot;:100}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const obj 中的 get e () {} 并不是函数，此处应该是重写了 obj.e 的 get 方法，因为 get 方法未定义返回值，因此在执行 JSON.stringify 时，执行 obj.e 的 get 方法，返回 undefined，因此被忽略</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  a: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  b: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  c: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  d: </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">e</span><span style="color:#24292E;">() {},</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {&quot;a&quot;:3,&quot;b&quot;:4,&quot;c&quot;:null}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  a: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  b: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  c: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  d: </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">e</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// {&quot;a&quot;:3,&quot;b&quot;:4,&quot;c&quot;:null,&quot;e&quot;:100}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const obj 中的 get e () {} 并不是函数，此处应该是重写了 obj.e 的 get 方法，因为 get 方法未定义返回值，因此在执行 JSON.stringify 时，执行 obj.e 的 get 方法，返回 undefined，因此被忽略</span></span></code></pre></div><h2 id="softbind" tabindex="-1">softbind <a class="header-anchor" href="#softbind" aria-label="Permalink to &quot;softbind&quot;">​</a></h2><p>bind 函数多次调用会已第一次绑定的 this 为准，softbind 以最后一次绑定传入的 this 为准；</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">Function</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">softBind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">rest</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bound</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">o</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> (window </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> global) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fn.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(o, [</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">rest, </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">bound</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">fn</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bound;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">Function</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">softBind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#E36209;">rest</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bound</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">o</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> (window </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> global) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fn.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(o, [</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">rest, </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args]);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">bound</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">fn</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bound;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="object-freeze-object-seal" tabindex="-1">Object.freeze &amp; Object.seal <a class="header-anchor" href="#object-freeze-object-seal" aria-label="Permalink to &quot;Object.freeze &amp; Object.seal&quot;">​</a></h2><p>这两种方法之间的区别在于，当我们对一个对象使用 Object.freeze 方法时，该对象的属性是不可变的，这意味着我们不能更改或编辑这些属性的值。而在 Obj.seal 方法中，我们可以改变现有的属性。</p><p>1）Object.freeze() Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。</p><p>2）Object.seal() Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。</p><p>3）相同点： ①ES5 新增 ② 对象不可能扩展，也就是不能再添加新的属性或者方法。 ③ 对象已有属性不允许被删除。 ④ 对象属性特性不可以重新配置。</p><p>4）不同点： ①Object.seal 方法生成的密封对象，如果属性是可写的，那么可以修改属性值。 ②Object.freeze 方法生成的冻结对象，属性都是不可写的，也就是属性值无法更改</p><h2 id="说明下面例子" tabindex="-1">说明下面例子 <a class="header-anchor" href="#说明下面例子" aria-label="Permalink to &quot;说明下面例子&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[].forEach.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">$$</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;*&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a.style.outline </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;1px solid #&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">~~</span><span style="color:#E1E4E8;">(Math.</span><span style="color:#B392F0;">random</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24</span><span style="color:#E1E4E8;">))).</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[].forEach.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">$$</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;*&quot;</span><span style="color:#24292E;">), </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">a</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  a.style.outline </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;1px solid #&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">~~</span><span style="color:#24292E;">(Math.</span><span style="color:#6F42C1;">random</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">24</span><span style="color:#24292E;">))).</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">16</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>直观操作：获取页面所有的元素，然后给这些元素加上 1px 的外边框，并且使用了随机颜色</p><p>几个关键点： 1）选择页面中所有的元素</p><p><code>$$</code>函数是现代浏览器提供的一个命令行 API，它相当于<code>document.querySelectorAll</code>，可以将当前页面中的 CSS 选择器作为参数传给该方法，然后它会返回匹配的所有元素。</p><p>2）遍历元素</p><p><code>[].forEach.call( $$(&#39;&#39;), function( a ) { / 具体的操作 */ });</code> 通过使用函数的 call 和 apply 方法，可以实现在类似 NodeLists 这样的类数组对象上调用数组方法。</p><p>3）为元素添加颜色</p><p><code>a.style.outline=&quot;1px solid #&quot; + color</code> 代码中使用 outline 的 CSS 属性给元素添加一个边框。由于渲染的 outline 是不在 CSS 盒模型中的，所以为元素添加 outline 并不会影响元素的大小和页面的布局。</p><p>4）生成随机颜色</p><p><code> ~~(Math.random()(1&lt;&lt;24))).toString(16)</code> ①Math.random()(1&lt;&lt;24) 可以得到 0~2^24 - 1 之间的随机数，使用了位操作 ② 因为得到的是一个浮点数，但我们只需要整数部分，使用取反操作符 ~ 连续两次取反获得整数部分，使用两个波浪号等价于使用 parseInt， const a =12.34; ~~a == parseInt(a, 10); // true ③ 然后再用 toString(16) 的方式，转换为一个十六进制的字符串。toString() 方法将数值转换成字符串时，接收一个参数用以指明数值的进制。如果省略了该参数，则默认采用十进制，但你可以指定为其他的进制，</p><h2 id="function" tabindex="-1">Function <a class="header-anchor" href="#function" aria-label="Permalink to &quot;Function&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Function.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Function</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> b);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Function.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Function</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> b);</span></span></code></pre></div><p>Function 构造器本身也是个 Function。他的 length 属性值为 1 。该属性 Writable: false, Enumerable: false, Configurable: true.</p><p>Function 原型对象的 length 属性值为 0 。</p><h2 id="script-放在底部还会影响-dom-的解析和渲染吗-script-内部的代码执行会等待-css-加载完吗-css-加载会影响-domcontentloaded-么" tabindex="-1">Script 放在底部还会影响 dom 的解析和渲染吗？Script 内部的代码执行会等待 css 加载完吗？css 加载会影响 DOMContentLoaded 么？ <a class="header-anchor" href="#script-放在底部还会影响-dom-的解析和渲染吗-script-内部的代码执行会等待-css-加载完吗-css-加载会影响-domcontentloaded-么" aria-label="Permalink to &quot;Script 放在底部还会影响 dom 的解析和渲染吗？Script 内部的代码执行会等待 css 加载完吗？css 加载会影响 DOMContentLoaded 么？&quot;">​</a></h2><h2 id="判断一个对象是否是数组-处理类数组对象" tabindex="-1">判断一个对象是否是数组，处理类数组对象 <a class="header-anchor" href="#判断一个对象是否是数组-处理类数组对象" aria-label="Permalink to &quot;判断一个对象是否是数组，处理类数组对象&quot;">​</a></h2><h4 id="判断数组方式" tabindex="-1">判断数组方式 <a class="header-anchor" href="#判断数组方式" aria-label="Permalink to &quot;判断数组方式&quot;">​</a></h4><ul><li><code>[] instanceof Array</code></li><li><code>Object.prototype.toString.call([]) === &#39;[object Array]&#39;</code></li><li><code>Array.prototype.isPrototypeOf([])</code></li><li><code>[].constructor === Array</code></li><li><code>Array.isArray([])</code></li></ul><h4 id="如何处理类数组对象" tabindex="-1">如何处理类数组对象 <a class="header-anchor" href="#如何处理类数组对象" aria-label="Permalink to &quot;如何处理类数组对象&quot;">​</a></h4><p><strong>1）JavaScript 类数组对象的定义</strong></p><ul><li>可以通过索引访问元素，并且拥有 length 属性；</li><li>没有数组的其他方法，例如 <code>push</code> ， <code>forEach</code> ， <code>indexOf</code> 等。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">var foo = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    0: &#39;JS&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    1: &#39;Node&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    2: &#39;TS&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    length: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">var foo = {</span></span>
<span class="line"><span style="color:#24292e;">    0: &#39;JS&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    1: &#39;Node&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    2: &#39;TS&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    length: 3</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><strong>2）转换方式</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 方式一</span></span>
<span class="line"><span style="color:#e1e4e8;">Array.prototype.slice.call(arguments);</span></span>
<span class="line"><span style="color:#e1e4e8;">Array.prototype.slice.apply(arguments)</span></span>
<span class="line"><span style="color:#e1e4e8;">[].slice.call(arguments)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 方式二</span></span>
<span class="line"><span style="color:#e1e4e8;">Array.from(arguments);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 方式三</span></span>
<span class="line"><span style="color:#e1e4e8;">// 这种方式要求 数据结构 必须有 遍历器接口</span></span>
<span class="line"><span style="color:#e1e4e8;">[...arguments]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 方式四</span></span>
<span class="line"><span style="color:#e1e4e8;">[].concat.apply([],arguments)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 方式五：手动实现</span></span>
<span class="line"><span style="color:#e1e4e8;">function toArray(s){</span></span>
<span class="line"><span style="color:#e1e4e8;">  var arr = [];</span></span>
<span class="line"><span style="color:#e1e4e8;">  for(var i = 0,len = s.length; i &lt; len; i++){</span></span>
<span class="line"><span style="color:#e1e4e8;">    arr[i] = s[i];</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  return arr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 方式一</span></span>
<span class="line"><span style="color:#24292e;">Array.prototype.slice.call(arguments);</span></span>
<span class="line"><span style="color:#24292e;">Array.prototype.slice.apply(arguments)</span></span>
<span class="line"><span style="color:#24292e;">[].slice.call(arguments)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 方式二</span></span>
<span class="line"><span style="color:#24292e;">Array.from(arguments);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 方式三</span></span>
<span class="line"><span style="color:#24292e;">// 这种方式要求 数据结构 必须有 遍历器接口</span></span>
<span class="line"><span style="color:#24292e;">[...arguments]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 方式四</span></span>
<span class="line"><span style="color:#24292e;">[].concat.apply([],arguments)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 方式五：手动实现</span></span>
<span class="line"><span style="color:#24292e;">function toArray(s){</span></span>
<span class="line"><span style="color:#24292e;">  var arr = [];</span></span>
<span class="line"><span style="color:#24292e;">  for(var i = 0,len = s.length; i &lt; len; i++){</span></span>
<span class="line"><span style="color:#24292e;">    arr[i] = s[i];</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  return arr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><strong>3）转换后注意几点</strong></p><ul><li>数组长度由类数组的 length 属性决定</li><li>索引不连续，会自动补位 undefined</li><li>仅考虑 0 和正整数索引；</li><li>slice 会产生稀疏数组，内容是 empty 而不是 undefined</li><li>类数组 push 注意，push 操作的是索引值为 length 的位置</li></ul><h2 id="在-map-中和-for-中调用异步函数" tabindex="-1">在 map 中和 for 中调用异步函数 <a class="header-anchor" href="#在-map-中和-for-中调用异步函数" aria-label="Permalink to &quot;在 map 中和 for 中调用异步函数&quot;">​</a></h2><ul><li>map 会先把执行同步操作执行完，就返回，之后再一次一次的执行异步任务</li><li>for 是等待异步返回结果后再进入下一次循环</li></ul><h4 id="map" tabindex="-1">map <a class="header-anchor" href="#map" aria-label="Permalink to &quot;map&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">const arr = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span style="color:#e1e4e8;">function getData() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      resolve(&quot;data&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }, 1000);</span></span>
<span class="line"><span style="color:#e1e4e8;">  });</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(async () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const result = arr.map(async () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&quot;start&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    const data = await getData();</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(data);</span></span>
<span class="line"><span style="color:#e1e4e8;">    return data;</span></span>
<span class="line"><span style="color:#e1e4e8;">  });</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(result);</span></span>
<span class="line"><span style="color:#e1e4e8;">})();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 5 start -&gt; 遍历每一项开始</span></span>
<span class="line"><span style="color:#e1e4e8;">// (5) [Promise, Promise, Promise, Promise, Promise] -&gt; 返回的结果</span></span>
<span class="line"><span style="color:#e1e4e8;">// 5 data -&gt; 遍历每一项异步执行返回的结果</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">const arr = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span style="color:#24292e;">function getData() {</span></span>
<span class="line"><span style="color:#24292e;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      resolve(&quot;data&quot;);</span></span>
<span class="line"><span style="color:#24292e;">    }, 1000);</span></span>
<span class="line"><span style="color:#24292e;">  });</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(async () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  const result = arr.map(async () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&quot;start&quot;);</span></span>
<span class="line"><span style="color:#24292e;">    const data = await getData();</span></span>
<span class="line"><span style="color:#24292e;">    console.log(data);</span></span>
<span class="line"><span style="color:#24292e;">    return data;</span></span>
<span class="line"><span style="color:#24292e;">  });</span></span>
<span class="line"><span style="color:#24292e;">  console.log(result);</span></span>
<span class="line"><span style="color:#24292e;">})();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 5 start -&gt; 遍历每一项开始</span></span>
<span class="line"><span style="color:#24292e;">// (5) [Promise, Promise, Promise, Promise, Promise] -&gt; 返回的结果</span></span>
<span class="line"><span style="color:#24292e;">// 5 data -&gt; 遍历每一项异步执行返回的结果</span></span></code></pre></div><h4 id="分析" tabindex="-1">分析 <a class="header-anchor" href="#分析" aria-label="Permalink to &quot;分析&quot;">​</a></h4><p>map 函数的原理是：</p><ol><li>循环数组，把数组每一项的值，传给回调函数</li><li>将回调函数处理后的结果 push 到一个新的数组</li><li>返回新数组</li></ol><p>map 函数函数是同步执行的，循环每一项时，到给新数组值都是同步操作。</p><p>代码执行结果：</p><p>map 不会等到回调函数的异步函数返回结果，就会进入下一次循环。</p><p>执行完同步操作之后，就会返回结果，所以 map 返回的值都是 Promise</p><h4 id="解决问题" tabindex="-1">解决问题 <a class="header-anchor" href="#解决问题" aria-label="Permalink to &quot;解决问题&quot;">​</a></h4><ul><li>使用 for、for..of 代替</li></ul><p>简单实现一个</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 获取数据接口</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;data&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 异步的map</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">selfMap</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(arr[i], i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    result.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(item);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 调用</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">selfMap</span><span style="color:#E1E4E8;">([</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">], </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">item</span><span style="color:#9ECBFF;">}_\${</span><span style="color:#E1E4E8;">data</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res, </span><span style="color:#9ECBFF;">&quot;res&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span>
<span class="line"><span style="color:#6A737D;">// [&quot;1_data&quot;, &quot;2_data&quot;, &quot;3_data&quot;, &quot;4_data&quot;, &quot;5_data&quot;] &quot;res&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 获取数据接口</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;data&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 异步的map</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">selfMap</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(arr[i], i);</span></span>
<span class="line"><span style="color:#24292E;">    result.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(item);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 调用</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">selfMap</span><span style="color:#24292E;">([</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">], </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">, </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">item</span><span style="color:#032F62;">}_\${</span><span style="color:#24292E;">data</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res, </span><span style="color:#032F62;">&quot;res&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span>
<span class="line"><span style="color:#6A737D;">// [&quot;1_data&quot;, &quot;2_data&quot;, &quot;3_data&quot;, &quot;4_data&quot;, &quot;5_data&quot;] &quot;res&quot;</span></span></code></pre></div><h4 id="for" tabindex="-1">for <a class="header-anchor" href="#for" aria-label="Permalink to &quot;for&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reject</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;data&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, len </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(data);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 2</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 3</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 4</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">, </span><span style="color:#E36209;">reject</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;data&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, len </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(i);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(data);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 2</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 3</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span>
<span class="line"><span style="color:#6A737D;">// 4</span></span>
<span class="line"><span style="color:#6A737D;">// data</span></span></code></pre></div><h2 id="typedarray-arraybuffer-dataview" tabindex="-1">TypedArray / ArrayBuffer / DataView <a class="header-anchor" href="#typedarray-arraybuffer-dataview" aria-label="Permalink to &quot;TypedArray / ArrayBuffer / DataView&quot;">​</a></h2><h3 id="arraybuffer" tabindex="-1">ArrayBuffer <a class="header-anchor" href="#arraybuffer" aria-label="Permalink to &quot;ArrayBuffer&quot;">​</a></h3><p><strong><code>ArrayBuffer</code></strong> 对象用来表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组。</p><p>不能直接操作 <code>ArrayBuffer</code> 的内容，而是要通过[类型数组对象,TypedArray]或 [<code>DataView</code>] 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayBuffer</span><span style="color:#E1E4E8;">(length);</span></span>
<span class="line"><span style="color:#6A737D;">// ArrayBuffer 构造函数用来创建一个指定字节长度的 ArrayBuffer 对象。</span></span>
<span class="line"><span style="color:#6A737D;">// length 要创建的 ArrayBuffer 的大小，单位为字节。</span></span>
<span class="line"><span style="color:#6A737D;">// 返回值  一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0。</span></span>
<span class="line"><span style="color:#6A737D;">// 如果 length 大于 Number.MAX_SAFE_INTEGER（&gt;= 2 ** 53）或为负数，则抛出一个  RangeError  异常。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ArrayBuffer.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// ArrayBuffer 构造函数的 length 属性，其值为1。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">ArrayBuffer</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.byteLength; </span><span style="color:#6A737D;">// 这个返回的才是构造函数中的长度</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayBuffer</span><span style="color:#24292E;">(length);</span></span>
<span class="line"><span style="color:#6A737D;">// ArrayBuffer 构造函数用来创建一个指定字节长度的 ArrayBuffer 对象。</span></span>
<span class="line"><span style="color:#6A737D;">// length 要创建的 ArrayBuffer 的大小，单位为字节。</span></span>
<span class="line"><span style="color:#6A737D;">// 返回值  一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0。</span></span>
<span class="line"><span style="color:#6A737D;">// 如果 length 大于 Number.MAX_SAFE_INTEGER（&gt;= 2 ** 53）或为负数，则抛出一个  RangeError  异常。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ArrayBuffer.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// ArrayBuffer 构造函数的 length 属性，其值为1。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">ArrayBuffer</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.byteLength; </span><span style="color:#6A737D;">// 这个返回的才是构造函数中的长度</span></span></code></pre></div><h3 id="typedarray" tabindex="-1">TypedArray <a class="header-anchor" href="#typedarray" aria-label="Permalink to &quot;TypedArray&quot;">​</a></h3><p>一个<strong>类型化数组</strong>（**TypedArray）**对象描述了一个底层的[二进制数据缓冲区,ArrayBuffer]（binary data buffer）的一个类数组视图（view）。事实上，没有名为 <code>TypedArray</code> 的全局属性，也没有一个名为 <code>TypedArray</code> 的构造函数。相反，有许多不同的全局属性，它们的值是特定元素类型的类型化数组构造函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 下面代码是语法格式，不能直接运行，</span></span>
<span class="line"><span style="color:#e1e4e8;">// TypedArray 关键字需要替换为底部列出的构造函数。</span></span>
<span class="line"><span style="color:#e1e4e8;">new TypedArray(); // ES2017中新增</span></span>
<span class="line"><span style="color:#e1e4e8;">new TypedArray(length);</span></span>
<span class="line"><span style="color:#e1e4e8;">new TypedArray(typedArray);</span></span>
<span class="line"><span style="color:#e1e4e8;">new TypedArray(object);</span></span>
<span class="line"><span style="color:#e1e4e8;">new TypedArray(buffer [, byteOffset [, length</span></span>
<span class="line"><span style="color:#e1e4e8;">]])</span></span>
<span class="line"><span style="color:#e1e4e8;">;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// TypedArray 指的是以下的其中之一：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Int8Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Uint8Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Uint8ClampedArray();</span></span>
<span class="line"><span style="color:#e1e4e8;">Int16Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Uint16Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Int32Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Uint32Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Float32Array();</span></span>
<span class="line"><span style="color:#e1e4e8;">Float64Array();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">length</span></span>
<span class="line"><span style="color:#e1e4e8;">当传入</span></span>
<span class="line"><span style="color:#e1e4e8;">length</span></span>
<span class="line"><span style="color:#e1e4e8;">参数时，一个内部的数组缓冲区会被创建在内存中，该缓存区的大小（类型化数组中</span></span>
<span class="line"><span style="color:#e1e4e8;">byteLength</span></span>
<span class="line"><span style="color:#e1e4e8;">属性的值）是传入的</span></span>
<span class="line"><span style="color:#e1e4e8;">length</span></span>
<span class="line"><span style="color:#e1e4e8;">乘以数组中每个元素的字节数（BYTES_PER_ELEMENT），每个元素的值都为0。(译者注：每个元素的字节数是由具体的构造函数决定的，比如</span></span>
<span class="line"><span style="color:#e1e4e8;">Int16Array()</span></span>
<span class="line"><span style="color:#e1e4e8;">的每个元素的字节数为</span></span>
<span class="line"><span style="color:#e1e4e8;">2，Int32Array()</span></span>
<span class="line"><span style="color:#e1e4e8;">的每个元素的字节数为</span></span>
<span class="line"><span style="color:#e1e4e8;">4</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">typedArray</span></span>
<span class="line"><span style="color:#e1e4e8;">当传入一个任意类型化数组对象作为</span></span>
<span class="line"><span style="color:#e1e4e8;">typedArray</span></span>
<span class="line"><span style="color:#e1e4e8;">参数时（比如</span></span>
<span class="line"><span style="color:#e1e4e8;">Int32Array），typedArray</span></span>
<span class="line"><span style="color:#e1e4e8;">会被复制到一个新的类型数组中。typedArray</span></span>
<span class="line"><span style="color:#e1e4e8;">中的每个值在被复制到新的数组之前，会被转化为相应类型的构造函数。新的生成的类型化数组对象将会有跟传入的数组相同的长度（译者注：比如原来的类型化数组的</span></span>
<span class="line"><span style="color:#e1e4e8;">length == 2，那么新生成的数组的</span></span>
<span class="line"><span style="color:#e1e4e8;">length</span></span>
<span class="line"><span style="color:#e1e4e8;">也是</span></span>
<span class="line"><span style="color:#e1e4e8;">2，只是数组中的每一项进行了转化）。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">object</span></span>
<span class="line"><span style="color:#e1e4e8;">当传入一个</span></span>
<span class="line"><span style="color:#e1e4e8;">object</span></span>
<span class="line"><span style="color:#e1e4e8;">作为参数时，就像通过</span></span>
<span class="line"><span style="color:#e1e4e8;">TypedArray.from()</span></span>
<span class="line"><span style="color:#e1e4e8;">方法创建一个新的类型化数组一样。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">buffer, byteOffset, length</span></span>
<span class="line"><span style="color:#e1e4e8;">当传入一个</span></span>
<span class="line"><span style="color:#e1e4e8;">buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">参数，或者再另外加上可选参数</span></span>
<span class="line"><span style="color:#e1e4e8;">byteOffset</span></span>
<span class="line"><span style="color:#e1e4e8;">和</span></span>
<span class="line"><span style="color:#e1e4e8;">length</span></span>
<span class="line"><span style="color:#e1e4e8;">时，一个新的类型化数组视图将会被创建，并可用于呈现传入的</span></span>
<span class="line"><span style="color:#e1e4e8;">ArrayBuffer</span></span>
<span class="line"><span style="color:#e1e4e8;">实例。byteOffset</span></span>
<span class="line"><span style="color:#e1e4e8;">和length</span></span>
<span class="line"><span style="color:#e1e4e8;">参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">都会被呈现；如果仅仅忽略</span></span>
<span class="line"><span style="color:#e1e4e8;">length，那么</span></span>
<span class="line"><span style="color:#e1e4e8;">buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">中偏移了</span></span>
<span class="line"><span style="color:#e1e4e8;">byteOffset</span></span>
<span class="line"><span style="color:#e1e4e8;">后剩下的</span></span>
<span class="line"><span style="color:#e1e4e8;">buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">将会被呈现。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 下面代码是语法格式，不能直接运行，</span></span>
<span class="line"><span style="color:#24292e;">// TypedArray 关键字需要替换为底部列出的构造函数。</span></span>
<span class="line"><span style="color:#24292e;">new TypedArray(); // ES2017中新增</span></span>
<span class="line"><span style="color:#24292e;">new TypedArray(length);</span></span>
<span class="line"><span style="color:#24292e;">new TypedArray(typedArray);</span></span>
<span class="line"><span style="color:#24292e;">new TypedArray(object);</span></span>
<span class="line"><span style="color:#24292e;">new TypedArray(buffer [, byteOffset [, length</span></span>
<span class="line"><span style="color:#24292e;">]])</span></span>
<span class="line"><span style="color:#24292e;">;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// TypedArray 指的是以下的其中之一：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Int8Array();</span></span>
<span class="line"><span style="color:#24292e;">Uint8Array();</span></span>
<span class="line"><span style="color:#24292e;">Uint8ClampedArray();</span></span>
<span class="line"><span style="color:#24292e;">Int16Array();</span></span>
<span class="line"><span style="color:#24292e;">Uint16Array();</span></span>
<span class="line"><span style="color:#24292e;">Int32Array();</span></span>
<span class="line"><span style="color:#24292e;">Uint32Array();</span></span>
<span class="line"><span style="color:#24292e;">Float32Array();</span></span>
<span class="line"><span style="color:#24292e;">Float64Array();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">length</span></span>
<span class="line"><span style="color:#24292e;">当传入</span></span>
<span class="line"><span style="color:#24292e;">length</span></span>
<span class="line"><span style="color:#24292e;">参数时，一个内部的数组缓冲区会被创建在内存中，该缓存区的大小（类型化数组中</span></span>
<span class="line"><span style="color:#24292e;">byteLength</span></span>
<span class="line"><span style="color:#24292e;">属性的值）是传入的</span></span>
<span class="line"><span style="color:#24292e;">length</span></span>
<span class="line"><span style="color:#24292e;">乘以数组中每个元素的字节数（BYTES_PER_ELEMENT），每个元素的值都为0。(译者注：每个元素的字节数是由具体的构造函数决定的，比如</span></span>
<span class="line"><span style="color:#24292e;">Int16Array()</span></span>
<span class="line"><span style="color:#24292e;">的每个元素的字节数为</span></span>
<span class="line"><span style="color:#24292e;">2，Int32Array()</span></span>
<span class="line"><span style="color:#24292e;">的每个元素的字节数为</span></span>
<span class="line"><span style="color:#24292e;">4</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">typedArray</span></span>
<span class="line"><span style="color:#24292e;">当传入一个任意类型化数组对象作为</span></span>
<span class="line"><span style="color:#24292e;">typedArray</span></span>
<span class="line"><span style="color:#24292e;">参数时（比如</span></span>
<span class="line"><span style="color:#24292e;">Int32Array），typedArray</span></span>
<span class="line"><span style="color:#24292e;">会被复制到一个新的类型数组中。typedArray</span></span>
<span class="line"><span style="color:#24292e;">中的每个值在被复制到新的数组之前，会被转化为相应类型的构造函数。新的生成的类型化数组对象将会有跟传入的数组相同的长度（译者注：比如原来的类型化数组的</span></span>
<span class="line"><span style="color:#24292e;">length == 2，那么新生成的数组的</span></span>
<span class="line"><span style="color:#24292e;">length</span></span>
<span class="line"><span style="color:#24292e;">也是</span></span>
<span class="line"><span style="color:#24292e;">2，只是数组中的每一项进行了转化）。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">object</span></span>
<span class="line"><span style="color:#24292e;">当传入一个</span></span>
<span class="line"><span style="color:#24292e;">object</span></span>
<span class="line"><span style="color:#24292e;">作为参数时，就像通过</span></span>
<span class="line"><span style="color:#24292e;">TypedArray.from()</span></span>
<span class="line"><span style="color:#24292e;">方法创建一个新的类型化数组一样。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">buffer, byteOffset, length</span></span>
<span class="line"><span style="color:#24292e;">当传入一个</span></span>
<span class="line"><span style="color:#24292e;">buffer</span></span>
<span class="line"><span style="color:#24292e;">参数，或者再另外加上可选参数</span></span>
<span class="line"><span style="color:#24292e;">byteOffset</span></span>
<span class="line"><span style="color:#24292e;">和</span></span>
<span class="line"><span style="color:#24292e;">length</span></span>
<span class="line"><span style="color:#24292e;">时，一个新的类型化数组视图将会被创建，并可用于呈现传入的</span></span>
<span class="line"><span style="color:#24292e;">ArrayBuffer</span></span>
<span class="line"><span style="color:#24292e;">实例。byteOffset</span></span>
<span class="line"><span style="color:#24292e;">和length</span></span>
<span class="line"><span style="color:#24292e;">参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个buffer</span></span>
<span class="line"><span style="color:#24292e;">都会被呈现；如果仅仅忽略</span></span>
<span class="line"><span style="color:#24292e;">length，那么</span></span>
<span class="line"><span style="color:#24292e;">buffer</span></span>
<span class="line"><span style="color:#24292e;">中偏移了</span></span>
<span class="line"><span style="color:#24292e;">byteOffset</span></span>
<span class="line"><span style="color:#24292e;">后剩下的</span></span>
<span class="line"><span style="color:#24292e;">buffer</span></span>
<span class="line"><span style="color:#24292e;">将会被呈现。</span></span></code></pre></div><p>ECMAScript 2015 定义了一个 <em><code>TypeArray</code></em> 构造器作为所有的类型化数组构造器（<code>Int8Array</code>, <code>Int16Array</code> 等）的原型（<code>[[Prototype]]</code>）。该构造器并不会直接暴露出来：即没有全局的 <code>%TypedArray%</code> 和 <code>TypeArray</code> 属性，只能通过使用类似于 <code>Object.getPrototypeOf(Int8Array.prototype)</code> 的方式直接访问。所有的类型化数组构造器都会继承 <code>%\`\`TypeArray%</code> 构造器函数的公共属性和方法。此外，** 所有的类型化数组的原型（如 <code>Int8Array.prototype</code>)都以 <code>%TypeArray%.prototype</code> 作为原型。**</p><p><code>%TypedArray%</code> 构造器自身不是特别有用，直接调用或使用 <code>new</code> 表达式实例化都会抛出一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError" target="_blank" rel="noreferrer"><code>TypeError</code></a> 异常。因此 <code>%TypeArray%</code> 仅仅在对所有的类型化数组构造器（<code>Int8Array</code> 等）的方法和属性进行 polyfill 的时候比较有用.</p><p>当创建一个 <code>TypedArray</code> 实例（如 <code>Int8Array</code>）时，一个数组缓冲区将被创建在内存中，如果一个 <code>ArrayBuffer</code> 对象被当作参数传给构造函数，那么将使用传入的 <code>ArrayBuffer</code> 代替（即缓冲区被创建到 <code>ArrayBuffer</code> 中）。缓冲区的地址被存储在实例的内部属性中，并且所有 <code>%TypedArray%.prototype</code>上的方法，例如 <code>set value</code> 和 <code>get value</code> 等，都会在这个数组缓冲区上进行操作。</p><p>你可以使用标准数组索引语法获取类型化数组中的元素（也就是和访问普通数组元素一样，如 <code>foo[1]</code> ），然而，在类型化数组上获取或者设置属性的值时，并不会在这个属性的原型链中进行搜索，即使在索引超出了边界的时候。在原型中添加的属性将会在 [<code>ArrayBuffer</code>] 中查询而不是在对象的属性中。但是你依然可以像其他对象一样使用命名的属性来访问（<code>foo.bar</code> 的形式）；具体见下面的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 使用标准数组语法来获取和设置属性值</span></span>
<span class="line"><span style="color:#e1e4e8;">var int16 = new Int16Array(2);</span></span>
<span class="line"><span style="color:#e1e4e8;">int16[0] = 42;</span></span>
<span class="line"><span style="color:#e1e4e8;">console.log(int16[0]); // 42</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 原型中添加的属性访问不到（此时索引值未超边界，20 &lt; 32）</span></span>
<span class="line"><span style="color:#e1e4e8;">Int32Array.prototype[20] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">(new Int8Array(32))[20]; // 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 即使索引值超出了边界也一样不能访问（20 &gt; 8）</span></span>
<span class="line"><span style="color:#e1e4e8;">Int8Array.prototype[20] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">(new Int8Array(8))[20]; // undefined</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 使用负数索引也不行</span></span>
<span class="line"><span style="color:#e1e4e8;">Int8Array.prototype[-1] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">(new Int8Array(8))[-1]; // undefined</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 但是可以使用命名属性的方式访问到</span></span>
<span class="line"><span style="color:#e1e4e8;">Int8Array.prototype.foo = &quot;bar&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">(new Int8Array(32)).foo; // &quot;bar&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 使用标准数组语法来获取和设置属性值</span></span>
<span class="line"><span style="color:#24292e;">var int16 = new Int16Array(2);</span></span>
<span class="line"><span style="color:#24292e;">int16[0] = 42;</span></span>
<span class="line"><span style="color:#24292e;">console.log(int16[0]); // 42</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 原型中添加的属性访问不到（此时索引值未超边界，20 &lt; 32）</span></span>
<span class="line"><span style="color:#24292e;">Int32Array.prototype[20] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#24292e;">(new Int8Array(32))[20]; // 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 即使索引值超出了边界也一样不能访问（20 &gt; 8）</span></span>
<span class="line"><span style="color:#24292e;">Int8Array.prototype[20] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#24292e;">(new Int8Array(8))[20]; // undefined</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 使用负数索引也不行</span></span>
<span class="line"><span style="color:#24292e;">Int8Array.prototype[-1] = &quot;foo&quot;;</span></span>
<span class="line"><span style="color:#24292e;">(new Int8Array(8))[-1]; // undefined</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 但是可以使用命名属性的方式访问到</span></span>
<span class="line"><span style="color:#24292e;">Int8Array.prototype.foo = &quot;bar&quot;;</span></span>
<span class="line"><span style="color:#24292e;">(new Int8Array(32)).foo; // &quot;bar&quot;</span></span></code></pre></div><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">单个元素值的范围</th><th style="text-align:left;">大小(bytes)</th><th style="text-align:left;">描述</th><th style="text-align:left;">Web IDL 类型</th><th style="text-align:left;">C 语言中的等价类型</th></tr></thead><tbody><tr><td style="text-align:left;">Int8Array</td><td style="text-align:left;"><code>-128</code> 到 <code>127</code></td><td style="text-align:left;">1</td><td style="text-align:left;">8 位二进制有符号整数</td><td style="text-align:left;"><code>byte</code></td><td style="text-align:left;"><code>int8_t</code></td></tr><tr><td style="text-align:left;">Uint8Array</td><td style="text-align:left;"><code>0</code> 到 <code>255</code></td><td style="text-align:left;">1</td><td style="text-align:left;">8 位无符号整数（超出范围后从另一边界循环）</td><td style="text-align:left;"><code>octet</code></td><td style="text-align:left;"><code>uint8_t</code></td></tr><tr><td style="text-align:left;">Uint8ClampedArray</td><td style="text-align:left;"><code>0</code> 到 <code>255</code></td><td style="text-align:left;">1</td><td style="text-align:left;">8 位无符号整数（超出范围后为边界值）</td><td style="text-align:left;"><code>octet</code></td><td style="text-align:left;"><code>uint8_t</code></td></tr><tr><td style="text-align:left;">Int16Array</td><td style="text-align:left;"><code>-32768</code> 到 <code>32767</code></td><td style="text-align:left;">2</td><td style="text-align:left;">16 位二进制有符号整数</td><td style="text-align:left;"><code>short</code></td><td style="text-align:left;"><code>int16_t</code></td></tr><tr><td style="text-align:left;">Uint16Array</td><td style="text-align:left;"><code>0</code> 到 <code>65535</code></td><td style="text-align:left;">2</td><td style="text-align:left;">16 位无符号整数</td><td style="text-align:left;"><code>unsigned short</code></td><td style="text-align:left;"><code>uint16_t</code></td></tr><tr><td style="text-align:left;">Int32Array</td><td style="text-align:left;"><code>-2147483648</code> 到 <code>2147483647</code></td><td style="text-align:left;">4</td><td style="text-align:left;">32 位二进制有符号整数</td><td style="text-align:left;"><code>long</code></td><td style="text-align:left;"><code>int32_t</code></td></tr><tr><td style="text-align:left;">Uint32Array</td><td style="text-align:left;"><code>0</code> 到 <code>4294967295</code></td><td style="text-align:left;">4</td><td style="text-align:left;">32 位无符号整数</td><td style="text-align:left;"><code>unsigned long</code></td><td style="text-align:left;"><code>uint32_t</code></td></tr><tr><td style="text-align:left;">Float32Array</td><td style="text-align:left;"><code>-3.4E38</code> 到 <code>3.4E38</code> 最小正数为：<code>1.2E-38</code></td><td style="text-align:left;">4</td><td style="text-align:left;">32 位 IEEE 浮点数（7 位有效数字，如 <code>1.1234567</code>）</td><td style="text-align:left;"><code>unrestricted float</code></td><td style="text-align:left;"><code>float</code></td></tr><tr><td style="text-align:left;">Float64Array</td><td style="text-align:left;"><code>-1.8E308</code> 到 <code>1.8E308</code> 最小正数为：<code>5E-324</code></td><td style="text-align:left;">8</td><td style="text-align:left;">64 位 IEEE 浮点数（16 有效数字，如 <code>1.123...15</code>)</td><td style="text-align:left;"><code>unrestricted double</code></td><td style="text-align:left;"><code>double</code></td></tr><tr><td style="text-align:left;">BigInt64Array</td><td style="text-align:left;"><code>-2^63</code> 到 <code>2^63-1</code></td><td style="text-align:left;">8</td><td style="text-align:left;">64 位二进制有符号整数</td><td style="text-align:left;"><code>bigint</code></td><td style="text-align:left;"><code>int64_t (signed long long)</code></td></tr><tr><td style="text-align:left;">BigUint64Array</td><td style="text-align:left;"><code>0</code> 到 <code>2^64 - 1</code></td><td style="text-align:left;">8</td><td style="text-align:left;">64 位无符号整数</td><td style="text-align:left;"><code>bigint</code></td><td style="text-align:left;"><code>uint64_t (unsigned long long)</code></td></tr></tbody></table><h4 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h4><ul><li><p>TypedArray.BYTES_PER_ELEMENT</p><p>返回一个数值，代表不同类型的类型化数组对象中，单个元素的字节大小。例如 <code>new Int8Array().BYTES_PER_ELEMENT === 1</code> , <code>new Int16Array().BYTES_PER_ELEMENT === 2</code> （ 8 位字节为 1，16 位为 2 字节，类推）。</p></li><li><p>TypedArray.length</p><p>类型化数组中元素的个数，例如 <code>new Int8Array(3).length === 3</code>。</p></li><li><p>TypedArray.name</p><p>返回一个字符串值，代表当前构造器的名称，例如 Int8Array.name =&gt; <code>&quot;Int8Array&quot;</code>。</p></li></ul><h4 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h4><ul><li>TypedArray.from()</li><li>TypedArray.of()</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Int8Array.</span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;">({ length: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#6A737D;">// Int8Array(5) [0, 0, 0, 0, 0, buffer: ArrayBuffer(5), byteLength: 5, byteOffset: 0, length: 5, Symbol(Symbol.toStringTag): &#39;Int8Array&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Int8Array.</span><span style="color:#B392F0;">of</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">// Int8Array(5) [1, 2, 3, 4, 5, buffer: ArrayBuffer(5), byteLength: 5, byteOffset: 0, length: 5, Symbol(Symbol.toStringTag): &#39;Int8Array&#39;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Int8Array.</span><span style="color:#6F42C1;">from</span><span style="color:#24292E;">({ length: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#6A737D;">// Int8Array(5) [0, 0, 0, 0, 0, buffer: ArrayBuffer(5), byteLength: 5, byteOffset: 0, length: 5, Symbol(Symbol.toStringTag): &#39;Int8Array&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Int8Array.</span><span style="color:#6F42C1;">of</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">// Int8Array(5) [1, 2, 3, 4, 5, buffer: ArrayBuffer(5), byteLength: 5, byteOffset: 0, length: 5, Symbol(Symbol.toStringTag): &#39;Int8Array&#39;]</span></span></code></pre></div><h3 id="dataview" tabindex="-1">DataView <a class="header-anchor" href="#dataview" aria-label="Permalink to &quot;DataView&quot;">​</a></h3><p><strong><code>DataView</code></strong> 视图是一个可以从 二进制[<code>ArrayBuffer</code>]对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">new DataView(buffer [, byteOffset [, byteLength</span></span>
<span class="line"><span style="color:#e1e4e8;">]])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/**</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> buffer 一个 已经存在的ArrayBuffer 或 SharedArrayBuffer Experimental 对象，DataView 对象的数据源。</span></span>
<span class="line"><span style="color:#e1e4e8;"> byteOffset 可选 此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。</span></span>
<span class="line"><span style="color:#e1e4e8;"> byteLength 可选 此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配buffer的长度。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 返回值：一个表示指定数据缓存区的新DataView 对象。（这句话也许不是非常有助于说明清楚）</span></span>
<span class="line"><span style="color:#e1e4e8;"> 你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 如果 byteOffset 或者 byteLength 参数的值导致视图超出了 buffer 的结束位置就会抛出此异常。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">new DataView(buffer [, byteOffset [, byteLength</span></span>
<span class="line"><span style="color:#24292e;">]])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/**</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> buffer 一个 已经存在的ArrayBuffer 或 SharedArrayBuffer Experimental 对象，DataView 对象的数据源。</span></span>
<span class="line"><span style="color:#24292e;"> byteOffset 可选 此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。</span></span>
<span class="line"><span style="color:#24292e;"> byteLength 可选 此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配buffer的长度。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 返回值：一个表示指定数据缓存区的新DataView 对象。（这句话也许不是非常有助于说明清楚）</span></span>
<span class="line"><span style="color:#24292e;"> 你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 如果 byteOffset 或者 byteLength 参数的值导致视图超出了 buffer 的结束位置就会抛出此异常。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> */</span></span></code></pre></div><p>因为 JavaScript 目前不包含对 64 位整数值支持的标准，所以 <code>DataView</code> 不提供原生的 64 位操作。</p><ul><li><p>dataview.getXXX(byteOffset [, littleEndian])</p><p>byteOffset 偏移量，以字节为单位。指明视图开始读取数据的偏移量。</p><p>littleEndian 可选 指明该 64 位整型数值的存储方式[大小端模式] 。 如果为 <code>false</code> 或 <code>undefined</code>, 则按大端方式读取数据。</p><p>如果 <code>byteOffset</code> 设置的偏移量超出了视图的范围，则抛出该异常。</p></li><li><p>dataview.setFloat64(byteOffset, value [, littleEndian])</p><p>byteOffset 偏移量,从头开始计算,单位为字节.</p><p>value 设置的数值.</p><p>littleEndian</p><p>返回值：undefined</p><p>如果 byteOffset 超出了视图能储存的值,就会抛出错误 RangeError.</p></li></ul><h2 id="blob" tabindex="-1">Blob <a class="header-anchor" href="#blob" aria-label="Permalink to &quot;Blob&quot;">​</a></h2><ul><li><p><code>Blob</code> 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 [<code>ReadableStream</code>] 来用于数据操作。</p></li><li><p>Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。</p></li><li><p>要从其他非 blob 对象和数据构造一个 Blob，请使用 Blob() 构造函数。要创建一个 blob 数据的子集 blob，请使用 slice() 方法。要获取用户文件系统上的文件对应的 Blob 对象，请参阅 File 文档。</p></li><li><p>接受 Blob 对象的 API 也被列在 File 文档中。</p></li></ul><p><code>slice()</code> 方法原本接受 <code>length</code> 作为第二个参数，以表示复制到新 <code>Blob</code> 对象的字节数。如果设置的参数使 <code>start + length</code> 超出了源 <code>Blob</code> 对象的大小，则返回从开始到结尾的所有数据。</p><h4 id="示例-使用-blob-创建一个指向类型化数组的-url" tabindex="-1">示例：使用 Blob 创建一个指向类型化数组的 URL <a class="header-anchor" href="#示例-使用-blob-创建一个指向类型化数组的-url" aria-label="Permalink to &quot;示例：使用 Blob 创建一个指向类型化数组的 URL&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> typedArray </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GetTheTypedArraySomehow</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> blob </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Blob</span><span style="color:#E1E4E8;">([typedArray.buffer], { type: </span><span style="color:#9ECBFF;">&quot;application/octet-stream&quot;</span><span style="color:#E1E4E8;"> }); </span><span style="color:#6A737D;">// 传入一个合适的 MIME 类型</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">URL</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">createObjectURL</span><span style="color:#E1E4E8;">(blob);</span></span>
<span class="line"><span style="color:#6A737D;">// 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串</span></span>
<span class="line"><span style="color:#6A737D;">// 你可以像使用普通 URL 那样使用它，比如用在 img.src 上。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> typedArray </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GetTheTypedArraySomehow</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> blob </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Blob</span><span style="color:#24292E;">([typedArray.buffer], { type: </span><span style="color:#032F62;">&quot;application/octet-stream&quot;</span><span style="color:#24292E;"> }); </span><span style="color:#6A737D;">// 传入一个合适的 MIME 类型</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">URL</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">createObjectURL</span><span style="color:#24292E;">(blob);</span></span>
<span class="line"><span style="color:#6A737D;">// 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串</span></span>
<span class="line"><span style="color:#6A737D;">// 你可以像使用普通 URL 那样使用它，比如用在 img.src 上。</span></span></code></pre></div><h4 id="从-blob-中提取数据" tabindex="-1">从 Blob 中提取数据 <a class="header-anchor" href="#从-blob-中提取数据" aria-label="Permalink to &quot;从 Blob 中提取数据&quot;">​</a></h4><p>一种从 Blob 中读取内容的方法是使用 FileReader。以下代码将 Blob 的内容作为类型数组读取：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">var reader = new FileReader();</span></span>
<span class="line"><span style="color:#e1e4e8;">reader.addEventListener(&quot;loadend&quot;, function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">   // reader.result 包含被转化为类型数组 typed array 的 blob</span></span>
<span class="line"><span style="color:#e1e4e8;">});</span></span>
<span class="line"><span style="color:#e1e4e8;">reader.readAsArrayBuffer(blob);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">var reader = new FileReader();</span></span>
<span class="line"><span style="color:#24292e;">reader.addEventListener(&quot;loadend&quot;, function() {</span></span>
<span class="line"><span style="color:#24292e;">   // reader.result 包含被转化为类型数组 typed array 的 blob</span></span>
<span class="line"><span style="color:#24292e;">});</span></span>
<span class="line"><span style="color:#24292e;">reader.readAsArrayBuffer(blob);</span></span></code></pre></div><p>另一种读取 Blob 中内容的方式是使用 Response 对象。下述代码将 Blob 中的内容读取为文本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">var text = await (new Response(blob)).text();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">var text = await (new Response(blob)).text();</span></span></code></pre></div><p>通过使用 FileReader 的其它方法可以把 Blob 读取为字符串或者数据 URL。</p><ul><li><p>FileReader.abort() 中止读取操作。在返回时，<strong>readyState</strong>属性为 DONE。</p><table><thead><tr><th>常量名</th><th>值</th><th>描述</th></tr></thead><tbody><tr><td><code>EMPTY</code></td><td><code>0</code></td><td>还没有加载任何数据.</td></tr><tr><td><code>LOADING</code></td><td><code>1</code></td><td>数据正在被加载.</td></tr><tr><td><code>DONE</code></td><td><code>2</code></td><td>已完成全部的读取请求.</td></tr></tbody></table></li><li><p>FileReader.readAsArrayBuffer(blob) 开始读取指定的 Blob 中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.</p></li><li><p>FileReader.readAsDataURL(blob) 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容。</p></li><li><p>FileReader.readAsText(blob[, encoding]) 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个字符串以表示所读取的文件内容。</p></li></ul><h3 id="class-私有属性和方法" tabindex="-1">Class 私有属性和方法 <a class="header-anchor" href="#class-私有属性和方法" aria-label="Permalink to &quot;Class 私有属性和方法&quot;">​</a></h3><p>模拟</p><p>Symbol</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">A</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">num</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">[n] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> num;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">[n]</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">[n]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">A</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">a.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">a.n </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">a.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">num</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">[n] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> num;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">[n]</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">[n]);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">9</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">a.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">a.n </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">a.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">();</span></span></code></pre></div><p>取整操作也可以用按位操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">var x = 1.23 | 0;  // 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">var x = 1.23 | 0;  // 1</span></span></code></pre></div><p>因为按位操作只支持 32 位的整型，所以小数点部分全部都被抛弃</p><p><code>parseInt</code> 太小的数字会产生 bug</p><p><strong>arguments</strong> 和形参是别名关系</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function test(a, b) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(a, b); // 2, 3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  arguments[0] = 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">  arguments[1] = 200;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(a, b); // 100, 200</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">test(2, 3);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function test(a, b) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(a, b); // 2, 3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  arguments[0] = 100;</span></span>
<span class="line"><span style="color:#24292e;">  arguments[1] = 200;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  console.log(a, b); // 100, 200</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">test(2, 3);</span></span></code></pre></div><p>深拷贝最简单的实现是: <code>JSON.parse(JSON.stringify(obj))</code></p><p><code>JSON.parse(JSON.stringify(obj))</code> 是最简单的实现方式，但是有一些缺陷：</p><ol><li>对象的属性值是函数时，无法拷贝。</li><li>原型链上的属性无法拷贝</li><li>不能正确的处理 Date 类型的数据</li><li>不能处理 RegExp</li><li>会忽略 symbol</li><li>会忽略 undefined</li></ol><p><img src="`+p+'" alt="图片"></p><h2 id="worker-线程之间如何通信" tabindex="-1">Worker 线程之间如何通信？ <a class="header-anchor" href="#worker-线程之间如何通信" aria-label="Permalink to &quot;Worker 线程之间如何通信？&quot;">​</a></h2><h2 id="symbol-和-bigint-简单介绍" tabindex="-1">Symbol 和 Bigint 简单介绍 <a class="header-anchor" href="#symbol-和-bigint-简单介绍" aria-label="Permalink to &quot;Symbol 和 Bigint 简单介绍&quot;">​</a></h2><h2 id="undefined-和-null-的区别" tabindex="-1">undefined 和 null 的区别 <a class="header-anchor" href="#undefined-和-null-的区别" aria-label="Permalink to &quot;undefined 和 null 的区别&quot;">​</a></h2><h2 id="typeof-null-为什么返回的是-object" tabindex="-1">typeof(null) 为什么返回的是 &#39;object&#39; <a class="header-anchor" href="#typeof-null-为什么返回的是-object" aria-label="Permalink to &quot;typeof(null) 为什么返回的是 &#39;object&#39;&quot;">​</a></h2><h2 id="和-的区别" tabindex="-1">== 和 === 的区别？ <a class="header-anchor" href="#和-的区别" aria-label="Permalink to &quot;== 和 === 的区别？&quot;">​</a></h2><h2 id="instanceof-的原理" tabindex="-1">Instanceof 的原理 <a class="header-anchor" href="#instanceof-的原理" aria-label="Permalink to &quot;Instanceof 的原理&quot;">​</a></h2><h2 id="typeof-nan-返回什么" tabindex="-1">typeof(NaN) 返回什么 <a class="header-anchor" href="#typeof-nan-返回什么" aria-label="Permalink to &quot;typeof(NaN) 返回什么&quot;">​</a></h2><h2 id="isnan-和-number-isnan-函数的区别" tabindex="-1">isNaN 和 Number.isNaN 函数的区别？ <a class="header-anchor" href="#isnan-和-number-isnan-函数的区别" aria-label="Permalink to &quot;isNaN 和 Number.isNaN 函数的区别？&quot;">​</a></h2><h2 id="css-background-的属性" tabindex="-1">CSS：background 的属性 <a class="header-anchor" href="#css-background-的属性" aria-label="Permalink to &quot;CSS：background 的属性&quot;">​</a></h2><h2 id="class-和-new" tabindex="-1">Class 和 new <a class="header-anchor" href="#class-和-new" aria-label="Permalink to &quot;Class 和 new&quot;">​</a></h2><h2 id="promise-的理解" tabindex="-1">Promise 的理解 <a class="header-anchor" href="#promise-的理解" aria-label="Permalink to &quot;Promise 的理解&quot;">​</a></h2><h2 id="object-和-map-相互转换" tabindex="-1">Object 和 Map 相互转换 <a class="header-anchor" href="#object-和-map-相互转换" aria-label="Permalink to &quot;Object 和 Map 相互转换&quot;">​</a></h2>',130),t=[o];function c(r,y,E,i,d,u){return a(),n("div",null,t)}const f=s(e,[["render",c]]);export{g as __pageData,f as default};
