import {
  sidebarBaseBrowserAndNetwork,
  sidebarBaseHTMLAndCSS,
  sidebarCode,
} from "./configs/sidebarBase";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import { sidebarStudy } from "./configs/sidebarStudy";
import { sidebarBlog } from "./configs/sidebarBlog";
import { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": sidebarJavaScript,
  "/basic/html": sidebarBaseHTMLAndCSS,
  "/basic/css": sidebarBaseHTMLAndCSS,
  "/basic/network": sidebarBaseBrowserAndNetwork,
  "/basic/browser": sidebarBaseBrowserAndNetwork,
  "/basic/code": sidebarCode,
  "/study/blog": sidebarBlog,
};
export default sidebar;
