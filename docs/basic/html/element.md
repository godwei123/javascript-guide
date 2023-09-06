# html 标签

::: tip

HTML 的标签很多，只需要知道标签的作用和常见使用场景，大部分的标签很少使用，使用时参考 MDN。

HTML 标签里的元素名不区分大小写。
:::

## 块级元素

1. 独占一行：块级元素通常会自动开始一个新的行（换行），因此它们会占据页面上的独立水平空间，不允许其他元素与其并排放置。

2. 默认宽度是 100%：块级元素的默认宽度会自动填满其父元素的宽度，使其在父元素内部占据全部水平空间。

3. 可以包含内联元素和其他块级元素：块级元素可以包含内联元素和其他块级元素，从而创建复杂的页面结构。

4. 通过 CSS 样式可以改变块级元素的外观、大小、颜色等属性，从而实现各种不同的布局和设计效果。

常见块级元素：`div`、`h1 ~ h6`、`p`、`ol`、`ul`、`li`

## 行内元素

1. 行内元素通常不会包含块级元素，但可以包含其他行内元素或文本。

2. 与块级元素不同，行内元素的大小和位置受到其内容的影响，它们不会自动填满水平空间，而是根据内容的大小进行调整。

常见行内元素：`span`、`a`、`img`、`input`、`button`

## 语义化标签

语义化标签（Semantic HTML Elements）是指在 HTML 文档中使用具有明确含义和语义的 HTML 元素，以描述其内容的结构和含义。使用语义化标签可以使 HTML 文档更易于理解、维护和访问，同时有助于搜索引擎优化（SEO）和可访问性。以下是一些常见的语义化标签及其用途：

1. `<header>`：用于定义文档或区域的页眉，通常包含站点的标题、导航链接和其他页眉内容。

2. `<nav>`：表示导航部分，通常包含网站的主要导航链接。

3. `<main>`：标识文档的主要内容，每个文档应该只有一个`<main>`元素。

4. `<article>`：用于表示一个独立的、可独立分配的内容块，例如一篇新闻文章、博客帖子或论坛帖子。

5. `<section>`：用于将文档分成不同的部分，通常包含相关的内容块，并可嵌套使用。

6. `<aside>`：表示一个与周围内容关联但可以独立于主要内容的辅助性内容块，如侧边栏。

7. `<footer>`：用于定义文档或区域的页脚，通常包含版权信息、联系信息和其他页脚内容。

8. `<figure>`：用于包含与文本相关的图像、图表、照片等媒体内容，并通常与`<figcaption>`一起使用来提供相关说明。

9. `<figcaption>`：与`<figure>`元素一起使用，用于提供与图像或媒体内容相关的说明或标题。

10. `<time>`：用于表示日期、时间或时间范围，并具有机器可读的日期时间值。

11. `<mark>`：表示需要突出显示或高亮的文本片段。

12. `<abbr>`：用于表示缩写或首字母缩写，可以提供完整的含义作为属性。

使用语义化标签有助于改善网页的可读性，使代码更易于维护，同时也有助于搜索引擎理解和索引网页内容，提高网站的可访问性，使其更容易被屏幕阅读器等辅助技术解释。因此，推荐在创建 HTML 文档时尽可能使用语义化标签来描述内容的结构和含义。

## iframe

`<iframe>`（内联框架）是 HTML 元素，用于在网页中嵌套另一个独立的 HTML 文档或外部资源。`<iframe>`元素允许你在当前页面中创建一个独立的内联框架，以显示其他网页或内容，而无需用户离开当前页面。

```html
<iframe src="URL" width="width" height="height"></iframe>
```

1. src：指定要嵌套的外部资源的 URL。这是必需的属性，它定义了要在框架中显示的内容。

2. width 和 height：定义了框架的宽度和高度，通常以像素为单位。你可以根据需要调整这些值来设置框架的大小。

## `a`标签

**HTML `<a>` 元素**（或称锚元素）可以通过它的 `href` 属性创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。

常见属性：

- `download` 此属性指示浏览器下载 URL，因此将提示用户将其保存为本地文件。如果属性有一个值，那么此值将在下载保存过程中作为预填充的文件名。
- `href` 包含超链接指向的 URL 或 URL 片段或浏览器支持的任何协议（如`file:`,`ftp:`, `mailto:`）。**备注：** 可以使用 `href="#top"` 或者 `href="#"` 链接返回到页面顶部。
- `target` 该属性指定在何处显示链接的资源。
  - `_self`: 当前页面加载。此值是默认的，如果没有指定属性的话。
  - `_blank`: 新窗口打开。
  - `_parent`: 加载响应到当前的浏览上下文的父浏览上下文。如果没有浏览上下文，此选项的行为方式与 `_self` 相同。
  - `_top`: 加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有，此选项的行为方式相同`_self`

## `meta`

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些`name`作为大家使用的共识，开发者还可以自定义 name。

常见的 meta 标签：

(1)`charset`，用来描述 HTML 文档的编码类型

(2)`keywords`，页面关键词

(3)`description`，页面描述

(4)`refresh`，页面重定向和刷新

(5)`viewport`，适配移动端，可以控制视口的大小和比例。其中，`content` 参数有以下几种

```text
width ：宽度(数值/device-width)
height ：高度(数值/device-height)
initial-scale ：初始缩放比例
maximum-scale ：最大缩放比例
minimum-scale ：最小缩放比例
user-scalable ：是否允许用户缩放(yes/no）
```

(6) 搜索引擎索引方式： 其中，`content` 参数有以下几种

```text
- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。
```

(7) 其他

```html
<!DOCTYPE html> H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang="en">
  标准的 lang 属性写法
  <meta charset="utf-8" />
  声明文档使用的字符编码
  <meta http-equiv="X-UA-Compatible" content="IE" ="edge,chrome" ="1" />
  优先使用 IE 最新版本和 Chrome
  <meta name="description" content="不超过150个字符" />
  页面描述
  <meta name="keywords" content="" />
  页面关键词
  <meta http-equiv="refresh" content="0;url=" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1"
  />
  <meta name="robots" content="index,follow" />
  <meta name="author" content="name," email@gmail.com />
  网页作者
  <meta name="robots" content="index,follow" />
  搜索引擎抓取
  <meta
    name="viewport"
    content="initial-scale"
    ="1,"
    maximum-scale="3,"
    minimum-scale="1,"
    user-scalable="no"
  />
  为移动设备添加 viewport
  <meta name="apple-mobile-web-app-title" content="标题" />
  iOS 设备 begin
  <meta name="apple-mobile-web-app-capable" content="yes" />
  添加到主屏后的标题（iOS 6 新增） 是否启用 WebApp
  全屏模式，删除苹果默认的工具栏和菜单栏
  <meta
    name="apple-itunes-app"
    content="app-id"
    ="myAppStoreID,"
    affiliate-data="myAffiliateData,"
    app-argument="myURL"
  />
  添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telphone" ="no," email="no" />
  设置苹果工具栏颜色
  <meta name="renderer" content="webkit" />
  启用360浏览器的极速模式(webkit)
  <meta http-equiv="X-UA-Compatible" content="IE" ="edge" />
  避免IE使用兼容模式
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  不让百度转码
  <meta name="HandheldFriendly" content="true" />
  针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
  <meta name="MobileOptimized" content="320" />
  微软的老式浏览器
  <meta name="screen-orientation" content="portrait" />
  uc强制竖屏
  <meta name="x5-orientation" content="portrait" />
  QQ强制竖屏
  <meta name="full-screen" content="yes" />
  UC强制全屏
  <meta name="x5-fullscreen" content="true" />
  QQ强制全屏
  <meta name="browsermode" content="application" />
  UC应用模式
  <meta name="x5-page-mode" content="app" />
  QQ应用模式
  <meta name="msapplication-tap-highlight" content="no" />
  windows phone 点击无高光 设置页面不缓存
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
</head>
```

## 附录

| Element      | Element        | Element      | Element      | Element        |
| ------------ | -------------- | ------------ | ------------ | -------------- |
| `<a>`        | `<abbr>`       | `<address>`  | `<area>`     | `<article>`    |
| `<aside>`    | `<audio>`      | `<b>`        | `<base>`     | `<bdi>`        |
| `<bdo>`      | `<blockquote>` | `<body>`     | `<br>`       | `<button>`     |
| `<canvas>`   | `<caption>`    | `<cite>`     | `<code>`     | `<col>`        |
| `<colgroup>` | `<data>`       | `<datalist>` | `<dd>`       | `<del>`        |
| `<details>`  | `<dfn>`        | `<dialog>`   | `<div>`      | `<dl>`         |
| `<dt>`       | `<em>`         | `<embed>`    | `<fieldset>` | `<figcaption>` |
| `<figure>`   | `<footer>`     | `<form>`     | `<h1>`       | `<head>`       |
| `<header>`   | `<hgroup>`     | `<hr>`       | `<html>`     | `<i>`          |
| `<iframe>`   | `<img>`        | `<input>`    | `<ins>`      | `<kbd>`        |
| `<label>`    | `<legend>`     | `<li>`       | `<link>`     | `<main>`       |
| `<map>`      | `<mark>`       | `<menu>`     | `<meta>`     | `<meter>`      |
| `<index>`    | `<noscript>`   | `<object>`   | `<ol>`       | `<optgroup>`   |
| `<option>`   | `<output>`     | `<p>`        | `<picture>`  | `<pre>`        |
| `<progress>` | `<q>`          | `<rp>`       | `<rt>`       | `<ruby>`       |
| `<s>`        | `<samp>`       | `<script>`   | `<section>`  | `<select>`     |
| `<slot>`     | `<small>`      | `<source>`   | `<span>`     | `<strong>`     |
| `<style>`    | `<sub>`        | `<summary>`  | `<sup>`      | `<table>`      |
| `<tbody>`    | `<td>`         | `<template>` | `<textarea>` | `<tfoot>`      |
| `<th>`       | `<thead>`      | `<time>`     | `<title>`    | `<tr>`         |
| `<track>`    | `<u>`          | `<ul>`       | `<var>`      | `<video>`      |
| `<wbr>`      |                |              |              |                |
