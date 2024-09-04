---
prev: false
next: false
aside: false
footer: false
---

<script setup>
import { defineAsyncComponent } from "vue"; 

const BlogToc = defineAsyncComponent(() => import('../../packages/theme/blog-toc.vue'))
</script>

<ClientOnly>
  <BlogToc />
</ClientOnly>
