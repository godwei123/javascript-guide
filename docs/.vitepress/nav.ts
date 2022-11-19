const nav = [
  {
    text: "基础",
    link: "/html/",
    activeMatch: "/basis/",
  },
  {
    text: "工程化与优化",
    link: "/project/polyfill",
    activeMatch: "/project/",
  },

  {
    text: "代码",
    link: "/code/",
    activeMatch: "/code/",
  },
  {
    text: "框架",
    items: [
      {
        text: "Vue",
        link: "/framework/vue",
      },
      {
        text: "React",
        link: "/framework/react",
      },
    ],
  },
  {
    text: "State Of",
    items: [
      {
        text: "State Of CSS",
        link: "/stateof/css",
      },
      {
        text: "State Of JS",
        link: "/stateof/js",
      },
    ],
  },
];

export default nav;
