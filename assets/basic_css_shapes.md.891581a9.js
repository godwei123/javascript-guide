import{_ as s,c as e,o as a,Q as n}from"./chunks/framework.00751356.js";const b=JSON.parse('{"title":"shapes","description":"","frontmatter":{},"headers":[],"relativePath":"basic/css/shapes.md","filePath":"basic/css/shapes.md"}'),p={name:"basic/css/shapes.md"},l=n(`<h1 id="shapes" tabindex="-1">shapes <a class="header-anchor" href="#shapes" aria-label="Permalink to &quot;shapes&quot;">​</a></h1><p><strong>CSS Shapes</strong> 是一个 CSS 模块，用于定义在 CSS 值中使用的几何形状。</p><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-image-threshold" target="_blank" rel="noreferrer"><code>shape-image-threshold</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-margin" target="_blank" rel="noreferrer"><code>shape-margin</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside" target="_blank" rel="noreferrer"><code>shape-outside</code></a></li></ul><h2 id="shape-image-threshold" tabindex="-1">shape-image-threshold <a class="header-anchor" href="#shape-image-threshold" aria-label="Permalink to &quot;shape-image-threshold&quot;">​</a></h2><p>CSS 属性 shape-image-threshold 通过设定一个 alpha 通道的界限值来提取 shape-outside 值为图像的形状。</p><p>所有 alpha 值比这个界限值大的像素都会被当做形状的一部分，以此确定形状的边界。举个例子，界限值为<code>0.5</code>时，形状会包含所有不透明度超过 50% 的像素。</p><p>取值范围：[0.0,1.0] ｜ 百分比</p><h2 id="shape-margin" tabindex="-1">shape-margin <a class="header-anchor" href="#shape-margin" aria-label="Permalink to &quot;shape-margin&quot;">​</a></h2><p>CSS 属性 shape-margin 用于设定由 shape-outside 创建的 CSS 形状的外边距。</p><p>这个外边距可以让你调整（浮动元素的）形状边缘与环绕内容之间的距离。</p><p>使用 <code>&lt;length&gt;</code> 值，或者相对于元素容纳块的 <code>&lt;percentage&gt;</code> 值来设定形状的外边距。</p><h2 id="shape-outside" tabindex="-1">shape-outside <a class="header-anchor" href="#shape-outside" aria-label="Permalink to &quot;shape-outside&quot;">​</a></h2><p>shape-outside 的 CSS 属性定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。默认情况下，内联内容包围其边距框; shape-outside 提供了一种自定义此包装的方法，可以将文本包装在复杂对象周围而不是简单的框中。</p><p><code>shape-outside</code> 属性指定使用下面列表的值来定义浮动元素的浮动区域。这个浮动区域决定了行内内容（浮动元素）所包裹的形状。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/_ 关键字值 _/</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: none;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: margin-box;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: content-box;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: border-box;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: padding-box;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/_ 函数值 _/</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: circle();</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: ellipse();</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: inset(10px 10px 10px 10px);</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/_ &lt;url&gt; 值 _/</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: url(image.png);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/_ 渐变值 _/</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/_ 全局值 _/</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: initial;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: inherit;</span></span>
<span class="line"><span style="color:#e1e4e8;">shape-outside: unset;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/_ 关键字值 _/</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: none;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: margin-box;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: content-box;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: border-box;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: padding-box;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/_ 函数值 _/</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: circle();</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: ellipse();</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: inset(10px 10px 10px 10px);</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/_ &lt;url&gt; 值 _/</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: url(image.png);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/_ 渐变值 _/</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/_ 全局值 _/</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: initial;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: inherit;</span></span>
<span class="line"><span style="color:#24292e;">shape-outside: unset;</span></span></code></pre></div><p>none 该浮动区域不产生影响，行内元素以默认的方式包裹着该元素的 margin box。</p><p><code>&lt;shape-box&gt;</code> 根据浮动元素的边缘（通过 CSS box model 来定义）形状计算出浮动的区域。可能是 margin-box, border-box, padding-box, 或者 content-box。这个形状包括了由 border-radius 属性制造出来的弧度（与 background-clip 的表现类似）。</p><ul><li><p>margin-box 定义一个由外边距的外边缘封闭形成的形状。这个形状的角的半径由相应的 border-radius 和 margin 的值决定。如果 border-radius / margin 的比率大于等于 1 , 那么这个 margin box 的角的弧度就是 border-radius + margin ；如果比率小于 1，那么这个 margin box 的角的弧度就是 border-radius + (margin * (1 + (ratio-1)^3)) 。</p></li><li><p>border-box 定义一个由边界的外边缘封闭形成的形状。这个形状遵循正常的边界外部圆角的形成规则。</p></li><li><p>padding-box 定义一个由内边距的外边缘封闭形成的形状。这个形状遵循正常的边界内部圆角的形成规则。</p></li><li><p>content-box 定义一个由内容区域的外边缘封闭形成的形状（译者：表述的不太好，就是被 padding 包裹的区域，在 chrome 控制台中的盒子模型图中的蓝色区域。）。每一个角的弧度取 0 或 border-radius - border-width - padding 中的较大值。</p></li></ul><p><code>&lt;basic-shape&gt;</code> 基于 inset() (en-US)、circle() (en-US)、ellipse() (en-US) 或 polygon() (en-US) 其中一个创造出来的形状计算出浮动区域。如果同时存在 <code>&lt;shape-box&gt;</code>，那么会为 <code>&lt;basic-shape&gt;</code> 方法定义一个参考盒，这个参考盒默认为 margin-box。</p><p><code>&lt;image&gt;</code> 提取并且计算指定 <code>&lt;image&gt;</code> 的 alpha 通道得出浮动区域（译者：即根据图片的非透明区域进行包裹）。就跟通过 shape-image-threshold 来定义一样。</p>`,20),o=[l];function i(t,r,c,d,h,g){return a(),e("div",null,o)}const x=s(p,[["render",i]]);export{b as __pageData,x as default};
