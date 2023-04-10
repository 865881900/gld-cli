import { CreateVuePate } from './lib/createVuePage';
import { UIEnum } from './lib/createVuePage/enum';
async function run() {
  try {
    const createVuePate = new CreateVuePate('9999', [UIEnum.gld], process.cwd());
    createVuePate.run();
  } catch (e) {
    console.error(e);
  }
}

run();
