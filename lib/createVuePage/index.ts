import * as execa from 'execa';
import * as fs from 'fs-extra';
import * as path from 'path';

import message from '../utils/Message';
import { IComponentType, UIEnum } from './enum';
import { GenVueFile } from './server/GenVueFile';
import { ifVueFile } from '../utils';
import { IFile } from './interface/IFile';
import { IGenVueObject } from './interface/IGenVueObject';

export class CreateVuePate {
  // 本地vue端口, 默认9000
  private post: string;
  // 需要支持的ui库
  private ui: Array<UIEnum>;
  // 当前运行path
  private context: string;
  // 组件存放目录
  private componentsPath: string;
  // 当前cli程序运行的地址
  private runPath: string;
  // 处理vue组件程序
  ganVueFile: GenVueFile;

  // 组件file集合
  private vueComponentList: Array<IFile> = [];
  // 组件的Vue对象集合
  private vueObjectList: Array<IGenVueObject> = [];


  constructor(post: string, ui: Array<UIEnum>, context: string) {
    this.ganVueFile = new GenVueFile();
    this.post = post;
    this.ui = ui;
    this.context = context;
    this.runPath = process.cwd();
    this.componentsPath = path.resolve(this.runPath, 'lib/createVuePage/createPageView/src/components');
  }


  // 执行
  public async run() {
    message.success('开始执行');
    const isExists = fs.pathExists(this.componentsPath);
    if (!isExists) {
      message.warning('components 不是一个目录');
    }
    message.success('私有解析组件中');
    // 解析可视化编辑中的私有组件
    await this.genPrivateComponents();
    message.success('解析page组件中');
    // 解析可视化编辑中的page组件
    await this.genPageComponents();

    // 解析算选择的UI框架 todo 下次实现
    // this.genUiComponents();
    message.success('生成配置文件');
    // 生成组件JSON文件
    await this.createComponentJson();
    message.success('启动可视化编辑');
    // 启动可视化编辑
    this.runVue();
    message.success('启动成功');
    // 启动websocket
    this.runWebsocket();
  }

  // 解析vue组件
  private async genVue(componentFileName: string, componentType: IComponentType) {
    await this.gatherVueComponent(componentFileName);
    for (let i = 0; i < this.vueComponentList.length; i++) {
      let fileItem = this.vueComponentList[i];
      const vueObject: IGenVueObject = await this.ganVueFile.genVue(fileItem.filePath, fileItem.fileName);
      vueObject.componentType = componentType;
      this.vueObjectList.push(vueObject);
    }
  }

  // 解析可视化编辑中的私有组件
  private genPrivateComponents() {
    return this.genVue(path.join(this.componentsPath, 'private'), IComponentType.PRIVATE);
  }

  // 解析page组件
  private genPageComponents() {
    return this.genVue(path.join(this.componentsPath, 'page'), IComponentType.PRIVATE);
  }

  // 解析算选择的UI框架中的组件
  private genUiComponents() {

  }

  private async runVue() {

    await execa('cross-env', ['ENV_NODE=development'], {
      cwd: path.join(this.runPath, 'lib/createVuePage/createPageView'),
    });

    await execa('webpack', ['serve', '--config', './webpack/webpack.config.js'], {
      cwd: path.join(this.runPath, 'lib/createVuePage/createPageView'),
    });
  }

  private runWebsocket() {

  }

  // 收集所有的组件文件信息
  private async gatherVueComponent(filePath: string) {
    try {
      // 获取文件的状态
      const stat = await fs.statSync(filePath);
      // 判断是是否为文件,并且只收集vue文件
      if (!stat.isDirectory()) {
        ifVueFile(filePath) && this.vueComponentList.push({
          filePath,
          fileName: path.basename(filePath)
        });
      } else {
        const fileList: Array<string> = fs.readdirSync(filePath);
        for (let i = 0; i < fileList.length; i++) {
          await this.gatherVueComponent(path.join(filePath, fileList[i]));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 写入组件配置
  createComponentJson() {
    fs.writeFileSync(path.join(this.componentsPath, 'components.json'), JSON.stringify(this.vueObjectList));
  }
}
