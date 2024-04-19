import MarkdownIt from "markdown-it";
import * as path from "node:path";
import chalk from "chalk";
import { it } from "node:test";
import { parseNonStandardJSON } from "./utils";

const basePath = path.resolve(process.cwd());

function replaceLinkContent(linkLines: string[]) {
  return parseNonStandardJSON(linkLines.join(""));
}

const markdownItCodeDemo = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "codeDemo", (state) => {
    const codeDemoReg = /@link-components\s?([^]+?):::/g;
    if (!codeDemoReg.test(state.src)) return;
    const importPaths = [];
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
      const p = path.resolve(basePath, src);
      const name = "Cmp" + importPaths.length;
      importPaths.push({ path: p, name });
      return `<ClientOnly><${name} ${eleAttrs}/></ClientOnly>`;
    });
    const i = importPaths
      .map((item) => {
        return `import ${item.name} from "${item.path}";`;
      })
      .join("\n");
    state.src = "<script setup>" + i + "</script>" + state.src;
  });
};
export default markdownItCodeDemo;
