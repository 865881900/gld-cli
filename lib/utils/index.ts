// 是否为vue文件
import { flatMapDeep } from 'lodash';

export function ifVueFile(fileName: string): boolean{
  return /\.vue$/.test(fileName);
}

const camelizeRE = /-(\w)/g;
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
export function toType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}
