import{_ as s,o as a,c as n,U as l}from"./chunks/framework.c99fcb40.js";const i=JSON.parse('{"title":"this 指向","description":"","frontmatter":{},"headers":[],"relativePath":"code/example/this.md","filePath":"code/example/this.md"}'),p={name:"code/example/this.md"},o=l(`<h1 id="this-指向" tabindex="-1"><code>this</code> 指向 <a class="header-anchor" href="#this-指向" aria-label="Permalink to &quot;\`this\` 指向&quot;">​</a></h1><h2 id="_1、代码输出结果" tabindex="-1">1、代码输出结果 <a class="header-anchor" href="#_1、代码输出结果" aria-label="Permalink to &quot;1、代码输出结果&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> fullname </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">fullname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">b</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">prop</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">fullname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">c</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">getFullname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">fullname</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prop</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getFullname</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> test </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prop</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">getFullname</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">c</span></span>
<span class="line"><span style="color:#A6ACCD;">a</span></span></code></pre></div><p>原因在于 this 指向的是函数的执行环境，this 取决于其被谁调用了，而不是被谁定义了。</p><p>对第一个 console.log()语句而言，getFullName()是作为 obj.prop 对象的一个方法被调用的，因此此时的执行环境应该是这个对象。</p><p>另一方面，但 getFullName()被分配给 test 变量时，此时的执行环境变成全局对象（window），原因是 test 是在全局作用域中定义的。因此，此时的 this 指向的是全局作用域的 fullname 变量，即 a。</p></details><h2 id="_2、代码输出结果" tabindex="-1">2、代码输出结果 <a class="header-anchor" href="#_2、代码输出结果" aria-label="Permalink to &quot;2、代码输出结果&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">baz</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">baz</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> (f </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bar)())</span><span style="color:#89DDFF;">;</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;undefined&quot;</span></span></code></pre></div><p>这里并不是因为赋值给 f ，相当于 f()，所以 this 指向 window 的。 不然试试下面代码也会打印 undefined</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">baz</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">baz</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> (foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bar)())</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>下面简单从规范的角度判断这个 this 指向，可以分以下几个步骤：</p><p>1.计算 MemberExpression 的结果赋值给 ref</p><p>2.判断 ref 是不是一个 Reference 类型</p><p>2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)</p><p>2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么 this 的值为 ImplicitThisValue(ref)</p><p>2.3 如果 ref 不是 Reference，那么 this 的值为 undefined</p><p>解释下这两个步骤： 1、MemberExpression 我们可以简单理解为括号前的部分，针对这题就是 (f=foo.bar) 这部分。</p><p>2、Reference 是规范类型的一种。如果通过 GetValue 方法从 Reference 类型中获取值，则该 MemberExpression 返回结果不再是 Reference 类型。 这里的关键就是判断 MemberExpression 的返回结果是不是 Reference 类型。 由于 f=foo.bar 存在赋值操作符，根据规范 11.13.1 Simple Assignment ( = ) 规定，其第三步使用了 GetValue(ref)，故返回值不是 Reference 类型。 对照上述 2.3 的规范，如果表达式返回值不是 Reference 类型，那么 this 的值为 undefined，在非严格模式下，被隐式转换为全局对象 window。</p></details><h2 id="_3、代码输出结果" tabindex="-1">3、代码输出结果 <a class="header-anchor" href="#_3、代码输出结果" aria-label="Permalink to &quot;3、代码输出结果&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">add</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">reduce</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">12</span></span>
<span class="line"><span style="color:#A6ACCD;">NaN</span></span></code></pre></div><p>注意，add 是普通函数，而 reduce 是箭头函数。对于箭头函数，this 关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 这意味着当我们调用 reduce 时，它不是指向 num 对象，而是指其定义时的环境（window）。没有值 a 属性，返回 undefined。</p></details><h2 id="_4、代码输出结果" tabindex="-1">4、代码输出结果 <a class="header-anchor" href="#_4、代码输出结果" aria-label="Permalink to &quot;4、代码输出结果&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> person </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yideng</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sayHi</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">age</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> is </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">age</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(sayHi</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(person</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">21</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(sayHi</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#A6ACCD;">(person</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">21</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">yideng is 21</span></span>
<span class="line"><span style="color:#A6ACCD;">ƒ sayHi(age) {return \${this.name} is \${age};}</span></span></code></pre></div><p>使用两者，我们可以传递我们想要 this 关键字引用的对象。</p><p>.call 方法会立即执行！</p><p>.bind 方法会返回函数的拷贝值，但带有绑定的上下文！它不会立即执行。</p></details><h2 id="_5、代码输出结果" tabindex="-1">5、代码输出结果 <a class="header-anchor" href="#_5、代码输出结果" aria-label="Permalink to &quot;5、代码输出结果&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> length </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">length</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">method</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fn</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">fn</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">arguments</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">method</span><span style="color:#A6ACCD;">(fn</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">2</span></span></code></pre></div><p>1）fn()知识点 ①fn()知识点，任意函数里如果嵌套了 非箭头函数，那这个时候 嵌套函数里的 this 在未指定的情况下，应该指向的是 window 对象，所以这里执行 fn 会打印 window.length,但是 let 声明的变量会形成块级作用域，且不存在声明提升，而 var 存在声明提升。所以当使用 let 声明变量时，不存在声明提升，length 属性实际上并没有添加到 window 对象中。 // 例如在浏览器控制台 let a = 1; window.a // undefined var b = 1; window.b // 1 但是这里为什么输出 0 呢，因为 window 对象原先上有 length 属性，所以输出的是原先的值 0</p><p>②arguments 知识点 在方法调用（如果某个对象的属性是函数，这个属性就叫方法，调用这个属性，就叫方法调用）中，执行函数体的时候，作为属性访问主体的对象和数组便是其调用方法内 this 的指向。（通俗的说，调用谁的方法 this 就指向谁； arguments[0]指向 fn,所以 arguments[0]() 是作为 arguments 对象的属性[0]来调用 fn 的，所以 fn 中的 this 指向属性访问主体的对象 arguments；这里 this 指向 arguments。 因为 fn 作为一个参数存储在 arg 对象里，argumengts 的长度为 2，所以输出 2 // 例如 [function fn(){console.log(this.length)}][0]; // 1 // 数组也是对象，只不过数组对象的整型属性会计入 length 属性中，并被区别对待，这里就是调用数组对象的 0 属性，函数作为数组对象的属性调用，函数中的 this 当然指向这个数组，所以返回数组的 length</p></details><h2 id="_6、代码输出结果" tabindex="-1">6、代码输出结果 <a class="header-anchor" href="#_6、代码输出结果" aria-label="Permalink to &quot;6、代码输出结果&quot;">​</a></h2><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var a = 10;</span></span>
<span class="line"><span style="color:#A6ACCD;">var foo = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    a: 20,</span></span>
<span class="line"><span style="color:#A6ACCD;">    bar: function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        var a = 30;</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.a;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(foo.bar());</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((foo.bar)());</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((foo.bar = foo.bar)());</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((foo.bar, foo.bar)());</span></span></code></pre></div><details class="details custom-block"><summary>答案</summary><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">20</span></span>
<span class="line"><span style="color:#A6ACCD;">20</span></span>
<span class="line"><span style="color:#A6ACCD;">10</span></span>
<span class="line"><span style="color:#A6ACCD;">10</span></span></code></pre></div></details>`,19),e=[o];function t(c,r,D,y,F,C){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
