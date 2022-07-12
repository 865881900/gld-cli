import * as validate from 'validate-npm-package-name';

import {CreateOption} from '../interface/CreateOption';
import {NewProjectType, NewPackageManager} from '../type';
import VueNewProject from '../project/VueNewProject';
import NewProject from '../project/NewProject';
import NodeNewProject from '../project/NodeNewProject';
import message from '../utils/Console';
import * as path from 'path';
import {pathExistsSync, readdirSync, removeSync} from 'fs-extra';
import * as inquirer from 'inquirer';
import creatInquirer from '../inquirer/CreatInquirer';

export default class Create {

  // 应用程序实例
  newProject: NewProject;

  // npm包管理程序
  newPackageManager: NewPackageManager;

  // 是否是当前目录下
  inCurrent: boolean;

  //项目类型
  type: NewProjectType;

  // 如果目录已经存在,是否覆盖该文件夹
  force: boolean;

  // 是否合并该文件夹
  merge: boolean;

  // 项目的远程地址
  gitPath: string;


  constructor(projectName: string, createOption: CreateOption, type: NewProjectType) {
    this.inCurrent = projectName === '.' || projectName === './' || projectName === '/';
    this.newPackageManager = createOption.newPackageManager;
    this.force = createOption.force;
    this.merge = createOption.merge;
    createOption.gitPath;
    this.type = type;

    // 当前node工作路径
    const cwd = process.cwd();
    const newProjectName = this.inCurrent ? path.relative('../', cwd) : projectName;
    const newProjectPath = path.resolve(cwd, projectName || './');
    console.log('解析后的项目名称:', newProjectName);
    console.log('项目绝对路径:', newProjectPath);

    // 校验项目名称
    this.verifyProjectName(newProjectName);
    if (type === 'vue') {
      // vue项目实例
      this.newProject = new VueNewProject(newProjectName, newProjectPath);
    } else {
      // node项目实例
      this.newProject = new NodeNewProject(newProjectName, newProjectPath);
    }
  }


  /**
   * 开始创建项目
   */
  async create(): Promise<void> {
    await this.operationFolder(this.newProject.newProjectPath);
  }

  /**
   * 根据命令行参数,操作项目文件夹; 删除
   * @private
   */
  private async operationFolder(newProjectPath): Promise<void> {
    const {merge, force, inCurrent} = this;
    if (pathExistsSync(newProjectPath) && !merge) {

      if (force) {
        if (inCurrent) {
          const fileNameList: Array<string> = readdirSync(newProjectPath);
          const {isOk} = await creatInquirer.deleteDirectory(newProjectPath);
          if (!isOk) {
            process.exit(1);
            return;
          }
          fileNameList.forEach((itemPath) => {
            console.log(path.resolve(itemPath, itemPath));
            removeSync(path.resolve(itemPath, itemPath));
          });
        } else {
          removeSync(newProjectPath);
        }
      } else {

      }
    }
  }

  /**
   * 验证项目名称的合法性
   * @param projectName 项目名称
   * @private
   */
  private verifyProjectName(projectName: string): void {
    const verify: validate.ValidNames | validate.InvalidNames | validate.LegacyNames = validate(projectName);
    if (!verify.validForNewPackages) {
      message.error(`Invalid project name: "${projectName}"`);
      verify.errors && verify.errors.forEach(err => {
        message.error('Error: ' + err);
      });
      verify.warnings && verify.warnings.forEach(warn => {
        message.error('Warning: ' + warn);
      });
      process.exit(1);
    }
  }


}

