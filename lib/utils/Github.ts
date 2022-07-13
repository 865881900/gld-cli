// const download = require('download-git-repo');
import * as download from 'download-git-repo';
import {execa} from 'execa';
import * as ora from 'ora';
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
      message.info('开始下载模板');
      const downloadTemplate = ora('加载vue基础模板... \n');
      try {

        download(`direct:${githubUrl}`, newProjectName, {clone: true}, function (err) {
          if (err) {
            message.error(err);
            reject(err);
          } else {
            message.success('🎉 模板下载完成');
            resolve(true);
          }
          downloadTemplate.stop();
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
    message.info(`🗃  初始化git存储库...`);
    await execa('git', ['init'], {
      cwd: cwd,
    });
  }
}




