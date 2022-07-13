/**
 * 美化打印内容的封装
 * @param message 打印内容
 * @param color 打印颜色
 *  加粗 1
 *  下滑线为 4
 *  中划线 9
 *  基本7色 30 ~ 36
 *  背景为7色 40 ~ 47
 *  基本高对比色 90 ~ 96
 *  背景为高对比色 100 ~ 106
 * @return {string}
 */
export class Message {
  private changeColor(message: string, color = 92) {
    console.log(`\x1b[${color}m${message}\x1b[0m`);
  }

  error(message: string) {
    this.changeColor(message, 91);
  }

  success(message: string) {
    this.changeColor(message, 92);
  }

  warning(message: string) {
    this.changeColor(message, 93);
  }

  info(message: string){
    this.changeColor(message, 1);
  }
}

const message: Message = new Message();
export default message;




