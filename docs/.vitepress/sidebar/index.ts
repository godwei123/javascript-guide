import {
  sidebarBaseBrowserAndNetwork,
  sidebarBaseHTMLAndCSS,
  sidebarCode,
} from "./configs/sidebarBase";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import { DefaultTheme } from "vitepress";
import { sidebarBlog } from "./configs/sidebarBlog";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": sidebarJavaScript,
  "/basic/html": sidebarBaseHTMLAndCSS,
  "/basic/css": sidebarBaseHTMLAndCSS,
  "/basic/network": sidebarBaseBrowserAndNetwork,
  "/basic/browser": sidebarBaseBrowserAndNetwork,
  "/basic/code": sidebarCode,
  "/blog": sidebarBlog,
};
export default sidebar;
