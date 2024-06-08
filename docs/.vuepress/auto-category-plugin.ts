import { App, createPage, Page, PluginConfig } from 'vuepress'
import fs from 'node:fs'

const frontmatters = {}

export const autoCategoryPlugin = (app: App) => {
    return {
        name: 'auto-category-plugin',
        
        extendsPage: (page: Page) => {
            frontmatters[page.slug] = page.frontmatter
        },
        
        async onInitialized(app: App) {

            console.log(frontmatters)


            for (let page of app.pages) {
                if (page.permalink != undefined && page.permalink.startsWith('/category')) {
                    const notesDir = page.pathInferred  // notes 所在的目录
                    if (notesDir === null) {
                        return
                    }
                    const noteFiles = fs.readdirSync("./docs/" + notesDir)
                    if (page.permalink === "/category/Text2SQL/") {
                        console.log(noteFiles)
                    }
                    var tableRows: string[] = []
                    var tableHeader = `<tr><th style="text-align: center;">Title</th><th style="text-align: center;">Link</th></tr>`
                    for (let noteFile of noteFiles) {
                        // 一个 note 的信息
                        const fname = noteFile.substring(0, noteFile.length - 3)
                        if (fname === 'README') {
                            continue
                        }
                        const frontmatter = frontmatters[fname]
                        var tableRow = `<tr><td>${frontmatter.title}</td><td><a href="/research-notebook${frontmatter.permalink}">${frontmatter.permalink}</a></td></tr>`
                        tableRows.push(tableRow)
                    }
                    const tableContent = tableRows.join('\n')
                    const tableHTML = `<table>\n${tableHeader}\n${tableContent}\n</table>`
                    if (page.sfcBlocks.template != undefined) {
                        page.sfcBlocks.template.contentStripped = page.sfcBlocks.template?.contentStripped + `<h2 id="notesTable"><span>目录导航：</span></h2>\n` + tableHTML
                    }
                }
            }

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