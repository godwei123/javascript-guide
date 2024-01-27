import { sidebarBaseBrowserAndNetwork, sidebarBaseHTMLAndCSS, sidebarCode } from "./sidebarBase";
import { DefaultTheme } from "vitepress";
import { generateJavaScriptSidebar, generateBlogSidebar } from "../scripts/sidebar";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": generateJavaScriptSidebar(),
  "/basic/html": sidebarBaseHTMLAndCSS,
  "/basic/css": sidebarBaseHTMLAndCSS,
  "/basic/network": sidebarBaseBrowserAndNetwork,
  "/basic/browser": sidebarBaseBrowserAndNetwork,
  "/basic/code": sidebarCode,
  "/blog": generateBlogSidebar(),
};
export default sidebar;
