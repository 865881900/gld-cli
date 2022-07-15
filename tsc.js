const fs = require('fs-extra');
const path = require('path');


const fileNameList = fs.readdirSync(path.join(__dirname, 'lib/module/'));

fileNameList.forEach(item => {
  const p = path.join(__dirname, 'lib/module/', item, '/file');
  if (fs.existsSync(p)) {
    fs.copySync(p, path.join(__dirname, 'dist/lib/module/', item, '/file'));
  }
});
