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
  {
    text: "CSS",
    items: [
      { text: "Introduction", link: "/basic/css/introduction" },
      { text: "flex布局", link: "/basic/css/flex" },
      { text: "grid布局", link: "/basic/css/grid" },
      { text: "居中", link: "/basic/css/center" },
      { text: "常见布局", link: "/basic/css/layout" },
      { text: "BFC", link: "/basic/css/bfc" },
      { text: "层叠与定位", link: "/basic/css/position" },
      { text: "过渡与动画", link: "/basic/css/transition-animation" },
      { text: "伪类与伪元素", link: "/basic/css/pseudo-classes-element" },
      { text: "CSS选择器", link: "/basic/css/selectors" },
      { text: "@font-face", link: "/basic/css/@font-face" },
      { text: "basic-shape", link: "/basic/css/basic-shape" },
      { text: "blend-mode", link: "/basic/css/blend-mode" },
      { text: "clip-path", link: "/basic/css/clip-path" },
      { text: "filter", link: "/basic/css/filter" },
      { text: "masking", link: "/basic/css/masking" },
      { text: "shapes", link: "/basic/css/shapes" },
      { text: "color", link: "/basic/css/color-var-fun" },
      { text: "text-hidden-overflow", link: "/basic/css/text-hidden-overflow" },
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
