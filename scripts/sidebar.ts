import * as path from "path";
import * as fs from "fs";

const sidebar = {
  basic: "sidebarBase",
  advanced: "sidebarAdvanced",
  framework: "sidebarFramework",
  code: "sidebarCode",
  interview: "sidebarInterview",
};
const res = [];
// 遍历docs目录，生成sidebar
const createSidebar = (currentDirPath, depth = 1) => {
  fs.readdirSync(currentDirPath, {
    withFileTypes: true,
  }).forEach((item) => {
    if (Object.keys(sidebar).includes(item.name) || depth > 1) {
      const filePath = path.join(currentDirPath, item.name);
      if (item.isFile()) {
        res.push(filePath.slice(filePath.indexOf("docs") + 4));
      } else if (item.isDirectory()) {
        createSidebar(filePath, depth + 1);
      }
    }
  });
};

createSidebar(path.resolve(__dirname, "../docs"));
console.log(res);
