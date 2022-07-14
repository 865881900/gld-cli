// 构建类型
export type NewProjectType = 'vue' | 'node';

// npm包管理器类型
export type PM = 'yarn' | 'pnpm' | 'npm';

// 项目模块类型
export type IProjectModuleType = 'npm' | 'file';

// 模块构造参数类型
export type BaseModuleOption = {
  // 模块描述
  name: string;

  // 模块识别标识
  value: string;

  // 模块类型
  moduleType: IProjectModuleType;

  // 文件安装路径
  projectPath?: string;

  // npm版本
  version?: string;

  // npm包名
  npmName?: string;
};


// 模块依赖文件读写位置类型
export type ModuleFileConfig = {
  readPath: string,
  copyPath: string
};
