const path = require('path');
const validateNpmPackageName = require('validate-npm-package-name')
const {error} = require('../utils/console');
const fs = require('fs-extra');
const ConsoleInteraction = require('./consoleInteraction');
const GenerateVue = require('./generate/GenerateVue');

/**
 * 构建vue项目
 * @param option 项目配置
 * @param projectName 项目名称
 * @param type 构架项目类型
 */
module.exports = async function createProject(projectName, option, type) {
  // 当前node工作路径
  const cwd = process.cwd();
  // 是否在根目录下
  const inCurrent = projectName === '.';
  // 文件夹名称
  const name = inCurrent ? path.relative('../', cwd) : projectName;
  // 项目绝对路径
  const dirName = path.resolve(cwd, projectName || '.')
  // 校验文件夹名称是否合法
  const validate = validateNpmPackageName(name);
  console.log(name);
  console.log(validate);

  // 错误提示
  if (!validate.validForOldPackages) {
    validate.errors.reduce((messageError, item, index) => {
      if (index === (validate.errors.length - 1)) {
        error(`${messageError} ${messageError ? '\n' : ''} ${item}`)
      } else {
        return `${messageError} ${messageError ? '\n' : ''} ${item}`
      }
    }, '')
  }

  const consoleInteraction = new ConsoleInteraction()

  //判断路径是否存在
  if (await fs.pathExistsSync(dirName)) {
    if (option.force) {
      // 删除该目录
      await fs.remove(dirName)
      // 重新创建目录
    } else {

      if (inCurrent) {
        // 询问是否在该目录下创建项目
        const {isRootCreation} = await consoleInteraction.rootDirectoryCreation()
        // 询问对目录的操作
        if (!isRootCreation) {
          return
        }
      } else {
        // 操作已存在的目录
        const {type} = await consoleInteraction.subdirectoryOperation(name)
        if (!type) {
          return
        } else if (type === 'merge') {
          option.merge = true
        } else if (type === 'overwrite') {
          // 删除该目录
          await fs.remove(dirName)
        }
      }
    }
  }


  let generateInstrument;
  if (type === 'Vue') {
    generateInstrument = new GenerateVue()
  } else {
    generateInstrument = new GenerateNode()
  }

  generateInstrument.run(name, dirName, option);
}
