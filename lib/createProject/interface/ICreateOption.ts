import {PM} from '../type';

export default interface ICreateOption{
  // js包管理器
  pm: PM
  // 如果目录已经存在,使用该参数会覆盖该目录的内容
  force: boolean
  // 是否合并
  merge: boolean
  // 关联的git库地址
  gitUrlAndBranch: string
}
