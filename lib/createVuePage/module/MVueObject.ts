import { MGenVueObject } from "./MGenVueObject";
import { MGenProps } from "./MGenProps";
import { SFCDescriptor } from "@vue/component-compiler-utils";
import { MSlots } from "./MSlots";
import { IComponentType } from "../enum";
import { ComponentOptions as Options } from "vue/src/types/options";

type ComponentOptions = Options & { id?: string };

export class MVueObject implements MGenVueObject {

  private _componentId: string;
  private _componentData: string;
  private _componentDescriptor: SFCDescriptor;
  private _componentFileName: string;
  private _componentName: string;
  private _componentNote: string;
  private _componentOption: ComponentOptions;
  private _componentPath: string;
  private _componentProps: Array<MGenProps>;
  private _componentTag: string;
  private _componentRender: string;
  private _componentType: IComponentType;
  private _scopedSlots: Array<MGenVueObject>;
  private _slots: Array<MSlots>;

  constructor(componentPath: string) {
    this._componentPath = componentPath;
  }

  get componentRender(): string {
    return this._componentRender;
  }

  set componentRender(value: string) {
    this._componentRender = value;
  }

  get componentData(): string {
    return this._componentData;
  }

  set componentData(value: string) {
    this._componentData = value;
  }

  get componentDescriptor(): SFCDescriptor {
    return this._componentDescriptor;
  }

  set componentDescriptor(value: SFCDescriptor) {
    this._componentDescriptor = value;
  }

  get componentFileName(): string {
    return this._componentFileName;
  }

  set componentFileName(value: string) {
    this._componentFileName = value;
  }

  get componentId(): string {
    return this._componentId;
  }

  set componentId(value: string) {
    this._componentId = value;
  }

  get componentName(): string {
    return this._componentName;
  }

  set componentName(value: string) {
    this._componentName = value;
  }

  get componentNote(): string {
    return this._componentNote;
  }

  set componentNote(value: string) {
    this._componentNote = value;
  }

  get componentOption(): ComponentOptions {
    return this._componentOption;
  }

  set componentOption(value: ComponentOptions) {
    this._componentOption = value;
  }

  get componentPath(): string {
    return this._componentPath;
  }

  set componentPath(value: string) {
    this._componentPath = value;
  }

  get componentProps(): Array<MGenProps> {
    return this._componentProps;
  }

  set componentProps(value: Array<MGenProps>) {
    this._componentProps = value;
  }

  get componentTag(): string {
    return this._componentTag;
  }

  set componentTag(value: string) {
    this._componentTag = value;
  }

  get scopedSlots(): Array<MGenVueObject> {
    return this._scopedSlots;
  }

  set scopedSlots(value: Array<MGenVueObject>) {
    this._scopedSlots = value;
  }

  get slots(): Array<MSlots> {
    return this._slots;
  }

  set slots(value: Array<MSlots>) {
    this._slots = value;
  }

  get componentType(): IComponentType {
    return this._componentType;
  }

  set componentType(value: IComponentType) {
    this._componentType = value;
  }
}
