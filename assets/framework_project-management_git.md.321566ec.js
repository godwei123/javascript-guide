import{_ as s,o as n,c as a,g as p}from"./app.c2ea0a85.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"framework/project-management/git.md"}'),e={name:"framework/project-management/git.md"},l=p(`<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git add .</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m \u2018message\u2019</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch // \u67E5\u770B\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch \u5206\u652F\u540D\u79F0  // \u521B\u5EFA\u65B0\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -b \u5206\u652F\u540D\u79F0 // \u521B\u5EFA\u5E76\u5207\u6362\u5230\u65B0\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -r //\u67E5\u770B\u8FDC\u7A0B\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -d \u5206\u652F\u540D\u79F0 // \u5220\u9664\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin --delete \u5206\u652F\u540D\u79F0 // \u5220\u9664\u8FDC\u7A0B\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git merge \u5206\u652F\u540D\u79F0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//\u5F53\u524D\u5728master\u5206\u652F\u6267\u884C\u547D\u4EE4\uFF0Cgit merge dev  ==&gt; master = master + dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,2),t=[l];function o(c,r,i,C,A,d){return n(),a("div",null,t)}const y=s(e,[["render",o]]);export{_ as __pageData,y as default};
