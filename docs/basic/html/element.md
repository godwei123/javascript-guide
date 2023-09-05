# html 元素

::: tip

常见元素将会简单介绍，非经常使用的元素内容请参考 MDN

:::

HTML 标签里的元素名不区分大小写。

HTML 所有元素：

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

## `a`

**HTML `<a>` 元素**（或称锚元素）可以通过它的 `href` 属性创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。`<a>` 中的内容**应该**应该指明链接的意图。如果存在 `href` 属性，当 `<a>` 元素聚焦时按下回车键就会激活它。

常见属性：

- `download`

  此属性指示浏览器下载 URL 而不是导航到它，因此将提示用户将其保存为本地文件。如果属性有一个值，那么此值将在下载保存过程中作为预填充的文件名（如果用户需要，仍然可以更改文件名）。此属性对允许的值没有限制，但是 / 和 \ 会被转换为下划线。大多数文件系统限制了文件名中的标点符号，故此，浏览器将相应地调整建议的文件名。

  - 此属性仅适用于同源 URL。
  - 尽管 HTTP URL 需要位于同一源中，但是可以使用 blob: URL 和 data: URL ，以方便用户下载使用 JavaScript 生成的内容（例如使用在线绘图 Web 应用程序创建的照片）。
  - 如果 HTTP 头中的 Content-Disposition 属性赋予了一个不同于此属性的文件名，HTTP 头属性优先于此属性。
  - 如果 HTTP 头属性 Content-Disposition 被设置为 inline（即 Content-Disposition='inline'），那么 Firefox 优先考虑 HTTP 头 Content-Dispositiondownload 属性。

- `href`

  包含超链接指向的 URL 或 URL 片段。URL 片段是哈希标记（#）前面的名称，哈希标记指定当前文档中的内部目标位置（HTML 元素的 ID）。URL 不限于基于 Web（HTTP）的文档，也可以使用浏览器支持的任何协议。例如，在大多数浏览器中正常工作的`file:`、`ftp:`和 `mailto:`。

  **备注：** 可以使用 href="#top" 或者 href="#" 链接返回到页面顶部。

- `target`

  该属性指定在何处显示链接的资源。取值为标签（tab），窗口（window），或框架（iframe）等浏览上下文的名称或其他关键词。以下关键字具有特殊的意义：

  - `_self`: 当前页面加载，即当前的响应到同一 HTML 4 frame（或 HTML5 浏览上下文）。此值是默认的，如果没有指定属性的话。
  - `_blank`: 新窗口打开，即到一个新的未命名的 HTML4 窗口或 HTML5 浏览器上下文
  - `_parent`: 加载响应到当前框架的 HTML4 父框架或当前的 HTML5 浏览上下文的父浏览上下文。如果没有 parent 框架或者浏览上下文，此选项的行为方式与 `_self` 相同。
  - `_top`: IHTML4 中：加载的响应成完整的，原来的窗口，取消所有其它 frame。HTML5 中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有 parent 框架或者浏览上下文，此选项的行为方式相同\_self

## `meta`

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
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
```

其中，`content` 参数有以下几种：

- `width` ：宽度(数值/device-width)
- `height` ：高度(数值/device-height)
- `initial-scale` ：初始缩放比例
- `maximum-scale` ：最大缩放比例
- `minimum-scale` ：最小缩放比例
- `user-scalable` ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。

```html
<!DOCTYPE html> H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang="”en”">
  标准的 lang 属性写法
  <meta charset="’utf-8′" />
  声明文档使用的字符编码
  <meta http-equiv="X-UA-Compatible" content="”IE" ="edge,chrome" ="1″" />
  优先使用 IE 最新版本和 Chrome
  <meta name="”description”" content="”不超过150个字符”" />
  页面描述
  <meta name="”keywords”" content="””" />
  页面关键词
  <meta name="”author”" content="”name," email@gmail.com” />
  网页作者
  <meta name="”robots”" content="”index,follow”" />
  搜索引擎抓取
  <meta
    name="”viewport”"
    content="”initial-scale"
    ="1,"
    maximum-scale="3,"
    minimum-scale="1,"
    user-scalable="no”"
  />
  为移动设备添加 viewport
  <meta name="”apple-mobile-web-app-title”" content="”标题”" />
  iOS 设备 begin
  <meta name="”apple-mobile-web-app-capable”" content="”yes”" />
  添加到主屏后的标题（iOS 6 新增） 是否启用 WebApp
  全屏模式，删除苹果默认的工具栏和菜单栏
  <meta
    name="”apple-itunes-app”"
    content="”app-id"
    ="myAppStoreID,"
    affiliate-data="myAffiliateData,"
    app-argument="myURL”"
  />
  添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
  <meta name="”apple-mobile-web-app-status-bar-style”" content="”black”" />
  <meta name="”format-detection”" content="”telphone" ="no," email="no”" />
  设置苹果工具栏颜色
  <meta name="”renderer”" content="”webkit”" />
  启用360浏览器的极速模式(webkit)
  <meta http-equiv="”X-UA-Compatible”" content="”IE" ="edge”" />
  避免IE使用兼容模式
  <meta http-equiv="”Cache-Control”" content="”no-siteapp”" />
  不让百度转码
  <meta name="”HandheldFriendly”" content="”true”" />
  针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
  <meta name="”MobileOptimized”" content="”320″" />
  微软的老式浏览器
  <meta name="”screen-orientation”" content="”portrait”" />
  uc强制竖屏
  <meta name="”x5-orientation”" content="”portrait”" />
  QQ强制竖屏
  <meta name="”full-screen”" content="”yes”" />
  UC强制全屏
  <meta name="”x5-fullscreen”" content="”true”" />
  QQ强制全屏
  <meta name="”browsermode”" content="”application”" />
  UC应用模式
  <meta name="”x5-page-mode”" content="”app”" />
  QQ应用模式
  <meta name="”msapplication-tap-highlight”" content="”no”" />
  windows phone 点击无高光 设置页面不缓存
  <meta http-equiv="pragma" content="”no-cache”" />
  <meta http-equiv="cache-control" content="”no-cache”" />
  <meta http-equiv="expires" content="”0″" />
</head>
```

## 块级元素

## 行内元素

## 常见行内元素和块级元素

常见行内元素：`span`、`a`、`img`、`input`

常见块级元素：`div`、`h1 ~ h6`、`p`、`ol`、`ul`、`li`
