import { DefaultTheme } from "vitepress";

export const sidebarHTML: DefaultTheme.SidebarItem[] = [
  {
    text: "HTML",
    items: [
      { text: "Introduction", link: "/html/introduction" },
      { text: "HTML元素", link: "/html/element" },
      { text: "HTML属性", link: "/html/attribute" },
    ],
  },
];
export const sidebarNetwork: DefaultTheme.SidebarItem[] = [
  {
    text: "web网络",
    items: [
      { text: "Introduction", link: "/network/introduction" },
      { text: "TCP/UDP", link: "/network/tcp" },
      { text: "HTTP", link: "/network/http" },
    ],
  },
];

export const sidebarBrowser: DefaultTheme.SidebarItem[] = [
  {
    text: "浏览器",
    items: [
      { text: "Introduction", link: "/browser/introduction" },
      { text: "浏览器存储", link: "/browser/浏览器存储" },
      { text: "浏览器跨域", link: "/browser/浏览器跨域" },
      { text: "浏览器缓存", link: "/browser/浏览器缓存" },
      { text: "浏览器安全", link: "/browser/浏览器安全" },
      { text: "浏览器渲染", link: "/browser/浏览器渲染" },
      { text: "浏览器性能", link: "/browser/浏览器性能" },
      { text: "浏览器插件", link: "/browser/浏览器插件" },
      { text: "移动端适配", link: "/browser/移动端适配" },
    ],
  },
];

export const sidebarCode = [
  {
    text: "代码",
    items: [
      { text: "Introduction", link: "/code/introduction" },
      { text: "手写代码", link: "/code/coding" },
      { text: "代码输出", link: "/code/output" },
      { text: "文件上传", link: "/code/file-upload" },
      { text: "文件下载", link: "/code/file-download" },
      { text: "懒加载", link: "/code/lazy-load" },
    ],
  },
];
