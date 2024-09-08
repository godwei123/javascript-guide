import nav from "./nav";
import sidebar from "./sidebar";
import { defineConfig } from "vitepress";
import { resolve } from "node:url";
import { applyPlugins } from "@ruabick/md-demo-plugins";
import markdownItFootnote from "markdown-it-footnote";
import { proTableFence, preview, previewFence } from "./theme/markdown";

export default defineConfig({
  title: "JavaScriptGuide",
  base: "/javascript-guide",
  version: "v1.0.0",
  description: "front-end study and interview, include html,css,javascript,network...",
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/javascript-guide/favicon.svg" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
      },
    ],
  ],
  cleanUrls: true,
  themeConfig: {
    siteTitle: "JavaScriptGuide",
    logo: "/favicon.svg",
    nav,
    sidebar,
    outline: {
      level: [2, 3],
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present God Wei",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
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
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    config: (md) => {
      applyPlugins(md);
      md.use(markdownItFootnote);
      md.use(preview);
      previewFence(md);
      proTableFence(md);
    },
  },
  vite: {
    resolve: {
      alias: {
        "~": resolve(__dirname, "../packages"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo?.name === "webWorker.js") {
              return assetInfo.name;
            }
            return `assets/[name]_[hash].[ext]`;
          },
        },
      },
    },
  },
});
