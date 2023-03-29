const assert = require('assert');
const execa = require('execa');
const path = require('path');
const packageJson = require(path.resolve('./package.json'));
describe('测试 脚手架执行', async () => {
  it('测试版本号 ',  function () {
    execa('ts-node', ['./bin/index.ts', '-V']).then((data) => {
      assert.equal(data.stdout, `gld-cli ${packageJson.version}`);
    });
  });
});
