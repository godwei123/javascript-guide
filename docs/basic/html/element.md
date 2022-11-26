# html 元素

HTML 标签里的元素名不区分大小写。也就是说，它们可以用大写，小写或混合形式书写。

标签：

```html
<a>
<abbr>
<address>
<area>
<article>
<aside>
<audio>
<b>
<base>
<bdi>
<bdo>
<blockquote>
<body>
<br>
<button>
<canvas>
<caption>
<cite>
<code>
<col>
<colgroup>
<data>
<datalist>
<dd>
<del>
<details>
<dfn>
<dialog>
<div>
<dl>
<dt>
<em>
<embed>
<fieldset>
<figcaption>
<figure>
<footer>
<form>
<h1>
<head>
<header>
<hgroup>
<hr>
<html>
<i>
<iframe>
<img>
<input>
<ins>
<kbd>
<label>
<legend>
<li>
<link>
<main>
<map>
<mark>
<menu>
<meta>
<meter>
<nav>
<noscript>
<object>
<ol>
<optgroup>
<option>
<output>
<p>
<picture>
<pre>
<progress>
<q>
<rp>
<rt>
<ruby>
<s>
<samp>
<script>
<section>
<select>
<slot>
<small>
<source>
<span>
<strong>
<style>
<sub>
<summary>
<sup>
<table>
<tbody>
<td>
<template>
<textarea>
<tfoot>
<th>
<thead>
<time>
<title>
<tr>
<track>
<u>
<ul>
<var>
<video>
<wbr>
```

## 常见元素

> html 中常见的元素

```html
<a> </a>
```

## 非常见元素

> 1

```html
<abbr></abbr>
```

## `abbr`

**HTML 缩写元素**（**`<abbr>`**）用于代表缩写，并且可以通过可选的 `title`属性提供完整的描述。若使用 `title` 属性，则它必须且仅可包含完整的描述内容。

当然，我们不是所有的缩写都要使用`<abbr>`标记。但是其在下面一些场景很有帮助：

- 当你想为缩写在文档流外提供一段扩展或定义的时候，为 `<abbr>` 设置一个合适的`title`。
- 在定义一个读者可能不太熟悉的缩写时，使用 `<abbr>` 和`title`属性或内联的文本来表现这个术语。
- 当文本中出现需要进行语义上的标注的缩写词时，`<abbr>`元素可用于依次将其作用样式和脚本。
- 可以将 `<abbr>` 与 `dfn` 配合使用来建立缩写或首字母缩略词的定义。

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
