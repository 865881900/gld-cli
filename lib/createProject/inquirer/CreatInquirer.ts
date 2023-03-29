import * as inquirer from 'inquirer';
import {Inquirer} from 'inquirer';

/**
 * 控制台 交互类
 */
export default class CreatInquirer {
  private inquirer: Inquirer;

  constructor() {
    this.inquirer = inquirer;
  }

  /**
   * 确定是否在该目录下构建项目
   * @param dirName
   */
  deleteDirectory(dirName: string): Promise<any> {
    return this.inquirer.prompt([{
      name: 'isOk',
      type: 'confirm',
      message: `当前目录下内容将被清空,是否确定在${dirName}中生成项目?`,
    }]);
  }

  /**
   * 当文件存在是时,选择对该文件夹的操作
   * 覆盖, 合并, 退出
   * @param dirName 需要操作的文件夹名称
   */
  directoryPickAction (dirName: string): Promise<any> {
   return inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `目标目录${dirName}已存在。选择一个操作:`,
        choices: [
          { name: '覆盖', value: 'overwrite' },
          { name: '合并', value: 'merge' },
          { name: '取消', value: false }
        ]
      }
    ]);
  }
}

