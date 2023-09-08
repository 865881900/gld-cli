// 是否为vue文件
import { flatMapDeep } from "lodash";

export function ifVueFile(fileName: string): boolean {
  return /\.vue$/.test(fileName);
}

const camelizeRE = /-(\w)/g;
// 把_转为驼峰命名法
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};
// 把驼峰命名法转为-
export const toUnderscoreNotation = (str: string): string => {
  return str.replaceAll(/[A-Z]/g, (c, i) => {
    return `${i === 0 ? "" : "-"}${c.toLowerCase()}`;
  });
};

export function toType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}


