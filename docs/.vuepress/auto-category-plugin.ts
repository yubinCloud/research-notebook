import { App, createPage, Page, PluginConfig } from 'vuepress'


export const autoCategoryPlugin = (app: App) => {
    return {
        name: 'auto-category-plugin',
        
        extendsPage: (page: Page) => {
            if (page.permalink != undefined && page.permalink.startsWith("/category")) {
                if (page.sfcBlocks.template != undefined) {
                    page.sfcBlocks.template.contentStripped = page.sfcBlocks.template?.contentStripped + '\nHello World'
                }
            }
        },
        
        async onInitialized(app: App) {
            const categorys: Array<any> = []
            app.pages.forEach(page => {
                if (page.permalink != undefined && page.permalink.startsWith("/category")) {
                    console.log(page)
                    categorys.push(page)
                }
            })
            const categoryPage = await createPage(app, {
                path: '/category/my/',
                frontmatter: {
                    permalink: '/category/my/',
                    title: 'My'
                },
                content: 'Hello, World'
            })
            app.pages.push(categoryPage)
        },
    }
}