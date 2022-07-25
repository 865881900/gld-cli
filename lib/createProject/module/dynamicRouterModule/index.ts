import {PackageManager} from '../../../utils/PackageManager';
import IBaseModule from '../../interface/IBaseModule';
import {BaseModuleOption, IProjectModuleType} from '../../type';
import {copySync, openSync, writeSync} from 'fs-extra';
import * as path from 'path';

/**
 * @file: 动态路由模块
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/13 4:50 PM
 */
export default class DynamicRouterModule implements IBaseModule {
  name: string;
  value: string;
  moduleType: IProjectModuleType;
  npmName: string;
  version: string;

  constructor(baseModuleOption: BaseModuleOption) {
    const {moduleType, name, value, npmName, version} = baseModuleOption;
    this.moduleType = moduleType;
    this.name = name;
    this.value = value;
    npmName && (this.npmName = npmName);
    version && (this.version = version);
  }

  async install(packageManager: PackageManager, newProjectPath: string): Promise<any> {
    await packageManager.InstallationModuleByModuleName(this.npmName, this.version);

    copySync(path.join(__dirname, 'file/configMenu.js'), path.join(newProjectPath, 'src/router/configMenu.js'));


    const context = 'import { user } from \'../http/api\';\n' +
      'import ControlDynamicRouter from \'gld-dynamic-routing\';\n' +
      'import configMenu from \'./configMenu\';\n' +
      'new ControlDynamicRouter({\n' +
      '  configMenu: configMenu,\n' +
      '  idName: \'resCode\',\n' +
      '  getUserMenuPromiseFun: async () => {\n' +
      '    const {\n' +
      '      data: { menuList }\n' +
      '    } = await user.init();\n' +
      '    return menuList;\n' +
      '  },\n' +
      '  addRouteOption: {\n' +
      '    path: \'/\',\n' +
      '    title: \'main\',\n' +
      '    name: \'Main\',\n' +
      '    component: () => import(\'@/views/main\')\n' +
      '  },\n' +
      '  router: router\n' +
      '});';
    const file = openSync(path.join(newProjectPath, 'src/router/index.js'), 'a+');
    writeSync(file, context);
  }
}
