"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var sidebar = {
  basic: "sidebarBase",
  advanced: "sidebarAdvanced",
  framework: "sidebarFramework",
  code: "sidebarCode",
  interview: "sidebarInterview",
};
var currentDirPath = path.resolve(__dirname, "../docs");
// 遍历docs目录，生成sidebar
var createSidebar = function (currentDirPath, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  fs.readdirSync(currentDirPath, {
    withFileTypes: true,
  }).forEach(function (item) {
    if (Object.keys(sidebar).includes(item.name) || depth > 1) {
      var filePath = path.join(currentDirPath, item.name);
      if (item.isFile()) {
        console.log(filePath.slice(filePath.indexOf("docs") + 4));
      } else if (item.isDirectory()) {
        createSidebar(filePath, depth + 1);
      }
    }
  });
};
createSidebar(path.resolve(__dirname, "../docs"));
