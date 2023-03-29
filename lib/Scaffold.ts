import {Command, Option} from 'commander';
import * as minimist from 'minimist';
import * as path from 'path';
import message from './utils/Message';
import Create from './createProject/create/Create';
import CreateAPI from './createAPIDocument/CreateAPI';
import { CreateVuePate } from './createVuePage';


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
    this.initGldCli();
    this.initCreateVueApp();
    this.initCreateAPI();
    this.initAutoCreatVuePages()
    this.program.parse();
  }

  /**
   * 初始化脚手架
   */
  initGldCli(): void {
    this.program
      .name('my-cli')
      .description('前端脚手架')
      .usage('<command> [options]')
      .version(`my-cli ${require(path.resolve(__dirname,'../../package.json')).version}`);
  }


  /**
   * 初始化vue项目
   */
  initCreateVueApp(): void {
    this.program
      .command('vue')
      .description('构建vue项目')
      .argument('projectName <string>', '项目名称')
      .option('-f, --force', '如果目录已经存在,使用该参数会覆盖该目录的内容', false)
      .option('--merge', '合并当前目录的内容', false)
      .option('-gub --gitUrlAndBranch <string>', '新项目需要关联的git仓库地址, 如果要指定分支使用#分隔; https://github.com/***/**.git#master', '')
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
          createProject.create().catch((e) => {
            message.error(e.message);
          });
        } catch (e) {
          message.error(e.message);
          process.exit(1);
        }
      });
  }

  /**
   * 初始化生成api命令
   * 参数:
   * 解析类型: swagger | localFile | 后续再加
   * 文件风格:  每个对象分为单独文件, 全部在一个js文件中
   * 文件生成目录: 对项目当前node的相对路径
   * 是否生成注解
   * 是否调用前校验
   * 接口函数名风格: 下划线| 大驼峰 | 小驼峰
   *
   */
  initCreateAPI(): void {
    this.program
      .command('api')
      .description('根据文档生成api文件,具有校验, 生成js功能')
      .argument('analyticUrl <string>', '解析路径')
      .addOption(new Option('-t, --analyticType <command>', '执行解析类型').choices(['swagger', 's', 'localFile', 'l']).default('swagger'))
      .addOption(new Option('-f, --fileOutletType <command>', '文件输出类型').choices(['module', 'expanding', 'm', 'e']).default('module'))
      .option('-o, --outputPathDirName <string>', '解析路径', 'src/api')
      .option('-v, --requestBeforeIsVerify', '是否校验参数类型', false)
      .action((str, options) => {
        console.log(str, options);
        // 提取命令行参数
        const _ = minimist(process.argv.slice(3))._;
        // 判断参数大小
        if (_.length > 1) {
          message.warning(`多个参数时,使用第一个参数:'${_[0]}', 将作为解析地址，其余的将被忽略。`);
        }
        try {
          const createProject = new CreateAPI({
            analyticUrl: str,
            ...options
          });
          createProject.run();
        } catch (e) {
          message.error(e.message);
          process.exit(1);
        }
      });
  }

  /**
   * 自动生成程序
   * @param post:Sting 服务端口
   */
  initAutoCreatVuePages(): void{
    // 可视化项目的端口
    this.program
      .command('page')
      .description('自动生成vau页面')
      .option('-p, --post <string>', '服务端口,默认为9999', false)
      .addOption(new Option('-u, --ui <ui...>', '需要支持的ui').choices(['gld', 'element']).default(['element']))
      .action((str) => {
        try {
          const createVuePate = new CreateVuePate(str.post, str.ui, process.cwd());
          createVuePate.run()
        } catch (e) {
          message.error(e.message);
          process.exit(1);
        }
      });
  }
}
