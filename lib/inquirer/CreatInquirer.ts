import * as inquirer from 'inquirer';
import {Inquirer} from 'inquirer';

export class CreatInquirer {
  private inquirer: Inquirer;

  constructor() {
    this.inquirer = inquirer;
  }

  deleteDirectory(dirName: string): Promise<any> {
    return this.inquirer.prompt([{
      name: 'isOk',
      type: 'confirm',
      message: `当前目录下内容将被清空,是否确定在${dirName}中生成项目?`,
    }]);
  }
}

const creatInquirer: CreatInquirer = new CreatInquirer();

export default creatInquirer;


