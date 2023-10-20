import{_ as s,c as n,o as a,Q as p}from"./chunks/framework.00751356.js";const h=JSON.parse('{"title":"Rust 学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"study/rust/notes.md","filePath":"study/rust/notes.md"}'),l={name:"study/rust/notes.md"},o=p(`<h1 id="rust-学习笔记" tabindex="-1">Rust 学习笔记 <a class="header-anchor" href="#rust-学习笔记" aria-label="Permalink to &quot;Rust 学习笔记&quot;">​</a></h1><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><p>let 定义变量，定义后不能够重新赋值</p><p>mut 关键字，变量可变</p><p>const 定义常量，必须指定数据类型</p><p>同名变量会隐藏，覆盖，数据类型也可以改变。常量不能被隐藏，即不能有同名的常量</p><p>static 可以定义常量</p><p>字符串字面量：<code>&amp;str</code></p><p>字符串对象：<code>String::new()</code>, <code>String::from()</code></p><p>运算符不支持<code>++</code>,<code>--</code>，其他的相同</p><p>条件</p><div class="language-rust vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> xxx {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> xxx {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">match</span><span style="color:#E1E4E8;"> xx {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;情况1&#39;</span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;">&#39;结果1&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;情况2&#39;</span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;">&#39;结果2&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  _</span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;">&#39;其他&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> xxx {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> xxx {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">match</span><span style="color:#24292E;"> xx {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;情况1&#39;</span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;">&#39;结果1&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;情况2&#39;</span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;">&#39;结果2&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  _</span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;">&#39;其他&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>循环</p><div class="language-rust vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> xx </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> start</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">end {</span><span style="color:#6A737D;"> // [start,end)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> xx </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> start</span><span style="color:#F97583;">...=</span><span style="color:#E1E4E8;">end {</span><span style="color:#6A737D;"> // [start,end]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> xx </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> start</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">end {</span><span style="color:#6A737D;"> // [start,end)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> xx </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> start</span><span style="color:#D73A49;">...=</span><span style="color:#24292E;">end {</span><span style="color:#6A737D;"> // [start,end]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,14),e=[o];function t(c,r,E,i,y,d){return a(),n("div",null,e)}const x=s(l,[["render",t]]);export{h as __pageData,x as default};
