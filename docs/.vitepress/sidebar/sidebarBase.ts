import { DefaultTheme } from "vitepress";

export const sidebarBaseHTMLAndCSS: DefaultTheme.SidebarItem[] = [
  {
    text: "HTML",
    items: [
      { text: "Introduction", link: "/basic/html/introduction" },
      { text: "HTML元素", link: "/basic/html/element" },
      { text: "HTML属性", link: "/basic/html/attribute" },
    ],
  },
];
export const sidebarBaseBrowserAndNetwork: DefaultTheme.SidebarItem[] = [
  {
    text: "web网络",
    items: [
      { text: "Introduction", link: "/basic/network/introduction" },
      { text: "TCP/UDP", link: "/basic/network/tcp" },
      { text: "HTTP", link: "/basic/network/http" },
    ],
  },
  {
    text: "浏览器",
    items: [
      { text: "Introduction", link: "/basic/browser/introduction" },
      { text: "浏览器存储", link: "/basic/browser/浏览器存储" },
      { text: "浏览器跨域", link: "/basic/browser/浏览器跨域" },
      { text: "浏览器缓存", link: "/basic/browser/浏览器缓存" },
      { text: "浏览器安全", link: "/basic/browser/浏览器安全" },
      { text: "浏览器渲染", link: "/basic/browser/浏览器渲染" },
      { text: "浏览器性能", link: "/basic/browser/浏览器性能" },
      { text: "浏览器插件", link: "/basic/browser/浏览器插件" },
      { text: "移动端适配", link: "/basic/browser/移动端适配" },
    ],
  },
];

export const sidebarCode = [
  {
    text: "代码",
    items: [
      { text: "Introduction", link: "/basic/code/introduction" },
      { text: "手写代码", link: "/basic/code/Code" },
      { text: "代码输出", link: "/basic/code/output" },
      { text: "文件上传", link: "/basic/code/file-upload" },
      { text: "文件下载", link: "/basic/code/file-download" },
      { text: "懒加载", link: "/basic/code/lazy-load" },
    ],
  },
];
