# JavaScriptGuide dev

![img.png](./public/javascript-guide-logo.svg)

### markdown-it-plugin

@vitepress-demo-preview/plugin
@ruabick/md-demo-plugins
vitepress-demo-block

````text

'<demo src="../demo.vue" title="Demo block" desc="use demo"></demo>'

 "```vue:demo"
 '<script lang="ts" setup>'
 "  const number = 1;"
 "</script>"

 "<template>"
 "  <span>The number is {{number}}</span>"
 "</template>"
 "```"
 "```"

 ' "============================="'

 ":::pro-table"

 "```json5"
 "{"
 "  columns: ["
 '    { title: "No", key: "no" },'
 '    { title: "Title", key: "title", resizable: true },'
 '    { title: "Length", key: "length" },'
 "  ],"
 "  data: ["
 '    { no: 1, title: "Introduction", length: "1 min" },'
 '    { no: 2, title: "Getting Started", length: "2 min" },'
 '    { no: 3, title: "Basic Usage", length: "3 min" },'
 '    { no: 4, title: "Advanced Usage", length: "4 min" },'
 '    { no: 5, title: "API", length: "5 min" },'
 "  ],"
 "  bordered: false,"
 "}"
 "```"

 ":::"

 "<!-- Tip: Support for closed tags -->"

 '<preview path="./xxx/xx.vue"></preview>'

 '<preview path="./xxx/xx.vue" title="title"></preview>'

 '<preview path="./xxx/xx.vue" title="title" description="component description content"></preview>'

 ":::preview"

 "demo-preview=./xxx/xx.vue"

 ":::"

 ":::preview title"

 "demo-preview=./xxx/xx.vue"

 ":::"

 ":::preview title || component description content"

 "demo-preview=./xxx/xx.vue"

 ":::"

 "```"
````
