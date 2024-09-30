import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import path from "path";
import dayjs from "dayjs";

const questions = [
  {
    type: "list",
    name: "type",
    message: "请选择分类",
    choices: ["javascript", "css", "blog"],
    required: true,
    default: "blog",
  },
  {
    type: "input",
    name: "name",
    message: "请输入文件名称",
    required: true,
  },
  {
    type: "input",
    name: "title",
    message: "请输入页面标题，默认为文件名称",
  },
];

inquirer.prompt(questions).then((answers) => {
  const { type, name, title } = answers;
  let content = fs.readFileSync(path.join(__dirname, `./template/template.md`), "utf-8");

  content = content.replaceAll(
    "{{create_time}}",
    `create_time: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`
  );
  content = content.replaceAll("{{author}}", "author: god_wei");
  const filePath = path.join(__dirname, `../docs/${type}/${name}.md`);
  if (title) {
    content = content.replaceAll("{{name}}", title);
    content = content.replaceAll("{{title}}", `title: ${title}`);
  } else {
    content = content.replaceAll("{{name}}", name);
    content = content.replaceAll("{{title}}", "");
  }
  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`创建成功！`));
});
