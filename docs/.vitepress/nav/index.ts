import { DefaultTheme } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "JavaScript",
    link: "/javascript/introduction",
  },
  {
    text: "CSS",
    link: "/css/introduction",
  },

  {
    text: "Other",
    items: [
      {
        text: "network",
        link: "/network/introduction",
      },
      {
        text: "coding",
        link: "/code/introduction",
      },
      {
        text: "HTML",
        link: "/html/introduction",
      },
      {
        text: "browser",
        link: "/browser/introduction",
      },
    ],
  },
  // {
  //   text: "network",
  //   link: "/browser/introduction",
  // },
  // {
  //   text: "coding",
  //   link: "/code/introduction",
  // },
  {
    text: "blog",
    link: "/blog/introduction",
  },
  {
    text: "about",
    link: "/about",
  },
];

export default nav;
