import fg from "fast-glob";
import chalk from "chalk";

const warning = chalk.hex("#FFA500");

const javaScriptIntroduction = { text: "Introduction", link: "/javascript/introduction", order: 0 };
const blogIntroduction = { text: "Introduction", link: "/blog/introduction", order: 0 };
const cssIntroduction = { text: "Introduction", link: "/css/introduction", order: 0 };

const javaScriptOptions: Record<string, { text: string; order: number }> = {
  type: { text: "类型和语法", order: 1 },
  object: { text: "Object", order: 3 },
  "type-conversion": { text: "类型转换", order: 4 },
  prototype: { text: "原型和原型链", order: 5 },
  this: { text: "this", order: 6 },
  closure: { text: "闭包", order: 7 },
  "throttle-debounce": { text: "节流和防抖", order: 8 },
  async: { text: "同步和异步", order: 9 },
  regexp: { text: "正则", order: 10 },
  "proxy-reflect": { text: "代理和反射", order: 12 },
  "broadcast-channel": { text: "Broadcast Channel API", order: 13 },
  "web-speech-api": { text: "Web Speech API", order: 14 },
  observer: { text: "Observer API", order: 15 },
  other: { text: "其他", order: 16 },
  eventloop: { text: "Event Loop", order: 17 },
};

const CSSOptions: Record<string, { text: string; order: number }> = {
  center: { text: "居中", order: 1 },
  flex: { text: "flex布局", order: 2 },
  grid: { text: "grid布局", order: 4 },
  "@font-face": { text: "@font-face", order: 5 },
  "text-hidden-overflow": { text: "文本溢出", order: 6 },
  bfc: { text: "BFC", order: 7 },
  position: { text: "层叠与定位", order: 8 },
  "pseudo-classes-element": { text: "伪类与伪元素", order: 9 },
  selectors: { text: "CSS选择器", order: 10 },
  "color-var-fun": { text: "color-var-fun", order: 11 },
};
/**
 * @description: 生成侧边栏
 */
const generateSidebar = (
  cwd: string,
  introduction: { text: string; link: string; order: number },
  options: Record<string, { text: string; order: number }>,
  prefix: string
) => {
  const files = fg.sync(["./*.md"], { cwd: cwd, ignore: ["./introduction.md"] });
  const result = files.map((file) => {
    const path = file.replace(/(\/index)?\.md$/, "");
    const key = path.replace(/\/$/, "").split("/").pop();
    if (options[key]) {
      return {
        text: options[key].text,
        link: `/${prefix}/${path}`,
        order: options[key].order,
      };
    } else {
      if (process.env.NODE_ENV === "development") {
        return {
          text: path,
          link: `/${prefix}/${path}`,
        };
      }
      console.log(warning(`warning: [sidebar.ts/${prefix}] ${key} not in options`));
    }
  });
  return [introduction, ...result].sort((a, b) => a.order - b.order);
};

export const generateJavaScriptSidebar = () => {
  console.log(chalk.bold.blue("javascript sidebar generate"));
  return generateSidebar(
    "./docs/javascript",
    javaScriptIntroduction,
    javaScriptOptions,
    "javascript"
  );
};

export const generateBlogSidebar = () => {
  console.log(chalk.bold.blue("blog sidebar generate"));
  return generateSidebar("./docs/blog", blogIntroduction, {}, "blog");
};

export const generateCSSSidebar = () => {
  console.log(chalk.bold.blue("css sidebar generate"));
  return generateSidebar("./docs/css", cssIntroduction, CSSOptions, "css");
};
