import IBaseTemplate from '../interface/IBaseTemplate';

export const baseTemplateList: Array<IBaseTemplate> = [
  {
    name: '后台管理模板(纯净版)',
    value: 'manaSystemPure',
    path: 'https://github.com/865881900/vue-management-template.git',
    type: 'BASE',
  }, {
    name: '基于后台管理模板 选择模块',
    value: 'manaSystemCustom',
    path: 'https://github.com/865881900/vue-management-template.git',
    type: 'BASE_COM',
  },
];

export const baseModuleList: Array<any> = [
  {
    name: '动态路由模块',
    value: 'lib/module/DynamicRouterModule',
  }, {
    name: 'api缓存模块',
    value: 'lib/module/ApiCacheModule',
  },
];
