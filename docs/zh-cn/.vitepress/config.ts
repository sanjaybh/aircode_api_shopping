import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';

export default defineConfig({

  // App related configs
  lang: 'zh-CN',
  title: 'AirCode 文档',
  description: 'Code, debug, deploy, operate, and share your APIs with zero-config.',
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',
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
    [
      'script',
      {},
      `
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/lmbk1g3e';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      `
    ],
    [
      'link',
      { rel: 'icon', href: 'https://aircode.io/favicons/favicon.ico' }
    ],
    [
      'link',
      { rel: 'canonical', href: 'https://aircode.io/' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://aircode.io/favicons/apple-touch-icon.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://aircode.io/favicons/favicon-32x32.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://aircode.io/favicons/favicon-16x16.png' }
    ],
    [
      'meta',
      { name: 'keywords', content: 'AirCode,Nodejs,Node.js,JavaScript,TypeScript' }
    ],
    [
      'meta',
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
    ],
    [
      'meta',
      { property: 'og:locale', content: 'en_US' }
    ],
    [
      'meta',
      { property: 'og:type', content: 'website' }
    ],
    [
      'meta',
      { property: 'og:site_name', content: 'AirCode' }
    ],
    [
      'meta',
      { property: 'article:publisher', content: 'https://twitter.com/aircode_io' }
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://aircode.io/meta-image-20230808133206.png' }
    ],
    [
      'meta',
      { property: 'article:modified_time', content: '2023-07-21T15:09:45+00:00' }
    ],
    [
      'meta',
      { property: 'og:image:width', content: '1200' }
    ],
    [
      'meta',
      { property: 'og:image:height', content: '675' }
    ],
    [
      'meta',
      { property: 'og:image:type', content: 'image/png' }
    ],
    [
      'meta',
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    [
      'meta',
      { name: 'twitter:site', content: '@aircode_io' }
    ],
    [
      'meta',
      { name: 'twitter:title', content: 'AirCode' }
    ],
    [
      'meta',
      { name: 'twitter:description', content: 'Serverless Node.js stack for API development.' }
    ],
    [
      'meta',
      { name: 'twitter:image', content: 'https://aircode.io/meta-image-20230808133206.png' }
    ],
  ],

  // theme related configs
  themeConfig: {
    nav,
    sidebar,
    outline: [2, 3],
    outlineTitle: '本页目录',
    lastUpdatedText: '最后更新于',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aircodelabs/aircode' },
      { icon: 'twitter', link: 'https://twitter.com/aircode_io' },
      { icon: 'discord', link: 'https://discord.com/invite/XrMVdYdEuY' },
    ],
    editLink: {
      pattern: 'https://github.com/aircodelabs/aircode/blob/main/docs/zh-cn/src/:path',
      text: '在 GitHub 编辑此页',
    },
    algolia: {
      appId: 'DLBHPK5MQQ',
      apiKey: '15800f32b34bb23d9bd4bf0fdf26153c',
      indexName: 'cn-aircode'
    },
  },
});
