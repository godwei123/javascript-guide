import { DefaultTheme } from "vitepress";
// @ts-ignore
import { default as fg } from "fast-glob";
// @ts-ignore
import { default as fs } from "fs-extra";

const files = fg.sync(["./**/*.md"], { cwd: "./docs/blog" });
const sidebarBlog: DefaultTheme.SidebarItem[] = files
  .map((file: string) => {
    const path = file.replace(/(\/index)?\.md$/, "");
    const stats = fs.statSync(`./docs/study/blog/${file}`);
    const text = path.replace(/\/$/, "").split("/").pop();
    return { text, link: `/blog/${path}`, mtime: stats.birthtime };
  })
  .sort((a, b) => b.mtime - a.mtime)
  .map((item: any) => {
    return { text: item.text, link: item.link };
  });

export { sidebarBlog };
