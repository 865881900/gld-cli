import IApiParameters from './IApiParameters';
import {Method} from 'axios';

/**
 * @file: 表示api请求接口的 interface
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/19 1:48 PM
 */
export default interface IApiData {

  // 所在对象的tags集合
  tags: Array<string>;

  // 请求方式
  methods: Method;

  // 请求数据类型
  consumes: string;

  // 函数的path
  path: string;

  // 请求参数
  parameters: Array<IApiParameters>;

  // 接口描述
  description: string;

  // 是方否弃用
  deprecated: boolean;
}
