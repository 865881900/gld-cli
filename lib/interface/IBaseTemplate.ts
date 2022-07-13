import IBaseModule from './IBaseModule';

export default interface IBaseTemplate extends IBaseModule {
  // 下载地址
  path: string;
  // 下载类型
  type: BaseTemplateType;
}

/**
 * BASE: 只下载基础版本
 * BASE_COM: 基础版本 + 组合
 */
export type BaseTemplateType = 'BASE' | 'BASE_COM';
