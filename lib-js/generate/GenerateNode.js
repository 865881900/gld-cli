const ConsoleInteraction = require("../ConsoleInteraction");
const {vueTemplateList} = require("./vueconfig");
const ora = require("ora");
const {success} = require("../../utils-js/console");
const {githubDownload} = require("../../utils-js/githubDownload");
const {PackageManager} = require("../PackageManager");
module.exports = class GenerateNode {
  constructor() {
    this.consoleInteraction = new ConsoleInteraction();
  }


  async run(name, dirName, option) {
    // 选择模板和配置
    const answers = await this.consoleInteraction.selectVueTemplate();
    const templateData = vueTemplateList[0].choices.filter(item => item.value === answers.template)[0];

    // var exec = require('child_process').exec;
    const spinner = ora('🎉 正在下载模板...')
    try {
      success('开始下载模板');
      spinner.start();
      const isDown = await githubDownload(templateData.gitUrl, name)
      if (isDown) {
        spinner.succeed();
      }

      //开始下载依赖
      const pm = new PackageManager(option.packageManager);
      pm.install(dirName)

    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  }
}
