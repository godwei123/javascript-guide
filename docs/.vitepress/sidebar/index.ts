import {
  sidebarBaseHTML,
  sidebarBaseBrowser,
  sidebarBaseCSS,
  sidebarBaseNetwork,
} from "./configs/sidebarBase";
import sidebarCode from "./configs/sidebarCode";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import { sidebarKotlin, sidebarRust } from "./configs/sidebarStudy";
import { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": sidebarJavaScript,
  "/basic/html": sidebarBaseHTML,
  "/basic/css": sidebarBaseCSS,
  "/basic/network": sidebarBaseNetwork,
  "/basic/browser": sidebarBaseBrowser,
  "/advance/code": sidebarCode,
  "/study/kotlin": sidebarKotlin,
  "/study/rust": sidebarRust,
};
export default sidebar;
