import type { DefaultTheme } from 'vitepress';
import Locale from './locale';

type LocaleSidebar = {
  [path: string]: LocaleSidebarItem[];
};
interface LocaleSidebarItem extends Omit<DefaultTheme.SidebarItem, 'text' | 'items'> {
  text?: LocaleText;
  items?: LocaleSidebarItem[];
}
type LocaleText = {
  [key in Locale]: string;
};

const sidebar: LocaleSidebar = {
  '/errors/': [],
  '/help/': [],
  '/legal/': [],
  '/careers/': [],
  '/': [
    {
      text: {
        en: 'Getting Started',
        cn: '入门指南'
      },
      items: [
        { 
          text: {
            en: 'About AirCode',
            cn: 'AirCode 介绍'
          },
          link: '/'
        },
        { 
          text: {
            en: 'Quick Start',
            cn: '快速上手'
          },
          link: '/getting-started/'
        },
        { 
          text: {
            en: 'Database Introduction',
            cn: '数据库入门'
          },
          link: '/getting-started/database'
        },
        { 
          text: {
            en: 'File Storage Introduction',
            cn: '文件存储入门'
          },
          link: '/getting-started/files'
        },
      ],
    },
    {
      text: {
        en: 'Cloud Function',
        cn: '云函数'
      },
      collapsed: false,
      items: [
        { 
          text: {
            en: 'Cloud Function Overview',
            cn: '云函数概览'
          },
          link: '/guide/functions/'
        },
        { 
          text: {
            en: 'Develop Online',
            cn: '在线开发云函数'
          },
          link: '/guide/functions/development'
        },
        { 
          text: {
            en: 'Debug Online',
            cn: '在线调试云函数'
          },
          link: '/guide/functions/debug'
        },
        { 
          text: {
            en: 'Deployment',
            cn: '部署云函数'
          },
          link: '/guide/functions/deployment'
        },
        { 
          text: {
            en: 'Invoke Functions',
            cn: '调用云函数'
          },
          link: '/guide/functions/invoke'
        },
        { 
          text: {
            en: 'Online Logs',
            cn: '线上日志'
          },
          link: '/guide/functions/logs'
        },
        { 
          text: {
            en: 'Using NPM',
            cn: '使用 NPM 安装依赖'
          },
          link: '/guide/functions/npm'
        },
        { 
          text: {
            en: 'Function Runtime',
            cn: '云函数运行时'
          },
          link: '/reference/server/functions-runtime'
        },
        { 
          text: {
            en: 'Function API',
            cn: '云函数 API'
          },
          link: '/reference/server/functions-api'
        },
        {
          text: {
            en: 'Advanced',
            cn: '高级功能'
          },
          items: [
            { 
              text: {
                en: 'Environment Variable',
                cn: '使用环境变量'
              },
              link: '/guide/functions/env'
            },
            { 
              text: {
                en: 'Send HTTP Request',
                cn: '发送 HTTP 请求'
              },
              link: '/guide/functions/http-request'
            },
            { 
              text: {
                en: 'Load Other Functions',
                cn: '函数间引用'
              },
              link: '/guide/functions/require'
            },
            { 
              text: {
                en: 'POST Parameters',
                cn: '获取 POST 参数'
              },
              link: '/guide/functions/post-params'
            },
            { 
              text: {
                en: 'GET Parameters',
                cn: '获取 GET 参数'
              },
              link: '/guide/functions/get-params'
            },
          ],
        },
      ],
    },
    {
      text: {
        en: 'Database',
        cn: '数据库'
      },
      collapsed: false,
      items: [
        { 
          text: {
            en: 'Database Overview',
            cn: '数据库概览'
          },
          link: '/guide/database/'
        },
        { 
          text: {
            en: 'Insert Data',
            cn: '插入数据'
          },
          link: '/guide/database/insert'
        },
        { 
          text: {
            en: 'Find Data',
            cn: '查询数据'
          },
          link: '/guide/database/find'
        },
        { 
          text: {
            en: 'Update Data',
            cn: '更新数据'
          },
          link: '/guide/database/update'
        },
        { 
          text: {
            en: 'Delete Data',
            cn: '删除数据'
          },
          link: '/guide/database/delete'
        },
        { 
          text: {
            en: 'Database API',
            cn: '数据库 API'
          },
          link: '/reference/server/database-api'
        },
        {
          text: {
            en: 'Advanced',
            cn: '高级功能'
          },
          items: [
            { 
              text: {
                en: 'Geo-based Query',
                cn: '基于地理位置查询'
              },
              link: '/guide/database/geo'
            },
            { 
              text: {
                en: 'Use Indexes',
                cn: '使用索引优化查询'
              },
              link: '/guide/database/indexes'
            },
          ]
        }
      ],
    },
    {
      text: {
        en: 'File Storage',
        cn: '文件存储'
      },
      collapsed: false,
      items: [
        { 
          text: {
            en: 'File Storage Overview',
            cn: '文件存储概览'
          },
          link: '/guide/files/'
        },
        { 
          text: {
            en: 'Upload Files',
            cn: '上传文件'
          },
          link: '/guide/files/upload'
        },
        { 
          text: {
            en: 'Download Files',
            cn: '下载文件'
          },
          link: '/guide/files/download'
        },
        { 
          text: {
            en: 'Delete Files',
            cn: '删除文件'
          },
          link: '/guide/files/delete'
        },
        { 
          text: {
            en: 'File Storage API',
            cn: '文件存储 API'
          },
          link: '/reference/server/files-api'
        },
      ],
    },
    {
      text: {
        en: 'More',
        cn: '更多'
      },
      collapsed: false,
      items: [
        { 
          text: {
            en: 'Resource Limits',
            cn: '资源限制'
          },
          link: '/about/limits'
        },
      ],
    }
  ],
};

function getLocaleText(locale: Locale, text?: LocaleText) {
  return text ? text[locale] : undefined;
}
function getLocaleLink(locale: Locale, link: string) {
  return locale === Locale.English ? link : `/${locale}${link}`;
}
function getLocaleItem(locale: Locale, item: LocaleSidebarItem) : DefaultTheme.SidebarItem {
  return {
    ...item,
    text: getLocaleText(locale, item.text),
    link: item.link ? getLocaleLink(locale, item.link) : undefined,
    items: item.items ? item.items.map(i => getLocaleItem(locale, i)) : undefined,
  };
}

export default function getLocaleSidebar(locale: Locale): DefaultTheme.Sidebar {
  return Object.keys(sidebar).reduce((prev, path) => {
    prev[getLocaleLink(locale, path)] = sidebar[path].map(
      item => getLocaleItem(locale, item)
    );
    return prev;
  }, {})
}
