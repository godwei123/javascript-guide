import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.00751356.js";const u=JSON.parse('{"title":"Grid","description":"","frontmatter":{},"headers":[],"relativePath":"basic/css/grid.md","filePath":"basic/css/grid.md"}'),p={name:"basic/css/grid.md"},o=l(`<h1 id="grid" tabindex="-1">Grid <a class="header-anchor" href="#grid" aria-label="Permalink to &quot;Grid&quot;">​</a></h1><p>grid 是一个 CSS 简写属性，可以用来设置以下属性： 显式网格属性 grid-template-rows、grid-template-columns 和 grid-template-areas， 隐式网格属性 grid-auto-rows、grid-auto-columns 和 grid-auto-flow， 间距属性 grid-column-gap 和 grid-row-gap 。</p><p><strong>备注：</strong> 您仅可在一个 <code>grid</code> 属性中声明显式或隐式网格。与其他简写属性同样，若有次级属性未被声明，其将使用初始值。另外，尽管此简写声明无法设置网格的槽（gutter），槽会被该声明重置。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* &lt;&#39;grid-template&#39;&gt; values */</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: none;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: &quot;a&quot; 100px &quot;b&quot; 1fr;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: [</span><span style="color:#B392F0;">linename1</span><span style="color:#E1E4E8;">] &quot;a&quot; 100px [</span><span style="color:#B392F0;">linename2</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: &quot;a&quot; 200px &quot;b&quot; </span><span style="color:#85E89D;">min-content</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: &quot;a&quot; minmax(100px, </span><span style="color:#85E89D;">max-content</span><span style="color:#E1E4E8;">) &quot;b&quot; 20%;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: 100px / 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: minmax(400px, </span><span style="color:#85E89D;">min-content</span><span style="color:#E1E4E8;">) / repeat(</span><span style="color:#85E89D;">auto-fill</span><span style="color:#E1E4E8;">, 50px);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* &lt;&#39;grid-template-rows&#39;&gt; /</span></span>
<span class="line"><span style="color:#6A737D;">   [ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-columns&#39;&gt;? values */</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: 200px / </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: 30% / </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> dense;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: repeat(3, [line1 line2 </span><span style="color:#B392F0;">line3</span><span style="color:#E1E4E8;">] 200px) / </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> 300px;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: [</span><span style="color:#B392F0;">line1</span><span style="color:#E1E4E8;">] minmax(20em, </span><span style="color:#85E89D;">max-content</span><span style="color:#E1E4E8;">) / </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> dense 40%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* [ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-rows&#39;&gt;? /</span></span>
<span class="line"><span style="color:#6A737D;">   &lt;&#39;grid-template-columns&#39;&gt; values */</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> / 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> dense / 30%;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> 300px / repeat(3, [line1 line2 </span><span style="color:#B392F0;">line3</span><span style="color:#E1E4E8;">] 200px);</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: </span><span style="color:#85E89D;">auto-flow</span><span style="color:#E1E4E8;"> dense 40% / [</span><span style="color:#B392F0;">line1</span><span style="color:#E1E4E8;">] minmax(20em, </span><span style="color:#85E89D;">max-content</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* Global values */</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: inherit;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: initial;</span></span>
<span class="line"><span style="color:#E1E4E8;">grid: unset;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* &lt;&#39;grid-template&#39;&gt; values */</span></span>
<span class="line"><span style="color:#24292E;">grid: none;</span></span>
<span class="line"><span style="color:#24292E;">grid: &quot;a&quot; 100px &quot;b&quot; 1fr;</span></span>
<span class="line"><span style="color:#24292E;">grid: [</span><span style="color:#6F42C1;">linename1</span><span style="color:#24292E;">] &quot;a&quot; 100px [</span><span style="color:#6F42C1;">linename2</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">grid: &quot;a&quot; 200px &quot;b&quot; </span><span style="color:#22863A;">min-content</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">grid: &quot;a&quot; minmax(100px, </span><span style="color:#22863A;">max-content</span><span style="color:#24292E;">) &quot;b&quot; 20%;</span></span>
<span class="line"><span style="color:#24292E;">grid: 100px / 200px;</span></span>
<span class="line"><span style="color:#24292E;">grid: minmax(400px, </span><span style="color:#22863A;">min-content</span><span style="color:#24292E;">) / repeat(</span><span style="color:#22863A;">auto-fill</span><span style="color:#24292E;">, 50px);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* &lt;&#39;grid-template-rows&#39;&gt; /</span></span>
<span class="line"><span style="color:#6A737D;">   [ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-columns&#39;&gt;? values */</span></span>
<span class="line"><span style="color:#24292E;">grid: 200px / </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">grid: 30% / </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> dense;</span></span>
<span class="line"><span style="color:#24292E;">grid: repeat(3, [line1 line2 </span><span style="color:#6F42C1;">line3</span><span style="color:#24292E;">] 200px) / </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> 300px;</span></span>
<span class="line"><span style="color:#24292E;">grid: [</span><span style="color:#6F42C1;">line1</span><span style="color:#24292E;">] minmax(20em, </span><span style="color:#22863A;">max-content</span><span style="color:#24292E;">) / </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> dense 40%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* [ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-rows&#39;&gt;? /</span></span>
<span class="line"><span style="color:#6A737D;">   &lt;&#39;grid-template-columns&#39;&gt; values */</span></span>
<span class="line"><span style="color:#24292E;">grid: </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> / 200px;</span></span>
<span class="line"><span style="color:#24292E;">grid: </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> dense / 30%;</span></span>
<span class="line"><span style="color:#24292E;">grid: </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> 300px / repeat(3, [line1 line2 </span><span style="color:#6F42C1;">line3</span><span style="color:#24292E;">] 200px);</span></span>
<span class="line"><span style="color:#24292E;">grid: </span><span style="color:#22863A;">auto-flow</span><span style="color:#24292E;"> dense 40% / [</span><span style="color:#6F42C1;">line1</span><span style="color:#24292E;">] minmax(20em, </span><span style="color:#22863A;">max-content</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* Global values */</span></span>
<span class="line"><span style="color:#24292E;">grid: inherit;</span></span>
<span class="line"><span style="color:#24292E;">grid: initial;</span></span>
<span class="line"><span style="color:#24292E;">grid: unset;</span></span></code></pre></div><p><code>&lt;&#39;grid-template&#39;&gt;</code> 定义了 grid-template，其包含 grid-template-columns，grid-template-rows 和 grid-template-areas。</p><p><code>&lt;&#39;grid-template-rows&#39;&gt; / [ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-columns&#39;&gt;? </code>通过 grid-template-rows 属性显式设置行轨道来设置自动流（grid-template-columns 属性设为 none），并通过 grid-auto-columns 明确该如何自动重复列轨道（同时 grid-auto-rows 属性设为 auto）。grid-auto-flow 属性也被相应的设置为 column，并可附有 dense。 所有其余 grid 次级属性被重置为初始值。</p><p><code>[ auto-flow &amp;&amp; dense? ] &lt;&#39;grid-auto-rows&#39;&gt;? / &lt;&#39;grid-template-columns&#39;&gt;</code> 通过 grid-template-columns 属性显式设置列轨道来设置自动流（grid-template-rows 属性设为 none），并通过 grid-auto-rows 明确该如何自动重复行轨道（同时 grid-auto-columns 属性设为 auto）。grid-auto-flow 属性也被相应的设置为 row，并可附有 dense。 所有其余 grid 次级属性被重置为初始值。</p>`,7),e=[o];function t(r,c,i,E,d,y){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
