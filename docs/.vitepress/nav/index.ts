import { DefaultTheme } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "JavaScript",
    link: "/javascript/introduction",
  },
  {
    text: "基础",
    items: [
      {
        text: "html",
        link: "/basic/html/introduction",
      },
      {
        text: "css",
        link: "/basic/css/introduction",
      },
      {
        text: "浏览器",
        link: "/basic/browser/introduction",
      },
      {
        text: "网络",
        link: "/basic/network/introduction",
      },
    ],
  },
  {
    text: "Coding",
    link: "/advance/code/introduction",
  },
  {
    text: "学习",
    items: [
      {
        text: "kotlin",
        link: "/study/kotlin/introduction",
      },
      {
        text: "rust",
        link: "/study/rust/introduction",
      },
    ],
  },
  {
    text: "About",
    link: "/about",
  },
];

export default nav;
