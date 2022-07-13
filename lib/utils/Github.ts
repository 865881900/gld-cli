import * as download from 'download-git-repo';
import * as ora from 'ora';
import * as execa from 'execa';

import message from './Message';

/**
 * @file: github实例
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/13 9:35 AM
 */
export default class GitHub {
  // 脚本执行路径
  cwd: string;

  constructor(cwd: string) {
    this.cwd = cwd;
  }

  /**
   * 拉取远程github仓库
   * @param githubUrl 远程地址
   * @param newProjectName 文件夹名称
   */
  githubDownload(githubUrl: string, newProjectName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      message.info('拉取远程模板');
      const downloadTemplate = ora();
      downloadTemplate.start('拉取远程模板中... \n');
      try {
        download(`direct:${githubUrl}`, newProjectName, {clone: true}, function (err) {
          downloadTemplate.stop();
          if (err) {
            message.error(err);
            reject(err);
          } else {
            message.success('模板拉取成功');
            resolve(true);
          }
        });
      } catch (e) {
        downloadTemplate.stop();
        reject(e);
      }
    });
  }

  /**
   * 初始化git
   * @param cwd
   */
  async initGit(cwd?: string): Promise<void> {
    message.info(`🗃 初始化git存储库...`);
    await execa('git', ['init'], {
      cwd: cwd || this.cwd,
    });
  }


  /**
   * 执行add .操作
   */
  async addGit(cwd?: string): Promise<void> {
    message.info(`👉 添加文件到git...`);
    await execa('git', ['add', ['.']], {
      cwd: cwd || this.cwd,
    });
  }


  /**
   * 关联新的储存库
   * echo "# test" >> README.md
   * git init
   * git add README.md
   * git commit -m "first commit"
   * git branch -M main
   * git remote add origin https://github.com/865881900/test.git
   * git push -u origin main
   */
  async associatedEewRepository(gitUrlAndBranch: string): Promise<void> {
    let [path, branch] = gitUrlAndBranch.split('#');
    if (!branch) {
      branch = 'master';
    }
    message.info(`⚙ 关联远程仓库...`);
    await execa('git', ['commit', '-m', `'fix: 这是第一次提交'`, '--no-verify']);
    await execa('git', ['branch', '-M', branch]);
    await execa('git', ['remote', 'add', 'origin', path]);
    await execa('git', ['push', '-u', 'origin', branch]);
  }
}




