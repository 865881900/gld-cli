import { MGenProps } from "./MGenProps";
import { SFCDescriptor } from "@vue/component-compiler-utils";
import { MSlots } from "./MSlots";
import { IComponentType } from "../enum";
import { ComponentOptions } from "vue/src/types/options";

export interface MGenVueObject {
  // 组件的Id
  componentId: string,
  // 组件的原文
  componentData: string;
  // 解析的组件对象
  componentDescriptor: SFCDescriptor;
  // 组件文件路径
  componentPath: string,
  // 文件名称
  componentFileName: string;
  // 组件名称
  componentName: string,
  // 组件类型
  componentType: IComponentType,
  // 渲染组件的tag
  componentTag: string,
  // 解析后的vue选项
  componentOption: ComponentOptions,
  // 解析后vue的render函数
  componentRender: string,
  // 组件说明
  componentNote?: string,
  // 组件的props
  componentProps?: Array<MGenProps>
  // 组件的已经挂载的插槽对象
  scopedSlots?: Array<MGenVueObject>
  // 组件插槽
  slots?: Array<MSlots>
}
