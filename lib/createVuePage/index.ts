import { UIEnum } from './enum';

export class CreateVuePate {
  // 本地vue端口, 默认9000
  private post: string;
  // 需要支持的ui库
  private ui: Array<UIEnum>;
  // 当前运行path
  private runtimePath: string;
  constructor(post: string, ui: Array<UIEnum>, runtimePath: string) {
    this.post = post;
    this.ui = ui;
    this.runtimePath = runtimePath;
  }


  // 执行
  public run() {
    // 解析可视化编辑中的私有组件
    this.genPrivateComponents();
    // 解析可视化编辑中的page组件
    this.genPageComponents();
    // 解析算选择的UI框架
    this.genUiComponents();
    // 启动可视化编辑
    this.runVue();
    // 启动websocket
    this.runWebsocket();
  }

  // 解析可视化编辑中的私有组件
  private genPrivateComponents() {

  }

  // 解析page组件
  private genPageComponents() {

  }

  // 解析算选择的UI框架中的组件
  private genUiComponents() {

  }

  private runVue() {

  }

  private runWebsocket() {

  }

  create() {

  }
}
