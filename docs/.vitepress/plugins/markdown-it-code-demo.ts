import MarkdownIt from "markdown-it";
import * as path from "node:path";
import chalk from "chalk";

const basePath = path.resolve(process.cwd());

const markdownItCodeDemo = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "codeDemo", (state) => {
    const codeDemoReg = /:::\s?link-components\s?([^]+?):::/g;
    if (!codeDemoReg.test(state.src)) return;
    state.src = state.src.replace(codeDemoReg, (match, code) => {
      const srcReg = /src='([^']+)'/;
      const attrsReg = /attrs=({[^}]+})/;

      const srcMatch = code.match(srcReg);
      const attrsMatch = code.match(attrsReg);

      const src = srcMatch[1] || "";
      if (!src) {
        console.log(chalk.red.bold("markdown-it-code-demo: src is required in code demo"));
      }
      const attrs = JSON.parse(attrsMatch[1]) || {};
      const eleAttrs = Object.entries(attrs).reduce((prev, cur) => {
        return prev + `${cur[0]}="${cur[1]}" `;
      }, "");

      return `<script setup>\nimport Cmp from '${path.join(
        basePath,
        src
      )}';\n</script>\n<ClientOnly><Cmp ${eleAttrs}/></ClientOnly>`;
    });
  });
};
export default markdownItCodeDemo;
