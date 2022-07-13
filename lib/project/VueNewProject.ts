import IBaseTemplate from '../interface/IBaseTemplate';
import {ProjectInquirer} from '../inquirer/ProjectInquirer';

import {baseModuleList, baseTemplateList} from './config';
import IBaseModule from '../interface/IBaseModule';


/**
 * @file: 项目模板模板类
 * 提供构建项目过程中,选择模板, 选择模块的功能
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:30 PM
 */
export default class VueNewProject {

  baseModuleList: Array<IBaseModule>;
  baseTemplateList: Array<IBaseTemplate>;
  newProjectModuleList: Array<any>;
  newProjectName: string;
  newProjectPath: string;
  projectInquirer: ProjectInquirer;

  constructor(newProjectName: string, newProjectPath: string) {
    this.projectInquirer = new ProjectInquirer();

    this.newProjectName = newProjectName;
    this.newProjectPath = newProjectPath;
    this.baseTemplateList = baseTemplateList;
    this.baseModuleList = baseModuleList;
  }


  /**
   * 选择基础模块
   * @implements INewProject.selectBaseTemplate
   * @return 选择的基础模板信息
   */
  async selectBaseTemplate(): Promise<IBaseTemplate> {
    const {baseTemplateList} = this;
    const {templateName} = await this.projectInquirer.radioTemplate(this.baseTemplateList);
    return baseTemplateList.filter((item: IBaseTemplate) => {
      return item.value === templateName;
    })[0];
  }

  /**
   * 选择基础模块
   * @implements INewProject.selectBaseModule
   * @return 选择的基础模块路径
   */
  async selectBaseModule(): Promise<Array<string>> {
    const {modules} = await this.projectInquirer.checkboxModules(this.baseModuleList);
    return modules;
  }
}
