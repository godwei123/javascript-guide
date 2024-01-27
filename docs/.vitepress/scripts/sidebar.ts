import fg from "fast-glob";

const javaScriptIntroduction = { text: "Introduction", link: "/javascript/introduction" };
const javaScriptOptions: Record<string, string> = {
  type: "类型和语法",
  "array-string": "Array & String",
  object: "Object",
  "type-conversion": "类型转换",
  prototype: "原型和原型链",
  this: "this",
  closure: "闭包",
  "throttle-debounce": "节流和防抖",
  async: "同步和异步",
  regexp: "正则",
  "ES5+": "ES6+",
  "proxy-reflect": "代理和反射",
  "broadcast-channel": "Broadcast Channel API",
  "web-speech-api": "Web Speech API",
  observer: "Observer API",
  other: "其他",
  eventloop: "Event Loop",
};

const blogIntroduction = { text: "Introduction", link: "/blog/introduction" };
const cssIntroduction = { text: "Introduction", link: "/basic/css/introduction" };

const CSSOptions = {
  "@font-face": "@font-face",
  center: "居中",
  flex: "flex布局",
  layout: "常见布局",
  grid: "grid布局",
  "text-hidden-overflow": "文本溢出",
  bfc: "BFC",
  position: "层叠与定位",
  "pseudo-classes-element": "伪类与伪元素",
  selectors: "CSS选择器",
};

/**
 * @description: 生成侧边栏
 */
const generateSidebar = (
  cwd: string,
  introduction: Record<string, string>,
  options: Record<string, string>,
  prefix: string
) => {
  const files = fg.sync(["./*.md"], { cwd: cwd, ignore: ["./introduction.md"] });
  const result = files.map((file) => {
    const path = file.replace(/(\/index)?\.md$/, "");
    const text = path.replace(/\/$/, "").split("/").pop();
    return { text: options[text] || text, link: `/${prefix}/${path}` };
  });
  return [introduction, ...result];
};

export const generateJavaScriptSidebar = () => {
  console.log("javascript sidebar generate");
  return generateSidebar(
    "./docs/javascript",
    javaScriptIntroduction,
    javaScriptOptions,
    "javascript"
  );
};

export const generateBlogSidebar = () => {
  console.log("blog sidebar generate");
  return generateSidebar("./docs/blog", blogIntroduction, {}, "blog");
};

export const generateCSSSidebar = () => {
  console.log("css sidebar generate");
  return generateSidebar("./docs/basic/css", cssIntroduction, CSSOptions, "css");
};
