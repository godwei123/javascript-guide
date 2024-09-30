import fg from "fast-glob";
import chalk from "chalk";
import { DefaultTheme } from "vitepress";

type SidebarItem = DefaultTheme.SidebarItem;

const warning = chalk.hex("#FFA500");

const javaScriptIntroduction = { text: "Introduction", link: "/javascript/introduction", order: 0 };
const blogIntroduction = { text: "Introduction", link: "/blog/introduction", order: 0 };
const cssIntroduction = { text: "Introduction", link: "/css/introduction", order: 0 };

/**
 * @description: 生成侧边栏
 */
const generateSidebar = (
  cwd: string,
  introduction: { text: string; link: string; order: number },
  prefix: string
): SidebarItem[] => {
  const files = fg.sync(["./*.md"], { cwd: cwd, ignore: ["./introduction.md"], objectMode: true });
  const result = files.map((entry) => {
    const { name, path: file } = entry;
    const path = file.replace(/(\/index)?\.md$/, "");
    const key = path.replace(/\/$/, "").split("/").pop();
    return {
      text: path,
      link: `/${prefix}/${path}`,
    };
  });
  return [introduction, ...result];
};

export const generateJavaScriptSidebar = () => {
  console.log(chalk.bold.green("javascript sidebar generate"));
  return generateSidebar("./docs/javascript", javaScriptIntroduction, "javascript");
};

export const generateBlogSidebar = () => {
  console.log(chalk.bold.green("blog sidebar generate"));
  return generateSidebar("./docs/blog", blogIntroduction, "blog");
};

export const generateCSSSidebar = () => {
  console.log(chalk.bold.green("css sidebar generate"));
  return generateSidebar("./docs/css", cssIntroduction, "css");
};
