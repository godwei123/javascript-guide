import DefaultTheme from "vitepress/theme";
import "./custom.css";
import naive from "naive-ui";
// @ts-ignore
import Layout from "./Layout.vue";

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp(ctx) {
    // console.log(ctx);
    const { app, router } = ctx;
    router.onBeforeRouteChange = (to: string) => {
      console.log("before", to);
    };
    router.onAfterRouteChanged = (to: string) => {
      console.log("after", to);
    };
    app.use(naive);
  },
};
