#!/usr/bin/env node

const {program, Option} = require('commander');
const createProject = require('../lib-js/createProject');
const minimist = require('minimist');
const {warning, error} = require('../utils-js/console')

program
  .name('gld-cli')
  .description('广联达前端脚手架')
  .usage('<command> [options]')
  .version(`gld-cli ${require('../package.json').version}`);

program
  .command('vue')
  .description('创建新的vue项目')
  .argument('projectName <string>', '项目名称')
  .option('-f, --force', '如果目录已经存在,使用该参数会覆盖该目录的内容')
  .option('--merge', '合并当前目录的内容')
  .addOption(new Option('-m, --packageManager <command>', '指定npm包的管理客户端: yarn/pnpm/npm,默认为npm').choices(['yarn', 'pnpm', 'npm']).default('npm'))
  .action((str, options) => {
    const _ = minimist(process.argv.slice(3))._;
    if (_.length > 1) {
      warning(`多个参数时,使用第一个参数:'${_[0]}', 将作为应用程序的名称，其余的将被忽略。`);
    }
    try {
      createProject(str, options, 'Vue')
    } catch (e) {
      error(e);
      process.exit(1);
    }
  })


program
  .command('node')
  .description('创建新的node项目')
  .argument('projectName <string>', '项目名称')
  .option('-f, --force', '如果目录已经存在,使用该参数会覆盖该目录的内容')
  .option('--merge', '合并当前目录的内容')
  .addOption(new Option('-m, --packageManager <command>', '指定npm包的管理客户端: yarn/pnpm/npm,默认为npm').choices(['yarn', 'pnpm', 'npm']).default('npm'))
  .action((str, options) => {
    const _ = minimist(process.argv.slice(3))._;
    if (_.length > 1) {
      warning(`多个参数时,使用第一个参数:'${_[0]}', 将作为应用程序的名称，其余的将被忽略。`);
    }
    try {
      createProject(str, options, 'Node')
    } catch (e) {
      error(e);
      process.exit(1);
    }
  })


program.parse();
