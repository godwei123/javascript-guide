import{d as m,h as f,C as a,o as r,b as y,w as s,H as o,l as h,k as v,_ as g,c as x}from"./chunks/framework.00751356.js";const b=["src"],k=m({__name:"main",setup(c){const t=f("01"),_=Array(24).fill(0).map((l,e)=>{const n=(e+1).toString().padStart(2,"0");return{label:`页面${n}`,key:n}});return(l,e)=>{const n=a("n-menu"),i=a("n-layout-sider"),u=a("n-layout-content"),d=a("n-layout");return r(),y(d,{class:"main-box-layout","has-sider":""},{default:s(()=>[o(i,{width:200,bordered:"","content-style":"padding: 12px;"},{default:s(()=>[o(n,{value:t.value,"onUpdate:value":e[0]||(e[0]=p=>t.value=p),options:h(_)},null,8,["value","options"])]),_:1}),o(u,{"content-style":"padding: 24px;"},{default:s(()=>[v("iframe",{src:`/javascript-guide/html/index${t.value}.html`,frameborder:"0",height:"100%",scrolling:"no",width:"100%"},null,8,b)]),_:1})]),_:1})}}});const w=g(k,[["__scopeId","data-v-6a0c0f7c"]]),N=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page","footer":false},"headers":[],"relativePath":"study/others/main.md","filePath":"study/others/main.md"}'),B={name:"study/others/main.md"},O=Object.assign(B,{setup(c){return(t,_)=>(r(),x("div",null,[o(w)]))}});export{N as __pageData,O as default};
