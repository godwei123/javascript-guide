import { DefaultTheme } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "JavaScript",
    link: "/javascript/introduction",
  },
  {
    text: "前端",
    items: [
      {
        text: "html & css",
        link: "/basic/html/introduction",
      },
      {
        text: "浏览器 & 网络",
        link: "/basic/browser/introduction",
      },
      {
        text: "Coding",
        link: "/basic/code/introduction",
      },
    ],
  },
  {
    text: "blog",
    link: "/blog/introduction",
  },
  {
    text: "About",
    link: "/about",
  },
];

export default nav;
