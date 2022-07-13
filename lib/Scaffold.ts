import {Command, Option} from 'commander';
import * as minimist from 'minimist';
import message from './utils/Message';
import Create from './create/Create';

/**
 * @file: 脚手架类
 * 初始化脚手架命令
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:34 PM
 */
export default class Scaffold {
  program: Command;

  constructor() {
    this.program = new Command();
  }

  run(): void {
    console.log('初始化脚手架命令');
    this.initGldCli();
    console.log('初始化vue命令');
    this.initGldCli_vue();
    this.program.parse();
  }

  /**
   * 初始化脚手架
   */
  initGldCli(): void {
    this.program
      .name('gld-cli')
      .description('前端脚手架')
      .usage('<command> [options]')
      .version(`gld-cli ${require('../package.json').version}`);
  }


  /**
   * 初始化vue命令
   */
  initGldCli_vue(): void {
    this.program
      .command('vue')
      .description('构建vue项目')
      .argument('projectName <string>', '项目名称')
      .option('-f, --force', '如果目录已经存在,使用该参数会覆盖该目录的内容', false)
      .option('--merge', '合并当前目录的内容', false)
      .option('--gitPath <string>', '初始化git地址', '')
      .addOption(new Option('-m, --packageManager <command>', '指定npm包的管理客户端: yarn/pnpm/npm,默认为npm').choices(['yarn', 'pnpm', 'npm']).default('npm'))
      .action((str, options) => {
        console.log('projectName: ', str);
        console.log('options: ', options);
        // 提取命令行参数
        const _ = minimist(process.argv.slice(3))._;

        // 判断参数大小
        if (_.length > 1) {
          message.warning(`多个参数时,使用第一个参数:'${_[0]}', 将作为应用程序的名称，其余的将被忽略。`);
        }
        try {
          const createProject = new Create(str, options, 'vue');
          createProject.create();
        } catch (e) {
          message.error(e.message);
          process.exit(1);
        }
      });
  }
}
