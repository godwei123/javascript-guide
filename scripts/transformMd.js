import fs from "node:fs";
import { glob } from "fast-glob";
import { getAllLine, parseNonStandardJSON } from "../docs/.vitepress/plugins/utils.js";
import path from "node:path";
import chalk from "chalk";

const basePath = path.resolve(process.cwd());
const customPluginKeys = ["@pro-table", "@link-components"];

function replaceTableContent(tableLines) {
  const attrs = parseNonStandardJSON(tableLines.join(""));
  return `<ClientOnly><n-data-table v-bind="${JSON.stringify(attrs)}"></n-data-table></ClientOnly>`;
}

function replaceLinkContent(linkLines) {
  const props = parseNonStandardJSON(linkLines.join(""));
  const CmpPath = path.resolve(basePath, props.src);
  const CmpName = props.src.replaceAll("-", "").split("/").pop().split(".")[0].toUpperCase();
  importMap[CmpName] = CmpPath;
  return `<ClientOnly><${CmpName} v-bind="${JSON.stringify(props.attrs)}"/></ClientOnly>`;
}

function replaceContent(tableLines, linkLines) {
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

glob("docs/**/*.md").then((files) => {
  let importMap = {};
  files.forEach((file) => {
    const data = fs.readFileSync(file, "utf8");
    const reg = new RegExp(customPluginKeys.join("|"));
    if (!reg.test(data)) return;
    const lines = getAllLine(data);
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
    importMap = {};
    const updatedData = result.join("\n");
    fs.writeFileSync(file, updatedData);
  });
});
