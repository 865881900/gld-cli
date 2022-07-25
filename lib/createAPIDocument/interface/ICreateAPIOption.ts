import {CreateAPIAnalyticType, FileOutletType, FunctionNameStyle} from '../type';

/**
 * @file: 构建api实例时, options形参类型的类型接口
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/19 1:50 PM
 */
export default interface ICreateAPIOption {
  // 解析类型
  analyticType: CreateAPIAnalyticType;

  // 解析路径: 当解析类型为swagger时, 解析路径为一个链接地址; 如果解析类型为localFile时,解析路径为相对当前项目根目录的文件
  analyticUrl: string;

  // 文件生成目录, 相对当前项目的根目录
  outputPathDirName: string;

  // 生成文件输出口:
  fileOutletType?: FileOutletType;

  // 生成函数风格
  functionNameStyle?: FunctionNameStyle;

  // 是否生成注释
  isGeneratedComments?: boolean;

  // 发起http请求前, 是否校验参数类型
  requestBeforeIsVerify?: boolean;

}

