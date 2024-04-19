import MarkdownIt from "markdown-it";
import chalk from "chalk";
import { getAllLine, parseNonStandardJSON } from "./utils";
import path from "node:path";

const basePath = path.resolve(process.cwd());
const customPluginKeys = ["@pro-table", "@link-components"];

let importMap = {};

function replaceTableContent(tableLines: string[]) {
  const attrs = parseNonStandardJSON(tableLines.join(""));
  return `<ClientOnly><n-data-table v-bind='${JSON.stringify(attrs)}'></n-data-table></ClientOnly>`;
}

function replaceLinkContent(linkLines: string[]) {
  const props = parseNonStandardJSON(linkLines.join(""));
  const CmpPath = path.resolve(basePath, props.src);
  const CmpName =
    props.src.replaceAll("-", "").split("/").pop().split(".")[0] +
    new Date().getTime().toString(16).toUpperCase();
  importMap[CmpName] = CmpPath;
  return `<ClientOnly><${CmpName} v-bind='${JSON.stringify(props.attrs)}'/></ClientOnly>`;
}

function replaceContent(tableLines: string[], linkLines: string[]) {
  if (tableLines.length > 0 && linkLines.length > 0) {
    console.log(chalk.red.bold("解析出错，@pro-table和@link-components不能同时存在"));
    return;
  }
  if (tableLines.length > 0) {
    return replaceTableContent(tableLines);
  }
  if (linkLines.length > 0) {
    return replaceLinkContent(linkLines);
  }
  return "";
}

const markdownItProTable = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "codeDemo", (state) => {
    const reg = new RegExp(customPluginKeys.join("|"));
    if (!reg.test(state.src)) return;
    const lines = getAllLine(state.src);
    let tableLines = [];
    let linkLines = [];
    const result = [];
    let hasTableTag = false;
    let hasLinkTag = false;
    const map = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("@pro-table")) {
        hasTableTag = true;
      } else if (line.includes("@link-components")) {
        hasLinkTag = true;
      } else if (line.includes("@end")) {
        if (hasTableTag) hasTableTag = false;
        if (hasLinkTag) hasLinkTag = false;
        // 处理table和link
        const newLine = replaceContent(tableLines, linkLines);
        tableLines = [];
        linkLines = [];
        result.push(newLine);
      } else if (hasTableTag) {
        tableLines.push(line);
      } else if (hasLinkTag) {
        linkLines.push(line);
      } else {
        result.push(line);
      }
    }
    if (Object.keys(importMap).length > 0) {
      const start = "<script setup>" + "\n";
      const imports = Object.entries(importMap)
        .map(([name, path]) => {
          return `import ${name} from '${path}';`;
        })
        .join("\n");
      const end = "</script>";
      result.unshift(start + imports + "\n" + end);
    }
    state.src = result.join("\n");
    console.log(state.src);
    importMap = {};
  });
};
export default markdownItProTable;
