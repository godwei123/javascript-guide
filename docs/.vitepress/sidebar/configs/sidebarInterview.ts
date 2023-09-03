import { DefaultTheme } from "vitepress";

const sidebarInterview: DefaultTheme.SidebarItem[] = [
  {
    text: "Html",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/html-interview" }],
  },
  {
    text: "CSS",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/css-interview" }],
  },
  {
    text: "JavaScript",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/js-interview" }],
  },
  {
    text: "计算机网络",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/network-interview" }],
  },
  {
    text: "浏览器原理",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/browser-interview" }],
  },
  {
    text: "Vue",
    collapsed: true,
    items: [
      { text: "Introduction", link: "/interview/vue/introduction" },
      { text: "Interview", link: "/interview/vue/interview" },
      { text: "Vue 基础", link: "/interview/vue/vue基础" },
      { text: "Vue 原理", link: "/interview/vue/vue原理" },
    ],
  },
  {
    text: "React",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/react-interview.md" }],
  },
  {
    text: "项目优化",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/optimize-interview.md" }],
  },
  {
    text: "项目管理",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/project-interview.md" }],
  },
  {
    text: "项目打包",
    collapsed: true,
    items: [{ text: "面试题", link: "/interview/webpack-interview.md" }],
  },
];

export default sidebarInterview;
