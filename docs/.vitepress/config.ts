import nav from './nav';
import sidebar from './sidebar';

import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'JavaScriptGuide',
    description: 'Just playing around.',
    lang: 'zh-CN',
    head: [['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]],
    themeConfig: {
        nav,
        sidebar,
    },
    markdown: {
        lineNumbers: false,
    },
});
