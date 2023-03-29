import { IGenProps } from './IGenProps';
import { SFCDescriptor } from '@vue/component-compiler-utils';
import { ISlots } from './ISlots';
import { ComponentOptions } from '@vue/runtime-core';

export interface IGenVueObject {
  // 组件的原文
  fileData: string;
  // 解析的组件对象
  fileDescriptor: SFCDescriptor;
  // 文件路径
  filePath: string,
  // 文件名称
  fileName: string;
  // 组件名称
  componentName: string,
  // 渲染组件的tag
  componentTag: string,
  // 组件说明
  componentNote?: string,
  // 解析后的vue选项
  componentOption: ComponentOptions,

  // 组件的props
  props?: Array<IGenProps>
  // 组件的已经挂载的插槽对象
  scopedSlots?: Array<IGenVueObject>
  // 组件插槽
  slots?: Array<ISlots>
}
