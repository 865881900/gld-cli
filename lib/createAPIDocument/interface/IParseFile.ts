import IApiDataMap from './IApiDataMap';
import IApiData from './IApiData';

/**
 * @file: 解析文档变为json格式数据的类的父接口
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/19 1:50 PM
 */
export default interface IParseFile {
  apiDataMap: Map<string, IApiDataMap>;

  apiDataList: Array<IApiData>;

  // 解析路径: 当解析类型为swagger时, 解析路径为一个链接地址; 如果解析类型为localFile时,解析路径为相对当前项目根目录的文件
  action: (analyticUrl: string) => Promise<any>;
}
