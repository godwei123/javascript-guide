import{_ as s,c as n,o as a,V as l}from"./chunks/framework.25f281e8.js";const p="/javascript-guide/assets/20200715170108916.2472b9f4.png",o="/javascript-guide/assets/20200715170121834.816846d2.png",g=JSON.parse('{"title":"CSS interview","description":"","frontmatter":{},"headers":[],"relativePath":"basic/css/css-interview.md","filePath":"basic/css/css-interview.md"}'),t={name:"basic/css/css-interview.md"},e=l('<h1 id="css-interview" tabindex="-1">CSS interview <a class="header-anchor" href="#css-interview" aria-label="Permalink to &quot;CSS interview&quot;">​</a></h1><h2 id="_1、css-的权重和优先级" tabindex="-1">1、CSS 的权重和优先级 <a class="header-anchor" href="#_1、css-的权重和优先级" aria-label="Permalink to &quot;1、CSS 的权重和优先级&quot;">​</a></h2><p>从 0 开始，一个行内样式+1000，一个 id 选择器+100，一个属性选择器、class 或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0</p><ul><li>权重相同，写在后面的覆盖前面的</li><li>使用 <code>!important</code> 达到最大优先级，都使用 <code>!important</code> 时，权重大的优先级高</li></ul><h2 id="_2、css-盒模型" tabindex="-1">2、CSS 盒模型 <a class="header-anchor" href="#_2、css-盒模型" aria-label="Permalink to &quot;2、CSS 盒模型&quot;">​</a></h2><p>CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型</p><p>盒模型都是由四个部分组成的,分别是 margin、border、padding 和 content.</p><p><img src="'+p+'" alt="标准盒子模型"></p><p><img src="'+o+`" alt="IE盒子模型"></p><p>标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时,所对应的范围不同:</p><ul><li>标准盒模型的 width 和 height 属性的范围只包含了 content,</li><li>IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content.</li></ul><p>可以通过修改元素的 box-sizing 属性来改变元素的盒模型:</p><ul><li>box-sizing: content-box 表示标准盒模型（默认值）， <code>content-box</code> 是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。</li><li>box-sizing: border-box 表示 IE 盒模型（怪异盒模型），设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。</li></ul><h2 id="_3、block、inline-和-inline-block" tabindex="-1">3、block、inline 和 inline-block <a class="header-anchor" href="#_3、block、inline-和-inline-block" aria-label="Permalink to &quot;3、block、inline 和 inline-block&quot;">​</a></h2><p>(1) block，会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性；</p><p>(2) inline，元素不会独占一行，设置 width、height 属性无效，但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；</p><p>(3) inline-block，将对象设置为 inline 对象，但对象的内容作为 block 对象呈现之后的内联对象会被排列在同一行内。</p><h2 id="_4、清除浮动" tabindex="-1">4、清除浮动 <a class="header-anchor" href="#_4、清除浮动" aria-label="Permalink to &quot;4、清除浮动&quot;">​</a></h2><p>不清除浮动会发生高度塌陷：浮动元素父元素高度自适应（父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷）</p><ul><li>clear 清除浮动（添加空 div 法）在浮动元素下方添加空 div,并给该元素写 css 样式：<code>{clear:both;height:0;overflow:hidden;}</code></li><li>给浮动元素父级设置高度</li><li>父级同时浮动（需要给父级同级元素添加浮动）</li><li>父级设置成 inline-block，其 margin: 0 auto 居中方式失效</li><li>给父级添加 overflow:hidden 清除浮动方法</li><li>万能清除法 after 伪类 清浮动（现在主流方法，推荐使用）</li></ul><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">float_div</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">clear</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> both</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">display</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> block</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">overflow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> hidden</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">visibility</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> hidden</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">float_div</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">zoom</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="_5、隐藏一个元素方法" tabindex="-1">5、隐藏一个元素方法 <a class="header-anchor" href="#_5、隐藏一个元素方法" aria-label="Permalink to &quot;5、隐藏一个元素方法&quot;">​</a></h2><ul><li>visibility</li><li>display</li><li>z-index</li><li>opacity</li><li>transform</li><li>position</li></ul><h2 id="_6、visibility-、opacity-和-display-的差别" tabindex="-1">6、visibility 、opacity 和 display 的差别 <a class="header-anchor" href="#_6、visibility-、opacity-和-display-的差别" aria-label="Permalink to &quot;6、visibility 、opacity 和 display 的差别&quot;">​</a></h2><ul><li>visibility 设置 hidden 会隐藏元素，但是其位置还存在与页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘</li><li>display 设置了 none 属性会隐藏元素，且其位置也不会被保留下来，所以会触发浏览器渲染引擎的回流和重绘。</li><li>opacity 会将元素设置为透明，但是其位置也在页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘</li></ul><h2 id="_7、bfc-与-ifc-区别" tabindex="-1">7、BFC 与 IFC 区别 <a class="header-anchor" href="#_7、bfc-与-ifc-区别" aria-label="Permalink to &quot;7、BFC 与 IFC 区别&quot;">​</a></h2><p>BFC 是块级格式上下文，IFC 是行内格式上下文：</p><ul><li>内部的 Box 会水平放置</li><li>水平的间距由 margin，padding，border 决定</li></ul><p>参考链接：</p><ul><li><a href="https://juejin.im/entry/5938daf7a0bb9f006b2295db" target="_blank" rel="noreferrer">https://juejin.im/entry/5938daf7a0bb9f006b2295db</a></li><li><a href="https://zhuanlan.zhihu.com/p/74817089" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/74817089</a></li></ul><h2 id="_8、bfc-会与-float-元素相互覆盖吗" tabindex="-1">8、BFC 会与 float 元素相互覆盖吗 <a class="header-anchor" href="#_8、bfc-会与-float-元素相互覆盖吗" aria-label="Permalink to &quot;8、BFC 会与 float 元素相互覆盖吗&quot;">​</a></h2><p>不会，因为 BFC 是页面中一个独立的隔离容器，其内部的元素不会与外部的元素相互影响，比如两个 div，上面的 div 设置了 float，那么如果下面的元素不是 BFC，也没有设置 float，会形成对上面的元素进行包裹内容的情况，如果设置了下面元素为 overflow：hidden；属性那么就能够实现经典的两列布局，左边内容固定宽度，右边因为是 BFC 所以会进行自适应。</p><ul><li><a href="https://zhuanlan.zhihu.com/p/25321647" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/25321647</a></li></ul><h2 id="_9、什么是-bfc" tabindex="-1">9、什么是 BFC <a class="header-anchor" href="#_9、什么是-bfc" aria-label="Permalink to &quot;9、什么是 BFC&quot;">​</a></h2><p>BFC（Block Formatting Context）格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。</p><h3 id="形成-bfc-的条件" tabindex="-1">形成 BFC 的条件 <a class="header-anchor" href="#形成-bfc-的条件" aria-label="Permalink to &quot;形成 BFC 的条件&quot;">​</a></h3><p>五种：</p><ul><li>浮动元素，float 除 none 以外的值</li><li>定位元素，position（absolute，fixed）</li><li>display 为以下其中之一的值 inline-block，table-cell，table-caption</li><li>overflow 除了 visible 以外的值（hidden，auto，scroll）</li><li>HTML 就是一个 BFC</li></ul><p>BFC 的特性：</p><ul><li>内部的 Box 会在垂直方向上一个接一个的放置。</li><li>垂直方向上的距离由 margin 决定</li><li>bfc 的区域不会与 float 的元素区域重叠。</li><li>计算 bfc 的高度时，浮动元素也参与计算</li><li>bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。</li></ul><h2 id="_10、position-属性" tabindex="-1">10、position 属性 <a class="header-anchor" href="#_10、position-属性" aria-label="Permalink to &quot;10、position 属性&quot;">​</a></h2><h2 id="_11、两个-div-上下排列-都设-margin-有什么现象" tabindex="-1">11、两个 div 上下排列，都设 margin，有什么现象？ <a class="header-anchor" href="#_11、两个-div-上下排列-都设-margin-有什么现象" aria-label="Permalink to &quot;11、两个 div 上下排列，都设 margin，有什么现象？&quot;">​</a></h2><ul><li>都正取大</li><li>一正一负相加</li></ul><p>问：为什么会有这种现象？你能解释一下吗</p><p>是由块级格式上下文决定的，BFC，元素在 BFC 中会进行上下排列，然后垂直距离由 margin 决定，并且会发生重叠，具体表现为同正取最大的，同负取绝对值最大的，一正一负，相加</p><p>BFC 是页面中一个独立的隔离容器，内部的子元素不会影响到外部的元素。</p><h2 id="_12、css-可继承与不可继承属性" tabindex="-1">12、CSS 可继承与不可继承属性 <a class="header-anchor" href="#_12、css-可继承与不可继承属性" aria-label="Permalink to &quot;12、CSS 可继承与不可继承属性&quot;">​</a></h2><p>一、无继承性的属性</p><ol><li>display:规定元素应该生成的框的类型</li><li>文本属性:</li></ol><ul><li>vertical-align:垂直文本对齐</li><li>text-decoration:规定添加到文本的装饰</li><li>text-shadow:文本阴影效果</li><li>white-space:空白符的处理</li><li>unicode-bidi:设置文本的方向</li></ul><ol start="3"><li>盒子模型的属性:width、height、margin、border、padding</li><li>背景属性:background、background-color、background-image、background-repeat、background-position、background-attachment</li><li>定位属性:float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index</li><li>生成内容属性:content、counter-reset、counter-increment</li><li>轮廓样式属性:outline-style、outline-width、outline-color、outline</li><li>页面样式属性:size、page-break-before、page-break-after</li><li>声音样式属性:pause-before、pause-after、pause、cue-before、cue-after、cue、play-during</li></ol><p>二、有继承性的属性</p><ol><li>字体系列属性</li></ol><ul><li>font-family:字体系列</li><li>font-weight:字体的粗细</li><li>font-size:字体的大小</li><li>font-style:字体的风格</li></ul><ol start="2"><li>文本系列属性</li></ol><ul><li>text-indent:文本缩进</li><li>text-align:文本水平对齐</li><li>line-height:行高</li><li>word-spacing:单词之间的间距</li><li>letter-spacing:中文或者字母之间的间距</li><li>text-transform:控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）</li><li>color:文本颜色</li></ul><ol start="3"><li>元素可见性</li></ol><ul><li>visibility:控制元素显示隐藏</li></ul><ol start="4"><li>列表布局属性</li></ol><ul><li>list-style:列表风格,包括 list-style-type、list-style-image 等</li></ul><ol start="5"><li>光标属性</li></ol><ul><li>cursor:光标显示为何种形态</li></ul><h2 id="_13、link-和-import" tabindex="-1">13、link 和 @import <a class="header-anchor" href="#_13、link-和-import" aria-label="Permalink to &quot;13、link 和 @import&quot;">​</a></h2><p>两者都是外部引用 CSS 的方式,它们的区别如下:</p><ul><li>link 是 XHTML 标签,除了加载 CSS 外,还可以定义 RSS 等其他事务;@import 属于 CSS 范畴,只能加载 CSS.</li><li>link 引用 CSS 时,在页面载入时同时加载;@import 需要页面网页完全载入以后加载.</li><li>link 是 XHTML 标签,无兼容问题;@import 是在 CSS2.1 提出的,低版本的浏览器不支持.</li><li>link 支持使用 Javascript 控制 DOM 去改变样式;而@import 不支持.</li></ul><h2 id="_14、line-height" tabindex="-1">14、line-height <a class="header-anchor" href="#_14、line-height" aria-label="Permalink to &quot;14、line-height&quot;">​</a></h2><p>line-height 是相对于元素自身的字体大小来取值，但同时会被继承。</p><p>父元素: fontSize: 18px; lineHeight: 1.5em(27px，150% 同理); 它的 lineHeight 计算下来为 27px，会被子元素继承。</p><p>子元素: fontSize: 30px，子元素的 lineHeight 被继承为 27px，出现问题</p><p>某元素的 fontSize: 2rem; lineHeight: 1.5em; 此时 lineHeight 为多少像素？ fontSize = 2 _ 16 = 32px lineHeight = 1.5 _ 32 = 48px</p><h2 id="_15、vertical-align" tabindex="-1">15、vertical-align <a class="header-anchor" href="#_15、vertical-align" aria-label="Permalink to &quot;15、vertical-align&quot;">​</a></h2><p>只能应用于内联元素以及 display 值为 table-cell 的元素。在 css 中，有些 css 属性是会改变元素的 display 值的，例如 float 和 position: absolute，一旦设置了这两个属性之一，元素的 display 值就是变为 block，因此，vertical-align 也就失去了作用。</p><p>1.vertical-align 必须对子元素设置，不是对父元素设置 2.必须设置 line-height，不然不会起作用 3.vertical-align 只对 inline-block 元素有效</p><h2 id="_16、css-绘制一个三角形" tabindex="-1">16、CSS 绘制一个三角形 <a class="header-anchor" href="#_16、css-绘制一个三角形" aria-label="Permalink to &quot;16、CSS 绘制一个三角形&quot;">​</a></h2><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-top</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#A6ACCD;"> solid </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">ccc</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#A6ACCD;"> solid transparent</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-right</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#A6ACCD;"> solid transparent</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="_17、谷歌浏览器怎么设置小于-12px-的字体" tabindex="-1">17、谷歌浏览器怎么设置小于 12px 的字体 <a class="header-anchor" href="#_17、谷歌浏览器怎么设置小于-12px-的字体" aria-label="Permalink to &quot;17、谷歌浏览器怎么设置小于 12px 的字体&quot;">​</a></h2><ul><li>使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了<code>-webkit-text-size-adjust:none</code> ;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用。</li><li>使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75) ;收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...；</li><li>使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。</li></ul><h3 id="_1px-问题" tabindex="-1">1px 问题 <a class="header-anchor" href="#_1px-问题" aria-label="Permalink to &quot;1px 问题&quot;">​</a></h3><blockquote><p>设备像素(物理像素)、设备独立像素(逻辑像素)、CSS 像素</p></blockquote><p>设备像素比的概念（ <code>devicePixelRatio</code> 简称 dpr）。它用来描述屏幕物理像素与逻辑像素的比值。</p><p><strong>CSS 中的 1px 并不等于设备的 1px</strong></p><p>对于前端来说，在高清屏出现之前，前端代码的 <code>1px</code> 即等于手机物理像素点的 <code>1px</code>。但有了 dpr 的概念之后，由于前端代码中的使用的是 CSS 像素，手机会根据 dpr 换算成实际的物理像素大小来渲染页面。比如 iPhone6 的设备像素比 <code>dpr = 2</code> ，相当于一个 CSS 像素等于两个物理像素，即 <code>1px</code> 由 2 个物理像素点组成。</p><p>那么问题来了，以 iPhone6 为例，其 <code>dpr = 2</code>、屏幕尺寸(CSS 像素) 为 <code>375x667</code>，一般设计稿提供 2 倍图尺寸为 <code>750x1334</code> 。那么设计稿中的 <code>1px</code>，对应屏幕尺寸其实应该写成 <code>0.5px</code> 。再由 dpr 计算公式可知，<code>0.5 * 2 = 1px</code> 物理像素。</p><p><strong>其实设计稿本质上要实现的是 CSS 像素的 ！</strong></p><p>小数点像素 0.5px 的兼容性问题</p><p>PC 端浏览器的最小识别像素为 <code>1px</code>。</p><blockquote><p>简单来说，rem 布局实现移动端适配的思想是，由于 rem 单位是根据页面根元素的 <code>fontSize</code> 来计算的，那么将 <code>fontSize</code> 设置成屏幕宽度 <code>clientWidth</code> 与设计稿宽度 <code>750</code> 的比值，那么我们按照设计稿的尺寸来重构页面的时候，使用 rem 单位即自动乘以 <code>fontSize</code> 计算出了适配不同屏幕的尺寸。</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 以750设计稿为例，计算rem font-size</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> clientWidth </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">  document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">documentElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">clientWidth </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">clientWidth</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> ft </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (clientWidth </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">7.5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 设置页面根字号大小</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">documentElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">fontSize </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> ft </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">px</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h4 id="如何实现-1px-的效果" tabindex="-1">如何实现 1px 的效果？ <a class="header-anchor" href="#如何实现-1px-的效果" aria-label="Permalink to &quot;如何实现 1px 的效果？&quot;">​</a></h4><p>1px 问题指的是：在一些 <code>Retina屏幕</code> 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window.devicePixelRatio = 设备的物理像素 / CSS像素。</span></span></code></pre></div><p>打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 <code>devicePixelRatio</code> 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是 2</p><p>这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。</p><h4 id="思路一-直接写-0-5px" tabindex="-1">思路一：直接写 0.5px <a class="header-anchor" href="#思路一-直接写-0-5px" aria-label="Permalink to &quot;思路一：直接写 0.5px&quot;">​</a></h4><p>如果之前 1px 的样式这样写：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1px</span><span style="color:#A6ACCD;"> solid </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">333</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-device</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">window.devicePixelRatio</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">}}</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为 2 的情况：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">container</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-device</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.5px</span><span style="color:#A6ACCD;"> solid </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">333</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要 8 及以上的版本，安卓系统则直接不兼容。</p><h4 id="思路二-伪元素先放大后缩小" tabindex="-1">思路二：伪元素先放大后缩小 <a class="header-anchor" href="#思路二-伪元素先放大后缩小" aria-label="Permalink to &quot;思路二：伪元素先放大后缩小&quot;">​</a></h4><p>这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。</p><p>思路是**先放大、后缩小：****在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border 值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果。</p><p>代码如下：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">container</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-device</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> relative</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">container</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-device</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]::</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> absolute</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">top</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.5</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform-origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> left top</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">box-sizing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> border-box</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1px</span><span style="color:#A6ACCD;"> solid </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">333</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 通过伪元素实现*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">border</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">box-sizing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> border-box</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*/ / 为了与原元素等大 */</span></span>
<span class="line"><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> absolute</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">top</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1px</span><span style="color:#A6ACCD;"> solid gray</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.5</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform-origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*通过伪元素实现*/</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">line</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> absolute</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">top</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">left</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">b3b4b8</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.5</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform-origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*dpr适配可以这样写*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@media</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">-webkit-min-device-pixel-ratio</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">line</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    . . . </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.5</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">transform-origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@media</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">-webkit-min-device-pixel-ratio</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">line</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">after</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    . . . </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.333</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#B2CCD6;">transform-origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="思路三-viewport-缩放来解决" tabindex="-1">思路三：viewport 缩放来解决 <a class="header-anchor" href="#思路三-viewport-缩放来解决" aria-label="Permalink to &quot;思路三：viewport 缩放来解决&quot;">​</a></h4><p>这个思路就是对 meta 标签里几个关键属性下手：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">viewport</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">/&gt;</span></span></code></pre></div><p>这里针对像素比为 2 的页面，把整个页面缩放为了原来的 1/2 大小。这样，本来占用 2 个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scale </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">devicePixelRatio</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 这里 metaEl 指的是 meta 标签对应的 Dom</span></span>
<span class="line"><span style="color:#A6ACCD;">metaEl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setAttribute</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">width=device-width,user-scalable=no,initial-scale=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">scale</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,maximum-scale=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">scale</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,minimum-scale=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">scale</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。</p><h2 id="_18、css-实现自适应正方形、等宽高比矩形" tabindex="-1">18、CSS 实现自适应正方形、等宽高比矩形 <a class="header-anchor" href="#_18、css-实现自适应正方形、等宽高比矩形" aria-label="Permalink to &quot;18、CSS 实现自适应正方形、等宽高比矩形&quot;">​</a></h2><blockquote><ul><li>width 设置百分比</li><li>padding 撑高</li><li>如果只是要相对于 body 而言的话，还可以使用 vw 和 vh</li><li>伪元素设置 <code>margin-top: 100%</code>撑高</li></ul></blockquote><h3 id="双重嵌套-外层-relative-内层-absolute" tabindex="-1">双重嵌套，外层 relative，内层 absolute <a class="header-anchor" href="#双重嵌套-外层-relative-内层-absolute" aria-label="Permalink to &quot;双重嵌套，外层 relative，内层 absolute&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .outer {</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding-top: 50%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #ccc;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 50%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: relative;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner {</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        top: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        left: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;outer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;inner&quot;&gt;hello&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="padding-撑高画正方形" tabindex="-1">padding 撑高画正方形 <a class="header-anchor" href="#padding-撑高画正方形" aria-label="Permalink to &quot;padding 撑高画正方形&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .outer {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 400px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 600px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding-bottom: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: red;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;outer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;inner&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="相对于视口-vw-vh" tabindex="-1">相对于视口 VW VH <a class="header-anchor" href="#相对于视口-vw-vh" aria-label="Permalink to &quot;相对于视口 VW VH&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 1vw;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 1vw;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;outer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;inner&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="伪元素设置-margin-top" tabindex="-1">伪元素设置 margin-top <a class="header-anchor" href="#伪元素设置-margin-top" aria-label="Permalink to &quot;伪元素设置 margin-top&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner::after {</span></span>
<span class="line"><span style="color:#A6ACCD;">        content: &quot;&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-top: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: block;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;outer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;inner&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="http://www.fly63.com/article/detial/2104" target="_blank" rel="noreferrer">http://www.fly63.com/article/detial/2104</a></li></ul><h2 id="_19、问-实现两栏布局的方式" tabindex="-1">19、问：实现两栏布局的方式： <a class="header-anchor" href="#_19、问-实现两栏布局的方式" aria-label="Permalink to &quot;19、问：实现两栏布局的方式：&quot;">​</a></h2><h3 id="左-float-然后右-margin-left-右边自适应" tabindex="-1">左 float，然后右 margin-left（右边自适应） <a class="header-anchor" href="#左-float-然后右-margin-left-右边自适应" aria-label="Permalink to &quot;左 float，然后右 margin-left（右边自适应）&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .aside {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: yellow;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .main {</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: aqua;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;aside&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;main&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="右-float-margin-right" tabindex="-1">右 float，margin-right <a class="header-anchor" href="#右-float-margin-right" aria-label="Permalink to &quot;右 float，margin-right&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .aside {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: right;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: yellow;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .main {</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: aqua;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-right: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;aside&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;main&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="bfc-float" tabindex="-1">BFC + float <a class="header-anchor" href="#bfc-float" aria-label="Permalink to &quot;BFC + float&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .aside {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: yellow;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .main {</span></span>
<span class="line"><span style="color:#A6ACCD;">        overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: aqua;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;aside&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;main&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="float-负-margin" tabindex="-1">float + 负 margin <a class="header-anchor" href="#float-负-margin" aria-label="Permalink to &quot;float + 负 margin&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin-right: -200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">      float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;left&quot;&gt;&lt;p&gt;hello&lt;/p&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;right&quot;&gt;&lt;p&gt;world&lt;/p&gt;&lt;/div&gt;</span></span></code></pre></div><h3 id="圣杯布局实现两栏布局" tabindex="-1">圣杯布局实现两栏布局 <a class="header-anchor" href="#圣杯布局实现两栏布局" aria-label="Permalink to &quot;圣杯布局实现两栏布局&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      /* div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .box {</span></span>
<span class="line"><span style="color:#A6ACCD;">        overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding: 0 300px 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        border: 1px solid black;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      html,</span></span>
<span class="line"><span style="color:#A6ACCD;">      body {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 1 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: -300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;你好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;我好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="flex-实现两栏布局" tabindex="-1">flex 实现两栏布局 <a class="header-anchor" href="#flex-实现两栏布局" aria-label="Permalink to &quot;flex 实现两栏布局&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      /* div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .box {</span></span>
<span class="line"><span style="color:#A6ACCD;">        overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding: 0 300px 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        border: 1px solid black;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      html,</span></span>
<span class="line"><span style="color:#A6ACCD;">      body {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 1 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 0 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 1 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;你好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;我好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><p>参考链接：<a href="https://juejin.im/post/5e8d5268f265da480f0f9c6e#heading-8" target="_blank" rel="noreferrer">https://juejin.im/post/5e8d5268f265da480f0f9c6e#heading-8</a></p><h3 id="position-margin" tabindex="-1">position + margin <a class="header-anchor" href="#position-margin" aria-label="Permalink to &quot;position + margin&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      /* div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .box {</span></span>
<span class="line"><span style="color:#A6ACCD;">        overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      /* .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding: 0 300px 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        border: 1px solid black;</span></span>
<span class="line"><span style="color:#A6ACCD;">      } */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      html,</span></span>
<span class="line"><span style="color:#A6ACCD;">      body {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: relative;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 1 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;你好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;我好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h2 id="_20、实现三列布局的方式" tabindex="-1">20、实现三列布局的方式 <a class="header-anchor" href="#_20、实现三列布局的方式" aria-label="Permalink to &quot;20、实现三列布局的方式&quot;">​</a></h2><h3 id="position-margin-left-margin-right" tabindex="-1">position + margin-left + margin-right <a class="header-anchor" href="#position-margin-left-margin-right" aria-label="Permalink to &quot;position + margin-left + margin-right&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .box {</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: relative;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">        left: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        top: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: green;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">        right: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        top: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: red;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .middle {</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-right: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: black;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;box&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="通过-float-margin" tabindex="-1">通过 float + margin <a class="header-anchor" href="#通过-float-margin" aria-label="Permalink to &quot;通过 float + margin&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: green;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: right;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: red;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .middle {</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: 210px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-right: 210px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: black;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;box&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="圣杯布局" tabindex="-1">圣杯布局 <a class="header-anchor" href="#圣杯布局" aria-label="Permalink to &quot;圣杯布局&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding: 0 300px 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        border: 1px solid black;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: -100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: relative;</span></span>
<span class="line"><span style="color:#A6ACCD;">        left: -200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: -300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        position: relative;</span></span>
<span class="line"><span style="color:#A6ACCD;">        right: -300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;content&quot;&gt;中间内容&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;左侧区域&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;右侧区域&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="双飞翼布局" tabindex="-1">双飞翼布局 <a class="header-anchor" href="#双飞翼布局" aria-label="Permalink to &quot;双飞翼布局&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      html,</span></span>
<span class="line"><span style="color:#A6ACCD;">      body {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .main {</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .main .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-right: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: -100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">        float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">        margin-left: -300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;main&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;content&quot;&gt;hello world&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;left&quot;&gt;你好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;right&quot;&gt;王鹏浩&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="flex-布局" tabindex="-1">flex 布局 <a class="header-anchor" href="#flex-布局" aria-label="Permalink to &quot;flex 布局&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      html,</span></span>
<span class="line"><span style="color:#A6ACCD;">      body {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      div {</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .container {</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 1 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #f00;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .left {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 0 0 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #0f0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .right {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex: 0 0 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        order: 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: #00f;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;content&quot;&gt;hello world&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;left&quot;&gt;你好&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;right&quot;&gt;王鹏浩&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div><h3 id="参考链接-1" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接-1" aria-label="Permalink to &quot;参考链接&quot;">​</a></h3><ul><li><a href="https://segmentfault.com/a/1190000003942591" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000003942591</a></li><li><a href="https://blog.csdn.net/crystal6918/article/details/55224670" target="_blank" rel="noreferrer">https://blog.csdn.net/crystal6918/article/details/55224670</a></li><li><a href="https://blog.csdn.net/zhoulei1995/article/details/80161240" target="_blank" rel="noreferrer">https://blog.csdn.net/zhoulei1995/article/details/80161240</a></li></ul><h2 id="_21、居中" tabindex="-1">21、居中 <a class="header-anchor" href="#_21、居中" aria-label="Permalink to &quot;21、居中&quot;">​</a></h2><h2 id="_22、css-怎么画一个大小为父元素宽度一半的正方形" tabindex="-1">22、CSS 怎么画一个大小为父元素宽度一半的正方形？ <a class="header-anchor" href="#_22、css-怎么画一个大小为父元素宽度一半的正方形" aria-label="Permalink to &quot;22、CSS 怎么画一个大小为父元素宽度一半的正方形？&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      .outer {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 400px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 600px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: red;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      .inner {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 50%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        padding-bottom: 50%;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;outer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;inner&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div>`,156),c=[e];function i(r,C,A,y,D,d){return a(),n("div",null,c)}const u=s(t,[["render",i]]);export{g as __pageData,u as default};
