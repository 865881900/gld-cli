#!/usr/bin/env ts-node

// #!/usr/bin/node 使用 /usr/bin 下安装的node  执行脚本; 写死的,如果node没有安装在/bin目录下,则运行不了
// #!/usr/bin/env  会在/env目录下查找node的安装目录,再执行脚本


/**
 * @file: node-ts 脚本入口
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/12 4:31 PM
 */
import Scaffold from '../lib/Scaffold';

const scaffold: Scaffold = new Scaffold();
scaffold.run();
