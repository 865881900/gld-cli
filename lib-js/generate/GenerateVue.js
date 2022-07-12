const ConsoleInteraction = require('../ConsoleInteraction');
const {vueTemplateList} = require('./vueconfig');
const {success, error} = require('../../utils-js/console');
const ora = require('ora');
const {PackageManager} = require('../PackageManager');
const {githubDownload} = require("../../utils-js/githubDownload");
const fs = require("fs-extra");
const path = require("path");


module.exports = class Generate {
  constructor() {
    this.consoleInteraction = new ConsoleInteraction();
  }

  async run(name, dirName, option) {
    // 选择模板和配置
    const answers = await this.consoleInteraction.selectVueTemplate();
    const templateData = vueTemplateList[0].choices.filter(item => item.value === answers.template)[0];
    const downloadTemplate = ora('Loading vue templates... \n');
    const downloadNodeModules = ora('Loading node modules... \n');
    try {
      // 下载模板
      success('Start downloading templates.');
      downloadTemplate.start()
      await githubDownload(templateData.gitUrl, name)
      downloadTemplate.stop();
      success('🎉 Template download complete');

      // 修改package
      const packageJson = await fs.readJson(path.join(dirName, './package.json'));
      packageJson.name = name

      fs.writeJsonSync(path.join(dirName, './package.json'), packageJson, {
        spaces: 2
      })
      const pm = new PackageManager(option.packageManager);


      success(`🗃  Initializing git repository...`)



      // 开始下载依赖
      success('Start loading dependencies');
      downloadNodeModules.start();
      await pm.install(dirName);
      downloadNodeModules.stop();
      success('🎉 Node module loading completed');
      // 初始化git
      await pm.initGit(dirName);

      // 初始化git 钩子
      await pm.husky(dirName);
    } catch (e) {
      error(e);
      process.exit(1);
    }
  }
}
