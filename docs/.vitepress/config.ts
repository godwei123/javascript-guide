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
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        },
    },
    markdown: {
        lineNumbers: false,
    },
});
