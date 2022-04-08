import { defineConfigWithTheme } from 'vitepress';
import type { Config as ThemeConfig } from '@vue/theme';
import nav from './config/nav';
import sidebar from './config/sidebar';

export default defineConfigWithTheme<ThemeConfig>({
    // extends: baseConfig,
    title: 'JavaScriptGuide',
    description: 'Just playing around.',
    lang: 'zh-CN',
    themeConfig: {
        nav,
        sidebar,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/' },
            { icon: 'twitter', link: 'https://twitter.com/vuejs' },
            { icon: 'discord', link: 'https://discord.com/invite/HBherRA' },
        ],
        footer: {
            license: {
                text: 'MIT License',
                link: 'https://opensource.org/licenses/MIT',
            },
            copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`,
        },
    },
    markdown: {
        lineNumbers: true,
    },
});
