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

**async** 表示应该立即开始下载脚本，但不能阻止其他页面动作。**加载好后立即执行**。多个带 async 属性的标签，**不能保证加载的顺序**。

**defer** 表示在文档解析和显示完成后再执行脚本是没有问题的。**html 解析完成之后才会立即执行代码**。多个带 defer 属性的标签，**按照顺序执行**。

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

-   `width` ：宽度(数值/device-width)
-   `height` ：高度(数值/device-height)
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

## 10、html5 更新

1、语义化标签

新增语义化标签：nav、header、footer、aside、section、article

2、媒体标签

音频、视频标签：audio、video

3、表单

(1) 表单类型

-   email ：能够验证当前输入的邮箱地址是否合法
-   url ： 验证 URL
-   number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max 属性可以设置为最大值，min 可以设置为最小值，value 为默认值。
-   search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
-   range ： 可以提供给一个范围，其中可以设置 max 和 min 以及 value，其中 value 属性可以设置为默认值
-   color ： 提供了一个颜色拾取器
-   time ： 时分秒
-   date ： 日期选择年月日
-   datetime ： 时间和日期(目前只有 Safari 支持)
-   datetime-local ：日期时间控件
-   week ：周控件
-   month：月控件

(2) 表单属性

-   placeholder ：提示信息
-   autofocus ：自动获取焦点
-   autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：
    -   表单必须提交过
    -   必须有 name 属性。
-   required：要求输入框不能为空，必须有值才能够提交。
-   pattern=" " 里面写入想要的正则模式，例如手机号 patte="^(+86)?\d{10}$"
-   multiple：可以选择多个文件或者多个邮箱
-   form=" form 表单的 ID"

(3) 表单事件

-   oninput 每当 input 里的输入框内容发生变化都会触发此事件。
-   oninvalid 当验证不通过时触发此事件。

4、进度条/度量器

progress 标签：用来表示任务的进度，max 用来表示任务的进度，value 表示已完成多少

5、DOM 查询

-   document.querySelector()
-   document.querySelectorAll()

6、web 存储

数据存储：localStorage、sessionStorage

7、其他

canvas（画布）、SVG、Geolocation（地理定位）、websocket（通信协议）

history API：go、forward、back、pushstate

拖放

8、移除的元素

-   纯表现的元素：basefont，big，center，font, s，strike，tt，u;
-   对可用性产生负面影响的元素：frame，frameset，noframes；

## 11、web worker 理解

::: warning
详情查看 MDN 文档
:::

在 worker 线程中你可以运行任何你喜欢的代码，不过有一些例外情况。比如：在 worker 内，不能直接操作 DOM 节点，也不能使用 window 对象的默认方法和属性。然而你可以使用大量 window 对象之下的东西，包括 WebSockets，IndexedDB 以及 FireFox OS 专用的 Data Store API 等数据存储机制。

Worker 线程可以使用 navigator，location,XMLHttpRequest。除此之外，Worker 线程不能执行 alert()、confirm()等方法.

workers 和主线程间的数据传递通过这样的消息机制进行——双方都使用 postMessage()方法发送各自的消息，使用 onmessage 事件处理函数来响应消息。**这个过程中数据并不是被共享而是被复制。**

只要运行在同源的父页面中，workers 可以依次生成新的 workers；并且可以使用 XMLHttpRequest 进行网络 I/O，但是 XMLHttpRequest 的 responseXML 和 channel 属性总会返回 null。

共享 worker:一个共享 worker 可以被多个脚本使用——即使这些脚本正在被不同的 window、iframe 或者 worker 访问。

`var myWorker = new SharedWorker('worker.js');`

一个非常大的区别在于，与一个共享 worker 通信必须通过端口对象,一个确切的打开的端口供脚本与 worker 通信（在专用 worker 中这一部分是隐式进行的）。

在传递消息之前，**端口连接必须被显式的打开**，打开方式是使用 onmessage 事件处理函数或者 start()方法。

start()方法的调用只在一种情况下需要，那就是消息事件被 addEventListener() 方法使用。

在使用 start()方法打开端口连接时，如果父级线程和 worker 线程需要双向通信，那么它们都需要调用 start()方法。

```js
myWorker.port.start(); // 父级线程中的调用
port.start(); // worker线程中的调用, 假设port变量代表一个端口
```

专用 worker 例子

```html
<body>
    <h1>使用web worker 排序,输入数据，空格分隔</h1>
    <textarea name="" id="content" cols="30" rows="10"></textarea>
    <button id="btn">排序</button>
    <p id="result"></p>
</body>
<script src="./index.js"></script>
<script src="./worker.js"></script>
```

```js
// index.js
const worker = new Worker('worker.js');
const content = document.getElementById('content');
const result = document.getElementById('result');
worker.onmessage = function (e) {
    console.log('myworker', e.data);
    result.innerText = JSON.stringify(e.data);
};

document.getElementById('btn').addEventListener('click', () => {
    let arr = content.value
        .split(' ')
        .filter(item => item !== '')
        .map(it => parseInt(it));
    console.log(arr);
    worker.postMessage(arr);
});
```

```js
// worker.js
onmessage = function (e) {
    console.log(e);
    let res = e.data.sort((a, b) => b - a);
    postMessage(res);
};
```

Worker 接口会生成真正的操作系统级别的线程，如果你不太小心，那么并发会对你的代码产生有趣的影响。然而，对于 web worker 来说，与其他线程的通信点会被很小心的控制，这意味着你很难引起并发问题。你没有办法去访问非线程安全的组件或者是 DOM，此外你还需要通过序列化对象来与线程交互特定的数据。所以你要是不费点劲儿，还真搞不出错误来。

有别于创建它的 document 对象，worker 有它自己的执行上下文。因此普遍来说，worker 并不受限于创建它的 document（或者父级 worker）的内容安全策略。

为了给 worker 指定内容安全策略，必须为发送 worker 代码的请求本身加上一个 内容安全策略。可以为 Worker 脚本的请求的响应的头部设置 CSP 策略。

有一个例外情况，即 worker 脚本的源如果是一个全局性的唯一的标识符（例如，它的 URL 指定了数据模式或者 blob），worker 则会继承创建它的 document 或者 worker 的 CSP（Content security policy 内容安全策略）。

worker 线程中加载脚本的 api：

importScripts('script1.js') // 加载单个脚本

importScripts('script1.js', 'script2.js') // 加载多个脚本

## 12、HTML5 drag API

Drag Source 被拖放元素 / Drag Target 目标元素

-   dragstart：事件主体是***被拖放元素***，在开始拖放被拖放元素时触发。🤔
-   drag：事件主体是***被拖放元素***，在正在拖放被拖放元素时触发。
-   dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
-   dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。🤔
-   dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
-   drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。🤔
-   dragend：事件主体是***被拖放元素***，在整个拖放操作结束时触发。

> 記得要針對 `dragover` 取消预设行为（preventDefault），否則可能無法正確觸發 drop 事件。

给需要拖拽的对象设置属性 draggable=“true”



```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            body {
                display: flex;
                justify-content: center;
            }
            #left,
            #right {
                width: 300px;
                border: 1px solid #aaa;
                box-sizing: border-box;
                padding: 10px;
            }
            #left {
                margin-right: 40px;
            }
            .item {
                width: 100%;
                border-radius: 10px;
                padding: 5px 10px;
                box-sizing: border-box;
                box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
                margin-bottom: 10px;
                background: #6ca4f7;
            }
            .item div {
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <div id="left"></div>
        <div id="right">
            <div class="item" draggable="true">
                <div>item</div>
                <p>cdscdcjdbcdjj</p>
            </div>
            <div class="item" draggable="true">
                <div>item</div>
                <p>cdscdcjdbcdjj</p>
            </div>
            <div class="item" draggable="true">
                <div>item</div>
                <p>cdscdcjdbcdjj</p>
            </div>
            <div class="item" draggable="true">
                <div>item</div>
                <p>cdscdcjdbcdjj</p>
            </div>
            <div class="item" draggable="true">
                <div>item</div>
                <p>cdscdcjdbcdjj</p>
            </div>
        </div>
    </body>
    <script>
        let dragged;
        let enterLeft = false;
        const left = document.getElementById('left');
        const right = document.getElementById('right');
        left.addEventListener('dragenter', e => {
            e.preventDefault();
            console.log('dragenter');
            enterLeft = true;
            left.appendChild(dragged);
        });
        left.addEventListener('dragleave', e => {
            console.log('dragleave');
        });
        right.addEventListener('drag', e => {
            e.preventDefault();
        });
        right.addEventListener('dragend', e => {
            e.preventDefault();
        });

        left.addEventListener('dragstart', e => {
            dragged = e.target;
        });
        right.addEventListener('dragstart', e => {
            dragged = e.target;
        });
        right.addEventListener('dragenter', e => {
            e.preventDefault();
            right.appendChild(dragged);
        });
    </script>
</html>
```





## 13、可替换元素/空（void）元素

可替换元素 : 可替换元素是指元素内容的展现不是由 CSS 来控制的，而是外观渲染独立于 CSS 的外部对象。

**典型的可替换元素有**:  `<img>、<iframe>、<video>、<embed>`



空元素：没有内容的HTML元素

常见的有：br、meta、hr、link、input、img



