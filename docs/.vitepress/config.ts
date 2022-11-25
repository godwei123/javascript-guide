import nav from "./nav/nav";
import sidebar from "./siderbar/sidebar";

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JavaScriptGuide",
  base: "/javascript-guide/",
  description: "Just playing around.",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
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
  },

  markdown: {
    lineNumbers: false,
  },
});
