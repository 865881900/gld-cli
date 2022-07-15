import IBaseTemplate from './IBaseTemplate';
import {ProjectInquirer} from '../inquirer/ProjectInquirer';
import Github from '../utils/Github';

/**
 * @file: 构建项目接口
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:30 PM
 */
export default interface INewProject {
  // git控制器
  github: Github;

  // 控制台交互控制对象
  projectInquirer: ProjectInquirer;

  // 可用基础模板
  baseTemplateList: Array<IBaseTemplate>;

  // 项目名称
  newProjectName: string;

  // 项目路径
  newProjectPath: string;

  //项目依赖模块
  newProjectModuleList: Array<any>;

  /**
   * 开始构建项目
   */
  createAction(): void

  // 选择基础模板
  selectBaseTemplate(): Promise<IBaseTemplate>

  // 选择添加模块
  selectBaseModule(): Promise<Array<string>>

}
