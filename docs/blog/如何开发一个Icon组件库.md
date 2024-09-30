---
create_time: 2024-08-10 22:14:20
---

# 如何开发一个 Icon 组件库

::: tip

本文主要介绍如何开发一个 Icon 组件库。

背景是在 figma 中找到一些图标，希望建立一个 Icon 组件库，方便在项目中使用，同时学习一下组件库的开发。

学习参考的组件库是[iconoir](https://iconoir.com)。

Iconoir 是一个开源的图标库，提供了 React、React Native、Vue、Flutter 等多个版本的组件库。非常的全面，强大。

:::

## emoticon

icons 文件夹下存放了所有的图标，图标按照文件夹分类，每个文件夹下图标都是一个 svg 文件。

### dependencies

- [listr2](https://listr2.kilic.dev/)
- [scule](https://www.npmjs.com/package/scule)
- [hast-util-from-html](https://www.npmjs.com/package/hast-util-from-html)
- [hast-util-to-html](https://www.npmjs.com/package/hast-util-to-html)

### vue3

#### 模板代码

```ts
const template = (svg: any) => `<script lang="ts" setup>
import { inject } from "vue";
import type { SVGAttributes } from "vue";
import providerKey from "../providerKey";

const context = inject<SVGAttributes>(providerKey);
</script>

<template>
  ${svg}
</template>`;

export default template;
```

#### 生成组件

```ts
import vue from "@vitejs/plugin-vue";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import fs from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import dts from "vite-plugin-dts";
import { generateExport } from "../../lib/import-export.js";
import iconTemplate from "./template.ts";

export default async (ctx: any, target: any) => {
  const promises = [];

  const outDir = path.join(target.path, "src");

  const mainIndexContent = [generateExport(`default as IconoirProvider`, `./IconoirProvider.vue`)];

  for (const [variant, icons] of Object.entries(ctx.icons)) {
    const variantOutDir = path.join(outDir, variant);
    await fs.mkdir(variantOutDir, { recursive: true });

    const variantIndexContent = [
      generateExport(`default as IconoirProvider`, `../IconoirProvider.vue`),
    ];

    const generateIconFile = async (src: string, vueFileName: string) => {
      const iconContent = await fs.readFile(src, "utf8");

      const iconAst = fromHtml(iconContent, { fragment: true }) as any;
      // Bind iconProps of the provider to the svg root
      iconAst.children[0].properties["v-bind"] = "context";
      const transformedIcon = toHtml(iconAst);
      const componentContent = iconTemplate(transformedIcon);

      const vuePath = path.join(variantOutDir, vueFileName);

      return fs.writeFile(vuePath, componentContent);
    };

    for (const icon of icons as any) {
      const vueFileName = `${icon.pascalName}.vue`;

      promises.push(generateIconFile(icon.path, vueFileName));

      const mainIndexComponentName =
        variant === ctx.global.defaultVariant ? icon.pascalName : icon.pascalNameVariant;

      mainIndexContent.push(
        generateExport(`default as ${mainIndexComponentName}`, `./${variant}/${vueFileName}`)
      );

      variantIndexContent.push(
        generateExport(`default as ${mainIndexComponentName}`, `./${vueFileName}`)
      );
    }
    promises.push(
      fs.writeFile(path.join(variantOutDir, "sidebar.ts"), variantIndexContent.join(""))
    );
  }
  promises.push(fs.writeFile(path.join(outDir, "sidebar.ts"), mainIndexContent.join("")));
  await Promise.all(promises);

  return build({
    root: target.path,
    logLevel: "silent",
    build: {
      outDir: "dist",
      lib: {
        entry: path.join("src", "sidebar.ts"),
        fileName: (format, name) => (format === "cjs" ? `${name}.js` : `esm/${name}.mjs`),
        formats: ["cjs", "es"],
      },
      rollupOptions: {
        external: ["vue"],
      },
    },
    plugins: [
      vue({
        isProduction: true,
      }),
      dts(),
    ],
  });
};
```

## github

[open github source code](https://github.com/godwei123/emoticon)

## 参考

![emoji.png](../public/emoji_cover.png)

[Figma Emoji(1/3)](<https://www.figma.com/design/Kuy86cohBN51zYAOzIZFvt/Fluent-emoji-%E2%80%94-1-(Community)>)

[Figma Emoji(2/3)](<https://www.figma.com/design/VWVcZFHjhr1MG0ykvg7tiI/Fluent-emoji-%E2%80%94-2-(Community)>)

[Figma Emoji(3/3)](<https://www.figma.com/design/z2pawSgzk7DXTWevfSOVIz/Fluent-emoji-%E2%80%94-3-(Community)>)
