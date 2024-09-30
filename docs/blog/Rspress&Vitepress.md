---
create_time: 2024-08-10 14:59:01
---

# Rspress & Vitepress

> Rspress 和 Vitepress 都是静态站点生成器，使用简单，能够快速的构建自己的网站。二者的文档站点生成器都是基于 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## Rspress

> https://rspress.dev/zh/

Rspress 是一个基于 Rsbuild 的静态站点生成器，基于 **React** 框架进行渲染，内置了一套默认的文档主题，你可以通过 Rspress 来快速搭建一个文档站点，同时也可以自定义主题，来满足你的个性化静态站需求，比如博客站、产品主页等。当然，你也可以接入官方提供的相应插件来方便地搭建组件库文档。

![Rspress.png](../public/repress_screenshot.png)

## Vitepress

> https://vitepress.dev/zh/

VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

![Vitepress.png](../public/vitepress_screenshot.png)

## Rspress & Vitepress 对比

- Rspress 是基于 React 框架，Vitepress 是基于 Vue 框架。
- Rspress 采用的是 Rsbuild 构建工具，Vitepress 采用的是 Vite 构建工具。
- Rspress 使用 [MDX](https://mdxjs.com/)（MDX 是 Markdown 的超集，这意味着你可以像往常一样编写 Markdown 文件） 作为内容开发方式，Vitepress 使用 Markdown 作为内容开发方式，并在 Markdown 中支持 Vue 组件。
- Rspress 有更快的构建速度。 构建性能上，在开发阶段，Rspress 和 VitePress 都能很快地启动一个项目，而在生产环境下，VitePress 需要基于 Rollup 打包项目，因此会面临其他基于 JavaScript 的工具链类似的性能问题，此时 Rspress 会有更快的构建速度。
