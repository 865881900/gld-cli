// 是否为vue文件
export function ifVueFile(fileName: string): boolean{
  return /\.vue$/.test(fileName);
}
