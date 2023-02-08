import { defineConfig } from 'vitepress';
import Locale from './locale';
import getLocaleNav from './nav';
import getLocaleSidebar from './sidebar';

export default defineConfig({
  // App related configs
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'material-theme-palenight',
    },
  },
  head: [
    [
      'script',
      {
        async: 'async',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-5Q7JHK36DC',
      },
    ],
    [
      'script',
      {},
      `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-5Q7JHK36DC');
      `,
    ],
  ],

  // theme related configs
  themeConfig: {
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aircodelabs/aircode' },
      { icon: 'twitter', link: 'https://twitter.com/aircodelabs' },
    ],
    editLink: {
      pattern: 'https://github.com/aircodelabs/aircode/blob/main/docs/en/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    algolia: {
      appId: 'CZD04B6QDX',
      apiKey: '3f5722cbb4757e46792cff3e953fe990',
      indexName: 'aircode'
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'AirCode',
      description: 'Build and Ship Node.js apps online. That\'s AirCode.',
      themeConfig: {
        nav: getLocaleNav(Locale.English),
        sidebar: getLocaleSidebar(Locale.English),
      }
    },
    [Locale.Chinese]: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'AirCode',
      description: '在线开发和发布 Node.js 应用，这就是 AirCode。',
      themeConfig: {
        nav: getLocaleNav(Locale.Chinese),
        sidebar: getLocaleSidebar(Locale.Chinese),
      }
    },
  }
});
