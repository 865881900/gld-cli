const download = require('download-git-repo');

/**
 * 开始下载模板
 */
exports.githubDownload = (gitUrl, name) => {
  return new Promise((resolve, reject) => {
    try {
      download(`direct:${gitUrl}`, name, {clone: true}, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
