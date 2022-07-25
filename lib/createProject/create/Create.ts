import * as validate from 'validate-npm-package-name';
import * as path from 'path';
import {pathExistsSync, readdirSync, readJSONSync, removeSync, writeJsonSync} from 'fs-extra';

// import NodeNewProject from '../project/NodeNewProject';
import ICreateOption from '../interface/ICreateOption';
import {BaseModuleOption, NewProjectType} from '../type';
import VueNewProject from '../project/VueNewProject';
import message from '../../utils/Message';
import CreatInquirer from '../inquirer/CreatInquirer';
import IBaseTemplate from '../interface/IBaseTemplate';
import Github from '../../utils/Github';
import {PackageManager} from '../../utils/PackageManager';
import GitHub from '../../utils/Github';
import IBaseModule from '../interface/IBaseModule';
import * as ora from 'ora';

/**
 * @file: 构建项目类
 * 控制项目构建过程
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:32 PM
 */
export default class Create {
  // 控制台交互控制实例
  creatInquirer: CreatInquirer;

  // 应用程序实例
  newProject: VueNewProject;

  // npm包管理程序实例
  packageManager: PackageManager;

  //
  github: GitHub;

  // 是否是当前目录下
  inCurrent: boolean;

  //项目类型
  type: NewProjectType;

  // 如果目录已经存在,是否覆盖该文件夹
  force: boolean;

  // 是否合并该文件夹
  merge: boolean;

  // 项目的远程地址
  gitUrlAndBranch: string;


  /**
   *
   * @param projectName 项目名称
   * @param createOption 项目选项
   * @param type 构建项目类型
   */
  constructor(projectName: string, createOption: ICreateOption, type: NewProjectType) {
    // 当前node工作路径
    const cwd = process.cwd();
    this.inCurrent = projectName === '.' || projectName === './' || projectName === '/';
    const newProjectName = this.inCurrent ? path.relative('../', cwd) : projectName;
    const newProjectPath = path.resolve(cwd, projectName || './');

    this.creatInquirer = new CreatInquirer();
    this.packageManager = new PackageManager(createOption.pm, newProjectPath);
    this.github = new Github(newProjectPath);


    this.force = createOption.force;
    this.merge = createOption.merge;
    this.gitUrlAndBranch && (this.gitUrlAndBranch = createOption.gitUrlAndBranch);
    this.type = type;


    // 校验项目名称
    this.verifyProjectName(newProjectName);

    if (type === 'vue') {
      // vue项目实例
      this.newProject = new VueNewProject(newProjectName, newProjectPath);
    } else {
      // node项目实例
      // this.newProject = new NodeNewProject(newProjectName, newProjectPath);
    }
  }


  /**
   * 开始创建项目
   */
  async create(): Promise<void> {
    message.info('✨ 开始创建项目');
    await this.operationFolder();

    const baseTemplate: IBaseTemplate = await this.newProject.selectBaseTemplate();

    let modules: Array<BaseModuleOption> = [];
    if (baseTemplate.type === 'BASE_COM') {
      modules = await this.newProject.selectBaseModule();
    }

    // 拉取远程
    await this.github.githubDownload(baseTemplate.path, this.inCurrent ? '.' : this.newProject.newProjectName);

    // 添加模块
    await this.addModuleToProject(modules);

    // 修改package.name
    await this.setPackageJsonValue();

    // 初始化git
    await this.github.initGit();

    //git add
    await this.github.addGit();

    // npm 初始化
    await this.packageManager.install();

    // 初始化钩子
    await this.packageManager.husky();

    // 关联新的存储库
    if (this.gitUrlAndBranch) {
      await this.github.associatedEewRepository(this.gitUrlAndBranch);
    }
  }

  /**
   * 根据命令行参数,项目文件夹进行操作;
   * @private
   */
  private async operationFolder(): Promise<void> {
    const {newProjectName, newProjectPath} = this.newProject;
    const {merge, force, inCurrent, creatInquirer} = this;
    if (pathExistsSync(newProjectPath) && !merge) {
      if (force && inCurrent) {
        const {isOk} = await creatInquirer.deleteDirectory(newProjectName);
        if (!isOk) {
          process.exit(1);
          return;
        }
        const fileNameList: Array<string> = readdirSync(newProjectPath);
        fileNameList.forEach((itemPath) => {
          removeSync(path.join(newProjectPath, itemPath));
        });

      } else if (force && !inCurrent) {
        const {action} = await creatInquirer.directoryPickAction(newProjectName);
        if (action === false) {
          process.exit(1);
          return;
        } else if (action === 'overwrite') {
          removeSync(newProjectPath);
        }
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


  /**
   * 根据选择的模块,对模块进行初始化
   * @param modules
   * @private
   */
  private async addModuleToProject(modules: Array<BaseModuleOption>) {
    const downloadTemplate:ora.Ora = ora();
    if(modules.length > 0){
      message.info('开始加载自选模块');
      downloadTemplate.start('拉取远程模板中... \n');
    }
    for (let i = 0; i < modules.length; i++) {
      const m: BaseModuleOption = modules[i];
      const relativePaths = path.relative(__dirname, path.resolve(path.resolve(__dirname, '../../'), modules[i].value));
      const {default: ModuleClass} = await import(relativePaths);
      const M: IBaseModule = new ModuleClass(m);
      M.install && (await M.install(this.packageManager, this.newProject.newProjectPath));
    }
    downloadTemplate.stop();
  }


  /**
   * 修改package
   */
  private async setPackageJsonValue() {
    const packageJson = await readJSONSync(path.join(this.newProject.newProjectPath, 'package.json'));
    packageJson.name = this.newProject.newProjectName;
    packageJson.version = '1.0.0';
    writeJsonSync(path.join(this.newProject.newProjectPath, './package.json'), packageJson, {
      spaces: 2,
    });
  }
}

