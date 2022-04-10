# HTML

## 1、语义化标签理解

### 什么是 HTML 语义化？

根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。通俗来讲就是用正确的标签做正确的事情。

### 为什么要语义化？

-   为了在没有 CSS 的情况下，页面也能呈现出很好地内容结构、代码结构
-   有利于 SEO，和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息
-   方便其他设备解析以意义的方式来渲染网页；
-   便于团队开发和维护，语义化更具可读性，是下一步网页的重要动向，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

### 常见语义化标签

-   header：定义文档的页眉（头部）；
-   nav：定义导航链接的部分；
-   footer：定义文档或节的页脚（底部）；
-   article：定义文章内容；
-   section：定义文档中的节（section、区段）；
-   aside：定义其所处内容之外的内容（侧边）；

## 2、script - defer、async

```html
<script defer src="./index.js"></script>
<script async src="./index.js"></script>
```

使用 async 属性和 defer 属性都是去异步加载外部的 JS 文件，不会阻塞 DOM 的解析。

**async** 表示应该立即开始下载脚本，但不能阻止其他页面动作。加载好后立即执行。多个带 async 属性的标签，不能保证加载的顺序。

**defer** 表示在文档解析和显示完成后再执行脚本是没有问题的。html 解析完成之后才会立即执行代码。多个带 defer 属性的标签，按照顺序执行。

## 3、meta

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些`name`作为大家使用的共识，开发者还可以自定义 name。

常见的 meta 标签：

（1）`charset`，用来描述 HTML 文档的编码类型：

```html
<meta charset="UTF-8" />
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
```

其中，`content` 参数有以下几种：

-   `width viewport` ：宽度(数值/device-width)
-   `height viewport` ：高度(数值/device-height)
-   `initial-scale` ：初始缩放比例
-   `maximum-scale` ：最大缩放比例
-   `minimum-scale` ：最小缩放比例
-   `user-scalable` ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，`content` 参数有以下几种：

-   `all`：文件将被检索，且页面上的链接可以被查询；
-   `none`：文件将不被检索，且页面上的链接不可以被查询；
-   `index`：文件将被检索；
-   `follow`：页面上的链接可以被查询；
-   `noindex`：文件将不被检索；
-   `nofollow`：页面上的链接不可以被查询。

## 4、常见行内元素和块级元素

常见行内元素：`span`、`a`、`img`、`input`

常见块级元素：`div`、`h1 ~ h6`、`p`、`ol`、`ul`、`li`

## 5、渐进增强和优雅降级

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

## 6、DOCTYPE(文档类型) 的作用

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档。

## 7、src 与 href 的区别

src 用于替换当前元素

href 用于在当前文档和引用资源之间确立联系。

## 8、iframe

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

优点：

-   用来加载速度较慢的内容（如广告）
-   可以使脚本可以并行下载
-   可以实现跨子域通信

缺点：

-   iframe 会阻塞主页面的 onload 事件
-   无法被一些搜索引擎索识别
-   会产生很多页面，不容易管理

## 9、target

\_self: 当前页面加载，即当前的响应到同一 HTML 4 frame（或 HTML5 浏览上下文）。此值是默认的，如果没有指定属性的话。

\_blank: 新窗口打开，即到一个新的未命名的 HTML4 窗口或 HTML5 浏览器上下文

\_parent: 加载响应到当前框架的 HTML4 父框架或当前的 HTML5 浏览上下文的父浏览上下文。如果没有 parent 框架或者浏览上下文，此选项的行为方式与 \_self 相同。

\_top: HTML4 中：加载的响应成完整的，原来的窗口，取消所有其它 frame。 HTML5 中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有 parent 框架或者浏览上下文，此选项的行为方式相同\_self
