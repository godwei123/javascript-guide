import{_ as s,o as a,c as n,U as e}from"./chunks/framework.c99fcb40.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"framework/project-management/git.md","filePath":"framework/project-management/git.md"}'),p={name:"framework/project-management/git.md"},l=e(`<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git add .</span></span>
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
<span class="line"><span style="color:#A6ACCD;">//当前在master分支执行命令，git merge dev  ==&gt; master = master + dev</span></span></code></pre></div>`,2),t=[l];function o(c,r,i,C,A,g){return a(),n("div",null,t)}const _=s(p,[["render",o]]);export{d as __pageData,_ as default};
