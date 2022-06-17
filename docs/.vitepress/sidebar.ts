const sidebar = {
    '/basis/': sidebarBasis(),
    '/code/': sidebarConfig(),
    '/project/': sidebarConfig(),
    '/framework/': sidebarConfig()
}

function sidebarBasis() {
    return [
        {
            text: 'html',
            collapsible: true,
            items: [
                {text: 'What is VitePress?', link: '/basis/html/'},
                {text: 'Getting Started', link: '/basis/html'},
                {text: 'Configuration', link: '/basis/html'},
            ]
        },
        {
            text: 'css',
            collapsible: true,
            items: [
                {text: 'Markdown', link: '/guide/markdown'},
                {text: 'Asset Handling', link: '/guide/asset-handling'},
                {text: 'Frontmatter', link: '/guide/frontmatter'},
                {text: 'Using Vue in Markdown', link: '/guide/using-vue'},
                {text: 'API Reference', link: '/guide/api'}
            ]
        },
        {
            text: 'javascript',
            collapsible: true,
            items: [
                {text: '基础', link: '/basis/javascript/theme-edit-link'},
                {text: '隐式转换', link: '/basis/javascript/theme-edit-link'},
                {text: 'this', link: '/basis/javascript/theme-last-updated'},
                {text: '闭包', link: '/basis/javascript/theme-layout'},
                {text: 'String & Array', link: '/basis/javascript/theme-sidebar'},
                {text: 'Object', link: '/basis/javascript/theme-prev-next-link'},
                {text: '原型', link: '/basis/javascript/theme-footer'},
                {text: '事件循环', link: '/basis/javascript/theme-homepage'},
                {text: 'proxy/reflect', link: '/basis/javascript/theme-search'},
                {text: 'web-worker', link: '/basis/javascript/theme-carbon-ads'}
            ]
        },
        {
            text: '计算机网络',
            collapsible: true,
            items: [
                {
                    text: 'Migration from VuePress',
                    link: '/basis/network/migration-from-vuepress'
                },
                {
                    text: 'Migration from VitePress 0.x',
                    link: '/guide/migration-from-vitepress-0'
                }
            ]
        },
        {
            text: '浏览器',
            collapsible: true,
            items: [
                {
                    text: 'Migration from VuePress',
                    link: '/guide/migration-from-vuepress'
                },
                {
                    text: 'Migration from VitePress 0.x',
                    link: '/guide/migration-from-vitepress-0'
                }
            ]
        }
    ]
}

function sidebarConfig() {
    return [
        {
            text: 'Config',
            items: [
                {text: 'Introduction', link: '/config/introduction'},
                {text: 'App Configs', link: '/config/app-configs'},
                {text: 'Theme Configs', link: '/config/theme-configs'},
                {text: 'Frontmatter Configs', link: '/config/frontmatter-configs'}
            ]
        }
    ]
}

export default sidebar;
