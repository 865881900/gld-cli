import { IGenVueObject } from '../interface/IGenVueObject';
import { IGenProps } from '../interface/IGenProps';
import { SFCDescriptor } from '@vue/component-compiler-utils';
import { ISlots } from '../interface/ISlots';
import { ComponentOptions } from '@vue/runtime-core';

export class GenVueObject implements IGenVueObject{
  // 文件路径
  private _filePath: string;
  // 文件名称
  private _fileName: string;
  // 文件源数据
  private _fileData: string;
  // 组件名称
  private _componentName: string;
  // 组件说明
  private _componentNote?: string| undefined;
  // 创建组件的tag
  private _componentTag: string;
  // 组件的props
  private _props: Array<IGenProps> | undefined;
  // 组件插槽
  private _slots?: Array<ISlots> | undefined;
  // 组件已经挂载的插槽
  private _scopedSlots?: Array<IGenVueObject> | undefined;
  // 文件解析后的对象
  private _fileDescriptor: SFCDescriptor;
  constructor(filePath: string, fileName: string) {
      this._fileName = fileName;
      this._filePath = filePath;
  }

  get filePath(): string {
    return this._filePath;
  }

  set filePath(value: string) {
    this._filePath = value;
  }

  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }

  get fileData(): string {
    return this._fileData;
  }

  set fileData(value: string) {
    this._fileData = value;
  }

  get componentName(): string {
    return this._componentName;
  }

  set componentName(value: string) {
    this._componentName = value;
  }

  get componentNote(): string | undefined {
    return this._componentNote;
  }

  set componentNote(value: string | undefined) {
    this._componentNote = value;
  }

  get componentTag(): string {
    return this._componentTag;
  }

  set componentTag(value: string) {
    this._componentTag = value;
  }

  get props(): Array<IGenProps> | undefined {
    return this._props;
  }

  set props(value: Array<IGenProps> | undefined) {
    this._props = value;
  }

  get slots(): Array<ISlots> | undefined {
    return this._slots;
  }

  set slots(value: Array<ISlots> | undefined) {
    this._slots = value;
  }

  get scopedSlots(): Array<IGenVueObject> | undefined {
    return this._scopedSlots;
  }

  set scopedSlots(value: Array<IGenVueObject> | undefined) {
    this._scopedSlots = value;
  }

  get fileDescriptor(): SFCDescriptor {
    return this._fileDescriptor;
  }

  set fileDescriptor(value: SFCDescriptor) {
    this._fileDescriptor = value;
  }

  private _componentOption: ComponentOptions;

  get componentOption(): ComponentOptions {
    return this._componentOption;
  }

  set componentOption(value: ComponentOptions) {
    this._componentOption = value;
  }
}
