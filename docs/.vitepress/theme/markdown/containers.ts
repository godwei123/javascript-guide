import mdContainer from "markdown-it-container";
import Token from "markdown-it/lib/token";
import type MarkdownIt from "markdown-it";
import JSON5 from "json5";

export default (md: MarkdownIt) => {
  md.use(mdContainer, "preview", {
    validate(params: string) {
      return params.trim().match(/^preview\s*(.*)$/);
    },
  });

  md.use(mdContainer, "pro-table", {
    validate(params) {
      return !!params.trim().match(/^pro-table\s*(.*)$/);
    },

    render(tokens: Token[], idx: number) {
      const m = tokens[idx].type.trim().match(/pro-table\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const content = tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
        return "<n-data-table v-bind=" + "'" + JSON.stringify(JSON5.parse(content)) + "'" + ">";
      } else {
        return "</n-data-table>";
      }
    },
  });
};
