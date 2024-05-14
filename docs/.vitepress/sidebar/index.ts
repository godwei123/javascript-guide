import { sidebarNetwork, sidebarBrowser, sidebarHTML, sidebarCode } from "./sidebarBase";
import { DefaultTheme } from "vitepress";
import { generateJavaScriptSidebar, generateCSSSidebar } from "../scripts/sidebar";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": generateJavaScriptSidebar(),
  "/html": sidebarHTML,
  "/css": generateCSSSidebar(),
  "/network": sidebarNetwork,
  "/browser": sidebarBrowser,
  "/code": sidebarCode,
};
export default sidebar;
