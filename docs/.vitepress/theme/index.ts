import DefaultTheme from "vitepress/theme";
import "./custom.css";
import naive from "naive-ui";
// @ts-ignore
import Layout from "./Layout.vue";

import { currentVersion } from "../project.config";

function judgeVersion(version: string) {
  return version !== currentVersion;
}

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp(ctx: { app: any; router: any }) {
    const { app, router } = ctx;
    app.use(naive);
    console.log(process.env.NODE_ENV);

    if (process.env.NODE_ENV !== "development") {
      const myWorker = new Worker("/javascript-guide/public/js/webWorker.js");
      myWorker.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if (data.version) {
          if (judgeVersion(data.version)) {
            console.log(
              `Current version is ${currentVersion}, remote version is ${data.version}, New version is available`
            );
          }
        }
      };
      myWorker.onmessageerror = function (e) {
        console.log("Message error received from worker");
      };
      myWorker.onerror = function (e) {
        console.log("Error received from worker");
      };
      myWorker.postMessage("Hello from the main thread");
    }
  },
};
