import fs from "node:fs";
import pkg from "fast-glob";
import path from "node:path";
import chalk from "chalk";

const { glob } = pkg;
const parseNonStandardJSON = (s) => {
  if (s.trim() === "") return {};
  const str = s
    .replace(/(['"])?(\d{4})-(\d{1,2})-(\d{1,2})?\s*,/g, '"$2-$3-$4",')
    // 通过@colon@替换“:”，防止日期格式报错
    .replace(
      /(['"])?(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})(['"])?\s*,/g,
      '"$2-$3-$4 $5@colon@$6@colon@$7",'
    )
    .replace(/(['"])?([a-z0-9A-Z\u4e00-\u9fa5_]+)(['"])?\s*:/g, '"$2": ')
    .replace(/:\s*(['"])?([a-z0-9A-Z\u4e00-\u9fa5_]+)(['"])?\s*,/g, ': "$2",')
    .replace(/@colon@/g, ":")
    .replace(/:\s*,/g, `:"",`)
    .replace(/:\s*,\s*}/g, `:""}`)
    .replace(/:\s*,\s"/g, `:"","`)
    .replace(/:\s*,\s'/g, `:"",'`)
    .replace(/,\s*}/g, "}")
    .replace(/'/g, '"');
  return JSON.parse(str);
};

const getAllLine = (code) => {
  return code.split("\n");
};

const basePath = path.resolve(process.cwd());
const customPluginKeys = ["@pro-table", "@link-components"];
let importMap = {};

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
