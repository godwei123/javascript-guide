import nav from "./nav";
import sidebar from "./sidebar";

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JavaScriptGuide",
  base: "/javascript-guide",
  description: "front-end study and interview, include html,css,javascript,network...",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/javascript-guide/favicon.svg" }]],
  themeConfig: {
    siteTitle: "JavaScriptGuide",
    logo: "/favicon.svg",
    nav,
    sidebar,
    footer: {
      // message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present God Wei",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
  },

  markdown: {
    lineNumbers: false,
  },
});
