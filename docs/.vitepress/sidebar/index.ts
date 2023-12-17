import {
  sidebarBaseBrowserAndNetwork,
  sidebarBaseHTMLAndCSS,
  sidebarCode,
} from "./configs/sidebarBase";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import { sidebarStudy } from "./configs/sidebarStudy";
import { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": sidebarJavaScript,
  "/basic/html": sidebarBaseHTMLAndCSS,
  "/basic/css": sidebarBaseHTMLAndCSS,
  "/basic/network": sidebarBaseBrowserAndNetwork,
  "/basic/browser": sidebarBaseBrowserAndNetwork,
  "/basic/code": sidebarCode,
  "/study/kotlin": sidebarStudy,
  "/study/rust": sidebarStudy,
};
export default sidebar;
