# HTML 面试题

## 1、语义化标签理解

HTML 语义化是根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。通俗来讲就是用正确的标签做正确的事情。

**优点包括：**

- 为了在没有 CSS 的情况下，页面也能呈现出很好的内容结构、代码结构
- 有利于 SEO，和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息
- 方便其他设备解析以意义的方式来渲染网页；
- 便于团队开发和维护，语义化更具可读性，是下一步网页的重要动向，团队可以减少差异化。

**常见语义化标签:**

- header：定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- footer：定义文档或节的页脚（底部）；
- article：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；

## 2、defer & async

```html
<script defer src=""></script>
<script async src=""></script>
```

使用 async 属性和 defer 属性都可以异步加载外部的 JS 文件，不会阻塞 DOM 的解析。

**async** 表示应该立即开始下载脚本，但不能阻止其他页面动作。**加载好后立即执行**。多个带 async 属性的标签，**不能保证加载的顺序**。

**defer** 表示在文档解析和显示完成后再执行脚本是没有问题的。**html 解析完成之后才会立即执行代码**。多个带 defer 属性的标签，**按照顺序执行**。

## 3、DOCTYPE 的作用

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档。

[怪异模式和标准模式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)

## 4、src 与 href 的区别

src 用于替换当前元素，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。

```html
<script scr="index.js"></script>
```

href 用于在当前文档和引用资源之间确立联系。指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接。

```html
<link href="index.css" rel="stylesheet" />
```

那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。 这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式。

## 5、iframe

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

优点：

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

缺点：

- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## 6、target 属性

\_self: **当前页面加载**，即当前的响应到同一 HTML 4 frame（或 HTML5 浏览上下文）。此值是默认的，如果没有指定属性的话。

\_blank: **新窗口打开**，即到一个新的未命名的 HTML4 窗口或 HTML5 浏览器上下文

\_parent: 加载响应到当前框架的 HTML4 父框架或当前的 HTML5 浏览上下文的**父浏览上下文**。如果没有 parent 框架或者浏览上下文，此选项的行为方式与 \_self 相同。

\_top: HTML4 中：加载的响应成完整的，原来的窗口，取消所有其它 frame。 HTML5 中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有 parent 框架或者浏览上下文，此选项的行为方式相同\_self

## 7、HTML5 drag API

Drag Source 被拖放元素 / Drag Target 目标元素

- dragstart：事件主体是**被拖放元素**，在开始拖放被拖放元素时触发。🤔
- drag：事件主体是**被拖放元素**，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。🤔
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。🤔
- dragend：事件主体是**被拖放元素**，在整个拖放操作结束时触发。

> 记得要针对 `dragover` 取消预设行为（preventDefault），否則可能无法正确触发 drop 事件。

给需要拖拽的对象设置属性 draggable=“true”

## 8、可替换元素/空（void）元素

可替换元素 : 可替换元素是指元素内容的展现不是由 CSS 来控制的，而是外观渲染独立于 CSS 的外部对象。

**典型的可替换元素有**: `<img>、<iframe>、<video>、<embed>`

空元素：没有内容的 HTML 元素。常见的有：br、meta、hr、link、input、img

## 9、link 和 @import

1. link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。
2. link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。
3. link 无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
4. link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。

## 10、html5 更新

1、新增语义化标签：nav、header、footer、aside、section、article

2、媒体标签，音频、视频标签：audio、video

3、表单

(1) 表单类型

- email ：能够验证当前输入的邮箱地址是否合法
- url ： 验证 URL
- number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max 属性可以设置为最大值，min 可以设置为最小值，value 为默认值。
- search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
- range ： 可以提供给一个范围，其中可以设置 max 和 min 以及 value，其中 value 属性可以设置为默认值
- color ： 提供了一个颜色拾取器
- time ： 时分秒
- date ： 日期选择年月日
- datetime ： 时间和日期(目前只有 Safari 支持)
- datetime-local ：日期时间控件
- week ：周控件
- month：月控件

(2) 表单属性

- placeholder ：提示信息
- autofocus ：自动获取焦点
- autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：
  - 表单必须提交过
  - 必须有 name 属性。
- required：要求输入框不能为空，必须有值才能够提交。
- pattern=" " 里面写入想要的正则模式，例如手机号 patte="^(+86)?\d{10}$"
- multiple：可以选择多个文件或者多个邮箱
- form=" form 表单的 ID"

(3) 表单事件

- oninput 每当 input 里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。

4、进度条/度量器

progress 标签：用来表示任务的进度，max 用来表示任务的进度，value 表示已完成多少

5、DOM 查询

- document.querySelector()
- document.querySelectorAll()

6、web 存储

数据存储：localStorage、sessionStorage

7、其他

canvas（画布）、SVG、Geolocation（地理定位）、websocket（通信协议）

history API：go、forward、back、pushstate

拖放

8、移除的元素

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；

## 11、渐进增强和优雅降级

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
