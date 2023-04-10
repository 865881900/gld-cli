import { IGenVueObject } from './IGenVueObject';
import { IGenProps } from './IGenProps';
import { ISlots } from './ISlots';
import { ComponentOptions } from 'vue';

export interface IGenVueFile {
  /**
   * 解析vue文件为一个grnVueObjec对象
   * @param path vue组件所在的位置
   * @param fileName vue组件的名称
   * @return 一个抽象的代表组件的数据结构
   */
  genVue: (path: string, fileName: string) => Promise<IGenVueObject>;

  /**
   * 解析vue文件的js部分,并返回这个组件的VueComponentOpting对象
   * @param path vue组件所在的位置
   * @param fileName vue组件的名称
   * @return 一个抽象的代表组件的数据结构
   */
  genVueOption:(scriptString: string) =>  Promise<ComponentOptions<any>>;

  /**
   * 解析js的代码, 并提取其中props
   * @param scriptString js代码字符串
   */
  genProps: (scriptString: string) => Array<IGenProps>;

  /**
   * 解析vue的html部分, 提取其中的插槽
   * @param template html代码
   */
  genTemplate: (template: string) => Array<ISlots>;


}
