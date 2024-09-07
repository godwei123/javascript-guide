import nav from "./nav";
import sidebar from "./sidebar";
import { defineConfig } from "vitepress";
import { resolve } from "node:url";
import { applyPlugins } from "@ruabick/md-demo-plugins";
import markdownItFootnote from "markdown-it-footnote";
import mdContainer, { ContainerOpts } from "markdown-it-container";
import JSON5 from "json5";

export default defineConfig({
  title: "JavaScriptGuide",
  base: "/javascript-guide",
  version: "v1.0.0",
  description: "front-end study and interview, include html,css,javascript,network...",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/javascript-guide/favicon.svg" }]],
  themeConfig: {
    siteTitle: "JavaScriptGuide",
    logo: "/favicon.svg",
    nav,
    sidebar,
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
      const defaultRender = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const isInProTableContainer =
          tokens[idx - 1].info.trim() === "pro-table" &&
          tokens[idx + 1].type === "container_pro-table_close";

        if (tokens[idx].type === "fence" && isInProTableContainer) {
          return "";
        }
        return defaultRender(tokens, idx, options, env, self);
      };
      md.use(mdContainer, "pro-table", {
        validate(params) {
          return !!params.trim().match(/^pro-table\s*(.*)$/);
        },

        render: function (tokens, idx) {
          const m = tokens[idx].type.trim().match(/pro-table\s*(.*)$/);
          if (tokens[idx].nesting === 1 /* means the tag is opening */) {
            const content = tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
            return "<n-data-table v-bind=" + "'" + JSON.stringify(JSON5.parse(content)) + "'" + ">";
          } else {
            return "</n-data-table>";
          }
        },
      } as ContainerOpts);
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
