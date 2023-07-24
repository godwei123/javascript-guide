import{_ as s,o as a,c as l,U as n}from"./chunks/framework.c99fcb40.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"advanced/browser/浏览器性能.md","filePath":"advanced/browser/浏览器性能.md"}'),e={name:"advanced/browser/浏览器性能.md"},o=n(`<h2 id="_1、回流和重绘" tabindex="-1">1、回流和重绘 <a class="header-anchor" href="#_1、回流和重绘" aria-label="Permalink to &quot;1、回流和重绘&quot;">​</a></h2><h3 id="回流" tabindex="-1">回流 <a class="header-anchor" href="#回流" aria-label="Permalink to &quot;回流&quot;">​</a></h3><p>窗口尺寸被修改，发生滚动操作，或者是元素的尺寸或位置相关属性被更新时会触发布局过程，在布局过程中需要重新计算所有元素的位置信息。</p><p>下面这些操作会导致回流：</p><ul><li>页面的首次渲染</li><li>浏览器的窗口大小发生变化</li><li>元素的内容发生变化，比如用户在 input 框中输入文字, CSS3 动画等</li><li>元素的尺寸或者位置发生变化</li><li>元素的字体大小发生变化</li><li>激活 CSS 伪类，:hover</li><li>查询某些属性或者调用某些方法</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">offsetTop </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  offsetLeft </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  offsetWidth </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  offsetHeight </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  scrollTop </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  scrollLeft </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  scrollWidth </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  scrollHeight </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  clientTop </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  clientLeft </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  clientHeight </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">getComputedStyle</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">/</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">currentStyle</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div><ul><li>添加或者删除可见的 DOM 元素</li></ul><h3 id="重绘" tabindex="-1">重绘 <a class="header-anchor" href="#重绘" aria-label="Permalink to &quot;重绘&quot;">​</a></h3><p>当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是重绘。</p><p>下面这些操作会导致重绘：</p><ul><li>color、background 相关属性：background-color、background-image 等</li><li>outline 相关属性：outline-color、outline-width 、text-decoration</li><li>border-radius、visibility、box-shadow</li></ul><p>注意： 当触发回流时，一定会触发重绘，但是重绘不一定会引发回流。</p><p>opacity：opacity 在 0 和 1 的变化中会引起 render 层的生成和销毁，因此会引发一次回流，从而引发重绘。如果 opacity 在 0-0.9 间变化则只会引发重绘。</p><h3 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h3><ul><li>如果想设定元素的样式，通过改变元素的 class 类名 (尽可能在 DOM 树的最里层)</li><li>避免设置多项内联样式</li><li>应用元素的动画，使用 position 属性的 fixed 值或 absolute 值</li><li>避免使用 table 布局，table 中每个元素的大小以及内容的改动，都会导致整个 table 的重新计算</li><li>对于那些复杂的动画，对其设置 position: fixed/absolute，尽可能地使元素脱离文档流，从而减少对其他元素的影响</li><li>使用 css3 硬件加速，可以让 transform、opacity、filters 这些动画不会引起回流重绘</li><li>避免使用 CSS 的 JavaScript 表达式</li><li>在使用 JavaScript 动态插入多个节点时, 可以使用 DocumentFragment. 创建后一次插入. 就能避免多次的渲染性能</li></ul><p>但有时候，我们会无可避免地进行回流或者重绘，我们可以更好使用它们</p><ul><li><p>待计算完毕再提交给浏览器发出重计算请求,避免多次调用 offset 等属性</p></li><li><p>避免多次 DOM 改变样式，使用类名去合并样式</p></li><li><p>通过设置元素属性 display: none，将其从页面上去掉，然后再进行后续操作，这些后续操作也不会触发回流与重绘，这个过程称为离线操作</p></li><li></li></ul>`,17),p=[o];function t(i,c,r,d,D,y){return a(),l("div",null,p)}const h=s(e,[["render",t]]);export{C as __pageData,h as default};
