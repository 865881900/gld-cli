export interface MFile {
  // 文件名称
  fileName: string,
  // 文件路径
  filePath: string,
  // 文件hash值
  fileHash?: string,
  // 文件最后修改时间
  fileUpdateTile?: string
}
