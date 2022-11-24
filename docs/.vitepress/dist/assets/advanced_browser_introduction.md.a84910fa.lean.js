import { _ as e, c as o, o as n, b as t, d as a } from "./app.61809bb9.js";
const b = JSON.parse(
    '{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"advanced/browser/introduction.md"}'
  ),
  c = { name: "advanced/browser/introduction.md" },
  r = t(
    "h1",
    { id: "introduction", tabindex: "-1" },
    [
      a("Introduction "),
      t(
        "a",
        {
          class: "header-anchor",
          href: "#introduction",
          "aria-hidden": "true",
        },
        "#"
      ),
    ],
    -1
  ),
  s = t(
    "div",
    { class: "tip custom-block" },
    [
      t("p", { class: "custom-block-title" }, "TIP"),
      t(
        "p",
        null,
        "\u524D\u7AEF\u9762\u8BD5\u4E2D\u6D4F\u89C8\u5668\u76F8\u5173\u5185\u5BB9\u5360\u6BD4\u8F83\u591A\uFF0C\u4E3B\u8981\u8003\u5BDF\u6D4F\u89C8\u5668\u7F13\u5B58\u3001\u5B58\u50A8\u3001\u8DE8\u57DF\u3001\u5B89\u5168\u3001\u6E32\u67D3\u7B49\u5185\u5BB9\u3002"
      ),
    ],
    -1
  ),
  d = [r, s];
function i(_, l, u, p, h, m) {
  return n(), o("div", null, d);
}
const v = e(c, [["render", i]]);
export { b as __pageData, v as default };
