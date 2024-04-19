import MarkdownIt from "markdown-it";

const markdownItProTable = (md: MarkdownIt, options) => {
  md.core.ruler.before("normalize", "codeDemo", (state) => {
    const codeDemoReg = /@pro-table\s?([^]+?)@end-table/g;
    if (!codeDemoReg.test(state.src)) return;
    const attrsMap = {};
    state.src = state.src.replace(codeDemoReg, (match, code) => {
      const attrs = JSON.parse(code) || {};
      const key = Math.random().toString(36).slice(2);
      attrsMap[key] = attrs;
      return `<ClientOnly><n-data-table v-bind=${JSON.stringify(
        attrs
      )}></n-data-table></ClientOnly>`;
    });
    const i = Object.entries(attrsMap).reduce((prev, [key, value]) => {
      return prev + `const ${key}=ref(${JSON.stringify(value)});\n`;
    }, "");
    state.src = `
<script setup>
import { NDataTable } from 'naive-ui'; 
import { ref } from "vue";
${i}
</script> 

${state.src} 
`;
    console.log(state.src);
  });
};
export default markdownItProTable;
