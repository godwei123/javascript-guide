import nav from "./nav/nav";
import sidebar from "./siderbar/sidebar";

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JavaScriptGuide",
  base: "/javascript-guide/",
  description:
    "front-end study and interview, include html,css,javascript,network...",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/javascript-guide/favicon.ico" }]],
  themeConfig: {
    siteTitle: "JavaScriptGuide",
    logo: "/favicon.svg",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/godwei123" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present God Wei",
    },
    // algolia: {
    //   appId: "FPV2IXG60V",
    //   indexName: "dev_javascript-guide",
    //   apiKey: "8bddeaa52fff3663114d8d534c368e58",
    // },
  },

  markdown: {
    lineNumbers: false,
  },
});
