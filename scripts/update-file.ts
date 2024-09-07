import { readFileSync, writeFileSync, statSync } from "fs";
import { resolve } from "path";
import { readdirSync } from "node:fs";
import dayjs from "dayjs";

const filePath = resolve(__dirname, "../docs/blog");

const files = readdirSync(filePath);

for (const file of files) {
  const p = resolve(__dirname, `../docs/blog/${file}`);
  const content = readFileSync(p, "utf-8");
  if (content.includes("create_time:") && content.includes("---")) {
    continue;
  }
  if (content.startsWith("---")) {
    const newContent = content.replace(
      "---",
      `---\ncreate_time: ${dayjs(statSync(p).birthtime).format("YYYY-MM-DD HH:mm:ss")}`
    );
    writeFileSync(p, newContent);
  } else {
    const str = `---\ncreate_time: ${dayjs(statSync(p).birthtime).format(
      "YYYY-MM-DD HH:mm:ss"
    )}\n---\n\n`;
    const newContent = str + content;
    writeFileSync(p, newContent);
  }
}
