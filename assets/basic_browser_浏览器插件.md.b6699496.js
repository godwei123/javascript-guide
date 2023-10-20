import{_ as s,c as n,o as a,Q as o}from"./chunks/framework.00751356.js";const F=JSON.parse('{"title":"Chrome 浏览器插件","description":"","frontmatter":{},"headers":[],"relativePath":"basic/browser/浏览器插件.md","filePath":"basic/browser/浏览器插件.md"}'),l={name:"basic/browser/浏览器插件.md"},p=o(`<h1 id="chrome-浏览器插件" tabindex="-1">Chrome 浏览器插件 <a class="header-anchor" href="#chrome-浏览器插件" aria-label="Permalink to &quot;Chrome 浏览器插件&quot;">​</a></h1><h2 id="核心" tabindex="-1">核心 <a class="header-anchor" href="#核心" aria-label="Permalink to &quot;核心&quot;">​</a></h2><ol><li>manifest</li></ol><p>manifest 是唯一的必要文件，具有特定文件名：<code>manifest.json</code>，还必须位于扩展的根目录中。manifest 记录重要的元数据，定义资源，声明权限，并确定在后台和页面上运行哪些文件。</p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 清单文件的版本，这个必须写，而且必须是2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">manifest_version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 插件的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;demo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 插件的版本</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1.0.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 插件描述</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;简单的Chrome扩展demo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 图标，一般偷懒全部用一个尺寸的也没问题</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">icons</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;16&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;img/icon.png&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;48&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;img/icon.png&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;128&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;img/icon.png&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 会一直常驻的后台JS或后台页面</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">background</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2种指定方式，如果指定JS，那么会自动生成一个背景页</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">page</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;background.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//&quot;scripts&quot;: [&quot;js/background.js&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 浏览器右上角图标设置，browser_action、page_action、app必须三选一</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">browser_action</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default_icon</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;img/icon.png&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 图标悬停时的标题，可选</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default_title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;这是一个示例Chrome插件&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default_popup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;popup.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 当某些特定页面打开才显示的图标</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*&quot;page_action&quot;:</span></span>
<span class="line"><span style="color:#6A737D;">  {</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_icon&quot;: &quot;img/icon.png&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_title&quot;: &quot;我是pageAction&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_popup&quot;: &quot;popup.html&quot;</span></span>
<span class="line"><span style="color:#6A737D;">  },*/</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 需要直接注入页面的JS</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">content_scripts</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//&quot;matches&quot;: [&quot;http://*/*&quot;, &quot;https://*/*&quot;],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// &quot;&lt;all_urls&gt;&quot; 表示匹配所有地址</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">matches</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&lt;all_urls&gt;&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 多个JS按顺序注入</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">js</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;js/jquery-1.8.3.js&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;js/content-script.js&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">css</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;css/custom.css&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 代码注入的时间，可选值： &quot;document_start&quot;, &quot;document_end&quot;, or &quot;document_idle&quot;，最后一个表示页面空闲时，默认document_idle</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">run_at</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;document_start&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这里仅仅是为了演示content-script可以配置多个规则</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">matches</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;*://*/*.png&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;*://*/*.jpg&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;*://*/*.gif&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;*://*/*.bmp&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">js</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;js/show-image-content-size.js&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 权限申请</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">permissions</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;contextMenus&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 右键菜单</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;tabs&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 标签</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;notifications&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 通知</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;webRequest&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// web请求</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;webRequestBlocking&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;storage&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 插件本地存储</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;http://*/*&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 可以通过executeScript或者insertCSS访问的网站</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;https://*/*&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 可以通过executeScript或者insertCSS访问的网站</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">web_accessible_resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;js/inject.js&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 插件主页，这个很重要，不要浪费了这个免费广告位</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">homepage_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://www.baidu.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 覆盖浏览器默认页面</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">chrome_url_overrides</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 覆盖浏览器默认的新标签页</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">newtab</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;newtab.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Chrome40以前的插件配置页写法</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">options_page</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;options.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">options_ui</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">page</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;options.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 添加一些默认的样式，推荐使用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">chrome_style</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">omnibox</span><span style="color:#E1E4E8;">: { </span><span style="color:#9ECBFF;">keyword</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;go&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 默认语言</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">default_locale</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;zh_CN&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// devtools页面入口，注意只能指向一个HTML文件，不能是JS文件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">devtools_page</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;devtools.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 清单文件的版本，这个必须写，而且必须是2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">manifest_version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 插件的名称</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;demo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 插件的版本</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1.0.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 插件描述</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;简单的Chrome扩展demo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 图标，一般偷懒全部用一个尺寸的也没问题</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">icons</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;16&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;img/icon.png&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;48&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;img/icon.png&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;128&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;img/icon.png&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 会一直常驻的后台JS或后台页面</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">background</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2种指定方式，如果指定JS，那么会自动生成一个背景页</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">page</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;background.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//&quot;scripts&quot;: [&quot;js/background.js&quot;]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 浏览器右上角图标设置，browser_action、page_action、app必须三选一</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">browser_action</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default_icon</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;img/icon.png&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 图标悬停时的标题，可选</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default_title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;这是一个示例Chrome插件&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default_popup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;popup.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 当某些特定页面打开才显示的图标</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*&quot;page_action&quot;:</span></span>
<span class="line"><span style="color:#6A737D;">  {</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_icon&quot;: &quot;img/icon.png&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_title&quot;: &quot;我是pageAction&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">      &quot;default_popup&quot;: &quot;popup.html&quot;</span></span>
<span class="line"><span style="color:#6A737D;">  },*/</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 需要直接注入页面的JS</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">content_scripts</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//&quot;matches&quot;: [&quot;http://*/*&quot;, &quot;https://*/*&quot;],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// &quot;&lt;all_urls&gt;&quot; 表示匹配所有地址</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">matches</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&lt;all_urls&gt;&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 多个JS按顺序注入</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">js</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;js/jquery-1.8.3.js&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;js/content-script.js&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">css</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;css/custom.css&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 代码注入的时间，可选值： &quot;document_start&quot;, &quot;document_end&quot;, or &quot;document_idle&quot;，最后一个表示页面空闲时，默认document_idle</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">run_at</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;document_start&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这里仅仅是为了演示content-script可以配置多个规则</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">matches</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;*://*/*.png&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;*://*/*.jpg&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;*://*/*.gif&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;*://*/*.bmp&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">js</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;js/show-image-content-size.js&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 权限申请</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">permissions</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;contextMenus&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 右键菜单</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;tabs&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 标签</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;notifications&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 通知</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;webRequest&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// web请求</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;webRequestBlocking&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;storage&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 插件本地存储</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;http://*/*&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 可以通过executeScript或者insertCSS访问的网站</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;https://*/*&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 可以通过executeScript或者insertCSS访问的网站</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">web_accessible_resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;js/inject.js&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 插件主页，这个很重要，不要浪费了这个免费广告位</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">homepage_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://www.baidu.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 覆盖浏览器默认页面</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">chrome_url_overrides</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 覆盖浏览器默认的新标签页</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">newtab</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;newtab.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Chrome40以前的插件配置页写法</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">options_page</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;options.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">options_ui</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">page</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;options.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 添加一些默认的样式，推荐使用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">chrome_style</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">omnibox</span><span style="color:#24292E;">: { </span><span style="color:#032F62;">keyword</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;go&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 默认语言</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">default_locale</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;zh_CN&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// devtools页面入口，注意只能指向一个HTML文件，不能是JS文件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">devtools_page</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;devtools.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="2"><li>service worker</li></ol><p>service worker 处理和监听浏览器事件。事件有多种类型，例如导航到新页面、删除书签或关闭选项卡。它可以使用所有 Chrome <a href="https://developer.chrome.com/docs/extensions/reference/" target="_blank" rel="noreferrer">API</a>，但它不能直接与网页的内容交互。</p><ol start="3"><li>Content scripts</li></ol><p>Content scripts 在网页的上下文中执行 Javascript。可以读取和修改注入页面的 DOM，轻松向指定页面注入 JS 和 CSS。内容脚本只能使用 Chrome API 的子集，但可以通过与扩展 service worker 交换消息间接访问其余部分。</p><p>如果没有主动指定 run_at 为 document_start（默认为 document_idle）,下面这种代码是不会生效的:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">document.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DOMContentLoaded&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;我被执行了！&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">document.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DOMContentLoaded&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;我被执行了！&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>content-scripts 和原始页面共享 DOM，但是不共享 JS，如要访问页面 JS（例如某个 JS 变量），只能通过 injected js 来实现。content-scripts 不能访问绝大部分 chrome.xxx.api，除了下面这 4 种：</p><ul><li>chrome.extension(getURL, inIncognitoContext, lastError, onRequest, sendRequest)</li><li>chrome.i18n</li><li>chrome.runtime(connect, getManifest, getURL, id, onConnect, onMessage, sendMessage)</li><li>chrome.storage</li></ul><ol start="4"><li>background</li></ol><p>生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面。background 的权限非常高，几乎可以调用所有的 Chrome 扩展 API（除了 devtools），而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置 CORS。</p><ol start="5"><li>popup and other pages</li></ol><p>扩展名可以包括各种 HTML 文件，例如弹出窗口、选项页面和其他 HTML 页面。所有这些页面都可以访问 Chrome API。</p><h2 id="插件展示形式" tabindex="-1">插件展示形式 <a class="header-anchor" href="#插件展示形式" aria-label="Permalink to &quot;插件展示形式&quot;">​</a></h2><h2 id="通信" tabindex="-1">通信 <a class="header-anchor" href="#通信" aria-label="Permalink to &quot;通信&quot;">​</a></h2><h2 id="权限" tabindex="-1">权限 <a class="header-anchor" href="#权限" aria-label="Permalink to &quot;权限&quot;">​</a></h2><table><thead><tr><th>JS 种类</th><th>可访问的 API</th><th>DOM 访问情况</th><th>JS 访问情况</th><th>直接跨域</th></tr></thead><tbody><tr><td>injected script</td><td>和普通 JS 无任何差别，不能访问任何扩展 API</td><td>可以访问</td><td>可以访问</td><td>不可以</td></tr><tr><td>content script</td><td>只能访问 extension、runtime 等部分 API</td><td>可以访问</td><td>不可以</td><td>不可以</td></tr><tr><td>popup js</td><td>可访问绝大部分 API，除了 devtools 系列</td><td>不可直接访问</td><td>不可以</td><td>可以</td></tr><tr><td>background js</td><td>可访问绝大部分 API，除了 devtools 系列</td><td>不可直接访问</td><td>不可以</td><td>可以</td></tr><tr><td>devtools js</td><td>只能访问 devtools、extension、runtime 等部分 API</td><td>可以</td><td>可以</td><td>不可以</td></tr></tbody></table><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2>`,22),t=[p];function e(c,r,E,y,i,u){return a(),n("div",null,t)}const d=s(l,[["render",e]]);export{F as __pageData,d as default};
