// input ,number, confirm, list, rawlist, expand, checkbox, password,editor

// 选择模板
const inquirer = require('inquirer');
const {vueTemplateList} = require('./generate/vueconfig');


/**
 * 控制台交互类
 */
class ConsoleInteraction {
  constructor() {
    this.inquirer = inquirer;
  }

  rootDirectoryCreation() {
    return this.inquirer.prompt([
      {
        name: 'isRootCreation',
        type: 'confirm',
        message: '是否在该目录下创建项目1'
      }
    ])
  }

  subdirectoryOperation(dirName) {
    return this.inquirer.prompt([
      {
        name: 'type',
        type: 'list',
        message: `在该目录下,${dirName}文件夹已经存在, 请选择对其进行的操作`,
        choices: [
          {name: '覆盖', value: 'overwrite'},
          {name: '合并', value: 'merge'},
          {name: '取消', value: false}
        ]
      }
    ])
  }

  // 选择vue模板
  selectVueTemplate() {
    return this.inquirer.prompt(vueTemplateList)
  }
}

module.exports = ConsoleInteraction
