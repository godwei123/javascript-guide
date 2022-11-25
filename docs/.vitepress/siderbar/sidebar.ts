import sidebarStateOf from "./configs/sidebarStateOf";
import sidebarBase from "./configs/sidebarBase";
import sidebarAdvanced from "./configs/sidebarAdvanced";
import sidebarFramework from "./configs/sidebarFramework";
import sidebarCode from "./configs/sidebarCode";

const sidebar = {
  "/basic/": sidebarBase,
  "/advanced/": sidebarAdvanced,
  "/framework/": sidebarFramework,
  "/stateof/": sidebarStateOf,
  "/code/": sidebarCode,
  // "/interview/": sidebarInterview,
};
export default sidebar;
