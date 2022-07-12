export default class NewProject {
  // 项目名称
  newProjectName: string;

  // 项目路径
  newProjectPath: string;

  //项目依赖模块
  newProjectModuleList: Array<any>;

  constructor(newProjectName: string, newProjectPath: string) {
    this.newProjectName = newProjectName;
    this.newProjectPath = newProjectPath;
  }

}
