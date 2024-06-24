import { sidebarCode } from "./sidebarBase";
import { DefaultTheme } from "vitepress";
import { generateJavaScriptSidebar, generateCSSSidebar } from "../scripts/sidebar";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": generateJavaScriptSidebar(),
  "/css": generateCSSSidebar(),
  "/code": sidebarCode,
};
export default sidebar;
