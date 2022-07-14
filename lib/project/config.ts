import IBaseTemplate from '../interface/IBaseTemplate';
import {BaseModuleOption} from '../type';

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


// name: string; // 模块描述
// value: string; // 模块识别标识
// moduleType: IProjectModuleType; // 模块类型
// projectPath?: string; // 文件安装路径
// version?: string; // 包的版本
// npmName?: string; // 包名

export const baseModuleList: Array<BaseModuleOption> = [
  {
    name: '动态路由模块',
    value: 'lib/module/dynamicRouterModule/index',
    moduleType: 'npm',
    npmName: 'gld-dynamic-routing',
    version: '1.0.0',
  }, {
    name: 'api缓存模块',
    value: 'lib/module/apiCacheModule/index',
    moduleType: 'npm',
    npmName: 'gld-api-cache',
    version: '1.0.0',
  },
];
