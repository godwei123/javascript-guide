---
prev: false
next: false
aside: false
footer: false
---

[//]: # ":::preview"
[//]: # "title=博客"
[//]: # "description=博客目录"
[//]: # "onlyRender=true"
[//]: # "demo-preview=../../packages/pages/blog-toc.vue"
[//]: #
[//]: # ":::"

:::tip
this is a tip
:::

<script setup>
import { defineAsyncComponent } from "vue"; 

const BlogToc = defineAsyncComponent(() => import('../../packages/pages/blog-toc.vue'))
</script>

<ClientOnly>
  <BlogToc />
</ClientOnly>
