import { defineConfig } from 'vitepress';
import nav from './config/nav';
import sidebar from './config/sidebar';

export default defineConfig({
    title: 'JavaScriptGuide',
    description: 'Just playing around.',
    lang: 'zh-CN',
    themeConfig: {
        nav,
        sidebar,
    },
    markdown: {
        lineNumbers: false,
    },
});
