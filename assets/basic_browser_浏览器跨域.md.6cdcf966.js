import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.00751356.js";const u=JSON.parse('{"title":"浏览器跨域","description":"","frontmatter":{},"headers":[],"relativePath":"basic/browser/浏览器跨域.md","filePath":"basic/browser/浏览器跨域.md"}'),p={name:"basic/browser/浏览器跨域.md"},e=l(`<h1 id="浏览器跨域" tabindex="-1">浏览器跨域 <a class="header-anchor" href="#浏览器跨域" aria-label="Permalink to &quot;浏览器跨域&quot;">​</a></h1><h2 id="浏览器同源策略" tabindex="-1">浏览器同源策略 <a class="header-anchor" href="#浏览器同源策略" aria-label="Permalink to &quot;浏览器同源策略&quot;">​</a></h2><p>同源策略限制了从同一个源加载的文档或脚本如何与另一个源的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的重要的安全机制。同源指的是：协议、端口号、域名必须一致。</p><p>同源策略：协议、域名和端口都相同</p><p>同源政策主要限制了三个方面：</p><ul><li>当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。</li><li>当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。</li><li>当前域下 ajax 无法发送跨域请求。</li></ul><p>同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img、或者 script 脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作</p><h2 id="简单请求与非简单请求" tabindex="-1">简单请求与非简单请求 <a class="header-anchor" href="#简单请求与非简单请求" aria-label="Permalink to &quot;简单请求与非简单请求&quot;">​</a></h2><h2 id="浏览器跨域-1" tabindex="-1">浏览器跨域 <a class="header-anchor" href="#浏览器跨域-1" aria-label="Permalink to &quot;浏览器跨域&quot;">​</a></h2><p>跨域问题是浏览器的同源策略引起的。</p><h2 id="跨域解决方法" tabindex="-1">跨域解决方法 <a class="header-anchor" href="#跨域解决方法" aria-label="Permalink to &quot;跨域解决方法&quot;">​</a></h2><h3 id="cors-解决跨域及原理" tabindex="-1">CORS 解决跨域及原理 <a class="header-anchor" href="#cors-解决跨域及原理" aria-label="Permalink to &quot;CORS 解决跨域及原理&quot;">​</a></h3><p>跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin (domain)上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域</p><ol><li>HTTP 请求。</li></ol><p>CORS 需要浏览器和服务器同时支持，整个 CORS 过程都是浏览器完成的，无需用户参与。因此实现 CORS 的关键就是服务器，只要服务器实现了 CORS 请求，就可以跨源通信了。</p><p>浏览器将 CORS 分为简单请求和非简单请求：简单请求不会触发 CORS 预检请求。</p><p>满足一下两个条件的请求就是简单请求，否则属于非简单请求：</p><p>（1）请求方法为 GET、POST、HEAD</p><p>（2）HTTP 的头信息不超过以下几种字段</p><ul><li>Accept</li><li>Accept-Language</li><li>Content-Language</li><li>Last-Event-ID</li><li>Content-Type 为 application/x-www-form-urlencoded、multipart/form-data、text/plain</li></ul><ol start="2"><li>简单请求过程</li></ol><p>对于简单请求，浏览器会直接发出 CORS 请求，它会在请求的头信息中增加一个 Orign 字段，该字段用来说明本次请求来自哪个源（协议+端口+域名），服务器会根据这个值来决定是否同意这次请求。如果 Orign 指定的域名在许可范围之内，服务器返回的响应就会多出以下信息头：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Access - Control - Allow - Origin</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">http://api.bob.com // 和 Orign 一致</span></span>
<span class="line"><span style="color:#e1e4e8;">  Access - Control - Allow - Credentials</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">true // 表示是否允许发送 Cookie</span></span>
<span class="line"><span style="color:#e1e4e8;">Access - Control - Expose - Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">FooBar // 指定返回其他字段的值</span></span>
<span class="line"><span style="color:#e1e4e8;">Content - Type</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">text / html;</span></span>
<span class="line"><span style="color:#e1e4e8;">charset = utf - 8 // 表示文档类型</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Access - Control - Allow - Origin</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">http://api.bob.com // 和 Orign 一致</span></span>
<span class="line"><span style="color:#24292e;">  Access - Control - Allow - Credentials</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">true // 表示是否允许发送 Cookie</span></span>
<span class="line"><span style="color:#24292e;">Access - Control - Expose - Headers</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">FooBar // 指定返回其他字段的值</span></span>
<span class="line"><span style="color:#24292e;">Content - Type</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">text / html;</span></span>
<span class="line"><span style="color:#24292e;">charset = utf - 8 // 表示文档类型</span></span></code></pre></div><p>如果 Orign 指定的域名不在许可范围之内，服务器会返回一个正常的 HTTP 回应，浏览器发现没有上面的 Access-Control-Allow-Origin 头部信息，就知道出错了。这个错误无法通过状态码识别，因为返回的状态码可能是 200。</p><p>在简单请求中，在服务器内，至少需要设置字段：Access-Control-Allow-Origin</p><p>非简单请求过程</p><p>非简单请求是对服务器有特殊要求的请求，比如请求方法为 DELETE 或者 PUT 等。非简单请求的 CORS 请求会在正式通信之前进行一次 HTTP 查询请求，称为预检请求。</p><p>浏览器会询问服务器，当前所在的网页是否在服务器允许访问的范围内，以及可以使用哪些 HTTP 请求方式和头信息字段，只有得到肯定的回复，才会进行正式的 HTTP 请求，否则就会报错。</p><p>预检请求使用的请求方法是 OPTIONS，表示这个请求是来询问的。他的头信息中的关键字段是 Orign，表示请求来自哪个源。除此之外，头信息中还包括两个字段：</p><ul><li>Access-Control-Request-Method：该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法。</li><li>Access-Control-Request-Headers： 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段。</li></ul><p>服务器在收到浏览器的预检请求之后，会根据头信息的三个字段来进行判断，如果返回的头信息在中有 Access-Control-Allow-Origin 这个字段就是允许跨域请求，如果没有，就是不同意这个预检请求，就会报错。</p><p>服务器回应的 CORS 的字段如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Access - Control - Allow - Origin</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">http://api.bob.com // 允许跨域的源地址</span></span>
<span class="line"><span style="color:#e1e4e8;">  Access - Control - Allow - Methods</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">GET, POST, PUT // 服务器支持的所有跨域请求的方法</span></span>
<span class="line"><span style="color:#e1e4e8;">Access - Control - Allow - Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">X - Custom - Header // 服务器支持的所有头信息字段</span></span>
<span class="line"><span style="color:#e1e4e8;">Access - Control - Allow - Credentials</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">true // 表示是否允许发送 Cookie</span></span>
<span class="line"><span style="color:#e1e4e8;">Access - Control - Max - Age</span></span>
<span class="line"><span style="color:#e1e4e8;">:</span></span>
<span class="line"><span style="color:#e1e4e8;">1728000 // 用来指定本次预检请求的有效期，单位为秒</span></span>
<span class="line"><span style="color:#e1e4e8;">Access - Control - Expose - Headers   // 允许返回的头</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Access - Control - Allow - Origin</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">http://api.bob.com // 允许跨域的源地址</span></span>
<span class="line"><span style="color:#24292e;">  Access - Control - Allow - Methods</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">GET, POST, PUT // 服务器支持的所有跨域请求的方法</span></span>
<span class="line"><span style="color:#24292e;">Access - Control - Allow - Headers</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">X - Custom - Header // 服务器支持的所有头信息字段</span></span>
<span class="line"><span style="color:#24292e;">Access - Control - Allow - Credentials</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">true // 表示是否允许发送 Cookie</span></span>
<span class="line"><span style="color:#24292e;">Access - Control - Max - Age</span></span>
<span class="line"><span style="color:#24292e;">:</span></span>
<span class="line"><span style="color:#24292e;">1728000 // 用来指定本次预检请求的有效期，单位为秒</span></span>
<span class="line"><span style="color:#24292e;">Access - Control - Expose - Headers   // 允许返回的头</span></span></code></pre></div><p>只要服务器通过了预检请求，在以后每次的 CORS 请求都会自带一个 Origin 头信息字段。服务器的回应，也都会有一个 Access-Control-Allow-Origin 头信息字段。</p><p>在非简单请求中，至少需要设置以下字段：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;Access-Control-Allow-Origin&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;Access-Control-Allow-Methods&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;Access-Control-Allow-Headers&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;Access-Control-Allow-Origin&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#032F62;">&quot;Access-Control-Allow-Methods&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#032F62;">&quot;Access-Control-Allow-Headers&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>减少 OPTIONS 请求次数：</p><p>OPTIONS 请求次数过多就会损耗页面加载的性能，降低用户体验度。所以尽量要减少 OPTIONS 请求次数，可以后端在请求的返回头部添加：Access-Control-Max-Age：number。它表示预检请求的返回结果可以被缓存多久，单位是秒。该字段只对完全一样的 URL 的缓存设置生效，所以设置了缓存时间，在这个时间范围内，再次发送请求就不需要进行预检请求了。</p><p>CORS 中 Cookie 相关问题： 在 CORS 请求中，如果想要传递 Cookie，就要满足以下三个条件：</p><ul><li>在请求中设置 withCredentials。默认情况下在跨域请求，浏览器是不带 cookie 的。但是我们可以通过设置 withCredentials 来进行传递 cookie.</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 原生 xml 的设置方式</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> xhr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">XMLHttpRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">xhr.withCredentials </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// axios 设置方式</span></span>
<span class="line"><span style="color:#E1E4E8;">axios.defaults.withCredentials </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 原生 xml 的设置方式</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> xhr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">XMLHttpRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">xhr.withCredentials </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// axios 设置方式</span></span>
<span class="line"><span style="color:#24292E;">axios.defaults.withCredentials </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span></code></pre></div><ul><li>Access-Control-Allow-Credentials 设置为 true</li><li>Access-Control-Allow-Origin 设置为非 *</li></ul><h3 id="jsonp-解决跨域及原理" tabindex="-1">JSONP 解决跨域及原理 <a class="header-anchor" href="#jsonp-解决跨域及原理" aria-label="Permalink to &quot;JSONP 解决跨域及原理&quot;">​</a></h3><p>jsonp 的原理就是利用<code>&lt;script&gt;</code>标签没有跨域限制，通过<code>&lt;script&gt;</code>标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到 callback 函数中，返回给浏览器，浏览器解析执行，从而前端拿到 callback 函数返回的数据。</p><p>JSONP 返回数据格式可以是 object/string/number 等</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> script </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;script&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">script.type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;text/javascript&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数</span></span>
<span class="line"><span style="color:#E1E4E8;">script.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;http://www.xxx.com/login?user=admin&amp;callback=handleCallback&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">document.head.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(script);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 回调执行函数</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleCallback</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(res));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// axois</span></span>
<span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$http </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> axios;</span></span>
<span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$http</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">jsonp</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;http://www.xxx.com/login&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    params: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    jsonp: </span><span style="color:#9ECBFF;">&quot;handleCallback&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> script </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;script&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">script.type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;text/javascript&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数</span></span>
<span class="line"><span style="color:#24292E;">script.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;http://www.xxx.com/login?user=admin&amp;callback=handleCallback&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">document.head.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(script);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 回调执行函数</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleCallback</span><span style="color:#24292E;">(</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(res));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// axois</span></span>
<span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$http </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> axios;</span></span>
<span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$http</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">jsonp</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;http://www.xxx.com/login&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    params: {},</span></span>
<span class="line"><span style="color:#24292E;">    jsonp: </span><span style="color:#032F62;">&quot;handleCallback&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span></code></pre></div><p>JSONP 的缺点：</p><ul><li>具有局限性，仅支持 get 方法</li><li>不安全，可能会遭受 XSS 攻击</li></ul><h3 id="postmessage-跨域" tabindex="-1">postMessage 跨域 <a class="header-anchor" href="#postmessage-跨域" aria-label="Permalink to &quot;postMessage 跨域&quot;">​</a></h3><h3 id="nginx-代理跨域-nodejs-中间件代理跨域" tabindex="-1">nginx 代理跨域/nodejs 中间件代理跨域 <a class="header-anchor" href="#nginx-代理跨域-nodejs-中间件代理跨域" aria-label="Permalink to &quot;nginx 代理跨域/nodejs 中间件代理跨域&quot;">​</a></h3><p>实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。</p><p>代理服务器，需要做以下几个步骤：</p><p>接受客户端请求 。 将请求 转发给服务器。 拿到服务器 响应 数据。 将 响应 转发给客户端。</p><p>nginx 配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen  81;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  www.domain1.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass   http://www.domain2.com:8080;  #反向代理</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Access-Control-Allow-Credentials true;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen  81;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  www.domain1.com;</span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass   http://www.domain2.com:8080;  #反向代理</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名</span></span>
<span class="line"><span style="color:#24292e;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用</span></span>
<span class="line"><span style="color:#24292e;">        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*</span></span>
<span class="line"><span style="color:#24292e;">        add_header Access-Control-Allow-Credentials true;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="websocket" tabindex="-1">websocket <a class="header-anchor" href="#websocket" aria-label="Permalink to &quot;websocket&quot;">​</a></h3><h3 id="iframe" tabindex="-1">iframe <a class="header-anchor" href="#iframe" aria-label="Permalink to &quot;iframe&quot;">​</a></h3><h2 id="正向代理和反向代理" tabindex="-1">正向代理和反向代理 <a class="header-anchor" href="#正向代理和反向代理" aria-label="Permalink to &quot;正向代理和反向代理&quot;">​</a></h2><ul><li>正向代理：</li></ul><p>客户端想获得一个服务器的数据，但是因为种种原因无法直接获取。于是客户端设置了一个代理服务器，并且指定目标服务器，之后代理服务器向目标服务器转交请求并将获得的内容发送给客户端。这样本质上起到了对真实服务器隐藏真实客户端的目的。实现正向代理需要修改客户端，比如修改浏览器配置。</p><ul><li>反向代理：</li></ul><p>服务器为了能够将工作负载分不到多个服务器来提高网站性能 (负载均衡) 等目的，当其受到请求后，会首先根据转发规则来确定请求应该被转发到哪个服务器上，然后将请求转发到对应的真实服务器上。这样本质上起到了对客户端隐藏真实服务器的作用。</p><p>一般使用反向代理后，需要通过修改 DNS 让域名解析到代理服务器 IP，这时浏览器无法察觉到真正服务器的存在，当然也就不需要修改配置了。</p><p>（4）postMessage(data,origin)</p><ul><li>data： html5 规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用 JSON.stringify()序列化。</li><li>origin： 协议+主机+端口号，也可以设置为&quot;*&quot;，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为&quot;/&quot;。</li></ul>`,65),o=[e];function c(t,r,i,y,E,d){return a(),n("div",null,o)}const C=s(p,[["render",c]]);export{u as __pageData,C as default};
