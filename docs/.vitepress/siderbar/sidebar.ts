import sidebarHTML from "./configs/sidebarHTML";
import sidebarCSS from "./configs/sidebarCSS";
import sidebarJavaScript from "./configs/sidebarJavaScript";
import sidebarStateOf from "./configs/sidebarStateOf";
import sidebarNetwork from "./configs/sidebarNetwork";
import sidebarBrowser from "./configs/sidebarBrowser";
import sidebarCode from "./configs/sidebarCode";
import sidebarInterview from "./configs/sidebarInterview";
import sidebarOptimization from "./configs/sidebarOptimization";
import sidebarExample from "./configs/sidebarExample";
import sidebarProject from "./configs/sidebarProject";

const sidebar = {
  "/basic/html/": sidebarHTML,
  "/basic/css/": sidebarCSS,
  "/basic/javascript/": sidebarJavaScript,

  "/advanced/browser/": sidebarBrowser,
  "/advanced/network/": sidebarNetwork,
  "/advanced/project/": sidebarProject,
  "/advanced/code/": sidebarCode,
  "/advanced/example/": sidebarExample,
  "/advanced/optimization/": sidebarOptimization,

  "/interview/": sidebarInterview,
  "/stateof/": sidebarStateOf,
};
export default sidebar;
