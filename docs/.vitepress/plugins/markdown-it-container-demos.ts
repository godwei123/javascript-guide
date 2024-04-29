import mdContainer, { ContainerOpts } from "markdown-it-container";
import fs from "fs";
import path from "node:path";
import { docRoot } from "../project.config";

export const markdownItContainerDemos = (md) => {
  md.use(mdContainer, "demos", {
    validate(params) {
      return !!params.trim().match(/^demos\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demos\s*(.*)$/);
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFileToken = tokens[idx + 2];
        let source = "";
        const sourceFile = sourceFileToken.children?.[0].content ?? "";

        if (sourceFileToken.type === "inline") {
          source = fs.readFileSync(path.resolve(docRoot, "packages", `${sourceFile}.vue`), "utf-8");
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

        return `<Demos source="${encodeURIComponent(
          source
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(description)}">`;
      } else {
        return "</Demos>";
      }
    },
  } as ContainerOpts);
};
