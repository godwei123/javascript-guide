import MarkdownIt from "markdown-it";
import * as path from "node:path";

const basePath = path.resolve(process.cwd());
console.log("basePath", basePath);
const markdownItCodeDemo = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "codeDemo", (state) => {
    const codeDemoReg = /:::\s?link-components\s?([^]+?)\n([^]+?):::/g;
    state.src = state.src.replace(codeDemoReg, (match, code) => {
      console.log("code", code);
      const srcReg = /src="([^]+?)"/;
      const src = code.match(srcReg)[1];
      return `<script setup>import Cmp from ${path.join(basePath, src)};</script>
        <component :is="Cmp"/>`;
    });
  });
};
// vitepress-demo-block
export default markdownItCodeDemo;
