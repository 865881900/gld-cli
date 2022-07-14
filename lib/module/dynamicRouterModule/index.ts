import {PackageManager} from '../../utils/PackageManager';
import IBaseModule from '../../interface/IBaseModule';
import {BaseModuleOption, IProjectModuleType} from '../../type';

/**
 * @file: 动态路由模块
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/13 4:50 PM
 */
export default class DynamicRouterModule implements IBaseModule {
  name: string;
  value: string;
  moduleType: IProjectModuleType;
  projectPath: string;

  constructor(baseModuleOption: BaseModuleOption) {
    const {moduleType, name, value, projectPath} = baseModuleOption;
    this.moduleType = moduleType;
    this.name = name;
    this.value = value;
    projectPath && (this.projectPath = projectPath);
  }

  async install(packageManager: PackageManager): Promise<any> {
    console.log('执行install函数 DynamicRouterModule', packageManager);
    // packageManager.InstallationModuleByModuleName();
  }
}
