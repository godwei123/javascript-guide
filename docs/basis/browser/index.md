::: tip
前端面试中常见浏览器相关内容
:::

## 1、回流和重绘

### 回流

窗口尺寸被修改，发生滚动操作，或者是元素的尺寸或位置相关属性被更新时会触发布局过程，在布局过程中需要重新计算所有元素的位置信息。

下面这些操作会导致回流：

- 页面的首次渲染
- 浏览器的窗口大小发生变化
- 元素的内容发生变化，比如用户在 input 框中输入文字, CSS3 动画等
- 元素的尺寸或者位置发生变化
- 元素的字体大小发生变化
- 激活 CSS 伪类，:hover
- 查询某些属性或者调用某些方法

```js
offsetTop /
  offsetLeft /
  offsetWidth /
  offsetHeight /
  scrollTop /
  scrollLeft /
  scrollWidth /
  scrollHeight /
  clientTop /
  clientLeft /
  clientHeight /
  getComputedStyle() /
  currentStyle();
```

- 添加或者删除可见的 DOM 元素

### 重绘

当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是重绘。

下面这些操作会导致重绘：

- color、background 相关属性：background-color、background-image 等
- outline 相关属性：outline-color、outline-width 、text-decoration
- border-radius、visibility、box-shadow

注意： 当触发回流时，一定会触发重绘，但是重绘不一定会引发回流。

opacity：opacity 在 0 和 1 的变化中会引起 render 层的生成和销毁，因此会引发一次回流，从而引发重绘。如果 opacity 在 0-0.9 间变化则只会引发重绘。

### 优化

- 如果想设定元素的样式，通过改变元素的 class 类名 (尽可能在 DOM 树的最里层)
- 避免设置多项内联样式
- 应用元素的动画，使用 position 属性的 fixed 值或 absolute 值
- 避免使用 table 布局，table 中每个元素的大小以及内容的改动，都会导致整个 table 的重新计算
- 对于那些复杂的动画，对其设置 position: fixed/absolute，尽可能地使元素脱离文档流，从而减少对其他元素的影响
- 使用 css3 硬件加速，可以让 transform、opacity、filters 这些动画不会引起回流重绘
- 避免使用 CSS 的 JavaScript 表达式
- 在使用 JavaScript 动态插入多个节点时, 可以使用 DocumentFragment. 创建后一次插入. 就能避免多次的渲染性能

但有时候，我们会无可避免地进行回流或者重绘，我们可以更好使用它们

- 待计算完毕再提交给浏览器发出重计算请求,避免多次调用 offset 等属性
- 避免多次 DOM 改变样式，使用类名去合并样式
- 通过设置元素属性 display: none，将其从页面上去掉，然后再进行后续操作，这些后续操作也不会触发回流与重绘，这个过程称为离线操作

## 2、浏览器同源策略

同源策略限制了从同一个源加载的文档或脚本如何与另一个源的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的重要的安全机制。同源指的是：协议、端口号、域名必须一致。

同源策略：协议、域名和端口都相同

同源政策主要限制了三个方面：

- 当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。
- 当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。
- 当前域下 ajax 无法发送跨域请求。

## 3、跨域

跨域问题是浏览器的同源策略引起的。

## 4、跨域解决方法

### 4.1 CORS 解决跨域及原理

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin (domain)上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

CORS 需要浏览器和服务器同时支持，整个 CORS 过程都是浏览器完成的，无需用户参与。因此实现 CORS 的关键就是服务器，只要服务器实现了 CORS 请求，就可以跨源通信了。

浏览器将 CORS 分为简单请求和非简单请求：简单请求不会触发 CORS 预检请求。

满足一下两个条件的请求就是简单请求，否则属于非简单请求：

（1）请求方法为 GET、POST、HEAD

（2）HTTP 的头信息不超过以下几种字段

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type 为 application/x-www-form-urlencoded、multipart/form-data、text/plain

简单请求过程

对于简单请求，浏览器会直接发出 CORS 请求，它会在请求的头信息中增加一个 Orign 字段，该字段用来说明本次请求来自哪个源（协议+端口+域名），服务器会根据这个值来决定是否同意这次请求。如果 Orign 指定的域名在许可范围之内，服务器返回的响应就会多出以下信息头：

```js
Access-Control-Allow-Origin: http://api.bob.com // 和 Orign 一致
Access-Control-Allow-Credentials: true // 表示是否允许发送 Cookie
Access-Control-Expose-Headers: FooBar // 指定返回其他字段的值
Content-Type: text/html; charset=utf-8 // 表示文档类型
```

如果 Orign 指定的域名不在许可范围之内，服务器会返回一个正常的 HTTP 回应，浏览器发现没有上面的 Access-Control-Allow-Origin 头部信息，就知道出错了。这个错误无法通过状态码识别，因为返回的状态码可能是 200。

在简单请求中，在服务器内，至少需要设置字段：Access-Control-Allow-Origin

非简单请求过程

非简单请求是对服务器有特殊要求的请求，比如请求方法为 DELETE 或者 PUT 等。非简单请求的 CORS 请求会在正式通信之前进行一次 HTTP 查询请求，称为预检请求。

浏览器会询问服务器，当前所在的网页是否在服务器允许访问的范围内，以及可以使用哪些 HTTP 请求方式和头信息字段，只有得到肯定的回复，才会进行正式的 HTTP 请求，否则就会报错。

预检请求使用的请求方法是 OPTIONS，表示这个请求是来询问的。他的头信息中的关键字段是 Orign，表示请求来自哪个源。除此之外，头信息中还包括两个字段：

- Access-Control-Request-Method：该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法。
- Access-Control-Request-Headers： 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段。

服务器在收到浏览器的预检请求之后，会根据头信息的三个字段来进行判断，如果返回的头信息在中有 Access-Control-Allow-Origin 这个字段就是允许跨域请求，如果没有，就是不同意这个预检请求，就会报错。

服务器回应的 CORS 的字段如下：

```js
Access-Control-Allow-Origin: http://api.bob.com // 允许跨域的源地址
Access-Control-Allow-Methods: GET, POST, PUT // 服务器支持的所有跨域请求的方法
Access-Control-Allow-Headers: X-Custom-Header // 服务器支持的所有头信息字段
Access-Control-Allow-Credentials: true // 表示是否允许发送 Cookie
Access-Control-Max-Age: 1728000 // 用来指定本次预检请求的有效期，单位为秒
Access-Control-Expose-Headers   // 允许返回的头
```

只要服务器通过了预检请求，在以后每次的 CORS 请求都会自带一个 Origin 头信息字段。服务器的回应，也都会有一个 Access-Control-Allow-Origin 头信息字段。

在非简单请求中，至少需要设置以下字段：

```js
"Access-Control-Allow-Origin";
"Access-Control-Allow-Methods";
"Access-Control-Allow-Headers";
```

减少 OPTIONS 请求次数：

OPTIONS 请求次数过多就会损耗页面加载的性能，降低用户体验度。所以尽量要减少 OPTIONS 请求次数，可以后端在请求的返回头部添加：Access-Control-Max-Age：number。它表示预检请求的返回结果可以被缓存多久，单位是秒。该字段只对完全一样的 URL 的缓存设置生效，所以设置了缓存时间，在这个时间范围内，再次发送请求就不需要进行预检请求了。

CORS 中 Cookie 相关问题：
在 CORS 请求中，如果想要传递 Cookie，就要满足以下三个条件：

- 在请求中设置 withCredentials。默认情况下在跨域请求，浏览器是不带 cookie 的。但是我们可以通过设置 withCredentials 来进行传递 cookie.

```js
// 原生 xml 的设置方式
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
// axios 设置方式
axios.defaults.withCredentials = true;
```

- Access-Control-Allow-Credentials 设置为 true
- Access-Control-Allow-Origin 设置为非 \*

### 4.2 JSONP 解决跨域及原理

jsonp 的原理就是利用\<script>标签没有跨域限制，通过\<script>标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到 callback 函数中，返回给浏览器，浏览器解析执行，从而前端拿到 callback 函数返回的数据。

JSONP 返回数据格式可以是 object/string/number 等

```js
var script = document.createElement("script");
script.type = "text/javascript";
// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src = "http://www.xxx.com/login?user=admin&callback=handleCallback";
document.head.appendChild(script);
// 回调执行函数
function handleCallback(res) {
  alert(JSON.stringify(res));
}

// axois
this.$http = axios;
this.$http
  .jsonp("http://www.xxx.com/login", {
    params: {},
    jsonp: "handleCallback",
  })
  .then((res) => {
    console.log(res);
  });
```

JSONP 的缺点：

- 具有局限性，仅支持 get 方法
- 不安全，可能会遭受 XSS 攻击

### 4.3 postMessage 跨域

### 4.4 nginx 代理跨域/nodejs 中间件代理跨域

实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。

代理服务器，需要做以下几个步骤：

接受客户端请求 。
将请求 转发给服务器。
拿到服务器 响应 数据。
将 响应 转发给客户端。

nginx 配置

```
server {
    listen  81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

### 4.5 其他

- websocket
- iframe

## 8、正向代理和反向代理

- 正向代理：

客户端想获得一个服务器的数据，但是因为种种原因无法直接获取。于是客户端设置了一个代理服务器，并且指定目标服务器，之后代理服务器向目标服务器转交请求并将获得的内容发送给客户端。这样本质上起到了对真实服务器隐藏真实客户端的目的。实现正向代理需要修改客户端，比如修改浏览器配置。

- 反向代理：

服务器为了能够将工作负载分不到多个服务器来提高网站性能 (负载均衡)等目的，当其受到请求后，会首先根据转发规则来确定请求应该被转发到哪个服务器上，然后将请求转发到对应的真实服务器上。这样本质上起到了对客户端隐藏真实服务器的作用。

一般使用反向代理后，需要通过修改 DNS 让域名解析到代理服务器 IP，这时浏览器无法察觉到真正服务器的存在，当然也就不需要修改配置了。

## 9、本地存储

### Cookie

Cookie 是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否是同一用户发起的，为解决这个问题，Cookie 就出现了。

Cookie 的大小只有 4kb，它是一种纯文本文件，每次发起 HTTP 请求都会携带 Cookie。

Cookie 的特性：

- Cookie 一旦创建成功，名称就无法修改
- Cookie 是无法跨域名的，这也是由 Cookie 的隐私安全性决定的，这样就能够阻止非法获取其他网站的 Cookie
- 每个域名下 Cookie 的数量不能超过 20 个，每个 Cookie 的大小不能超过 4kb
- 有安全问题，如果 Cookie 被拦截了，那就可获得 session 的所有信息，即使加密也于事无补，无需知道 cookie 的意义，只要转发 cookie 就能达到目的
- Cookie 在请求一个新的页面的时候都会被发送过去

如果需要域名之间跨域共享 Cookie，有两种方法：

1. 使用 Nginx 反向代理
2. 在一个站点登陆之后，往其他网站写 Cookie。服务端的 Session 存储到一个节点，Cookie 存储 sessionId

Cookie 的使用场景：

- 最常见的使用场景就是 Cookie 和 session 结合使用，我们将 sessionId 存储到 Cookie 中，每次发请求都会携带这个 sessionId，这样服务端就知道是谁发起的请求，从而响应相应的信息。
- 可以用来统计页面的点击次数

### localStorage

LocalStorage 是 HTML5 新引入的特性

LocalStorage 的优点：

- 在大小方面，LocalStorage 的大小一般为 5MB，可以储存更多的信息
- LocalStorage 是持久储存，并不会随着页面的关闭而消失，除非主动清理，不然会永久存在
- 仅储存在本地，不像 Cookie 那样每次 HTTP 请求都会被携带

LocalStorage 的缺点：

- 存在浏览器兼容问题，IE8 以下版本的浏览器不支持
- 如果浏览器设置为隐私模式，那我们将无法读取到 LocalStorage
- LocalStorage 受到同源策略的限制，即端口、协议、主机地址有任何一个不相同，都不会访问

LocalStorage 的 API：

```js
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();
localStorage.key(index);
```

LocalStorage 的使用场景：

- 有些网站有换肤的功能，这时候就可以将换肤的信息存储在本地的 LocalStorage 中，当需要换肤的时候，直接操作 LocalStorage 即可
- 在网站中的用户浏览信息也会存储在 LocalStorage 中，还有网站的一些不常变动的个人信息等也可以存储在本地的 LocalStorage 中

### sessionStorage

SessionStorage 是在 HTML5 才提出来的存储方案，SessionStorage 主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据。

SessionStorage 与 LocalStorage 对比：

- SessionStorage 和 LocalStorage 都在本地进行数据存储；
- SessionStorage 也有同源策略的限制，但是 SessionStorage 有一条更加严格的限制，**SessionStorage 只有在同一浏览器的同一窗口下才能够共享；**
- LocalStorage 和 SessionStorage 都不能被爬虫爬取；

SessionStorage 的常用 API：

```js
// 保存数据到 sessionStorage
sessionStorage.setItem("key", "value");

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem("key");

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem("key");

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

// 获取某个索引的Key
sessionStorage.key(index);
```

SessionStorage 的使用场景

- 由于 SessionStorage 具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。当关闭网站之后，这些信息也就随之消除了。

### 比较

- cookie：其实最开始是服务器端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。
- sessionStorage：html5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 session 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。
- localStorage：html5 提供的一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage 不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。

上面三种方式都是存储少量数据的时候的存储方式，当需要在本地存储大量数据的时候，我们可以使用浏览器的 indexDB 这是浏览器提供的一种本地的数据库存储机制。它不是关系型数据库，它内部采用对象仓库的形式存储数据，它更接近 NoSQL 数据库。

Web Storage 和 cookie 的区别总结如下：

- Web Storage 是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽；
- cookie 需要指定作用域，不可以跨域调用；
- Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie；
- Cookie 也是不可以或缺的：Cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为了在本地“存储”数据而生。

## 10、浏览器渲染

### 渲染过程

- 首先解析收到的文档，根据文档定义构建一棵 DOM 树，DOM 树是由 DOM 元素及属性节点组成的。
- 然后对 CSS 进行解析，生成 CSSOM 规则树。
- 根据 DOM 树和 CSSOM 规则树构建渲染树。渲染树的节点被称为渲染对象，渲染对象是一个包含有颜色和大小等属性的矩形，渲染对象和 DOM 元素相对应，但这种对应关系不是一对一的，不可见的 DOM 元素不会被插入渲染树。还有一些 DOM 元素对应几个可见对象，它们一般是一些具有复杂结构的元素，无法用一个矩形来描述。
- 当渲染对象被创建并添加到树中，它们并没有位置和大小，所以当浏览器生成渲染树以后，就会根据渲染树来进行布局（也可以叫做回流）。这一阶段浏览器要做的事情是要弄清楚各个节点在页面中的确切位置和大小。通常这一行为也被称为“自动重排”。
- 布局阶段结束后是绘制阶段，遍历渲染树并调用渲染对象的 paint 方法将它们的内容显示在屏幕上，绘制使用 UI 基础组件。

![20200808204032355](20200808204032355.png)

这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的 html 都解析完成之后再去构建和布局 render 树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

### 渲染优化

### 渲染阻塞

1、CSS 阻塞文档解析

理论上，既然样式表不改变 DOM 树，也就没有必要停下文档的解析等待它们。然而，存在一个问题，JavaScript 脚本执行时可能在文档的解析过程中请求样式信息，如果样式还没有加载和解析，脚本将得到错误的值，显然这将会导致很多问题。所以如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟 JavaScript 脚本执行和文档的解析，直至其完成 CSSOM 的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后再继续文档的解析。

### 浏览器渲染流程，分层之后在什么时候合成

## 11、浏览器缓存

### 浏览器缓存过程

- 浏览器第一次加载资源，服务器返回 200，浏览器从服务器下载资源文件，并缓存资源文件与 response header，以供下次加载时对比使用；
- 下一次加载资源时，由于强制缓存优先级较高，先比较当前时间与上一次返回 200 时的时间差，如果没有超过 cache-control 设置的 max-age，则没有过期，并命中强缓存，直接从本地读取资源。如果浏览器不支持 HTTP1.1，则使用 expires 头判断是否过期；
- 如果资源已过期，则表明强制缓存没有被命中，则开始协商缓存，向服务器发送带有 If-None-Match 和 If-Modified-Since 的请求；
- 服务器收到请求后，优先根据 Etag 的值判断被请求的文件有没有做修改，Etag 值一致则没有修改，命中协商缓存，返回 304；如果不一致则有改动，直接返回新的资源文件带上新的 Etag 值并返回 200；
- 如果服务器收到的请求没有 Etag 值，则将 If-Modified-Since 和被请求文件的最后修改时间做比对，一致则命中协商缓存，返回 304；不一致则返回新的 last-modified 和文件并返回 200；

很多网站的资源后面都加了版本号，这样做的目的是：每次升级了 JS 或 CSS 文件后，为了防止浏览器进行缓存，强制改变版本号，客户端浏览器就会重新下载新的 JS 或 CSS 文件 ，以保证用户能够及时获得网站的最新更新。

![32362e706e67](../../public/32362e706e67.png)

https://github.com/lgwebdream/FE-Interview/issues/923

### 缓存位置

#### Memory Cache

内存缓存是一种比较特殊的缓存，他不受 max-age、no-cache 等配置的影响，即使我们不设置缓存，如果当前的内存空间比较充裕的话，一些资源还是会被缓存下来。但这种缓存是暂时的，一旦关闭了浏览器，这一部分用于缓存的内存空间就会被释放掉。如果真的不想使用缓存，可以设置 no-store，这样，即便是内存缓存，也不会生效。

内存缓存虽然比较高效，但还是受限于计算机内存的大小，所以能让我们使用的内存并不多，这个时候就需要硬盘来存储大量的缓存。

#### Disk Cache

Disk Cache 也就是存储在硬盘中的缓存。相比较内存缓存的优势就是长时效。
它会根据 HTTP Header 中设置的字段类型，来判断资源是否需要重新请求，是否不需要请求。
如果当前内存使用率高的话，请求资源大概率会被缓存到 disk cache。

### 协商缓存和强缓存

#### 强缓存

使用强缓存策略时，如果缓存资源有效，则直接使用缓存资源，不必再向服务器发起请求。

强缓存策略可以通过两种方式来设置，分别是 http 头信息中的 Expires 属性和 Cache-Control 属性。

（1）服务器通过在响应头中添加 Expires 属性，来指定资源的过期时间。在过期时间以内，该资源可以被缓存使用，不必再向服务器发送请求。这个时间是一个绝对时间，它是服务器的时间，因此可能存在这样的问题，就是客户端的时间和服务器端的时间不一致，或者用户可以对客户端时间进行修改的情况，这样就可能会影响缓存命中的结果。
（2）Expires 是 http1.0 中的方式，因为它的一些缺点，在 HTTP 1.1 中提出了一个新的头部属性就是 Cache-Control 属性，它提供了对资源的缓存的更精确的控制。它有很多不同的值，

Cache-Control 可设置的字段：

- public：设置了该字段值的资源表示可以被任何对象（包括：发送请求的客户端、代理服务器等等）缓存。这个字段值不常用，一般还是使用 max-age=来精确控制；
- private：设置了该字段值的资源只能被用户浏览器缓存，不允许任何代理服务器缓存。在实际开发当中，对于一些含有用户信息的 HTML，通常都要设置这个字段值，避免代理服务器(CDN)缓存；
- no-cache：设置了该字段需要先和服务端确认返回的资源是否发生了变化，如果资源未发生变化，则直接使用缓存好的资源；
- no-store：设置了该字段表示禁止任何缓存，每次都会向服务端发起新的请求，拉取最新的资源；
- max-age=：设置缓存的最大有效期，单位为秒；
- s-maxage=：优先级高于 max-age=，仅适用于共享缓存(CDN)，优先级高于 max-age 或者 Expires 头；
- max-stale=：设置了该字段表明客户端愿意接收已经过期的资源，但是不能超过给定的时间限制。

一般来说只需要设置其中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires。

no-cache 和 no-store 很容易混淆：

- no-cache 是指先要和服务器确认是否有资源更新，在进行判断。也就是说没有强缓存，但是会有协商缓存；
- no-store 是指不使用任何缓存，每次请求都直接从服务器获取资源。

#### 协商缓存

如果命中强制缓存，我们无需发起新的请求，直接使用缓存内容，如果没有命中强制缓存，如果设置了协商缓存，这个时候协商缓存就会发挥作用了。

上面已经说到了，命中协商缓存的条件有两个：

- max-age=xxx 过期了
- 值为 no-cache

使用协商缓存策略时，会先向服务器发送一个请求，如果资源没有发生修改，则返回一个 304 状态，让浏览器使用本地的缓存副本。如果资源发生了修改，则返回修改后的资源。

协商缓存也可以通过两种方式来设置，分别是 http 头信息中的 Etag 和 Last-Modified 属性。

（1）服务器通过在响应头中添加 Last-Modified 属性来指出资源最后一次修改的时间，当浏览器下一次发起请求时，会在请求头中添加一个 If-Modified-Since 的属性，属性值为上一次资源返回时的 Last-Modified 的值。当请求发送到服务器后服务器会通过这个属性来和资源的最后一次的修改时间来进行比较，以此来判断资源是否做了修改。如果资源没有修改，那么返回 304 状态，让客户端使用本地的缓存。如果资源已经被修改了，则返回修改后的资源。使用这种方法有一个缺点，就是 Last-Modified 标注的最后修改时间只能精确到秒级，如果某些文件在 1 秒钟以内，被修改多次的话，那么文件已将改变了但是 Last-Modified 却没有改变，这样会造成缓存命中的不准确。

（2）因为 Last-Modified 的这种可能发生的不准确性，http 中提供了另外一种方式，那就是 Etag 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified 的方式更加精确。

当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保持一致，因为每个服务器上 Etag 的值都不一样，**因此在考虑负载平衡时，最好不要设置 Etag 属性。**

### 总结

强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于**协商缓存会向服务器发送一次请求。** 它们缓存不命中时，都会向服务器发送请求来获取资源。在实际的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。

使用浏览器缓存，有以下优点：

- 减少了服务器的负担，提高了网站的性能
- 加快了客户端网页的加载速度
- 减少了多余网络数据传输

**点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？**

- 点击刷新按钮或者按 F5：浏览器直接对本地的缓存文件过期，但是会带上 If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
- 用户按 Ctrl+F5（强制刷新）：浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
- 地址栏回车： 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。

## 12、浏览器安全

### XSS 跨站脚本攻击

就是攻击者想尽一切办法将可以执行的代码注入到网页中。

XSS 全称（Cross Site Scripting）跨站脚本攻击，是最常见的 Web 应⽤程序安全漏洞之⼀，XSS 是指攻击者在⽹页中嵌⼊客户端脚本，通常是 JavaScript 编写的危险代码，当⽤户使⽤浏览器浏览⽹页时，脚本就会在⽤户的浏览器上执⾏，从⽽达到攻击者的⽬的。

XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

攻击者可以通过这种攻击方式来进行以下操作：

- 获取页面的数据，如 DOM，包括 DOM、cookie、localStorage，
- DOS 攻击，发送合理请求，占用服务器资源，从而使用户无法访问服务器
- 破坏页面结构
- 流量劫持（将链接指向某网站）

#### 存储型（server 端）

**场景**

见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

**攻击步骤**

- 攻击者将恶意代码提交到目标网站的数据库中
- 用户打开目标网站时，服务端将恶意代码从数据库中取出来，拼接在 HTML 中返回给浏览器
- 用户浏览器在收到响应后解析执行，混在其中的恶意代码也同时被执行
- 恶意代码窃取用户数据，并发送到指定攻击者的网站，或者冒充用户行为，调用目标网站的接口，执行恶意操作

**攻击类型**

- DOM 型 XSS：
  攻击者将带有恶意 js 代码的参数传递到网站的前端页面中，该代码不会传入服务器直接在客户的浏览器执行。
- 反射性型 XSS：
  攻击者将带有恶意 js 代码的参数传递给网站，经过服务器的然后返回到客户端，在客户的浏览器执行。
- 存储型 XSS：
  攻击者将带有恶意 js 代码的参数传递给网站，经过服务器存储在数据库中，任何一个客户端在访问该条数据时，恶意的 js 代码都会在该客户端的浏览器执行。

#### 反射型（Server 端）

与存储型的区别在于，存储型的恶意代码存储在数据库中，反射型的恶意代码在 URL 上

**场景**

通过 URL 传递参数的功能，如网站搜索、跳转等。

**攻击步骤**

- 攻击者构造出特殊的 URL，其中包含恶意代码。
- 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
- 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

#### Dom 型(浏览器端）

DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

**场景**

通过 URL 传递参数的功能，如网站搜索、跳转等。

**攻击步骤**

- 攻击者构造出特殊的 URL，其中包含恶意代码。
- 用户打开带有恶意代码的 URL。
- 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

#### 预防方案

防止攻击者提交恶意代码，防止浏览器执行恶意代码

**对数据进行严格的输出编码**

- 如 HTML 元素的编码，JS 编码，CSS 编码，URL 编码等等
- 避免拼接 HTML；Vue/React 技术栈，避免使用 v-html / dangerouslySetInnerHTML
- CSP HTTP Header，即 Content-Security-Policy、X-XSS-Protection
- 增加攻击难度，配置 CSP(本质是建立白名单，由浏览器进行拦截)
- `Content-Security-Policy: default-src 'self' `-所有内容均来自站点的同一个源（不包括其子域名）
- `Content-Security-Policy: default-src 'self' *.trusted.com`-允许内容来自信任的域名及其子域名 (域名不必须与 CSP 设置所在的域名相同)
- `Content-Security-Policy: default-src https://yideng.com`-该服务器仅允许通过 HTTPS 方式并仅从 yideng.com 域名来访问文档
- 设置 Cookie 的 httpOnly 为 true

**输入验证**

- 比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断
- 开启浏览器 XSS 防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
- 验证码

### CSRF：跨站请求伪造

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

CSRF（Cross-site request forgery）：跨站请求伪造。

CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

#### 攻击

![201803071735](../../public/201803071735.png)
用户是网站 A 的注册用户，且登录进去，于是网站 A 就给用户下发 cookie。

从上图可以看出，要完成一次 CSRF 攻击，受害者必须满足两个必要的条件：

（1）登录受信任网站 A，并在本地生成 Cookie。（如果用户没有登录网站 A，那么网站 B 在诱导的时候，请求网站 A 的 api 接口时，会提示你登录）

（2）在不登出 A 的情况下，访问危险网站 B（其实是利用了网站 A 的漏洞）。

我们在讲 CSRF 时，一定要把上面的两点说清楚。

一般的 CSRF 有三种：

- GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提交。
- POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。
- 链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。

::: waring
cookie 保证了用户可以处于登录状态，但网站 B 其实拿不到 cookie。
:::

#### 预防方案

CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。

**2.3.1 同源检测**

通过 Header 中的 Origin Header 、Referer Header 确定，但不同浏览器可能会有不一样的实现，不能完全保证

第一种是同源检测的方法，服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。这种方式的缺点是有些情况下 referer 可以被伪造。还有就是我们这种方法同时把搜索引擎的链接也给屏蔽了，所以一般网站会允许搜索引擎的页面请求，但是相应的页面请求这种请求方式也可能被攻击者给利用。

**2.3.2 CSRF Token 校验**

将 CSRF Token 输出到页面中（通常保存在 Session 中），页面提交的请求携带这个 Token，服务器验证 Token 是否正确

（1）服务器发送给客户端一个 token；

（2）客户端提交的表单中带着这个 token。

（3）如果这个 token 不合法，那么服务器拒绝这个请求。

第二种方法是使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时，可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。还有一个问题是一般不会只有一台网站服务器，如果我们的请求经过负载平衡转移到了其他的服务器，但是这个服务器的 session 中没有保留这个 token 的话，就没有办法验证了。这种情况我们可以通过改变 token 的构建方式来解决。

**2.3.3 双重 cookie 验证**

第三种方式使用双重 Cookie 验证的办法，服务器在用户访问网站页面时，向请求域名注入一个 Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 cookie 中的数据和参数中的数据进行比较，来进行验证。使用这种方式是利用了攻击者只能利用 cookie，但是不能访问获取 cookie 的特点。并且这种方法比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。这种方法的缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。同时这种方式不能做到子域名的隔离。

- 流程：
  - 步骤 1：在用户访问网站页面时，向请求域名注入一个 Cookie，内容为随机字符串（例如 csrfcookie=v8g9e4ksfhw）
  - 步骤 2：在前端向后端发起请求时，取出 Cookie，并添加到 URL 的参数中（接上例 POST `https://www.a.com/comment?csrfcookie=v8g9e4ksfhw`）
  - 步骤 3：后端接口验证 Cookie 中的字段与 URL 参数中的字段是否一致，不一致则拒绝。
- 优点：
  - 无需使用 Session，适用面更广，易于实施。
  - Token 储存于客户端中，不会给服务器带来压力。
  - 相对于 Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。
- 缺点：
  - Cookie 中增加了额外的字段。
  - 如果有其他漏洞（例如 XSS），攻击者可以注入 Cookie，那么该防御方式失效。
  - 难以做到子域名的隔离。
  - 为了确保 Cookie 传输安全，采用这种防御方式的最好确保用整站 HTTPS 的方式，如果还没切 HTTPS 的使用这种方式也会有风险。
- Samesite Cookie 属性：Google 起草了一份草案来改进 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samesite 属性，它用来标明这个 Cookie 是个“同站 Cookie”，同站 Cookie 只能作为第一方 Cookie，不能作为第三方 Cookie，Samesite 有两个属性值，Strict 为任何情况下都不可以作为第三方 Cookie ，Lax 为可以作为第三方 Cookie , 但必须是 Get 请求

**2.3.4 Samesite**

- 第四种方式是使用在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。Samesite 一共有两种模式，一种是严格模式，在严格模式下 cookie 在任何情况下都不可能作为第三方 Cookie 使用，在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。

### CSRF 和 XSS 的区别

区别一：

CSRF：需要用户先登录网站 A，获取 cookie。

XSS：不需要登录。

区别二：（原理的区别）

CSRF：是利用网站 A 本身的漏洞，去请求网站 A 的 api。

XSS：是向网站 A 注入 JS 代码，然后执行 JS 里的代码，篡改网站 A 的内容。
