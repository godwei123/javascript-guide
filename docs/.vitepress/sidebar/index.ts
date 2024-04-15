import { sidebarBaseBrowserAndNetwork, sidebarBaseHTMLAndCSS, sidebarCode } from "./sidebarBase";
import { DefaultTheme } from "vitepress";
import { generateJavaScriptSidebar, generateCSSSidebar } from "../scripts/sidebar";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": generateJavaScriptSidebar(),
  "/basic/html": sidebarBaseHTMLAndCSS,
  "/css": generateCSSSidebar(),
  "/basic/network": sidebarBaseBrowserAndNetwork,
  "/basic/browser": sidebarBaseBrowserAndNetwork,
  "/basic/code": sidebarCode,
};
export default sidebar;
