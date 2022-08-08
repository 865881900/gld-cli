import IApiDataMap from '../interface/IApiDataMap';
import IApiParameters from '../interface/IApiParameters';
import IApiData from '../interface/IApiData';
import {FunctionNameStyle} from '../type';
import {copySync, createWriteStream, existsSync, mkdirSync, rmSync} from 'fs-extra';
import * as path from 'path';
import {Method} from 'axios';

export default class WriteFile {
  // 文件写入文件夹
  writerDirPath: string;

  // 是否需要请求前校验
  isVerify: boolean;

  // 函数风格
  functionNameStyle?: FunctionNameStyle;

  // 是否生成注解
  isGeneratedComments?: boolean;

  protected _apiList: Array<string> = [];

  // 当前项目的路径
  protected rootPath: string;

  // 校验文件的路径
  protected validatePath: string;

  constructor(writerDirPath: string, isVerify: boolean, functionNameStyle?: FunctionNameStyle, isGeneratedComments?: boolean) {
    this.writerDirPath = writerDirPath;
    this.isVerify = isVerify;
    this.functionNameStyle = functionNameStyle || 'lcc';
    this.isGeneratedComments = isGeneratedComments || true;
    this.rootPath = process.cwd();
  }


  /**
   *
   * @param apiDataMap 模块的数据
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beganWrite(apiDataMap: Map<string, IApiDataMap>): void {
    // console.log(apiDataMap);
  }

  /**
   * 生成模块
   * @param apiDataMap
   */
  joinModuleString(apiDataMap: IApiDataMap): string {
    this._apiList = [];

    // 模块信息
    const apiDataList = Array.from(apiDataMap.apiMap.values());
    return `{\n${apiDataList.map(item => this.joinFunctionString(item)).join('')}\n },`;
  }

  /**
   * @expository: 生成函数体
   * @param apiData api信息
   * @param moduleName api所属模块信息
   * @data: 2022/7/25 10:29 AM
   * @author: ChaoPengWang(wangcp-a@glodon.com)
   * @return
   */
  joinFunctionString(apiData: IApiData, moduleName?: string): string {
    const pathList: Array<string> = apiData.path.split('/').filter(item => item);
    let apiName;


    if (/\{.*\}/.test(pathList[pathList.length - 1])) {
      apiName = `${pathList[pathList.length - 2]}-${apiData.methods}`;
    } else {
      apiName = pathList[pathList.length - 1];
    }
    if (this._apiList.includes(apiName)) {
      apiName = `${apiName}-${apiData.methods}`;
    }
    this._apiList.push(apiName);


    let apiNameList;
    // - 隔开
    if (/\W/.test(apiName)) {
      apiNameList = apiName.split(/\W/);
    } else if (/[A-Z]/.test(apiName)) {
      apiNameList = apiName.split(/[A-Z]/);
    } else {
      apiNameList = [apiName];
    }

    apiName = apiNameList.map((item, index) => {
      if (this.functionNameStyle === 'u_c') {
        return item;
      }
      if (this.functionNameStyle === 'lcc' && index === 0) {
        return item;
      }
      return item.replace(item[0], item[0].toUpperCase());
    }).join(this.functionNameStyle === 'u_c' ? '_' : '');


    return `  /**${apiData.description ? `\n   * ${apiData.description}` : ''}${this.joinComments(apiData.parameters)}
   */
  ${moduleName ? `${moduleName}_` : ''}${apiName}: function (data) {${apiData.deprecated ? `\n  console.warn(\`${apiData.path}接口已弃用\`);` : ''}${this.isVerify ? this.addValidateFunction(apiData.parameters, apiData.path, apiData.methods) : ''}
    return axios.${apiData.methods}('${apiData.path}', data, {
      headers: {
        'content-type': '${apiData.consumes}'
      }
    });
  }`;
  }

  /**
   * 生成函数说明
   * @param parameters
   */
  joinComments(parameters: Array<IApiParameters>): string {
    return parameters.filter(item => item.description).map(item => {
      return `\n   * ${item.required ? '@必填' :'@param'} data.${item.name}<${item.type}>:${item.description}`;
    }).join('');
  }


  // 根据风格处理名称
  generateName(name: string): string {
    return name;
  }

  // 创建文件夹
  createRootDir(path: string) {
    const is = existsSync(path);
    if (!is) {
      mkdirSync(path);
    }
  }

  //删除文件
  rmFile(path: string) {
    const is = existsSync(path);
    if (is) {
      rmSync(path);
    }
  }

  /**
   * 解析模块名称
   * lcc: 小驼峰
   * UCC: 大驼峰
   * u_c: 下划线
   * @param moduleNameList
   */
  generateModuleName(moduleNameList: Array<IApiData>): string {
    const nameList = moduleNameList.map(item => item.path.split('/').filter(item => item !== '')).reduce((l, n) => {
      const arr: Array<string> = [];
      let i = 0, j = 0;
      const maxLength = Math.max(l.length, n.length);
      while (i < maxLength && j < maxLength) {
        if (l[i] === n[j]) {
          if (arr.length === 0) {
            arr.push(l[i]);
            i += 1;
            j += 1;
          } else if (arr[arr.length - 1] === l[i - 1] && arr[arr.length - 1] === n[j - 1]) {
            arr.push(l[i]);
            i += 1;
            j += 1;
          } else {
            return arr;
          }
        } else if ((j + 1) < maxLength && l[i] === n[j + 1]) {
          j += 1;
        } else if ((i + 1) < maxLength && l[i + 1] === n[j]) {
          i += 1;
        } else {
          i += 1;
          j += 1;
        }
      }
      return arr;
    });
    let moduleName = nameList[0];
    if (moduleName === undefined) {
      moduleName = moduleNameList[0].path.split('/')[0] || moduleNameList[0].path;
    }
    return moduleName.split(/\W/).map(item => {
      item = item.replace(item[0], item[0].toUpperCase());
      return item;
    }).join('');
  }

  /**
   * 向文件写入内容
   * @param filePath 文件路径
   * @param context 写入内容
   */
  action(filePath: string, context: string) {
    const w = createWriteStream(filePath);
    w.write(context);
    w.end();
  }

  /**
   * 生成校验函数体
   * @param
   */
  createValidationFunctions() {
    this.validatePath = path.join(this.rootPath, this.writerDirPath, 'validate.js');
    // copy校验文件到项目下;
    copySync(path.resolve(__dirname, '../validate/index.js'), this.validatePath);
  }

  // 给函数添加校验函数
  addValidateFunction(parameters: Array<IApiParameters>, apiDataPath, methods: Method) {
    return `\n    if(!validateParameter(data, ${JSON.stringify(parameters)}, '${apiDataPath}', '${methods}')) return;`;
  }
}
