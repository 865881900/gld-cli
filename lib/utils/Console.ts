/**
 * 美化打印内容的封装
 * @param message 打印内容
 * @param color 打印颜色
 *  基本7色 30 ~ 36
 *  基本高对比色 90 ~ 96
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
}

const message: Message = new Message();
export default message;

