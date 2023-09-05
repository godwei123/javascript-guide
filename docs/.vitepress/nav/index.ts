import { DefaultTheme } from "vitepress";
import { text } from "stream/consumers";

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
    link: "/code/introduction",
  },
  {
    text: "Interview",
    link: "/interview/introduction",
  },
  {
    text: "About",
    link: "/about",
  },
];

export default nav;
