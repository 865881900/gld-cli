/**
 * 下载package的依赖
 */
const {hasNpm69rLater, hasPackageVersionOrLater, hasPnpm3OrLater, hasYarn} = require('../utils-js/packageVersion');
const {error} = require('../utils-js/console');

const execa = require('execa')


const SUPPORTED_PACKAGE_MANAGERS = ['yarn', 'pnpm', 'npm']
const PACKAGE_MANAGER_PNPM4_CONFIG = {
  install: ['install', '--reporter', 'silent', '--shamefully-hoist'],
  add: ['install', '--reporter', 'silent', '--shamefully-hoist'],
  upgrade: ['update', '--reporter', 'silent'],
  remove: ['uninstall', '--reporter', 'silent']
}
const PACKAGE_MANAGER_PNPM3_CONFIG = {
  install: ['install', '--loglevel', 'error', '--shamefully-flatten'],
  add: ['install', '--loglevel', 'error', '--shamefully-flatten'],
  upgrade: ['update', '--loglevel', 'error'],
  remove: ['uninstall', '--loglevel', 'error']
}
const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ['install', '--loglevel', 'error'],
    add: ['install', '--loglevel', 'error'],
    upgrade: ['update', '--loglevel', 'error'],
    remove: ['uninstall', '--loglevel', 'error']
  },
  pnpm: hasPackageVersionOrLater('pmpm', '4.0.0') ? PACKAGE_MANAGER_PNPM4_CONFIG : PACKAGE_MANAGER_PNPM3_CONFIG,
  yarn: {
    install: [],
    add: ['add'],
    upgrade: ['upgrade'],
    remove: ['remove']
  }
}


class PackageManager {
  constructor(packageManager) {
    if (packageManager) {
      this.pm = packageManager;
    } else {
      this.pm = hasYarn() ? 'yarn' : hasPnpm3OrLater() ? 'pnpm' : 'npm';
    }

    if (!SUPPORTED_PACKAGE_MANAGERS.includes(this.pm)) {
      error(`${packageManager}该npm客户端,在该脚手架中不被支持`)
      process.exit(1);
      return
    }

    if (this.pm === 'npm' && !hasNpm69rLater()) {
      // 返回当前npm的版本号
      error('当前npm版本过低,请升级npm版本;')
      process.exit(1);
    }
  }

  async install(cwd) {
    await execa(this.pm, [...PACKAGE_MANAGER_CONFIG[this.pm].install], {
      cwd: cwd
    });
  }

  async initGit(cwd) {
    await execa('git', ['init'], {
      cwd: cwd
    });
  }

  async husky(cwd) {
    await execa('npm', ['run','install:husky'], {
      cwd: cwd
    });
  }
}

exports.PackageManager = PackageManager
