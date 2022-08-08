/**
 * @file: 表示请求api参数的类
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/19 1:49 PM
 */
export default interface IApiParameters {
  // 参数名称
  name: string;
  // 传参位置
  in: string;
  // 是否必传
  required: false;
  // 参数类型
  type: string;
  // 参数说明
  description?: string;
  // 如果参数类型是array, 这是他的子类型
  arrayItemType?: string;
  // 如果该参数存在,则该参数为枚举类型;
  enum?: Array<any>;
}
