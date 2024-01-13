// Description: 生成sidebar配置

import fg from "fast-glob";

const files = fg.sync(["../docs/study/blog/*.md"]);
console.log(files);
