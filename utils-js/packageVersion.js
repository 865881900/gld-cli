const execa = require('execa')
const {gte} = require('semver');

// 缓存
const packageVersionMap = {};

/**
 * 根据包名,返回包的当前版本;
 * @param packageName 包名
 * @return {string|*}
 */
exports.getPackageVersion = (packageName) => {
  if (packageVersionMap[packageName]) {
    return packageVersionMap[packageName]
  }
  try {
    return (packageVersionMap[packageName] = execa.sync(packageName, ['--version']).stdout);
  } catch (e) {
    return (packageVersionMap[packageName] = '0.0.0');
  }
}

/**
 * 判断当前包的版本是否大于等于给定版本
 * @param packageName 包名
 * @param version 给定版本
 * @return {boolean}
 */
exports.hasPackageVersionOrLater = (packageName, version) => {
  const laterVersion = this.getPackageVersion(packageName);
  return gte(laterVersion, version)
}

// 判定是否有
exports.hasYarn = () => {
  return this.getPackageVersion('yarn') !== '0.0.0'
}

exports.hasNpm = () => {
  return this.getPackageVersion('npm') !== '0.0.0'
}


exports.hasPnpm3OrLater = () => {
  return this.hasPackageVersionOrLater('pnpm', '3.0.0');
}

exports.hasNpm69rLater = () => {
  return this.hasPackageVersionOrLater('npm', '6.9.0');
}

