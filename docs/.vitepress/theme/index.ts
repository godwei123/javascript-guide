import DefaultTheme from "vitepress/theme";
import "./custom.css";
import naive from "naive-ui";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    console.log(ctx);
    const { app } = ctx;
    app.use(naive);
  },
};
