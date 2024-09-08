import type MarkdownIt from "markdown-it";
import {
  composeComponentName,
  injectComponentImportScript,
  isCheckContainerPreview,
  isCheckingRelativePath,
} from "./utils";

export const previewFence = (md: MarkdownIt) => {
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
    }
    return defaultHtmlTextRender(tokens, idx, options, env, self);
  };
};

export const proTableFence = (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const isInProTableContainer =
      tokens[idx - 1].info.trim() === "pro-table" &&
      tokens[idx + 1].type === "container_pro-table_close";

    if (tokens[idx].type === "fence" && isInProTableContainer) {
      return "";
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
