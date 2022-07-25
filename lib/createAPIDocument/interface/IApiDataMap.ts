import IApiData from './IApiData';

/**
 * 接口按照业务进行分类
 */
export default interface IApiDataMap {
  tag: string;
  apiMap: Map<string, IApiData>;
}
