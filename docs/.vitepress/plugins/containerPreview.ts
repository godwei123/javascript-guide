/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import { resolve, dirname } from "path";
import { readFileSync } from "fs";
import markdownItContainer from "markdown-it-container";
import {
  composeComponentName,
  injectComponentImportScript,
  isCheckContainerPreview,
  isCheckingRelativePath,
  transformHighlightCode,
} from "./utils";
import { it } from "node:test";

const validateContainerRE = /^preview.*$/;
const parseContainerParamRE = /^preview\s?(.*?)(?:\s\|\|\s(.*?))(?:\s\|\|\s(.*?))?$/;

/**
 * 自定义容器的注册
 * @param md
 */
export const containerDirectiveMount = (md: MarkdownIt) => {
  md.use(markdownItContainer, "preview", {
    marker: ":",
    validate: (params: any) => {
      const validateContainer = params.trim().match(validateContainerRE);
      if (validateContainer && validateContainer.length !== 0) return true;
      return false;
    },
  });
};

/**
 * 解析自定义日期的Tag
 * @param md
 */
export const parseContainerTag = (md: MarkdownIt) => {
  // 开始标签 :::preview
  const defaultContainerPreviewOpenRender = md.renderer.rules.container_preview_open!;
  md.renderer.rules.container_preview_open = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx];

    const res = tokens[idx + 2].children
      .filter((item) => {
        return item.type === "text";
      })
      .reduce((pre, cur) => {
        const [k, v] = cur.content.split("=") || [];
        pre[k] = v;
        return pre;
      }, {});
    // 组件的相对路径
    tokens[idx + 2].children.forEach((item) => {
      item.attrSet("display", "none");
    });

    const componentRelativePath = isCheckingRelativePath(res["demo-preview"]);

    // 组件绝对路径
    const componentPath = resolve(dirname(env.path), componentRelativePath || ".");

    // 后缀名
    const suffixName = componentPath.substring(componentPath.lastIndexOf(".") + 1);
    // 组件源码
    const componentSourceCode = readFileSync(componentPath, {
      encoding: "utf-8",
    });
    // 源码代码块（经过处理）
    const compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);

    const code = encodeURI(componentSourceCode);
    const showCode = encodeURIComponent(compileHighlightCode);

    const onlyRender = res["onlyRender"] || false;
    const title = res["title"] || "";
    const description = res["description"] || "";

    if (token.nesting === 1)
      return `<demo-preview :onlyRender="${onlyRender}" title="${title}" description="${description}" code="${code}" showCode="${showCode}" suffixName="${suffixName}" absolutePath="${componentPath}" relativePath="${componentRelativePath}">\n`;
    return defaultContainerPreviewOpenRender(tokens, idx, options, env, self);
  };
  // 闭合标签 :::
  const defaultContainerPreviewCloseRender = md.renderer.rules.container_preview_close!;
  md.renderer.rules.container_preview_close = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx];

    if (token.nesting === -1) return `</demo-preview>\n`;
    return defaultContainerPreviewCloseRender(tokens, idx, options, env, self);
  };
};

/**
 * 解析自定义容器
 * @param md
 */
export const parseContainer = (md: MarkdownIt) => {
  const defaultHtmlTextRender = md.renderer.rules.text!;
  md.renderer.rules.text = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx];
    if (token.type === "text" && token.content.match(isCheckContainerPreview)) {
      const componentRelativePath = isCheckingRelativePath(
        token.content.match(isCheckContainerPreview)![1]
      );
      const componentName = composeComponentName(componentRelativePath);
      injectComponentImportScript(env, componentRelativePath, componentName);
      return `<${componentName}></${componentName}>`;
    } else if (
      token.type === "text" &&
      token.attrGet("display") === "none" &&
      token.content.match(/^(title|description|onlyRender)=(.+)$/)
    ) {
      return "";
    }
    return defaultHtmlTextRender(tokens, idx, options, env, self);
  };
};
