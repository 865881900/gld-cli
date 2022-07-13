import {execaSync, execa} from 'execa';
import {gte} from 'semver';
import {PM} from '../type';
import message from './Message';

/**
 * @file: npm包管理器实例
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/13 9:34 AM
 */
export class PackageManager {
  // npm包管理器
  pm: PM;

  // 脚本执行路径
  cwd: string;

  static packageVersionMap: Map<string, string> = new Map<string, string>();

  constructor(packageManager: PM, cwd: string) {
    this.cwd = cwd;
    if (packageManager) {
      this.pm = packageManager;
    } else {
      this.pm = PackageManager.hasYarn() ? 'yarn' : PackageManager.hasPnpm3OrLater() ? 'pnpm' : 'npm';
    }
    // 包管理的合法性
    if (!SUPPORTED_PACKAGE_MANAGERS.includes(this.pm)) {
      message.error(`${packageManager}该npm客户端,在该脚手架中不被支持`);
      process.exit(1);
    }

    if (this.pm === 'npm' && !PackageManager.hasNpm69rLater()) {
      // 返回当前npm的版本号
      message.error('当前npm版本过低,请升级npm版本;');
      process.exit(1);
    }
  }

  // 执行 npm install 操作
  async install(cwd?: string): Promise<void> {
    message.info('📦  安装npm依赖中...');
    await execa(this.pm, [...PACKAGE_MANAGER_CONFIG[this.pm].install], {
      cwd: cwd || this.cwd,
    });
  }

  // 因为有git钩子,需要执行该命令添加钩子
  async husky(cwd?: string): Promise<void> {
    message.info('⚓   初始化husky钩子...');
    await execa('npm', ['run', 'install:husky'], {
      cwd: cwd || this.cwd,
    });
  }

  /**
   * 返回npm包的版本信息
   * @param packageName
   *
   */
  static getPackageVersion(packageName: string): string | undefined {
    const packageVersionMap = PackageManager.packageVersionMap;
    if (packageVersionMap.has(packageName)) {
      return packageVersionMap.get(packageName);
    }
    try {
      const version = execaSync(packageName, ['--version']).stdout;
      packageVersionMap.set(packageName, version);
      return version;
    } catch (e) {
      return undefined;
    }
  }


  /**
   * 判断当前包的版本是否大于等于给定版本
   * @param packageName 包名
   * @param version 给定版本
   * @return {boolean}
   */
  static hasPackageVersionOrLater(packageName: string, version: string): boolean {
    const laterVersion = PackageManager.getPackageVersion(packageName);
    if (laterVersion === undefined) {
      return false;
    }
    return gte(laterVersion, version);
  }


  /**
   * 返回是否安装yarn
   */
  static hasYarn(): boolean {
    return this.hasPackageVersionOrLater('yarn', '0.0.0');
  }

  /**
   * 返回是否安装npm
   */
  static hasNpm(): boolean {
    return this.hasPackageVersionOrLater('npm', '0.0.0');
  }

  /**
   * pnpm 是否是3.0以上版本
   */
  static hasPnpm3OrLater(): boolean {
    return this.hasPackageVersionOrLater('pnpm', '3.0.0');
  }


  /**
   * npm 是否是6.9以上版本
   */
  static hasNpm69rLater(): boolean {
    return this.hasPackageVersionOrLater('npm', '6.9.0');
  }
}


const SUPPORTED_PACKAGE_MANAGERS = ['yarn', 'pnpm', 'npm'];
const PACKAGE_MANAGER_PNPM4_CONFIG = {
  install: ['install', '--reporter', 'silent', '--shamefully-hoist'],
  add: ['install', '--reporter', 'silent', '--shamefully-hoist'],
  upgrade: ['update', '--reporter', 'silent'],
  remove: ['uninstall', '--reporter', 'silent'],
};
const PACKAGE_MANAGER_PNPM3_CONFIG = {
  install: ['install', '--loglevel', 'error', '--shamefully-flatten'],
  add: ['install', '--loglevel', 'error', '--shamefully-flatten'],
  upgrade: ['update', '--loglevel', 'error'],
  remove: ['uninstall', '--loglevel', 'error'],
};
const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ['install', '--loglevel', 'error'],
    add: ['install', '--loglevel', 'error'],
    upgrade: ['update', '--loglevel', 'error'],
    remove: ['uninstall', '--loglevel', 'error'],
  },
  pnpm: PackageManager.hasPackageVersionOrLater('pmpm', '4.0.0') ? PACKAGE_MANAGER_PNPM4_CONFIG : PACKAGE_MANAGER_PNPM3_CONFIG,
  yarn: {
    install: [],
    add: ['add'],
    upgrade: ['upgrade'],
    remove: ['remove'],
  },
};
