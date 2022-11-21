# Deal-With-Cross-Origin

解决跨域的几种方案

- JSONP

- CORS

- window.name 【在使用两个域的 html 时，根据本地显示不同的端口来区分不同的域】

- location.hash + iframe 【hash 值只可以单向传递】

- postMessage

### 一、跨域

1、浏览器同源策略

跨域问题其实就是浏览器的同源策略造成的。同源策略限制了从同一个源加载的文档或脚本如何与另一个源的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的重要的安全机制。同源指的是：协议、端口号、域名必须一致。

同源政策主要限制了三个方面：
● 当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。
● 当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。
● 当前域下 ajax 无法发送跨域请求。

同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img、或者 script
脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作

2、解决办法

（1）CORS

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain)上的 Web
应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域
HTTP 请求。浏览器将 CORS 分为简单请求和非简单请求：

1.1 简单请求：

请求方法是以下三种方法之一：HEAD/GET/POST
HTTP 的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type：只限于三个值
application/x-www-form-urlencoded、multipart/form-data、text/plain
若不满足以上条件，就属于非简单请求了。

简单请求过程：

对于简单请求，浏览器会直接发出 CORS 请求，它会在请求的头信息中增加一个 Orign
字段，该字段用来说明本次请求来自哪个源（协议+端口+域名），服务器会根据这个值来决定是否同意这次请求。如果 Orign
指定的域名在许可范围之内，服务器返回的响应就会多出以下信息头：

Access-Control-Allow-Origin: http://api.bob.com // 和 Orign 一直

Access-Control-Allow-Credentials: true // 表示是否允许发送 Cookie

Access-Control-Expose-Headers: FooBar // 指定返回其他字段的值

Content-Type: text/html; charset=utf-8 // 表示文档类型

如果 Orign 指定的域名不在许可范围之内，服务器会返回一个正常的 HTTP 回应，浏览器发现没有上面的 Access-Control-Allow-Origin
头部信息，就知道出错了。这个错误无法通过状态码识别，因为返回的状态码可能是 200。

1.2 非简单请求：

非简单请求的 CORS 请求会在正式通信之前进行一次 HTTP 查询请求，称为预检请求。浏览器会询问服务器，当前所在的网页是否在服务器允许访问的范围内，以及可以使用哪些
HTTP 请求方式和头信息字段，只有得到肯定的回复，才会进行正式的 HTTP 请求，否则就会报错。

预检请求使用的请求方法是 OPTIONS，表示这个请求是来询问的。他的头信息中的关键字段是 Orign，表示请求来自哪个源。除此之外，头信息中还包括两个字段：
Access-Control-Request-Method：该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法。
Access-Control-Request-Headers： 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段。

服务器在收到浏览器的预检请求之后，会根据头信息的三个字段来进行判断，如果返回的头信息在中有 Access-Control-Allow-Origin
这个字段就是允许跨域请求，如果没有，就是不同意这个预检请求，就会报错。

**在非简单请求中，至少需要设置以下字段：**

- 'Access-Control-Allow-Origin'

- 'Access-Control-Allow-Methods'

- 'Access-Control-Allow-Headers’

**在 CORS 请求中，如果想要传递 Cookie，就要满足以下三个条件：**

- 在请求中设置 withCredentials。默认情况下在跨域请求，浏览器是不带 cookie 的。但是我们可以通过设置 withCredentials 来进行传递
  cookie.

- Access-Control-Allow-Credentials 设置为 true

- Access-Control-Allow-Origin 设置为非 \*

（2）JSONP

jsonp 的原理就是利用`<script>`标签没有跨域限制，通过`<script>`标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到
callback 函数中，返回给浏览器，浏览器解析执行，从而前端拿到 callback 函数返回的数据。

具有局限性， 仅支持 get 方法; 不安全，可能会遭受 XSS 攻击

（3）代理

**正向代理：**
客户端想获得一个服务器的数据，但是因为种种原因无法直接获取。于是客户端设置了一个代理服务器，并且指定目标服务器，之后代理服务器向目标服务器转交请求并将获得的内容发送给客户端。这样本质上起到了对真实服务器隐藏真实客户端的目的。实现正向代理需要修改客户端，比如修改浏览器配置。
**反向代理：**服务器为了能够将工作负载分不到多个服务器来提高网站性能 (负载均衡)
等目的，当其受到请求后，会首先根据转发规则来确定请求应该被转发到哪个服务器上，然后将请求转发到对应的真实服务器上。这样本质上起到了对客户端隐藏真实服务器的作用。
一般使用反向代理后，需要通过修改 DNS 让域名解析到代理服务器 IP，这时浏览器无法察觉到真正服务器的存在，当然也就不需要修改配置了。

（4）postMessage(data,origin)

- data： html5 规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用 JSON.stringify()序列化。
- origin： 协议+主机+端口号，也可以设置为"\*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

（5）websocket

![preview](/public/d9ad503b91107080.jpg)
