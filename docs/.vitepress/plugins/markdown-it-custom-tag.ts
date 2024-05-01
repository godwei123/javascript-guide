import MarkdownIt from "markdown-it";
import chalk from "chalk";
import { getAllLine, parseNonStandardJSON } from "./utils";
import path from "node:path";

const basePath = path.resolve(process.cwd());
const customPluginKeys = ["@pro-table"];

function replaceTableContent(tableLines: string[]) {
  const attrs = parseNonStandardJSON(tableLines.join(""));
  const bindStr = JSON.stringify(attrs);
  return (
    "<ClientOnly><n-data-table v-bind=" + "'" + bindStr + "'" + `></n-data-table></ClientOnly>`
  );
}

function replaceContent(tableLines: string[]) {
  if (tableLines.length > 0) {
    console.log(chalk.red.bold("解析出错，@pro-table"));
    return;
  }
  if (tableLines.length > 0) {
    return replaceTableContent(tableLines);
  }
  return "";
}

const markdownItCustomTag = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "demo", (state) => {
    const reg = new RegExp(customPluginKeys.join("|"));
    if (!reg.test(state.src)) return;
    const lines = getAllLine(state.src);
    let tableLines = [];
    const result = [];
    let hasTableTag = false;
    const map = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("@pro-table")) {
        hasTableTag = true;
      } else if (line.includes("@end")) {
        if (hasTableTag) hasTableTag = false;
        const newLine = replaceContent(tableLines);
        tableLines = [];
        result.push(newLine);
      } else if (hasTableTag) {
        tableLines.push(line);
      } else {
        result.push(line);
      }
    }
    state.src = result.join("\n");
  });
};

export default markdownItCustomTag;
