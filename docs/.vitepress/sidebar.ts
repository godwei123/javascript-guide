import { DefaultTheme } from "vitepress";
import { generateJavaScriptSidebar, generateCSSSidebar } from "./scripts/sidebar";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": generateJavaScriptSidebar(),
  "/css": generateCSSSidebar(),
  "/code": [
    {
      text: "代码",
      items: [
        { text: "Introduction", link: "/code/introduction" },
        { text: "手写代码", link: "/code/coding" },
        { text: "代码输出", link: "/code/output" },
        { text: "文件下载", link: "/code/file-download" },
        { text: "懒加载", link: "/code/lazy-load" },
      ],
    },
  ],
};
export default sidebar;
