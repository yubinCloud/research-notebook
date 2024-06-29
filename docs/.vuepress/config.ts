import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { NavItem, NotesItemOptions, plumeTheme } from 'vuepress-theme-plume'

import { autoCategoryPlugin } from './auto-category-plugin'


const notes: NotesItemOptions[] = [
    {
        dir: 'LM',
        link: '/category/LM/',
        sidebar: 'auto',
    },
    {
        dir: 'LLM 评估',
        link: '/category/LLM-evaluation/',
        sidebar: 'auto',
    },
    {
        dir: 'RAG',
        link: '/category/RAG/',
        sidebar: 'auto',
    },
    {
        dir: 'Text2SQL',
        link: '/category/Text2SQL/',
        sidebar: 'auto'
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
        text: 'LLM 评估',
        icon: 'ep:finished',
        link: '/category/LLM-evaluation/',
    },
    {
        text: 'RAG',
        icon: 'carbon:idea',
        link: '/category/RAG/',
    },
    {
        text: 'Text2SQL',
        icon: 'maki:religious-muslim',
        link: '/category/Text2SQL/'
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
  plugins: [
    autoCategoryPlugin
  ],
  bundler: viteBundler(),
})