# HTML 属性

## defer & async

```html
<script defer src=""></script>
<script async src=""></script>
```

使用 async 属性和 defer 属性都可以异步加载外部的 JS 文件，不会阻塞 DOM 的解析。

**async** 表示应该立即开始下载脚本，但不能阻止其他页面动作。**加载好后立即执行**。多个带 async 属性的标签，**不能保证加载的顺序**。

**defer** 表示在文档解析和显示完成后再执行脚本是没有问题的。**html 解析完成之后才会立即执行代码**。多个带 defer 属性的标签，**按照顺序执行**。

## src 与 href 的区别

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

## target 属性

\_self: **当前页面加载**，即当前的响应到同一 HTML 4 frame（或 HTML5 浏览上下文）。此值是默认的，如果没有指定属性的话。

\_blank: **新窗口打开**，即到一个新的未命名的 HTML4 窗口或 HTML5 浏览器上下文

\_parent: 加载响应到当前框架的 HTML4 父框架或当前的 HTML5 浏览上下文的**父浏览上下文**。如果没有 parent 框架或者浏览上下文，此选项的行为方式与 \_self 相同。

\_top: HTML4 中：加载的响应成完整的，原来的窗口，取消所有其它 frame。 HTML5 中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有 parent 框架或者浏览上下文，此选项的行为方式相同\_self

## HTML5 drag API

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

## 可替换元素/空（void）元素

可替换元素 : 可替换元素是指元素内容的展现不是由 CSS 来控制的，而是外观渲染独立于 CSS 的外部对象。

**典型的可替换元素有**: `<img>、<iframe>、<video>、<embed>`

空元素：没有内容的 HTML 元素。常见的有：br、meta、hr、link、input、img

## link 和 @import

1. link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。
2. link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。
3. link 无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
4. link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。

## 渐进增强和优雅降级

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

## 附录

### 全局属性

| 属性      | 属性           | 属性      | 属性         | 属性            |
| --------- | -------------- | --------- | ------------ | --------------- |
| accesskey | autocapitalize | autofocus | class        | contenteditable |
| data-\*   | dir            | draggable | enterkeyhint | exportparts     |
| hidden    | id             | inert     | inputmode    | is              |
| itemid    | itemprop       | itemref   | itemscope    | itemtype        |
| lang      | nonce          | part      | slot         | spellcheck      |
| style     | tabindex       | title     | translate    |                 |

### 其他属性

| 属性          | 属性         | 属性    | 属性        | 属性     |
| ------------- | ------------ | ------- | ----------- | -------- |
| accept        | autocomplete | capture | crossorigin | disabled |
| elementtiming | for          | max     | maxlength   | min      |
| minlength     | multiple     | pattern | readonly    | rel      |
| required      | size         | step    |             |          |
