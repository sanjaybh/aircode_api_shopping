import type { DefaultTheme } from 'vitepress';
import Locale from './locale';

type LocaleText = {
  [key in Locale]: string;
};
type LocaleNavItemWithLink = Omit<DefaultTheme.NavItemWithLink, 'text'> & {
  text: LocaleText;
};
type LocaleNavItemChildren = Omit<DefaultTheme.NavItemChildren, 'text' | 'items' > & {
  text?: LocaleText;
  items: LocaleNavItemWithLink[];
}
interface LocaleNavItemWithChildren extends Omit<DefaultTheme.NavItemWithChildren, 'text' | 'items' > {
  text?: LocaleText;
  items: (LocaleNavItemChildren | LocaleNavItemWithLink)[];
}
type LocaleNavItem = LocaleNavItemWithLink | LocaleNavItemWithChildren;

const nav: LocaleNavItem[] = [
  {
    text: {
      en: 'Guide',
      cn: '指南',
    },
    activeMatch: '^/((getting-started|guide|about)/.*)?$',
    items: [
      {
        text: {
          en: 'Getting Started',
          cn: '入门指南',
        },
        items: [
          { 
            text: {
              en: 'About AirCode',
              cn: 'AirCode 介绍',
            },
            link: '/'
          },
          { 
            text: {
              en: 'Quick Start',
              cn: '快速上手',
            },
            link: '/getting-started/'
          },
          { 
            text: {
              en: 'Database Introduction',
              cn: '数据库入门',
            },
            link: '/getting-started/database'
          },
          { 
            text: {
              en: 'File Storage Introduction',
              cn: '文件存储入门',
            },
            link: '/getting-started/files'
          },
        ],
      },
      {
        text: {
          en: 'Features',
          cn: '功能介绍',
        },
        items: [
          { 
            text: {
              en: 'Cloud Function',
              cn: '云函数',
            },
            link: '/guide/functions/'
          },
          { 
            text: {
              en: 'Database',
              cn: '数据库',
            },
            link: '/guide/database/'
          },
          { 
            text: {
              en: 'File Storage',
              cn: '文件存储',
            },
            link: '/guide/files/'
          },
        ],
      },
      {
        text: {
          en: 'More',
          cn: '更多',
        },
        items: [
          { 
            text: {
              en: 'Limits',
              cn: '资源限制',
            },
            link: '/about/limits'
          },
        ],
      },
    ],
  },
  {
    text: {
      en: 'API Reference',
      cn: 'API 参考',
    },
    activeMatch: '^/(reference|errors)/',
    items: [
      { 
        text: {
          en: 'Function Runtime',
          cn: '云函数运行时',
        },
        link: '/reference/server/functions-runtime'
      },
      { 
        text: {
          en: 'Function API',
          cn: '云函数 API',
        },
        link: '/reference/server/functions-api'
      },
      { 
        text: {
          en: 'Database API',
          cn: '数据库 API',
        },
        link: '/reference/server/database-api'
      },
      { 
        text: {
          en: 'File Storage API',
          cn: '文件存储 API',
        },
        link: '/reference/server/files-api'
      },
    ],
  },
  {
    text: {
      en: 'Help',
      cn: '帮助和支持',
    },
    activeMatch: '^/help/',
    link: '/help/',
  },
  {
    text: {
      en: 'Dashboard',
      cn: '控制台',
    },
    link: 'https://aircode.io/dashboard',
  },
];

function getLocaleText(locale: Locale, text?: LocaleText) {
  return text ? text[locale] : undefined;
}
function getLocaleLink(locale: Locale, link: string) {
  return locale === Locale.English ? link : `/${locale}${link}`;
}
function getLocaleActiveMatch(locale: Locale, activeMatch?: string) {
  if (activeMatch === undefined) {
    return activeMatch;
  }
  return locale === Locale.English ?
    activeMatch :
    `${activeMatch.substring(0, 1)}/${locale}${activeMatch.substring(1)}`;
}

function getLocaleLinkItem(locale: Locale, item: LocaleNavItemWithLink) : DefaultTheme.NavItemWithLink {
  return {
    ...item,
    text: getLocaleText(locale, item.text) as string,
    link: getLocaleLink(locale, item.link),
    activeMatch: getLocaleActiveMatch(locale, item.activeMatch),
  };
}

export default function getLocaleNav(locale: Locale): DefaultTheme.NavItem[] {
  return nav.map(item => 'items' in item ? {
    ...item,
    text: getLocaleText(locale, item.text),
    activeMatch: getLocaleActiveMatch(locale, item.activeMatch),
    items: item.items.map(ci => 'items' in ci ? {
      ...ci,
      text: getLocaleText(locale, ci.text),
      items: ci.items.map(li => getLocaleLinkItem(locale, li)),
    } : getLocaleLinkItem(locale, ci))
  } : getLocaleLinkItem(locale, item));
}
