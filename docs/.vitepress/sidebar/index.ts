import {
  sidebarBaseHTML,
  sidebarBaseBrowser,
  sidebarBaseCSS,
  sidebarBaseNetwork,
} from "./configs/sidebarBase";
import sidebarCode from "./configs/sidebarCode";
import sidebarInterview from "./configs/sidebarInterview";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarMulti = {
  "/javascript": sidebarJavaScript,
  "/basic/html": sidebarBaseHTML,
  "/basic/css": sidebarBaseCSS,
  "/basic/network": sidebarBaseNetwork,
  "/basic/browser": sidebarBaseBrowser,
  "/code": sidebarCode,
  "/interview": sidebarInterview,
};
export default sidebar;
