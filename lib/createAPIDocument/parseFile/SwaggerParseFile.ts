import IParseFile from '../interface/IParseFile';
import axios, {Method} from 'axios';
import IApiData from '../interface/IApiData';
import IApiDataMap from '../interface/IApiDataMap';
import IApiParameters from '../interface/IApiParameters';

export default class SwaggerParseFile implements IParseFile {
  apiDataMap: Map<string, IApiDataMap>;
  types: Array<string> = [];
  apiDataList: Array<IApiData>;
  private static METHODS_LIST: Array<string> =
    ['get', 'GET', 'delete', 'DELETE', 'head', 'HEAD', 'options', 'OPTIONS', 'post', 'POST', 'put', 'PUT', 'patch', 'PATCH', 'purge', 'PURGE', 'link', 'LINK', 'unlink', 'UNLINK'];

  /**
   * 解析网络资源路径
   * @param analyticUrl
   */
  async action(analyticUrl: string): Promise<any> {
    // 校验是否是有效的url
    if (!/^(http:\/\/)|(https:\/\/)/.test(analyticUrl)) {
      throw new Error('analyticUrl 不是一个有效的网络地址');
    }
    const {tags, paths} = await SwaggerParseFile.getJsonByAnalyticUrl(analyticUrl);

    this.apiDataList = this.createApiDataAll(paths);

    this.apiDataMap = this.createIApiDataMapAll(tags, this.apiDataList);

    console.log(this.types.join(','));
  }

  // 创建ApiDataMap
  private createIApiDataMapAll(tags: Array<any>, apiDataList: Array<IApiData>): Map<string, IApiDataMap> {
    const apiDataMap = new Map<string, IApiDataMap>();

    for (let i = 0; i < tags.length; i++) {
      apiDataMap.set(tags[i].name, {
        tag: tags[i].name,
        apiMap: new Map<string, IApiData>()
      });
    }

    apiDataList.forEach((apiData: IApiData) => {
      apiData.tags.forEach((item: string) => {
        if (apiDataMap.has(item)) {
          // @ts-ignore
          apiDataMap.get(item).apiMap.set(`${apiData.path}_${apiData.methods}`, apiData);
        }
      });
    });

    return apiDataMap;
  }

  // 创建ApiData
  private createApiDataAll(paths: any): Array<IApiData> {
    const apiDataList: Array<IApiData> = [];
    const pathList = Object.keys(paths);
    let pathKey: string;
    let pathItemMethod: Array<Method> | Method;

    for (let i = 0; i < pathList.length; i++) {
      pathKey = pathList[i];
      // 请求方法
      pathItemMethod = this.ganPathMethod(paths[pathKey]);

      if (typeof pathItemMethod === 'string') {
        apiDataList.push(this.createApiData(pathKey, paths[pathKey], pathItemMethod));
      } else {
        pathItemMethod.forEach((item: Method) => {
          apiDataList.push(this.createApiData(pathKey, paths[pathKey], item));
        });
      }
    }

    return apiDataList;
  }

  // 根据url,返回接口文档json
  static async getJsonByAnalyticUrl(analyticUrl: string) {
    // 开始请求接口
    const {status, data} = await axios.get(analyticUrl);
    if (status !== 200) {
      throw new Error('analyticUrl url请求失败');
    }
    return data;
  }

  /**
   * 解析接口的请求方式;
   * @param pathData
   */
  private ganPathMethod(pathData: object): Array<Method> | Method {
    const methods: Array<Method> = [];
    // @ts-ignore
    const keys: Array<Method> = Object.keys(pathData);
    if (keys.length > 0) {
      keys.forEach((item: Method) => {
        if (SwaggerParseFile.METHODS_LIST.indexOf(item.toUpperCase())) {
          methods.push(item);
        } else {
          throw new Error(`${item}请求方式,暂时没有被支持;`);
        }
      });
    }
    return methods.length > 1 ? methods : methods[0];
  }

  /**
   * 生成ApiData对象
   */
  private createApiData(pathKey: string, pathData: any, methods: Method): IApiData {
    const pathItemData = pathData[methods];
    // 解析请求数据类型 application/x-www-form-urlencoded
    const consumes = this.genApiConsumes(pathItemData.consumes || []);

    let parameters: Array<IApiParameters> = [];
    try {
      // 解析参数
      parameters = this.genApiParameters(pathItemData.parameters || []);
    } catch (e) {
      console.error(`${pathKey}解析参数错误`);
    }

    return {
      tags: pathItemData.tags,
      methods,
      consumes,
      // 请求函数名
      path: pathKey,
      // 请求参数
      parameters,
      // 接口描述
      description: pathItemData.description,
      // 是方否弃用
      deprecated: pathItemData.deprecated
    };
  }

  /**
   * 生成请求数据类型
   * @param consumes
   */
  private genApiConsumes(consumes: Array<string>) {
    const c: Array<string> = consumes.filter(item => {
      return item === 'application/x-www-form-urlencoded';
    });
    return c.length > 0 ? c[0] : 'application/x-www-form-urlencoded';

  }

  /**
   * 生成参数说明
   * @param parameters
   */
  private genApiParameters(parameters: Array<any>): Array<IApiParameters> {
    const list: Array<IApiParameters> = [];
    parameters.forEach((item) => {
      const apiParameters: IApiParameters = {

        // 参数名称
        name: item.name,
        // 传参位置
        in: item.in,
        // 是否必传
        required: item.required,
        // 参数类型
        type: item.type,
        // 参数说明
        description: item.description

      };

      if (!this.types.includes(item.type)) {
        this.types.push(item.type);
      }

      if (item.items && item.items.type) {
        apiParameters.arrayItemType = item.items.type;
        if (!this.types.includes(item.items.type)) {
          this.types.push(item.items.type);
        }
      }
      if (item.enum) {
        apiParameters.enum = item.enum;
      }
      list.push(apiParameters);
    });
    return list;
  }


}


