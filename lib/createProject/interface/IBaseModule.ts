/**
 * @file: 项目模块接口
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/13 4:44 PM
 */
import {IProjectModuleType} from '../type';
import {PackageManager} from '../../utils/PackageManager';

export default interface IBaseModule {
  // 模块描述
  name: string;

  // 模块识别标识
  value: string;

  // 模块类型
  moduleType: IProjectModuleType;

  // 文件安装路径
  projectPath?: string;

  // npm版本
  version?: string;

  // npm包名
  npmName?: string;

  /**
   * 执行该函数,把该模块添加到该项目
   * @param packageManager: npm包管理对象
   */
  install: (packageManager: PackageManager, newProjectPath: string) => Promise<any>;
}
