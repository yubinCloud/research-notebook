import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { NavItem, NotesItemOptions, plumeTheme } from 'vuepress-theme-plume'


const notes: NotesItemOptions[] = [
    {
        dir: 'LM',
        link: '/category/LM/',
        sidebar: 'auto',
    },
    {
        dir: 'RAG',
        link: '/category/RAG/',
        sidebar: 'auto',
    }
]

// 首页上的 nav
const navBar: NavItem[] = [
    {
        text: 'LLM',
        icon: 'material-symbols:article-outline',
        link: '/category/LM/',
    },
    {
        text: 'RAG',
        icon: 'carbon:idea',
        link: '/category/RAG/',
    }
]


export default defineUserConfig({
  // 请不要忘记设置默认语言
  lang: 'zh-CN',
  base: "/research-notebook/",
  theme: plumeTheme({
    notes: {link: '/', dir: '/notes/', notes: notes},
    navbar: navBar,
  }),
  bundler: viteBundler(),
})