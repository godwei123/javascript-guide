import{_ as s,c as a,o as n,V as e}from"./chunks/framework.25f281e8.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/git.md","filePath":"interview/git.md"}'),l={name:"interview/git.md"},p=e(`<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git add .</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m ‘message’</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch // 查看分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch 分支名称  // 创建新分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -b 分支名称 // 创建并切换到新分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -r //查看远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -d 分支名称 // 删除分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin --delete 分支名称 // 删除远程分支</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git merge 分支名称</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//当前在master分支执行命令，git merge dev  ==&gt; master = master + dev</span></span></code></pre></div>`,2),t=[p];function c(o,i,r,C,A,d){return n(),a("div",null,t)}const m=s(l,[["render",c]]);export{_ as __pageData,m as default};
