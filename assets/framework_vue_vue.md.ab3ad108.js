import{_ as s,o as n,c as a,g as l}from"./app.c2ea0a85.js";const y=JSON.parse('{"title":"vue \u539F\u7406\u76F8\u5173\u603B\u7ED3","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E00\u3001vue2.0 \u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684","slug":"\u4E00\u3001vue2-0-\u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684","link":"#\u4E00\u3001vue2-0-\u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684","children":[]},{"level":2,"title":"\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898","slug":"\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898","link":"#\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898","children":[]},{"level":2,"title":"\u4E09\u3001computed \u548C watch \u548C methods","slug":"\u4E09\u3001computed-\u548C-watch-\u548C-methods","link":"#\u4E09\u3001computed-\u548C-watch-\u548C-methods","children":[]},{"level":2,"title":"\u56DB\u3001vue-router \u7684\u6A21\u5F0F\u533A\u522B","slug":"\u56DB\u3001vue-router-\u7684\u6A21\u5F0F\u533A\u522B","link":"#\u56DB\u3001vue-router-\u7684\u6A21\u5F0F\u533A\u522B","children":[]},{"level":2,"title":"\u4E94\u3001vuex \u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898","slug":"\u4E94\u3001vuex-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898","link":"#\u4E94\u3001vuex-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898","children":[]},{"level":2,"title":"\u516D\u3001nextTick \u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684","slug":"\u516D\u3001nexttick-\u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684","link":"#\u516D\u3001nexttick-\u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684","children":[]},{"level":2,"title":"\u4E03\u3001keep-alive \u5185\u7F6E\u7EC4\u4EF6\u548C LRU \u7B97\u6CD5\uFF08\u961F\u5217\uFF09","slug":"\u4E03\u3001keep-alive-\u5185\u7F6E\u7EC4\u4EF6\u548C-lru-\u7B97\u6CD5-\u961F\u5217","link":"#\u4E03\u3001keep-alive-\u5185\u7F6E\u7EC4\u4EF6\u548C-lru-\u7B97\u6CD5-\u961F\u5217","children":[]},{"level":2,"title":"\u516B\u3001Vue3 \u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","slug":"\u516B\u3001vue3-\u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","link":"#\u516B\u3001vue3-\u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F","children":[]}],"relativePath":"framework/vue/vue.md"}'),p={name:"framework/vue/vue.md"},e=l(`<h1 id="vue-\u539F\u7406\u76F8\u5173\u603B\u7ED3" tabindex="-1">vue \u539F\u7406\u76F8\u5173\u603B\u7ED3 <a class="header-anchor" href="#vue-\u539F\u7406\u76F8\u5173\u603B\u7ED3" aria-hidden="true">#</a></h1><h2 id="\u4E00\u3001vue2-0-\u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684" tabindex="-1"><strong>\u4E00\u3001vue2.0 \u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684</strong> <a class="header-anchor" href="#\u4E00\u3001vue2-0-\u7684\u53CC\u5411\u7ED1\u5B9A\u662F\u600E\u4E48\u5B9E\u73B0\u7684" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki has-diff"><code><span class="line"><span style="color:#A6ACCD;">1\u3001view\u548Cmodel\u76F8\u4E92\u5B9E\u65F6\u66F4\u65B0\u539F\u7406\uFF1AObject.defineProperty\u6570\u636E\u52AB\u6301+\u53D1\u5E03\u8005-\u8BA2\u9605\u8005(\u4F9D\u8D56\u6536\u96C6)\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001observer\uFF0Ccompile\uFF0Cwatcher</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09observe\u662F\u4E00\u4E2A\u6570\u636E\u76D1\u542C\u5668\uFF0C\u6838\u5FC3\u65B9\u6CD5\u662FObject.defineProperty</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09watcher\u662F\u4E00\u4E2A\u8BA2\u9605\u8005\uFF0C\u5C06Observer\u53D1\u6765\u7684update\u6D88\u606F\u5904\u7406\uFF0C\u6267\u884C\u66F4\u65B0</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09compile\u662F\u4E00\u4E2A\u6307\u4EE4\u89E3\u6790\u5668\uFF0C\u5BF9\u9700\u8981\u76D1\u542C\u7684\u8282\u70B9\u548C\u5C5E\u6027\u8FDB\u884C\u626B\u63CF\u548C\u89E3\u6790\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001\u6B64\u6A21\u5F0F\u7684\u4F18\u70B9\uFF1A\u4E0D\u9700\u8981\u663E\u5F0F\u8C03\u7528\uFF0C\u53EF\u4EE5\u76F4\u63A5\u901A\u77E5\u53D8\u5316\uFF0C\u66F4\u65B0\u89C6\u56FE\uFF1B\u52AB\u6301\u4E86\u5C5E\u6027setter\uFF0C\u4E0D\u9700\u8981\u989D\u5916\u7684diff\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">4\u3001Object.defineProperty\u7F3A\u70B9</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u4E0D\u80FD\u76D1\u542C\u6570\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u4E0D\u80FD\u76D1\u542C\u6574\u4E2A\u5BF9\u8C61\uFF0C\u53EA\u80FD\u76D1\u542C\u5C5E\u6027</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09\u4E0D\u80FD\u76D1\u542C\u5C5E\u6027\u7684\u589E\u5220\uFF0C\u53EA\u80FD\u76D1\u542C\u53D8\u5316</span></span>
<span class="line"><span style="color:#A6ACCD;">5\u30013.0\u7248\u672C\u4F7F\u7528Proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u53EF\u4EE5\u76D1\u542C\u6570\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u53EF\u76F4\u63A5\u76D1\u542C\u6574\u4E2A\u5BF9\u8C61\uFF0C\u4E0D\u7528\u5C42\u5C42\u9012\u5F52\u5C5E\u6027</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09get\u548Cset\u65F6\u5019\u76F4\u63A5\u6709\u53C2\u6570\uFF0C\u4E0D\u9700\u8981\u5355\u72EC\u5B58\u50A8\u53D8\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF084\uFF09new Proxy()\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u4E0D\u4F1A\u6C61\u67D3\u6E90\u5BF9\u8C61\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">6\u3001\u53C2\u8003\u6587\u6863\uFF1Ahttps://blog.nowcoder.net/n/8517450fe4fd4220b4078f9c61e42ec1#:~:text=Vue%20%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A,%E6%89%A7%E8%A1%8C%E5%AF%B9%E5%BA%94%E7%9A%84%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%E3%80%82</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898" tabindex="-1"><strong>\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898</strong> <a class="header-anchor" href="#\u4E8C\u3001\u6570\u636E\u4E0D\u66F4\u65B0\u7684\u95EE\u9898" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001\u66F4\u65B0\u7684\u539F\u7406\uFF1A\u5728\u6570\u636E\u8BFB\u53D6\u65F6\u6536\u96C6\u4F9D\u8D56\uFF0C\u5728\u8D4B\u503C\u65F6\u901A\u77E5\u4F9D\u8D56\u66F4\u65B0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001object\u6709defineProperty\u65B9\u6CD5\uFF0C\u901A\u8FC7getter\uFF0Csetter\u53EA\u76D1\u542C\u4E86\u5C5E\u6027\u7684\u8BFB\u53D6\u548C\u8D4B\u503C\uFF0C\u4F46\u662F\u65B0\u589E\u5C5E\u6027\u548C\u5220\u9664\u5C5E\u6027\u6CA1\u6709\u68C0\u6D4B\uFF0C\u6240\u4EE5\u4E13\u95E8\u63D0\u4F9B\u4E86$set\u548C$delete\u6765\u5B9E\u73B0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001array\uFF0C\u6CA1\u6709defineProperty\u65B9\u6CD5\uFF0C\u6CA1\u6709setter\uFF0C\u901A\u8FC7get\u548C\u65B0\u5EFA\u6570\u7EC4\u65B9\u6CD5\u62E6\u622A\u5668\u4FEE\u6539\u539F\u751F\u65B9\u6CD5push,pop,shift,unshift,splice,sort,reserve\u6765\u5B9E\u73B0\u76D1\u542C\uFF0C\u800C\u901A\u8FC7\u4FEE\u6539\u6570\u7EC4\u4E0B\u6807\u64CD\u4F5C\u6570\u7EC4\u7684\u4E0D\u4F1A\u88AB\u68C0\u6D4B\uFF0C\u6240\u4EE5\u4E13\u95E8\u63D0\u4F9B\u4E86$set\u548C$delete\u6765\u5B9E\u73B0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">4\u3001$set(target, key, value)\u548C$delete(target, propertyName/index)\u65B9\u6CD5\u539F\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u5224\u65ADtarget\u662F\u5426\u662Fundefined\uFF0Cnull\uFF0C\u6216\u8005\u539F\u59CB\u7C7B\u578B,\u6216\u8005vue\u5B9E\u4F8B\uFF0C\u6216\u8005vue\u5B9E\u4F8B\u7684\u8DDF\u6570\u636E\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09target\u4E3A\u6570\u7EC4\uFF0C\u5219\u8FD8\u662F\u901A\u8FC7\u8C03\u7528splice\u64CD\u4F5C\u7D22\u5F15\u66F4\u65B0\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09target\u4E3A\u5BF9\u8C61\uFF0C\u4E14\u4E3A\u54CD\u5E94\u5F0F\uFF0C\u5219\u8C03\u7528defineReactive\u64CD\u4F5C\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF084\uFF09\u66F4\u65B0\u5B8C\u6570\u636E\u540E\u901A\u77E5\u4F9D\u8D56\u66F4\u65B0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u4E09\u3001computed-\u548C-watch-\u548C-methods" tabindex="-1"><strong>\u4E09\u3001computed \u548C watch \u548C methods</strong> <a class="header-anchor" href="#\u4E09\u3001computed-\u548C-watch-\u548C-methods" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001computed</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u8BBE\u8BA1\u521D\u8877\uFF1A\u4E3A\u4E86\u4F7F\u6A21\u677F\u4E2D\u7684\u903B\u8F91\u8FD0\u7B97\u66F4\u7B80\u5355</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u9002\u7528\u4E8E\u6570\u636E\u88AB\u91CD\u590D\u4F7F\u7528\u6216\u8005\u8BA1\u7B97\u590D\u6742\u8D39\u65F6\u7684\u573A\u666F\uFF1B\u4F9D\u8D56\u5176\u4ED6\u6570\u636E\u7684\u573A\u666F</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09\u8BFB\u53D6\u7F13\u5B58\uFF0C\u4F9D\u8D56\u4E0D\u53D8\uFF0C\u5219\u4E0D\u9700\u91CD\u65B0\u8BA1\u7B97\u3002\uFF08\u6839\u636Edirty\u6807\u5FD7\u5224\u65AD\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001watch\u662F\u5BF9\u6570\u636E\u7684\u76D1\u542C\u56DE\u8C03</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001computed\u548Cwatch\u7684\u533A\u522B</span></span>
<span class="line"><span style="color:#A6ACCD;">\u76F8\u540C\u70B9\uFF1A\u90FD\u4F1A\u89C2\u5BDF\u9875\u9762\u7684\u6570\u636E\u53D8\u5316</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E0D\u540C\u70B9\uFF1A\uFF081\uFF09computed\u662F\u8BFB\u53D6\u7F13\u5B58\uFF0Cwatch\u6BCF\u6B21\u90FD\u8981\u91CD\u65B0\u6267\u884C\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09watch\u66F4\u9002\u5408\u6570\u636E\u53D8\u5316\u65F6\u7684\u5F02\u6B65\u64CD\u4F5C\u548C\u5F00\u9500\u8F83\u5927\u7684\u64CD\u4F5C\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">4\u3001computed\u548Cmethods\u7684\u533A\u522B</span></span>
<span class="line"><span style="color:#A6ACCD;">computed\u4F9D\u8D56\u7F13\u5B58\uFF0C\u53EF\u4EE5\u5B9A\u4E49getter\u548Csetter\uFF0C\u4F46\u662Fmethods\u4E0D\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u56DB\u3001vue-router-\u7684\u6A21\u5F0F\u533A\u522B" tabindex="-1"><strong>\u56DB\u3001vue-router \u7684\u6A21\u5F0F\u533A\u522B</strong> <a class="header-anchor" href="#\u56DB\u3001vue-router-\u7684\u6A21\u5F0F\u533A\u522B" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001abstract\uFF1A\u975E\u6D4F\u89C8\u5668\u73AF\u5883\u4E0B\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001hash\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u9ED8\u8BA4\u3002\u76D1\u542Chashchange\u5B9E\u73B0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u6709\u70B9\uFF0C\u517C\u5BB9\u6027\u597D\uFF0Cie8\u652F\u6301</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09\u7F3A\u70B9\uFF1A\u770B\u8D77\u6765\u5947\u602A</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001history\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09h5\u65B0\u589E\u7684\u3002\u5141\u8BB8\u5F00\u53D1\u8005\u76F4\u63A5\u4FEE\u6539\u524D\u7AEF\u8DEF\u7531\u800C\u4E0D\u91CD\u65B0\u89E6\u53D1\u8BF7\u6C42\u9875\u9762</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u5B9E\u73B0\u539F\u7406\uFF1A\u76D1\u542Cpopstate\u4E8B\u4EF6\u3002\u80FD\u76D1\u542C\u5230\u7528\u6237\u70B9\u51FB\u6D4F\u89C8\u5668\u7684\u524D\u8FDB\u540E\u9000\u4E8B\u4EF6\u6216\u8005\u624B\u52A8\u8C03\u7528go\uFF0Cback\uFF0Cforward\u4E8B\u4EF6\uFF1B\u4E0D\u80FD\u76D1\u542C\u5230pushState\u548CreplaceState\u4E8B\u4EF6\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF083\uFF09\u4E3A\u4E86\u907F\u514D\u6D4F\u89C8\u5668\u5237\u65B0\u51FA\u73B0\u7684404\u9875\u9762\uFF0C\u9700\u8981\u5728\u670D\u52A1\u7AEF\u914D\u7F6E\u517C\u5BB9\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF084\uFF09\u5982\u679C\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\uFF0C\u4F1A\u964D\u7EA7\u5230hash\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">* \u901A\u8FC7vue.use\u63D2\u4EF6\u673A\u5236\u548Cvue.mixin\u5C06store\u5728beforeCreate\u548Cdestroyed\u751F\u547D\u5468\u671F\u8FDB\u884C\u6DF7\u5165\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u4E94\u3001vuex-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" tabindex="-1"><strong>\u4E94\u3001vuex \u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898</strong> <a class="header-anchor" href="#\u4E94\u3001vuex-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001vuex\u89E3\u51B3\u4E86vue\u9879\u76EE\u4E2D\u7684\u6570\u636E\u72B6\u6001\u7BA1\u7406\u95EE\u9898</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001\u662F\u7EC4\u4EF6\u901A\u4FE1\u7684\u4E00\u79CD\u65B9\u5F0F\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001\u539F\u7406\uFF1A\u521B\u5EFA\u4E86\u5355\u4E00\u7684\u72B6\u6001\u6811\uFF0C\u5305\u542Bstate\uFF0Cmutation\uFF0Caction\uFF0Cgetter\uFF0Cmodule\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">4\u3001view(dispatch)action(commit)mutation(mutate)state(render)view</span></span>
<span class="line"><span style="color:#A6ACCD;">5\u3001\u901A\u8FC7vue\u7684data\u548Ccomputed\uFF0C\u8BA9state\u53D8\u6210\u54CD\u5E94\u5F0F\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">6\u3001\u901A\u8FC7vue.use\u63D2\u4EF6\u673A\u5236\u548Cvue.mixin\u5C06store\u5728beforeCreate\u751F\u547D\u5468\u671F\u8FDB\u884C\u6DF7\u5165\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u516D\u3001nexttick-\u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684" tabindex="-1"><strong>\u516D\u3001nextTick \u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684</strong> <a class="header-anchor" href="#\u516D\u3001nexttick-\u662F\u600E\u4E48\u662F\u5B9E\u73B0\u7684" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001\u4F5C\u7528\uFF1A\u5C06\u56DE\u8C03\u5EF6\u8FDF\u5230\u4E0B\u6B21DOM\u66F4\u65B0\u5FAA\u73AF\u4E4B\u540E\u6267\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001\u539F\u56E0\uFF1AVUE\u5728\u66F4\u65B0DOM\u65F6\u662F\u5F02\u6B65\u7684\uFF0Cvue\u68C0\u6D4B\u5230\u6570\u636E\u53D8\u5316\u540E\uFF0C\u4E0D\u4F1A\u7ACB\u5373\u66F4\u65B0DOM\uFF0C\u800C\u662F\u4F1A\u5F00\u542F\u4E00\u4E2A\u4E8B\u4EF6\u961F\u5217\uFF0C\u5E76\u7F13\u51B2\u540C\u4E00\u65F6\u95F4\u5FAA\u73AF\u4E2D\u7684\u6240\u6709\u6570\u636E\u53D8\u66F4\uFF0C\u5728\u4E0B\u4E00\u6B21tick\u4E2D\uFF0C\u6267\u884C\u66F4\u65B0DOM\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001js\u7684\u8FD0\u884C\u673A\u5236\uFF1Ajs\u662F\u5355\u7EBF\u7A0B\u7684\uFF0C\u57FA\u4E8E\u4E8B\u4EF6\u5FAA\u73AF\uFF0C\u6709\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">4\u3001\u5185\u90E8\u539F\u7406\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF081\uFF09\u80FD\u529B\u68C0\u6D4B\uFF1APromise.then(\u5FAE), MutationObserve(\u5FAE)\uFF0CsetImmediate(\u5FAE),setTimeout(\u5B8F)</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF082\uFF09\u5C06\u56DE\u8C03\u51FD\u6570\u63A8\u5165\u56DE\u8C03\u961F\u5217\uFF0C\u9501\u4E0A\u6613\u6B65\u9501\uFF0C\u6267\u884C\u56DE\u8C03\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u4E03\u3001keep-alive-\u5185\u7F6E\u7EC4\u4EF6\u548C-lru-\u7B97\u6CD5-\u961F\u5217" tabindex="-1"><strong>\u4E03\u3001keep-alive \u5185\u7F6E\u7EC4\u4EF6\u548C LRU \u7B97\u6CD5\uFF08\u961F\u5217\uFF09</strong> <a class="header-anchor" href="#\u4E03\u3001keep-alive-\u5185\u7F6E\u7EC4\u4EF6\u548C-lru-\u7B97\u6CD5-\u961F\u5217" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">1\u3001\u81EA\u8EAB\u4E0D\u4F1A\u6E32\u67D3\u6210DOM\uFF0C\u6CA1\u6709\u5E38\u89C4\u7684&lt;template&gt;\u6807\u7B7E\uFF0C\u662F\u4E2A\u51FD\u6570\u7EC4\u4EF6\uFF0C\u88AB\u4ED6\u5305\u88F9\u7684\u7EC4\u4EF6\uFF0C\u5207\u6362\u65F6\u4F1A\u88AB\u7F13\u5B58\u5728\u5185\u5B58\u4E2D\uFF0C\u800C\u4E0D\u662F\u9500\u6BC1\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF081\uFF09\u53EF\u4EE5\u6709\u6761\u4EF6\u7684\u7F13\u5B58:include\uFF08\u5339\u914D\u5230\u7684\u7F13\u5B58\uFF09,exclude\uFF08\u5339\u914D\u5230\u7684\u4E0D\u7F13\u5B58\uFF09,max(\u6700\u591A\u53EF\u4EE5\u7F13\u5B58\u591A\u5C11\u7EC4\u4EF6\u5B9E\u4F8B)</span></span>
<span class="line"><span style="color:#A6ACCD;">2\u3001\u539F\u7406\uFF1A\u5185\u90E8\u7EF4\u62A4\u4E86this.cache\uFF08\u7F13\u5B58\u7684\u7EC4\u4EF6\u5BF9\u8C61\uFF09\u548Cthis.keys\uFF08this.cache\u4E2D\u7684key\uFF09\uFF0C\u8FD0\u7528LRU\u7B56\u7565\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF081\uFF09\u547D\u4E2D\u4E86\u7F13\u5B58\u7684\u7EC4\u4EF6\u8981\u8C03\u6574\u7EC4\u4EF6key\u7684\u987A\u5E8F\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF082\uFF09\u7F13\u5B58\u7684\u7EC4\u4EF6\u6570\u91CF\u5982\u679C\u8D85\u8FC7this.max\u65F6\uFF0C\u8981\u5220\u9664\u7B2C\u4E00\u4E2A\u7F13\u5B58\u7EC4\u4EF6\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">    \uFF083\uFF09LRU(Least recently used\uFF0C\u6700\u8FD1\u6700\u5C11\u4F7F\u7528)\uFF1A\u6839\u636E\u6570\u636E\u7684\u5386\u53F2\u8BBF\u95EE\u8BB0\u5F55\u6765\u8FDB\u884C\u6DD8\u6C70\u6570\u636E\u3002\u201C\u5982\u679C\u6570\u636E\u6700\u8FD1\u88AB\u8BBF\u95EE\u8FC7\uFF0C\u90A3\u4E48\u5C06\u6765\u88AB\u8BBF\u95EE\u7684\u51E0\u7387\u4E5F\u66F4\u9AD8\u3002\u201D</span></span>
<span class="line"><span style="color:#A6ACCD;">3\u3001\u751F\u547D\u5468\u671F\u94A9\u5B50\uFF1Aactivated\u548Cdeactivated\uFF0C\u88ABkeep-alive\u5305\u62EC\u7684\u7EC4\u4EF6\u6FC0\u6D3B\u548C\u505C\u7528\u65F6\u8C03\u7528\u3002\u5148\u505C\u7528\u7EC4\u4EF6\u7684deactivated\uFF0C\u518D\u6FC0\u6D3B\u7EC4\u4EF6\u7684activated</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u516B\u3001vue3-\u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" tabindex="-1"><strong>\u516B\u3001Vue3 \u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F</strong> <a class="header-anchor" href="#\u516B\u3001vue3-\u7684\u4E03\u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F" aria-hidden="true">#</a></h2><ul><li>props</li><li>emit</li><li>v-model</li><li>refs</li><li>provide/inject</li><li>eventBus</li><li>vuex/pinia(\u72B6\u6001\u7BA1\u7406\u5DE5\u5177)</li></ul><p><strong>1\u3001Props \u65B9\u5F0F</strong></p><p><code>Props</code>\u65B9\u5F0F\u662F Vue \u4E2D\u6700\u5E38\u89C1\u7684\u4E00\u79CD<strong>\u7236\u4F20\u5B50</strong>\u7684\u4E00\u79CD\u65B9\u5F0F\uFF0C\u4F7F\u7528\u4E5F\u6BD4\u8F83\u7B80\u5355\u3002</p><p>\u6839\u636E\u4E0A\u9762\u7684 demo\uFF0C\u6211\u4EEC\u5C06\u6570\u636E\u4EE5\u53CA\u5BF9\u6570\u636E\u7684\u64CD\u4F5C\u5B9A\u4E49\u5728\u7236\u7EC4\u4EF6\uFF0C\u5B50\u7EC4\u4EF6\u4EC5\u505A\u5217\u8868\u7684\u4E00\u4E2A\u6E32\u67D3\uFF1B</p><p>\u7236\u7EC4\u4EF6\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u5B50\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components :list=&quot;list&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u7236\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;\u8BF7\u8F93\u5165&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6DFB\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add \u89E6\u53D1\u540E\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B50\u7EC4\u4EF6\u53EA\u9700\u8981\u5BF9\u7236\u7EC4\u4EF6\u4F20\u9012\u7684\u503C\u8FDB\u884C\u6E32\u67D3\u5373\u53EF\uFF0C\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in props.list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { defineProps } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const props = defineProps({</span></span>
<span class="line"><span style="color:#A6ACCD;">  list: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: Array,</span></span>
<span class="line"><span style="color:#A6ACCD;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>2\u3001emit \u65B9\u5F0F</strong></p><p><code>emit</code>\u65B9\u5F0F\u4E5F\u662F Vue \u4E2D\u6700\u5E38\u89C1\u7684\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F\uFF0C\u8BE5\u65B9\u5F0F\u7528\u4E8E<strong>\u5B50\u4F20\u7236</strong>\uFF1B</p><p>\u6839\u636E\u4E0A\u9762\u7684 demo\uFF0C\u6211\u4EEC\u5C06\u5217\u8868\u5B9A\u4E49\u5728\u7236\u7EC4\u4EF6\uFF0C\u5B50\u7EC4\u4EF6\u53EA\u9700\u8981\u4F20\u9012\u6DFB\u52A0\u7684\u503C\u5373\u53EF\u3002</p><p>\u5B50\u7EC4\u4EF6\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;\u8BF7\u8F93\u5165&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleSubmit&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6DFB\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineEmits } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const emits = defineEmits([&#39;add&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleSubmit = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  emits(&#39;add&#39;, value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u5B50\u7EC4\u4EF6\u4E2D\u70B9\u51FB\u3010\u6DFB\u52A0\u3011\u6309\u94AE\u540E\uFF0C<code>emit</code>\u4E00\u4E2A\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF0C\u5E76\u5C06\u6DFB\u52A0\u7684\u503C\u4F5C\u4E3A\u53C2\u6570\u4F20\u9012\u3002</p><p>\u7236\u7EC4\u4EF6\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u7236\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u5B50\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components @add=&quot;handleAdd&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">// add \u89E6\u53D1\u540E\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = value =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u7236\u7EC4\u4EF6\u4E2D\u53EA\u9700\u8981\u76D1\u542C\u5B50\u7EC4\u4EF6\u81EA\u5B9A\u4E49\u7684\u4E8B\u4EF6\uFF0C\u7136\u540E\u6267\u884C\u5BF9\u5E94\u7684\u6DFB\u52A0\u64CD\u4F5C\u3002</p><p><strong>3\u3001v-model \u65B9\u5F0F</strong></p><p><code>v-model</code>\u662F Vue \u4E2D\u4E00\u4E2A\u6BD4\u8F83\u51FA\u8272\u7684\u8BED\u6CD5\u7CD6\uFF0C\u5C31\u6BD4\u5982\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;ChildComponent v-model:title=&quot;pageTitle&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5C31\u662F\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801\u7684\u7B80\u5199\u5F62\u52BF</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;ChildComponent :title=&quot;pageTitle&quot; @update:title=&quot;pageTitle = $event&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>v-model</code>\u786E\u5B9E\u7B80\u4FBF\u4E86\u4E0D\u5C11\uFF0C\u73B0\u5728\u6211\u4EEC\u5C31\u6765\u770B\u4E00\u4E0B\u4E0A\u9762\u90A3\u4E2A demo\uFF0C\u5982\u4F55\u7528 v-model \u5B9E\u73B0\u3002</p><p>\u5B50\u7EC4\u4EF6</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;\u8BF7\u8F93\u5165&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6DFB\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineEmits, defineProps } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const props = defineProps({</span></span>
<span class="line"><span style="color:#A6ACCD;">  list: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: Array,</span></span>
<span class="line"><span style="color:#A6ACCD;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">const emits = defineEmits([&#39;update:list&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u6DFB\u52A0\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const arr = props.list</span></span>
<span class="line"><span style="color:#A6ACCD;">  arr.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  emits(&#39;update:list&#39;, arr)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u5B50\u7EC4\u4EF6\u4E2D\u6211\u4EEC\u9996\u5148\u5B9A\u4E49<code>props</code>\u548C<code>emits</code>\uFF0C\u7136\u540E\u6DFB\u52A0\u5B8C\u6210\u4E4B\u540E<code>emit</code>\u6307\u5B9A\u4E8B\u4EF6\u3002</p><blockquote><p>\u6CE8\uFF1A<code>update:*</code>\u662F Vue \u4E2D\u7684\u56FA\u5B9A\u5199\u6CD5\uFF0C<code>*</code>\u8868\u793A<code>props</code>\u4E2D\u7684\u67D0\u4E2A\u5C5E\u6027\u540D\u3002</p></blockquote><p>\u7236\u7EC4\u4EF6\u4E2D\u4F7F\u7528\u5C31\u6BD4\u8F83\u7B80\u5355\uFF0C\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u7236\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u5B50\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components v-model:list=&quot;list&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>4\u3001refs \u65B9\u5F0F</strong></p><p>\u5728\u4F7F\u7528\u9009\u9879\u5F0F API \u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7<code>this.$refs.name</code>\u7684\u65B9\u5F0F\u83B7\u53D6\u6307\u5B9A\u5143\u7D20\u6216\u8005\u7EC4\u4EF6\uFF0C\u4F46\u662F\u7EC4\u5408\u5F0F API \u4E2D\u5C31\u65E0\u6CD5\u4F7F\u7528\u54EA\u79CD\u65B9\u5F0F\u83B7\u53D6\u3002\u5982\u679C\u6211\u4EEC\u60F3\u8981\u901A\u8FC7<code>ref</code>\u7684\u65B9\u5F0F\u83B7\u53D6\u7EC4\u4EF6\u6216\u8005\u5143\u7D20\uFF0C\u9700\u8981\u5B9A\u4E49\u4E00\u4E2A\u540C\u540D\u7684 Ref \u5BF9\u8C61\uFF0C\u5728\u7EC4\u4EF6\u6302\u8F7D\u540E\u5C31\u53EF\u4EE5\u8BBF\u95EE\u4E86\u3002</p><p>\u793A\u4F8B\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in childRefs?.list&quot; :key=&quot;i&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      {{ i }}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u5B50\u7EC4\u4EF6 ref\u7684\u503C\u4E0E&lt;script&gt;\u4E2D\u7684\u4FDD\u6301\u4E00\u81F4 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components ref=&quot;childRefs&quot;&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u7236\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const childRefs = ref(null)</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B50\u7EC4\u4EF6\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;\u8BF7\u8F93\u5165&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6DFB\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, defineExpose } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add \u89E6\u53D1\u540E\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">defineExpose({ list })</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>setup</code>\u7EC4\u4EF6\u9ED8\u8BA4\u662F\u5173\u95ED\u7684\uFF0C\u4E5F\u5373\u901A\u8FC7\u6A21\u677F<code>ref</code>\u83B7\u53D6\u5230\u7684\u7EC4\u4EF6\u7684\u516C\u5F00\u5B9E\u4F8B\uFF0C<strong>\u4E0D\u4F1A\u66B4\u9732\u4EFB\u4F55\u5728**</strong><code>&lt;script setup&gt;</code>*<strong>*\u4E2D\u58F0\u660E\u7684\u7ED1\u5B9A</strong>\u3002\u5982\u679C\u9700\u8981<strong>\u516C\u5F00\u9700\u8981\u901A\u8FC7**</strong><code>defineExpose</code>*<strong>* API \u66B4\u9732</strong>\u3002</p><p><strong>5\u3001provide/inject \u65B9\u5F0F</strong></p><p><code>provide</code>\u548C<code>inject</code>\u662F Vue \u4E2D\u63D0\u4F9B\u7684\u4E00\u5BF9 API\uFF0C\u8BE5 API \u53EF\u4EE5\u5B9E\u73B0\u7236\u7EC4\u4EF6\u5411\u5B50\u7EC4\u4EF6\u4F20\u9012\u6570\u636E\uFF0C\u65E0\u8BBA\u5C42\u7EA7\u6709\u591A\u6DF1\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7\u8FD9\u5BF9 API \u5B9E\u73B0\u3002\u793A\u4F8B\u4EE3\u7801\u5982\u4E0B\u6240\u793A\uFF1A</p><p>\u7236\u7EC4\u4EF6</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u5B50\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child-components&gt;&lt;/child-components&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- \u7236\u7EC4\u4EF6 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;child-wrap input-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      type=&quot;text&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;form-control&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      placeholder=&quot;\u8BF7\u8F93\u5165&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;input-group-append&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;handleAdd&quot; class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u6DFB\u52A0</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, provide } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ChildComponents from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = ref([&#39;JavaScript&#39;, &#39;HTML&#39;, &#39;CSS&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">const value = ref(&#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u5411\u5B50\u7EC4\u4EF6\u63D0\u4F9B\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">provide(&#39;list&#39;, list.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">// add \u89E6\u53D1\u540E\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleAdd = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  list.value.push(value.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">  value.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B50\u7EC4\u4EF6</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;ul class=&quot;parent list-group&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;li class=&quot;list-group-item&quot; v-for=&quot;i in list&quot; :key=&quot;i&quot;&gt;{{ i }}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { inject } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u63A5\u53D7\u7236\u7EC4\u4EF6\u63D0\u4F9B\u7684\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = inject(&#39;list&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">\u590D\u5236\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u503C\u5F97\u6CE8\u610F\u7684\u662F<strong>\u4F7F\u7528<code>provide</code>\u8FDB\u884C\u6570\u636E\u4F20\u9012\u65F6\uFF0C\u5C3D\u91CF<code>readonly</code>\u8FDB\u884C\u6570\u636E\u7684\u5305\u88C5\uFF0C\u907F\u514D\u5B50\u7EC4\u4EF6\u4FEE\u6539\u7236\u7EA7\u4F20\u9012\u8FC7\u53BB\u7684\u6570\u636E</strong>\u3002</p><p><strong>6\u3001\u4E8B\u4EF6\u603B\u7EBF</strong></p><p>Vue3 \u4E2D\u79FB\u9664\u4E86\u4E8B\u4EF6\u603B\u7EBF\uFF0C\u4F46\u662F\u53EF\u4EE5\u501F\u52A9\u4E8E\u7B2C\u4E09\u65B9\u5DE5\u5177\u6765\u5B8C\u6210\uFF0CVue \u5B98\u65B9\u63A8\u8350<strong>mitt</strong>[2]\u6216<strong>tiny-emitter</strong>[3]\uFF1B</p><p>\u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u4E0D\u63A8\u8350\u4F7F\u7528\u5168\u5C40\u4E8B\u4EF6\u603B\u7EBF\u7684\u65B9\u5F0F\u6765\u5B9E\u73B0\u7EC4\u4EF6\u901A\u4FE1\uFF0C\u867D\u7136\u6BD4\u8F83\u7B80\u5355\u7C97\u66B4\uFF0C\u4F46\u662F\u957F\u4E45\u6765\u8BF4\u7EF4\u62A4\u4E8B\u4EF6\u603B\u7EBF\u662F\u4E00\u4E2A\u5927\u96BE\u9898\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5C31\u4E0D\u5C55\u5F00\u8BB2\u89E3\u4E86\uFF0C\u5177\u4F53\u53EF\u4EE5\u9605\u8BFB\u5177\u4F53\u5DE5\u5177\u7684\u6587\u6863</p><p><strong>7\u3001\u72B6\u6001\u7BA1\u7406\u5DE5\u5177</strong></p><p><strong>Vuex</strong>[4]\u548C<strong>Pinia</strong>[5]\u662F Vue3 \u4E2D\u7684\u72B6\u6001\u7BA1\u7406\u5DE5\u5177\uFF0C\u4F7F\u7528\u8FD9\u4E24\u4E2A\u5DE5\u5177\u53EF\u4EE5\u8F7B\u677E\u5B9E\u73B0\u7EC4\u4EF6\u901A\u4FE1\uFF0C\u7531\u4E8E\u8FD9\u4E24\u4E2A\u5DE5\u5177\u529F\u80FD\u6BD4\u8F83\u5F3A\u5927\uFF0C\u8FD9\u91CC\u5C31\u4E0D\u505A\u5C55\u793A\u4E86\uFF0C\u5177\u4F53\u53EF\u4EE5\u67E5\u9605\u6587\u6863</p>`,64),t=[e];function o(c,i,r,C,A,u){return n(),a("div",null,t)}const D=s(p,[["render",o]]);export{y as __pageData,D as default};
