import { ifVueFile } from '../../utils';
import { GenVueFileError } from '../../error/GenVueFileError';
import { readFileSync } from 'fs-extra';
import { parse } from '@vue/component-compiler-utils';
import * as VueTemplateCompiler from 'vue-template-compiler';
import message from '../../utils/Message';
import { IGenVueObject } from '../interface/IGenVueObject';
import { GenVueObject } from './GenVueObject';
import { ISlots } from '../interface/ISlots';
import { IGenProps } from '../interface/IGenProps';
import { IGenVueFile } from '../interface/IGenVueFile';
import { ComponentOptions } from '@vue/runtime-core';

export class GenVueFile implements IGenVueFile {

  public async genVue(path: string, fileName: string): Promise<IGenVueObject> {
    const vueObject = new GenVueObject(path, fileName);
    message.success(`开始解析组件${fileName},${path}`);
    if (ifVueFile(fileName)) {
      throw new GenVueFileError('被解析的文件不是vue文件');
    }
    vueObject.fileData = readFileSync(path, 'utf8');
    vueObject.fileDescriptor = parse({
      needMap: false,
      source: vueObject.fileData,
      // @ts-ignore
      compiler: VueTemplateCompiler
    });
    if (vueObject.fileDescriptor.script) {
      vueObject.componentOption = await this.genVueOption(vueObject.fileDescriptor.script.content);
    }

    if (vueObject.fileDescriptor.template) {
      vueObject.slots = this.genTemplate(vueObject.fileDescriptor.template.content);
    }
    return vueObject;
  }

  async genVueOption(scriptString: string): Promise<ComponentOptions> {
    const data = await import(scriptString);
    return data.default;
  }

  genTemplate(template: string): Array<ISlots> {
    console.log(template);
    return [{ slotsName: 'slotsName', isScope: false }];
  }

  genProps(scriptString: string): Array<IGenProps> {
    console.log(scriptString);
    return [];
  }
}
