import WriteFile from './WriteFile';
import IApiDataMap from '../interface/IApiDataMap';
import * as path from 'path';
import IApiData from '../interface/IApiData';

/**
 * @file: 生成api.js文件,展开所有的函数
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/20 3:57 PM
 */


/**
 * @file: 生成api.js文件,以模块的形式暴露
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/20 3:57 PM
 */
export default class WriteFileExpanding extends WriteFile {
  // 保存模块的信息
  modulePathList: Array<string> = [];

  // 开始执行
  beganWrite(apiDataMap: Map<string, IApiDataMap>): void {
    // 创建改模块的根文件夹
    this.createRootDir(path.join(this.rootPath, this.writerDirPath));

    const apiModuleData = Array.from(apiDataMap.values());
    const moduleAxiosPath = path.relative(path.join(process.cwd(), this.writerDirPath), path.join(process.cwd(), 'src/http'));
    const moduleStr = this.jsonMainFileString(moduleAxiosPath, apiModuleData);

    // 拼接index个个模块的函数体


    // 开始后写入
    this.action(path.join(this.rootPath, this.writerDirPath, 'index.js'), moduleStr);
  }


  // 拼接出口文件的函数体
  jsonMainFileString(moduleAxiosPath: string, apiModuleData: Array<IApiDataMap>) {

    return `import { axios } from '${moduleAxiosPath}';
export default {
${
    apiModuleData.map((item: IApiDataMap) => {
      const apiData: Array<IApiData> = Array.from(item.apiMap.values());
      const moduleName = this.generateModuleName(apiData);
      return apiData.map((apiData: IApiData) => {
        // 获取模块名称
        return this.joinFunctionString(apiData, moduleName);
        //
      }).join(',\n');
    }).join(',\n')
}
};
`;
  }

}
