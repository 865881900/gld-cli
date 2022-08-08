import WriteFile from './WriteFile';
import IApiDataMap from '../interface/IApiDataMap';
import * as path from 'path';


/**
 * @file: 生成api.js文件,以模块的形式暴露
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/20 3:57 PM
 */
export default class WriteFileModule extends WriteFile {
  // 每个模块放置的目录名
  static MODULE_DIR_NAME: string = 'modules';

  // 保存模块的信息
  modulePathList: Array<string> = [];

  // 开始执行
  beganWrite(apiDataMap: Map<string, IApiDataMap>): void {

    // 引入校验文件
    this.isVerify && this.createValidationFunctions();

    // 创建改模块的根文件夹
    this.createRootDir(path.join(this.rootPath, this.writerDirPath));

    const apiDataList = Array.from(apiDataMap.values());

    this.writeModulesFile(apiDataList);

    this.writeMainFile(apiDataList);


  }

  //写入出口main文件
  writeMainFile(moduleList: Array<IApiDataMap>) {
    const mainPath = path.join(this.rootPath, this.writerDirPath, 'index.js');
    let moduleName;
    const context = moduleList.map(item => {
      moduleName = this.generateModuleName(Array.from(item.apiMap.values()));
      return `// ${item.tag}
export const ${moduleName} = import('./modules/${moduleName}.js');\n`;
    }).join('');
    this.action(mainPath, context);
  }


  // 写入模块文件
  writeModulesFile(moduleList: Array<IApiDataMap>) {
    const moduleDir = path.join(this.writerDirPath, WriteFileModule.MODULE_DIR_NAME);
    //相对路径,相对已axios模块
    const moduleAxiosPath = path.relative(path.join(process.cwd(), moduleDir), path.join(process.cwd(), 'src/http'));
    // 创建存储模块的文件夹
    this.createRootDir(path.join(this.rootPath, moduleDir));
    let moduleStr;
    let moduleItemPath;
    let moduleName;
    for (let i = 0; i < moduleList.length; i++) {
      moduleName = this.generateModuleName(Array.from(moduleList[i].apiMap.values()));
      this.modulePathList.push(moduleName);
      moduleItemPath = path.join(this.rootPath, moduleDir, this.modulePathList[i] + '.js');
      moduleStr = this.jsonModuleString(moduleAxiosPath, moduleList[i], path.join(this.rootPath, moduleDir));
      this.action(moduleItemPath, moduleStr);
    }
  }

  /**
   * 拼接模块
   * @param moduleAxiosPath 该模块保存位置
   * @param apiDataMap 该模块的信息
   * @param moduleItemPath 模块的路径
   */
  jsonModuleString(moduleAxiosPath, apiDataMap: IApiDataMap, moduleItemPath: string): string {
    const apiList = Array.from(apiDataMap.apiMap.values());
    this._apiList = [];
    return `import { axios } from '${moduleAxiosPath}';
    ${this.isVerify ? `\n import { validateParameter } from '${path.relative(moduleItemPath, this.validatePath)}';` : ''}
export default {
${apiList.map(item => {
      return this.joinFunctionString(item);
    }).join(',\n')}
};
`;
  }


}
