import * as inquirer from 'inquirer';
import {Inquirer} from 'inquirer';

/**
 * @file: 构建项目期间控制台交互类
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:31 PM
 */
export class ProjectInquirer {
  private inquirer: Inquirer;

  constructor() {
    this.inquirer = inquirer;
  }

  // 单选选择模板
  radioTemplate(templateList): Promise<any> {
    return this.inquirer.prompt({
      type: 'list',
      message: '请选择项目模板',
      name: 'templateName',
      choices: templateList,
    });
  }


  // 多选模块
  checkboxModules(moduleList): Promise<{modules:Array<string>}> {
    return this.inquirer.prompt({
      message: '选择需要添加的模块',
      type: 'checkbox',
      name: 'modules',
      choices: moduleList,
    });
  }
}


