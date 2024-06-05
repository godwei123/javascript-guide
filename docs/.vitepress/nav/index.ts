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
        text: "Network",
        link: "/network/introduction",
      },
      {
        text: "Coding",
        link: "/code/introduction",
      },
      {
        text: "HTML",
        link: "/html/introduction",
      },
      {
        text: "Browser",
        link: "/browser/introduction",
      },
    ],
  },
  {
    text: "Blog",
    link: "/blog/introduction",
  },
];

export default nav;
