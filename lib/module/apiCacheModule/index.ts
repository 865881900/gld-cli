import IBaseModule from '../../interface/IBaseModule';
import {BaseModuleOption, IProjectModuleType} from '../../type';
import {PackageManager} from '../../utils/PackageManager';
import {copySync} from 'fs-extra';
import * as path from 'path';
/**
 * @file: api缓存模块
 * @npm gld-api-cache
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/14 9:05 AM
 */
export default class ApiCacheModule implements IBaseModule {
  moduleType: IProjectModuleType;
  name: string;
  value: string;
  version: string;
  npmName: string;

  constructor(baseModuleOption: BaseModuleOption) {
    const {moduleType, name, value, version, npmName} = baseModuleOption;
    this.moduleType = moduleType;
    this.name = name;
    this.value = value;
    version && (this.version = version);
    npmName && (this.npmName = npmName);
  }

  async install(packageManager: PackageManager, newProjectPath: string) {
    // npm 拉取模块
    await packageManager.InstallationModuleByModuleName(this.npmName, this.version);

    // 写入server 目录
    copySync(path.join(__dirname, 'file/Axios.js'), path.join(newProjectPath, 'src/http/Axios.js'));
  }
}
