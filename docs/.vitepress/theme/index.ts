import DefaultTheme from "vitepress/theme";
import "./custom.css";
import naive from "naive-ui";
// @ts-ignore
import Layout from "./Layout.vue";
import DemoBlock from "@ruabick/vitepress-demo-block";
import "@ruabick/vitepress-demo-block/dist/style.css";
import { currentVersion } from "../project.config";
import { ref } from "vue";

function judgeVersion(version: string) {
  return version !== currentVersion;
}

export default {
  ...DefaultTheme,
  Layout: Layout,
  async enhanceApp(ctx: { app: any; router: any }) {
    const { app, router } = ctx;
    app.use(naive);
    app.component("demo", DemoBlock);
    const hasNewVersion = ref(false);
    app.provide("newVersion", hasNewVersion);
    if (process.env.NODE_ENV !== "development") {
      let m = app.mount;
      app.mount = function () {
        m("#app");
        const myWorker = new Worker("/javascript-guide/js/webWorker.js");
        myWorker.onmessage = function (e) {
          const data = JSON.parse(e.data);
          if (data.version) {
            if (judgeVersion(data.version)) {
              console.log(
                `Current version is ${currentVersion}, remote version is ${data.version}, New version is available`
              );
              hasNewVersion.value = true;
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
      };
    }
  },
};
