import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.00751356.js";const F=JSON.parse('{"title":"闭包","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/closure.md","filePath":"javascript/closure.md"}'),p={name:"javascript/closure.md"},o=l(`<h1 id="闭包" tabindex="-1">闭包 <a class="header-anchor" href="#闭包" aria-label="Permalink to &quot;闭包&quot;">​</a></h1><blockquote><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures</a></p></blockquote><p>一个函数和对其周围状态（<strong>lexical environment，词法环境</strong>）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是<strong>闭包</strong>（<strong>closure</strong>）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。</p><p>词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。<strong>嵌套函数可访问声明于它们外部作用域的变量。</strong></p><h2 id="例子-1" tabindex="-1">例子 1 <a class="header-anchor" href="#例子-1" aria-label="Permalink to &quot;例子 1&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Mozilla&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">displayName</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(name); </span><span style="color:#6A737D;">// Mozilla</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> displayName;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> myFunc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeFunc</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">myFunc</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Mozilla&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">displayName</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(name); </span><span style="color:#6A737D;">// Mozilla</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> displayName;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> myFunc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeFunc</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">myFunc</span><span style="color:#24292E;">();</span></span></code></pre></div><p>**解析：**运行这段代码的效果和之前 <code>init()</code> 函数的示例完全一样。其中不同的地方（也是有意思的地方）在于内部函数 <code>displayName()</code> <em>在执行前</em>，从外部函数返回。</p><p>第一眼看上去，也许不能直观地看出这段代码能够正常运行。在一些编程语言中，一个函数中的局部变量仅存在于此函数的执行期间。一旦 <code>makeFunc()</code> 执行完毕，你可能会认为 <code>name</code> 变量将不能再被访问。然而，因为代码仍按预期运行，所以在 JavaScript 中情况显然与此不同。</p><p>原因在于，JavaScript 中的函数会形成了闭包。 <em>闭包</em>是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。在本例子中，<code>myFunc</code> 是执行 <code>makeFunc</code> 时创建的 <code>displayName</code> 函数实例的引用。<code>displayName</code> 的实例维持了一个对它的词法环境（变量 <code>name</code> 存在于其中）的引用。因此，当 <code>myFunc</code> 被调用时，变量 <code>name</code> 仍然可用，其值 <code>Mozilla</code> 就被传递到<code>alert</code>中。</p><h2 id="例子-2" tabindex="-1">例子 2 <a class="header-anchor" href="#例子-2" aria-label="Permalink to &quot;例子 2&quot;">​</a></h2><p>下面是一个更有意思的示例 — 一个 <code>makeAdder</code> 函数：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeAdder</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> y;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> add5 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeAdder</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> add10 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeAdder</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">add5</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 7</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">add10</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeAdder</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">y</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> y;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> add5 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeAdder</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> add10 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeAdder</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">add5</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 7</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">add10</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 12</span></span></code></pre></div><p>在这个示例中，我们定义了 <code>makeAdder(x)</code> 函数，它接受一个参数 <code>x</code> ，并返回一个新的函数。返回的函数接受一个参数 <code>y</code>，并返回<code>x+y</code>的值。</p><p>从本质上讲，<code>makeAdder</code> 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。</p><p><code>add5</code> 和 <code>add10</code> 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 <code>add5</code> 的环境中，<code>x</code> 为 5。而在 <code>add10</code> 中，<code>x</code> 则为 10。</p><h2 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to &quot;作用&quot;">​</a></h2><p>闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。</p><p>因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。</p><h2 id="用闭包模拟私有方法" tabindex="-1">用闭包模拟私有方法 <a class="header-anchor" href="#用闭包模拟私有方法" aria-label="Permalink to &quot;用闭包模拟私有方法&quot;">​</a></h2><p>下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> Counter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> privateCounter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">changeBy</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    privateCounter </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> val;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">changeBy</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">decrement</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">changeBy</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> privateCounter;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Counter.</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">/* logs 0 */</span></span>
<span class="line"><span style="color:#E1E4E8;">Counter.</span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">Counter.</span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Counter.</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">/* logs 2 */</span></span>
<span class="line"><span style="color:#E1E4E8;">Counter.</span><span style="color:#B392F0;">decrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Counter.</span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">/* logs 1 */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> Counter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> privateCounter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">changeBy</span><span style="color:#24292E;">(</span><span style="color:#E36209;">val</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    privateCounter </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> val;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">changeBy</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">decrement</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">changeBy</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> privateCounter;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Counter.</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">/* logs 0 */</span></span>
<span class="line"><span style="color:#24292E;">Counter.</span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">Counter.</span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Counter.</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">/* logs 2 */</span></span>
<span class="line"><span style="color:#24292E;">Counter.</span><span style="color:#6F42C1;">decrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Counter.</span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">/* logs 1 */</span></span></code></pre></div><p>在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：<code>Counter.increment，Counter.decrement</code> 和 <code>Counter.value</code>。</p><p>该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 <code>privateCounter</code> 的变量和名为 <code>changeBy</code> 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。</p><p>这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 <code>privateCounter</code> 变量和 <code>changeBy</code> 函数。</p><h2 id="在循环中创建闭包-一个常见错误" tabindex="-1">在循环中创建闭包：一个常见错误 <a class="header-anchor" href="#在循环中创建闭包-一个常见错误" aria-label="Permalink to &quot;在循环中创建闭包：一个常见错误&quot;">​</a></h2><p>在 ECMAScript 2015 引入 <code>let</code> 关键字 之前，在循环中有一个常见的闭包创建问题。参考下面的示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;p id=&quot;help&quot;&gt;Helpful notes will appear here&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;p&gt;E-mail: &lt;input type=&quot;text&quot; id=&quot;email&quot; name=&quot;email&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;p&gt;Name: &lt;input type=&quot;text&quot; id=&quot;name&quot; name=&quot;name&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;p&gt;Age: &lt;input type=&quot;text&quot; id=&quot;age&quot; name=&quot;age&quot;&gt;&lt;/p&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;p id=&quot;help&quot;&gt;Helpful notes will appear here&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;p&gt;E-mail: &lt;input type=&quot;text&quot; id=&quot;email&quot; name=&quot;email&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;p&gt;Name: &lt;input type=&quot;text&quot; id=&quot;name&quot; name=&quot;name&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;p&gt;Age: &lt;input type=&quot;text&quot; id=&quot;age&quot; name=&quot;age&quot;&gt;&lt;/p&gt;</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;">).innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> help;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> helpText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your e-mail address&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your full name&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> helpText.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> helpText[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(item.id).</span><span style="color:#B392F0;">onfocus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(item.help);</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;">).innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> help;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> helpText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your e-mail address&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your full name&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> helpText.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> helpText[i];</span></span>
<span class="line"><span style="color:#24292E;">    document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(item.id).</span><span style="color:#6F42C1;">onfocus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(item.help);</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">();</span></span></code></pre></div><p>数组 <code>helpText</code> 中定义了三个有用的提示信息，每一个都关联于对应的文档中的<code>input</code> 的 ID。通过循环这三项定义，依次为相应<code>input</code>添加了一个 <code>onfocus</code> 事件处理函数，以便显示帮助信息。</p><p>运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个<code>input</code>上，显示的都是关于年龄的信息。</p><p>原因是赋值给 <code>onfocus</code> 的是闭包。这些闭包是由他们的函数定义和在 <code>setupHelp</code> 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量 item。这是因为变量<code>item</code>使用 var 进行声明，由于变量提升，所以具有函数作用域。当<code>onfocus</code>的回调执行时，<code>item.help</code>的值被决定。由于循环在事件触发之前早已执行完毕，变量对象<code>item</code>（被三个闭包所共享）已经指向了<code>helpText</code>的最后一项。</p><p>解决这个问题的一种方案是使用更多的闭包：特别是使用前面所述的函数工厂：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;">).innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> help;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeHelpCallback</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(help);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> helpText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your e-mail address&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your full name&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> helpText.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> helpText[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(item.id).onfocus </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeHelpCallback</span><span style="color:#E1E4E8;">(item.help);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;">).innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> help;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeHelpCallback</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(help);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> helpText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your e-mail address&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your full name&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> helpText.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> helpText[i];</span></span>
<span class="line"><span style="color:#24292E;">    document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(item.id).onfocus </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeHelpCallback</span><span style="color:#24292E;">(item.help);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">();</span></span></code></pre></div><p>这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， <code>makeHelpCallback</code> 函数为每一个回调创建一个新的词法环境。在这些环境中，<code>help</code> 指向 <code>helpText</code> 数组中对应的字符串。</p><p>另一种方法使用了匿名闭包：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;">).innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> help;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> helpText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your e-mail address&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your full name&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> helpText.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    (</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> helpText[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">      document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(item.id).</span><span style="color:#B392F0;">onfocus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(item.help);</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    })(); </span><span style="color:#6A737D;">// 马上把当前循环项的item与事件回调相关联起来</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;">).innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> help;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> helpText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your e-mail address&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your full name&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> helpText.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    (</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> helpText[i];</span></span>
<span class="line"><span style="color:#24292E;">      document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(item.id).</span><span style="color:#6F42C1;">onfocus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(item.help);</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    })(); </span><span style="color:#6A737D;">// 马上把当前循环项的item与事件回调相关联起来</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">();</span></span></code></pre></div><p>如果不想使用过多的闭包，你可以用 ES2015 引入的 let 关键词：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;">).innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> help;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> helpText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your e-mail address&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your full name&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> helpText.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> helpText[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(item.id).</span><span style="color:#B392F0;">onfocus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(item.help);</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;">).innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> help;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> helpText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your e-mail address&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your full name&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> helpText.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> helpText[i];</span></span>
<span class="line"><span style="color:#24292E;">    document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(item.id).</span><span style="color:#6F42C1;">onfocus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(item.help);</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">();</span></span></code></pre></div><p>这个例子使用<code>let</code>而不是<code>var</code>，因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包。</p><p>另一个可选方案是使用 <code>forEach()</code>来遍历<code>helpText</code>数组并给每一个<code>&lt;p&gt;</code>添加一个监听器，如下所示：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">help</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;">).innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> help;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> helpText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your e-mail address&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your full name&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    { id: </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, help: </span><span style="color:#9ECBFF;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  helpText.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">text</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(text.id).</span><span style="color:#B392F0;">onfocus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">showHelp</span><span style="color:#E1E4E8;">(text.help);</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setupHelp</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">help</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;">).innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> help;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> helpText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your e-mail address&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your full name&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    { id: </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, help: </span><span style="color:#032F62;">&quot;Your age (you must be over 16)&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  helpText.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">text</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(text.id).</span><span style="color:#6F42C1;">onfocus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">showHelp</span><span style="color:#24292E;">(text.help);</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setupHelp</span><span style="color:#24292E;">();</span></span></code></pre></div><h2 id="性能-闭包缺点" tabindex="-1">性能，闭包缺点 <a class="header-anchor" href="#性能-闭包缺点" aria-label="Permalink to &quot;性能，闭包缺点&quot;">​</a></h2><p>如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。</p><p>例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。</p><p>考虑以下示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function MyObject(name, message) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.name = name.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.message = message.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.getName = function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return this.name;</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  this.getMessage = function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return this.message;</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function MyObject(name, message) {</span></span>
<span class="line"><span style="color:#24292e;">  this.name = name.toString();</span></span>
<span class="line"><span style="color:#24292e;">  this.message = message.toString();</span></span>
<span class="line"><span style="color:#24292e;">  this.getName = function() {</span></span>
<span class="line"><span style="color:#24292e;">    return this.name;</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  this.getMessage = function() {</span></span>
<span class="line"><span style="color:#24292e;">    return this.message;</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function MyObject(name, message) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.name = name.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.message = message.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">MyObject.prototype = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  getName: function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return this.name;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  getMessage: function() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return this.message;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function MyObject(name, message) {</span></span>
<span class="line"><span style="color:#24292e;">  this.name = name.toString();</span></span>
<span class="line"><span style="color:#24292e;">  this.message = message.toString();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">MyObject.prototype = {</span></span>
<span class="line"><span style="color:#24292e;">  getName: function() {</span></span>
<span class="line"><span style="color:#24292e;">    return this.name;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  getMessage: function() {</span></span>
<span class="line"><span style="color:#24292e;">    return this.message;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">};</span></span></code></pre></div><p>但我们不建议重新定义原型。可改成如下例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyObject</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.message </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> message.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#79B8FF;">MyObject</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#79B8FF;">MyObject</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getMessage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.message;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyObject</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#24292E;">, </span><span style="color:#E36209;">message</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.message </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> message.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#005CC5;">MyObject</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#005CC5;">MyObject</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getMessage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.message;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h1 id="闭包和函数柯里化" tabindex="-1">闭包和函数柯里化 <a class="header-anchor" href="#闭包和函数柯里化" aria-label="Permalink to &quot;闭包和函数柯里化&quot;">​</a></h1><h2 id="闭包是什么" tabindex="-1">闭包是什么 <a class="header-anchor" href="#闭包是什么" aria-label="Permalink to &quot;闭包是什么&quot;">​</a></h2><p>闭包<code>（closure）</code>是 <code>JavaScript</code> 的难点，也是它的特色。是号称 <code>JS</code> 面试三座大山（<strong>原型与原型链</strong>，<strong>作用域及闭包</strong>，<strong>异步和单线程</strong>）其中的一座山。</p><p>很多高级应用都需要依靠闭包来实验，包括我们去看很多的 <code>JS</code> 库和框架的源码，都少不了闭包的影子。</p><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><h3 id="闭包就是能够读取其它函数内部变量的函数。" tabindex="-1"><strong>闭包就是能够读取其它函数内部变量的函数。</strong> <a class="header-anchor" href="#闭包就是能够读取其它函数内部变量的函数。" aria-label="Permalink to &quot;**闭包就是能够读取其它函数内部变量的函数。**&quot;">​</a></h3><p>为什么我们要借助闭包来 <strong>读取其它函数内部的变量</strong> 呢？</p><p>因为 <code>JavaScript</code> 这个语言的特别之处就在于，<strong>函数内部</strong> 可以直接读取 <strong>全局变量</strong> ，但是在 <strong>函数外部</strong> 无法直接读取 <strong>函数内部</strong> 的 <strong>局部变量</strong> 。只有 <strong>函数内部</strong> 的 <strong>子函数</strong> 才能读取 <strong>局部变量</strong> ，可以看下面的例子。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 此部分只为演示全局变量和局部变量 与闭包无关</span></span>
<span class="line"><span style="color:#6A737D;">// 全局变量 在任何地方都可以访问</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 局部变量,函数运行时创建,函数执行完销毁</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">boo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ boo:&quot;</span><span style="color:#E1E4E8;">, a); </span><span style="color:#6A737D;">//🚀🚀~ boo: 10</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">boo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ s:&quot;</span><span style="color:#E1E4E8;">, s); </span><span style="color:#6A737D;">//🚀🚀~ s: 100</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, a); </span><span style="color:#6A737D;">// Uncaught ReferenceError: a is not defined</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 此部分只为演示全局变量和局部变量 与闭包无关</span></span>
<span class="line"><span style="color:#6A737D;">// 全局变量 在任何地方都可以访问</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 局部变量,函数运行时创建,函数执行完销毁</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">boo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ boo:&quot;</span><span style="color:#24292E;">, a); </span><span style="color:#6A737D;">//🚀🚀~ boo: 10</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">boo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ s:&quot;</span><span style="color:#24292E;">, s); </span><span style="color:#6A737D;">//🚀🚀~ s: 100</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, a); </span><span style="color:#6A737D;">// Uncaught ReferenceError: a is not defined</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><p>所以说，闭包可以简单理解成 <strong>定义在一个函数内部的函数</strong> 。闭包本质上，就是将 <strong>函数内部</strong> 和 <strong>函数外部</strong> 连接起来的桥梁。</p><h2 id="如何从外部读取函数内部的局部变量" tabindex="-1">如何从外部读取函数内部的局部变量 <a class="header-anchor" href="#如何从外部读取函数内部的局部变量" aria-label="Permalink to &quot;如何从外部读取函数内部的局部变量&quot;">​</a></h2><p>先来思考一个问题。如何从 <strong>函数外部</strong> 读取 <strong>函数内部</strong> 的 <strong>局部变量</strong> ？可是前面不是已经说了么，在 <strong>函数外部</strong> 无法直接读取 <strong>函数内部</strong> 的 <strong>局部变量</strong> 。</p><p>是的，确实无法 <strong>直接</strong> 读取，但是我们可以 <strong>变通</strong> 一下。</p><p>第一种是 <code>return</code> 返回。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">88</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ : a&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 🚀🚀~ : a 88</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">88</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ : a&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 🚀🚀~ : a 88</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><p>第二种是上面提到的子函数。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">99</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">boo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">boo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 🚀🚀~ a: 99</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">99</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">boo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">boo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 🚀🚀~ a: 99</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><p>这里先留下一个思考题。</p><ul><li>根据闭包的定义，闭包就是能够读取其它函数内部变量的函数，那么以上两种方式是闭包么？如果不是，他们都能拿到局部变量的值，并且更简单，为什么还要用闭包呢？</li></ul><h2 id="为什么需要闭包" tabindex="-1">为什么需要闭包 <a class="header-anchor" href="#为什么需要闭包" aria-label="Permalink to &quot;为什么需要闭包&quot;">​</a></h2><p>局部变量在函数执行时被创建，函数执行完被销毁，没有办法 <strong>长久的保存状态</strong> 和 <strong>共享</strong> 。</p><p>全局变量可能造成 <strong>变量污染</strong> ，使代码变得难以阅读，难以维护。</p><p>那么我们就希望有一种 <strong>即可以长久的保存变量</strong>，<strong>又不会造成全局污染</strong> 的操作，闭包也就应运而生了。</p><h2 id="闭包的写法" tabindex="-1">闭包的写法 <a class="header-anchor" href="#闭包的写法" aria-label="Permalink to &quot;闭包的写法&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> f2;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// f1执行的结果就是闭包</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> f2;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// f1执行的结果就是闭包</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><h2 id="思考题解答" tabindex="-1">思考题解答 <a class="header-anchor" href="#思考题解答" aria-label="Permalink to &quot;思考题解答&quot;">​</a></h2><p>现在我们就来解答一下刚才留下的思考题，<code>子函数</code> 和直接 <code>return</code> 也能拿到局部变量的值，为什么还需要闭包呢。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//闭包</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> f2;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//直接return</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子函数</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f5</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">f5</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//闭包</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> f2;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//直接return</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子函数</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f5</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">f5</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><p>可以看到控制台输出的结果是一样的。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9b4fc7f083644e781e8098ca25b9049~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="image.png"></p><p>那么我们多调用几次呢？</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//闭包</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ 闭包 ~ a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> f2;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// f1执行的结果就是闭包</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//return</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ return a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f3</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子函数</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f5</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ 子函数 a:&quot;</span><span style="color:#E1E4E8;">, a);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">f5</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">f4</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//闭包</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ 闭包 ~ a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> f2;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f1</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// f1执行的结果就是闭包</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//return</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ return a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f3</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子函数</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f5</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ 子函数 a:&quot;</span><span style="color:#24292E;">, a);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">f5</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">f4</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><p>发现什么了么，我们使用闭包，每次调用后，变量 <code>a</code> 的值都会 <code>+1</code> ，而我们直接 <code>return</code> 以及 <code>子函数</code> 的方式，每次调用后，变量 <code>a</code> 的值一直都是 <code>11</code> 。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515a78671d384bb6b1ab648959d7019e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp" alt="image.png"></p><p>到这里之前留下的思考题就已经有答案了。闭包是一个能够读取其它函数内部变量的函数，但是能够读取其它函数内部变量的函数不一定就是闭包，为什么需要闭包，因为闭包 <strong>即可以长久的保存变量</strong>，<strong>又不会造成全局污染</strong>。</p><h2 id="闭包的缺点" tabindex="-1">闭包的缺点 <a class="header-anchor" href="#闭包的缺点" aria-label="Permalink to &quot;闭包的缺点&quot;">​</a></h2><p>优点上面已经说过了，那么闭包有什么缺点呢。通常情况下，函数的活动对象会随着执行的上下文环境一起被销毁，但是由于闭包引用的是外部函数的活动对象，因此这个活动对象无法被销毁，这意味着闭包比普通函数要消耗更多的内存。</p><h2 id="案例-缓存" tabindex="-1">案例-缓存 <a class="header-anchor" href="#案例-缓存" aria-label="Permalink to &quot;案例-缓存&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cacheMemory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (id </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> cache) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`查找到的结果是\${</span><span style="color:#E1E4E8;">cache</span><span style="color:#9ECBFF;">[</span><span style="color:#E1E4E8;">id</span><span style="color:#9ECBFF;">]</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">asyncFn</span><span style="color:#E1E4E8;">(id); </span><span style="color:#6A737D;">//模拟异步结果</span></span>
<span class="line"><span style="color:#E1E4E8;">      cache[id] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`查找到的结果是\${</span><span style="color:#E1E4E8;">cache</span><span style="color:#9ECBFF;">[</span><span style="color:#E1E4E8;">id</span><span style="color:#9ECBFF;">]</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cacheMemory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">id</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (id </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> cache) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`查找到的结果是\${</span><span style="color:#24292E;">cache</span><span style="color:#032F62;">[</span><span style="color:#24292E;">id</span><span style="color:#032F62;">]</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">asyncFn</span><span style="color:#24292E;">(id); </span><span style="color:#6A737D;">//模拟异步结果</span></span>
<span class="line"><span style="color:#24292E;">      cache[id] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`查找到的结果是\${</span><span style="color:#24292E;">cache</span><span style="color:#032F62;">[</span><span style="color:#24292E;">id</span><span style="color:#032F62;">]</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><h2 id="案例-模拟栈" tabindex="-1">案例-模拟栈 <a class="header-anchor" href="#案例-模拟栈" aria-label="Permalink to &quot;案例-模拟栈&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Stack</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> arr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      arr.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">(value),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">Stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;b&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ Stack.size:&quot;</span><span style="color:#E1E4E8;">, Stack.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 2</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;🚀🚀~ Stack.pop(&quot;b&quot;):&#39;</span><span style="color:#E1E4E8;">, Stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;b&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// b</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀🚀~ Stack.size:&quot;</span><span style="color:#E1E4E8;">, Stack.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Stack</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> arr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      arr.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> arr.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">(value),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">Stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;b&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ Stack.size:&quot;</span><span style="color:#24292E;">, Stack.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 2</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;🚀🚀~ Stack.pop(&quot;b&quot;):&#39;</span><span style="color:#24292E;">, Stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;b&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// b</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀🚀~ Stack.size:&quot;</span><span style="color:#24292E;">, Stack.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#24292E;">复制代码;</span></span></code></pre></div><h2 id="什么是柯里化-curry" tabindex="-1">什么是柯里化（ curry） <a class="header-anchor" href="#什么是柯里化-curry" aria-label="Permalink to &quot;什么是柯里化（ curry）&quot;">​</a></h2><p>在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。</p><p>举例来说，一个接收 3 个参数的普通函数，在进行柯里化后， 柯里化版本的函数接收一个参数并返回接收下一个参数的函数， 该函数返回一个接收第三个参数的函数。 最后一个函数在接收第三个参数后， 将之前接收到的三个参数应用于原普通函数中，并返回最终结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 数学和计算科学中的柯里化：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//一个接收三个参数的普通函数</span></span>
<span class="line"><span style="color:#e1e4e8;">function sum(a,b,c) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(a+b+c)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//用于将普通函数转化为柯里化版本的工具函数</span></span>
<span class="line"><span style="color:#e1e4e8;">function curry(fn) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  //...内部实现省略，返回一个新函数</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//获取一个柯里化后的函数</span></span>
<span class="line"><span style="color:#e1e4e8;">let _sum = curry(sum);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//返回一个接收第二个参数的函数</span></span>
<span class="line"><span style="color:#e1e4e8;">let A = _sum(1);</span></span>
<span class="line"><span style="color:#e1e4e8;">//返回一个接收第三个参数的函数</span></span>
<span class="line"><span style="color:#e1e4e8;">let B = A(2);</span></span>
<span class="line"><span style="color:#e1e4e8;">//接收到最后一个参数，将之前所有的参数应用到原函数中，并运行</span></span>
<span class="line"><span style="color:#e1e4e8;">B(3)    // print : 6</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 数学和计算科学中的柯里化：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//一个接收三个参数的普通函数</span></span>
<span class="line"><span style="color:#24292e;">function sum(a,b,c) {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(a+b+c)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//用于将普通函数转化为柯里化版本的工具函数</span></span>
<span class="line"><span style="color:#24292e;">function curry(fn) {</span></span>
<span class="line"><span style="color:#24292e;">  //...内部实现省略，返回一个新函数</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//获取一个柯里化后的函数</span></span>
<span class="line"><span style="color:#24292e;">let _sum = curry(sum);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//返回一个接收第二个参数的函数</span></span>
<span class="line"><span style="color:#24292e;">let A = _sum(1);</span></span>
<span class="line"><span style="color:#24292e;">//返回一个接收第三个参数的函数</span></span>
<span class="line"><span style="color:#24292e;">let B = A(2);</span></span>
<span class="line"><span style="color:#24292e;">//接收到最后一个参数，将之前所有的参数应用到原函数中，并运行</span></span>
<span class="line"><span style="color:#24292e;">B(3)    // print : 6</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>而对于 Javascript 语言来说，我们通常说的柯里化函数的概念，与数学和计算机科学中的柯里化的概念并不完全一样。</p><p>在数学和计算机科学中的柯里化函数，一次只能传递一个参数；</p><p>而我们 Javascript 实际应用中的柯里化函数，可以传递一个或多个参数。</p><p>来看这个例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//普通函数</span></span>
<span class="line"><span style="color:#e1e4e8;">function fn(a,b,c,d,e) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(a,b,c,d,e)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">//生成的柯里化函数</span></span>
<span class="line"><span style="color:#e1e4e8;">let _fn = curry(fn);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1,2,3,4,5);     // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//普通函数</span></span>
<span class="line"><span style="color:#24292e;">function fn(a,b,c,d,e) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(a,b,c,d,e)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">//生成的柯里化函数</span></span>
<span class="line"><span style="color:#24292e;">let _fn = curry(fn);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">_fn(1,2,3,4,5);     // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>对于已经柯里化后的 _fn 函数来说，当接收的参数数量与原函数的形参数量相同时，执行原函数； 当接收的参数数量小于原函数的形参数量时，返回一个函数用于接收剩余的参数，直至接收的参数数量与形参数量一致，执行原函数。</p><p>当我们知道柯里化是什么了的时候，我们来看看柯里化到底有什么用？</p><h2 id="柯里化的用途" tabindex="-1">柯里化的用途 <a class="header-anchor" href="#柯里化的用途" aria-label="Permalink to &quot;柯里化的用途&quot;">​</a></h2><p>柯里化实际是把简答的问题复杂化了，但是复杂化的同时，我们在使用函数时拥有了更加多的自由度。 而这里对于函数参数的自由处理，正是柯里化的核心所在。 **柯里化本质上是降低通用性，提高适用性。**来看一个例子：</p><p>我们工作中会遇到各种需要通过正则检验的需求，比如校验电话号码、校验邮箱、校验身份证号、校验密码等， 这时我们会封装一个通用函数 checkByRegExp ,接收两个参数，校验的正则对象和待校验的字符串</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function checkByRegExp(regExp,string) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return regExp.test(string);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^1\\d{10}$/, &#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@163.com&#39;); // 校验邮箱</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function checkByRegExp(regExp,string) {</span></span>
<span class="line"><span style="color:#24292e;">    return regExp.test(string);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^1\\d{10}$/, &#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@163.com&#39;); // 校验邮箱</span></span></code></pre></div><p>上面这段代码，乍一看没什么问题，可以满足我们所有通过正则检验的需求。 但是我们考虑这样一个问题，如果我们需要校验多个电话号码或者校验多个邮箱呢？</p><p>我们可能会这样做：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^1\\d{10}$/, &#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^1\\d{10}$/, &#39;13109840560&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^1\\d{10}$/, &#39;13204061212&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@163.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@qq.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@gmail.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">checkByRegExp(/^1\\d{10}$/, &#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^1\\d{10}$/, &#39;13109840560&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^1\\d{10}$/, &#39;13204061212&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@163.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@qq.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">checkByRegExp(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/, &#39;test@gmail.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>我们每次进行校验的时候都需要输入一串正则，再校验同一类型的数据时，相同的正则我们需要写多次， 这就导致我们在使用的时候效率低下，并且由于 checkByRegExp 函数本身是一个工具函数并没有任何意义， 一段时间后我们重新来看这些代码时，如果没有注释，我们必须通过检查正则的内容， 我们才能知道我们校验的是电话号码还是邮箱，还是别的什么。</p><p>此时，我们可以借助柯里化对 checkByRegExp 函数进行封装，以简化代码书写，提高代码可读性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//进行柯里化</span></span>
<span class="line"><span style="color:#e1e4e8;">let _check = curry(checkByRegExp);</span></span>
<span class="line"><span style="color:#e1e4e8;">//生成工具函数，验证电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">let checkCellPhone = _check(/^1\\d{10}$/);</span></span>
<span class="line"><span style="color:#e1e4e8;">//生成工具函数，验证邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">let checkEmail = _check(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">checkCellPhone(&#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">checkCellPhone(&#39;13109840560&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;">checkCellPhone(&#39;13204061212&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">checkEmail(&#39;test@163.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">checkEmail(&#39;test@qq.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">checkEmail(&#39;test@gmail.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//进行柯里化</span></span>
<span class="line"><span style="color:#24292e;">let _check = curry(checkByRegExp);</span></span>
<span class="line"><span style="color:#24292e;">//生成工具函数，验证电话号码</span></span>
<span class="line"><span style="color:#24292e;">let checkCellPhone = _check(/^1\\d{10}$/);</span></span>
<span class="line"><span style="color:#24292e;">//生成工具函数，验证邮箱</span></span>
<span class="line"><span style="color:#24292e;">let checkEmail = _check(/^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">checkCellPhone(&#39;18642838455&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;">checkCellPhone(&#39;13109840560&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;">checkCellPhone(&#39;13204061212&#39;); // 校验电话号码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">checkEmail(&#39;test@163.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">checkEmail(&#39;test@qq.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">checkEmail(&#39;test@gmail.com&#39;); // 校验邮箱</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>再来看看通过柯里化封装后，我们的代码是不是变得又简洁又直观了呢。</p><p>经过柯里化后，我们生成了两个函数 checkCellPhone 和 checkEmail， checkCellPhone 函数只能验证传入的字符串是否是电话号码， checkEmail 函数只能验证传入的字符串是否是邮箱， 它们与 原函数 checkByRegExp 相比，从功能上通用性降低了，但适用性提升了。 柯里化的这种用途可以被理解为：<strong>参数复用</strong></p><p>我们再来看一个例子</p><p>假定我们有这样一段数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">let list = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        name:&#39;lucy&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        name:&#39;jack&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">let list = [</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        name:&#39;lucy&#39;</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        name:&#39;jack&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>我们需要获取数据中的所有 name 属性的值，常规思路下，我们会这样实现:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">let names = list.map(function(item) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return item.name;</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">let names = list.map(function(item) {</span></span>
<span class="line"><span style="color:#24292e;">  return item.name;</span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>那么我们如何用柯里化的思维来实现呢</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">let prop = curry(function(key,obj) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return obj[key];</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;">let names = list.map(prop(&#39;name&#39;))</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">let prop = curry(function(key,obj) {</span></span>
<span class="line"><span style="color:#24292e;">    return obj[key];</span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;">let names = list.map(prop(&#39;name&#39;))</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>看到这里，可能会有疑问，这么简单的例子，仅仅只是为了获取 name 的属性值，为何还要实现一个 prop 函数呢，这样太麻烦了吧。</p><p>我们可以换个思路，prop 函数实现一次后，以后是可以多次使用的，所以我们在考虑代码复杂程度的时候，是可以将 prop 函数的实现去掉的。</p><p>我们实际的代码可以理解为只有一行 let names = list.map(prop(&#39;name&#39;))</p><p>这么看来，通过柯里化的方式，我们的代码是不是变得更精简了，并且可读性更高了呢。</p><h2 id="如何封装柯里化工具函数" tabindex="-1">如何封装柯里化工具函数 <a class="header-anchor" href="#如何封装柯里化工具函数" aria-label="Permalink to &quot;如何封装柯里化工具函数&quot;">​</a></h2><p>接下来，我们来思考如何实现 curry 函数。</p><p>回想之前我们对于柯里化的定义，<strong>接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。</strong></p><p>我们已经知道了，当柯里化函数接收到足够参数后，就会执行原函数，那么我们如何去确定何时达到足够的参数呢？</p><p>我们有两种思路：</p><ol><li>通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数</li><li>在调用柯里化工具函数时，手动指定所需的参数个数</li></ol><p>我们将这两点结合以下，实现一个简单 curry 函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/**</span></span>
<span class="line"><span style="color:#e1e4e8;"> * 将函数柯里化</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param fn    待柯里化的原函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param len   所需的参数个数，默认为原函数的形参个数</span></span>
<span class="line"><span style="color:#e1e4e8;"> */</span></span>
<span class="line"><span style="color:#e1e4e8;">function curry(fn,len = fn.length) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return _curry.call(this,fn,len)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/**</span></span>
<span class="line"><span style="color:#e1e4e8;"> * 中转函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param fn    待柯里化的原函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param len   所需的参数个数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param args  已接收的参数列表</span></span>
<span class="line"><span style="color:#e1e4e8;"> */</span></span>
<span class="line"><span style="color:#e1e4e8;">function _curry(fn,len,...args) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return function (...params) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        let _args = [...args,...params];</span></span>
<span class="line"><span style="color:#e1e4e8;">        if(_args.length &gt;= len){</span></span>
<span class="line"><span style="color:#e1e4e8;">            return fn.apply(this,_args);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }else{</span></span>
<span class="line"><span style="color:#e1e4e8;">            return _curry.call(this,fn,len,..._args)</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/**</span></span>
<span class="line"><span style="color:#24292e;"> * 将函数柯里化</span></span>
<span class="line"><span style="color:#24292e;"> * @param fn    待柯里化的原函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param len   所需的参数个数，默认为原函数的形参个数</span></span>
<span class="line"><span style="color:#24292e;"> */</span></span>
<span class="line"><span style="color:#24292e;">function curry(fn,len = fn.length) {</span></span>
<span class="line"><span style="color:#24292e;">    return _curry.call(this,fn,len)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/**</span></span>
<span class="line"><span style="color:#24292e;"> * 中转函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param fn    待柯里化的原函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param len   所需的参数个数</span></span>
<span class="line"><span style="color:#24292e;"> * @param args  已接收的参数列表</span></span>
<span class="line"><span style="color:#24292e;"> */</span></span>
<span class="line"><span style="color:#24292e;">function _curry(fn,len,...args) {</span></span>
<span class="line"><span style="color:#24292e;">    return function (...params) {</span></span>
<span class="line"><span style="color:#24292e;">        let _args = [...args,...params];</span></span>
<span class="line"><span style="color:#24292e;">        if(_args.length &gt;= len){</span></span>
<span class="line"><span style="color:#24292e;">            return fn.apply(this,_args);</span></span>
<span class="line"><span style="color:#24292e;">        }else{</span></span>
<span class="line"><span style="color:#24292e;">            return _curry.call(this,fn,len,..._args)</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>我们来验证一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">let _fn = curry(function(a,b,c,d,e){</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(a,b,c,d,e)</span></span>
<span class="line"><span style="color:#e1e4e8;">});</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1,2,3,4,5);     // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">let _fn = curry(function(a,b,c,d,e){</span></span>
<span class="line"><span style="color:#24292e;">    console.log(a,b,c,d,e)</span></span>
<span class="line"><span style="color:#24292e;">});</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">_fn(1,2,3,4,5);     // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>我们常用的工具库 lodash 也提供了 curry 方法，并且增加了非常好玩的 placeholder 功能，通过占位符的方式来改变传入参数的顺序。</p><p>比如说，我们传入一个占位符，本次调用传递的参数略过占位符， 占位符所在的位置由下次调用的参数来填充，比如这样：</p><p>直接看一下官网的例子：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/7/8/16bcf2a1a520ad3a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><p>接下来我们来思考，如何实现占位符的功能。</p><p>对于 lodash 的 curry 函数来说，curry 函数挂载在 lodash 对象上，所以将 lodash 对象当做默认占位符来使用。</p><p>而我们的自己实现的 curry 函数，本身并没有挂载在任何对象上，所以将 curry 函数当做默认占位符</p><p>使用占位符，目的是改变参数传递的顺序，所以在 curry 函数实现中，每次需要记录是否使用了占位符，并且记录占位符所代表的参数位置。</p><p>直接上代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/**</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param  fn           待柯里化的函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param  length       需要的参数个数，默认为函数的形参个数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param  holder       占位符，默认当前柯里化函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @return {Function}   柯里化后的函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> */</span></span>
<span class="line"><span style="color:#e1e4e8;">function curry(fn,length = fn.length,holder = curry){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return _curry.call(this,fn,length,holder,[],[])</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">/**</span></span>
<span class="line"><span style="color:#e1e4e8;"> * 中转函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param fn            柯里化的原函数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param length        原函数需要的参数个数</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param holder        接收的占位符</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param args          已接收的参数列表</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @param holders       已接收的占位符位置列表</span></span>
<span class="line"><span style="color:#e1e4e8;"> * @return {Function}   继续柯里化的函数 或 最终结果</span></span>
<span class="line"><span style="color:#e1e4e8;"> */</span></span>
<span class="line"><span style="color:#e1e4e8;">function _curry(fn,length,holder,args,holders){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return function(..._args){</span></span>
<span class="line"><span style="color:#e1e4e8;">        //将参数复制一份，避免多次操作同一函数导致参数混乱</span></span>
<span class="line"><span style="color:#e1e4e8;">        let params = args.slice();</span></span>
<span class="line"><span style="color:#e1e4e8;">        //将占位符位置列表复制一份，新增加的占位符增加至此</span></span>
<span class="line"><span style="color:#e1e4e8;">        let _holders = holders.slice();</span></span>
<span class="line"><span style="color:#e1e4e8;">        //循环入参，追加参数 或 替换占位符</span></span>
<span class="line"><span style="color:#e1e4e8;">        _args.forEach((arg,i)=&gt;{</span></span>
<span class="line"><span style="color:#e1e4e8;">            //真实参数 之前存在占位符 将占位符替换为真实参数</span></span>
<span class="line"><span style="color:#e1e4e8;">            if (arg !== holder &amp;&amp; holders.length) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                let index = holders.shift();</span></span>
<span class="line"><span style="color:#e1e4e8;">                _holders.splice(_holders.indexOf(index),1);</span></span>
<span class="line"><span style="color:#e1e4e8;">                params[index] = arg;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            //真实参数 之前不存在占位符 将参数追加到参数列表中</span></span>
<span class="line"><span style="color:#e1e4e8;">            else if(arg !== holder &amp;&amp; !holders.length){</span></span>
<span class="line"><span style="color:#e1e4e8;">                params.push(arg);</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            //传入的是占位符,之前不存在占位符 记录占位符的位置</span></span>
<span class="line"><span style="color:#e1e4e8;">            else if(arg === holder &amp;&amp; !holders.length){</span></span>
<span class="line"><span style="color:#e1e4e8;">                params.push(arg);</span></span>
<span class="line"><span style="color:#e1e4e8;">                _holders.push(params.length - 1);</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            //传入的是占位符,之前存在占位符 删除原占位符位置</span></span>
<span class="line"><span style="color:#e1e4e8;">            else if(arg === holder &amp;&amp; holders.length){</span></span>
<span class="line"><span style="color:#e1e4e8;">                holders.shift();</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        });</span></span>
<span class="line"><span style="color:#e1e4e8;">        // params 中前 length 条记录中不包含占位符，执行函数</span></span>
<span class="line"><span style="color:#e1e4e8;">        if(params.length &gt;= length &amp;&amp; params.slice(0,length).every(i=&gt;i!==holder)){</span></span>
<span class="line"><span style="color:#e1e4e8;">            return fn.apply(this,params);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }else{</span></span>
<span class="line"><span style="color:#e1e4e8;">            return _curry.call(this,fn,length,holder,params,_holders)</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/**</span></span>
<span class="line"><span style="color:#24292e;"> * @param  fn           待柯里化的函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param  length       需要的参数个数，默认为函数的形参个数</span></span>
<span class="line"><span style="color:#24292e;"> * @param  holder       占位符，默认当前柯里化函数</span></span>
<span class="line"><span style="color:#24292e;"> * @return {Function}   柯里化后的函数</span></span>
<span class="line"><span style="color:#24292e;"> */</span></span>
<span class="line"><span style="color:#24292e;">function curry(fn,length = fn.length,holder = curry){</span></span>
<span class="line"><span style="color:#24292e;">    return _curry.call(this,fn,length,holder,[],[])</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">/**</span></span>
<span class="line"><span style="color:#24292e;"> * 中转函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param fn            柯里化的原函数</span></span>
<span class="line"><span style="color:#24292e;"> * @param length        原函数需要的参数个数</span></span>
<span class="line"><span style="color:#24292e;"> * @param holder        接收的占位符</span></span>
<span class="line"><span style="color:#24292e;"> * @param args          已接收的参数列表</span></span>
<span class="line"><span style="color:#24292e;"> * @param holders       已接收的占位符位置列表</span></span>
<span class="line"><span style="color:#24292e;"> * @return {Function}   继续柯里化的函数 或 最终结果</span></span>
<span class="line"><span style="color:#24292e;"> */</span></span>
<span class="line"><span style="color:#24292e;">function _curry(fn,length,holder,args,holders){</span></span>
<span class="line"><span style="color:#24292e;">    return function(..._args){</span></span>
<span class="line"><span style="color:#24292e;">        //将参数复制一份，避免多次操作同一函数导致参数混乱</span></span>
<span class="line"><span style="color:#24292e;">        let params = args.slice();</span></span>
<span class="line"><span style="color:#24292e;">        //将占位符位置列表复制一份，新增加的占位符增加至此</span></span>
<span class="line"><span style="color:#24292e;">        let _holders = holders.slice();</span></span>
<span class="line"><span style="color:#24292e;">        //循环入参，追加参数 或 替换占位符</span></span>
<span class="line"><span style="color:#24292e;">        _args.forEach((arg,i)=&gt;{</span></span>
<span class="line"><span style="color:#24292e;">            //真实参数 之前存在占位符 将占位符替换为真实参数</span></span>
<span class="line"><span style="color:#24292e;">            if (arg !== holder &amp;&amp; holders.length) {</span></span>
<span class="line"><span style="color:#24292e;">                let index = holders.shift();</span></span>
<span class="line"><span style="color:#24292e;">                _holders.splice(_holders.indexOf(index),1);</span></span>
<span class="line"><span style="color:#24292e;">                params[index] = arg;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            //真实参数 之前不存在占位符 将参数追加到参数列表中</span></span>
<span class="line"><span style="color:#24292e;">            else if(arg !== holder &amp;&amp; !holders.length){</span></span>
<span class="line"><span style="color:#24292e;">                params.push(arg);</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            //传入的是占位符,之前不存在占位符 记录占位符的位置</span></span>
<span class="line"><span style="color:#24292e;">            else if(arg === holder &amp;&amp; !holders.length){</span></span>
<span class="line"><span style="color:#24292e;">                params.push(arg);</span></span>
<span class="line"><span style="color:#24292e;">                _holders.push(params.length - 1);</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            //传入的是占位符,之前存在占位符 删除原占位符位置</span></span>
<span class="line"><span style="color:#24292e;">            else if(arg === holder &amp;&amp; holders.length){</span></span>
<span class="line"><span style="color:#24292e;">                holders.shift();</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        });</span></span>
<span class="line"><span style="color:#24292e;">        // params 中前 length 条记录中不包含占位符，执行函数</span></span>
<span class="line"><span style="color:#24292e;">        if(params.length &gt;= length &amp;&amp; params.slice(0,length).every(i=&gt;i!==holder)){</span></span>
<span class="line"><span style="color:#24292e;">            return fn.apply(this,params);</span></span>
<span class="line"><span style="color:#24292e;">        }else{</span></span>
<span class="line"><span style="color:#24292e;">            return _curry.call(this,fn,length,holder,params,_holders)</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>验证一下：；</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">let fn = function(a, b, c, d, e) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log([a, b, c, d, e]);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">let _ = {}; // 定义占位符</span></span>
<span class="line"><span style="color:#e1e4e8;">let _fn = curry(fn,5,_);  // 将函数柯里化，指定所需的参数个数，指定所需的占位符</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1, 2, 3, 4, 5);                 // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(_, 2, 3, 4, 5)(1);              // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1, _, 3, 4, 5)(2);              // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1, _, 3)(_, 4,_)(2)(5);         // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(1, _, _, 4)(_, 3)(2)(5);        // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">_fn(_, 2)(_, _, 4)(1)(3)(5);        // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">let fn = function(a, b, c, d, e) {</span></span>
<span class="line"><span style="color:#24292e;">    console.log([a, b, c, d, e]);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">let _ = {}; // 定义占位符</span></span>
<span class="line"><span style="color:#24292e;">let _fn = curry(fn,5,_);  // 将函数柯里化，指定所需的参数个数，指定所需的占位符</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">_fn(1, 2, 3, 4, 5);                 // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(_, 2, 3, 4, 5)(1);              // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1, _, 3, 4, 5)(2);              // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1, _, 3)(_, 4,_)(2)(5);         // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(1, _, _, 4)(_, 3)(2)(5);        // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">_fn(_, 2)(_, _, 4)(1)(3)(5);        // print: 1,2,3,4,5</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>至此，我们已经完整实现了一个 curry 函数~~</p><h2 id="系列文章推荐" tabindex="-1">系列文章推荐 <a class="header-anchor" href="#系列文章推荐" aria-label="Permalink to &quot;系列文章推荐&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844903890278694919" target="_blank" rel="noreferrer">「前端进阶」单页路由解析与实现</a></li><li><a href="https://juejin.cn/post/6844903873992196110" target="_blank" rel="noreferrer">「前端进阶」JS 中的栈内存堆内存</a></li><li><a href="https://juejin.cn/post/6844903869525262349" target="_blank" rel="noreferrer">「前端进阶」JS 中的内存管理</a></li><li><a href="https://juejin.cn/post/6844903863812620296" target="_blank" rel="noreferrer">「前端进阶」数组乱序</a></li></ul><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,151),e=[o];function c(t,r,y,E,i,u){return a(),n("div",null,e)}const h=s(p,[["render",c]]);export{F as __pageData,h as default};
