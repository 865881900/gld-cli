import { ifVueFile, toType } from '../../utils';
import { GenVueFileError } from '../../error/GenVueFileError';
import * as VueTemplateCompiler from 'vue-template-compiler';
import message from '../../utils/Message';
import { IGenVueObject } from '../interface/IGenVueObject';
import { GenVueObject } from '../module/GenVueObject';
import { ISlots } from '../interface/ISlots';
import { IGenProps } from '../interface/IGenProps';
import { IGenVueFile } from '../interface/IGenVueFile';
import { readFileSync } from 'fs-extra';
import { parse } from '@vue/component-compiler-utils';
import { parse as babelParse } from '@babel/parser';
import * as traverse from '@babel/traverse';
import * as generator from '@babel/generator';
import { flatMap, flatMapDeep, isArray, isFunction, isObject } from 'lodash';
import { ComponentOptions } from 'vue/types/options';
import { ASTElement } from 'vue-template-compiler';

export class GenVueFile implements IGenVueFile {

  public async genVue(path: string, fileName: string): Promise<IGenVueObject> {
    const vueObject = new GenVueObject(path, fileName);
    message.success(`开始解析组件${fileName},${path}`);
    if (!ifVueFile(fileName)) {
      throw new GenVueFileError('被解析的文件不是vue文件');
    }
    vueObject.fileData = readFileSync(path, 'utf8');
    vueObject.fileDescriptor = parse({
      needMap: false,
      source: vueObject.fileData,
      // @ts-ignore
      compiler: VueTemplateCompiler
    });
    console.log(vueObject.fileDescriptor.customBlocks);
    if (vueObject.fileDescriptor.script) {
      const content = vueObject.fileDescriptor.script.content;
      vueObject.componentOption = await this.genVueOption(content);
      vueObject.props = this.genProps(vueObject.componentOption);
    }
    if (vueObject.fileDescriptor.template) {
      vueObject.slots = this.genTemplate(vueObject.fileDescriptor.template.content);
    }
    return vueObject;
  }

  private async genVueOption(scriptString: string): Promise<ComponentOptions<any>> {
    // 解析js代码为AST树
    const ast = babelParse(scriptString, {
      sourceType: 'unambiguous'
    });
    // 删除type非ExportDefaultDeclaration的节点
    traverse.default(ast, {
      Statement(path) {
        if (path.type !== 'ExportDefaultDeclaration') {
          path.remove();
        }
      }
    });
    // 转化为js代码
    const jsCode = generator.default(ast);
    // 转为对象
    let componentOptions: ComponentOptions<any> = {};
    componentOptions = eval(`componentOptions = ${jsCode.code.replace('export', '').replace('default', '')}`);
    return componentOptions;
  }

  private genTemplate(template: string): Array<ISlots> {
    // 解析模板内容转为AST
    const { ast } = VueTemplateCompiler.compile(template);
    // const slotsList = flatMapDeep([ast], (n: ASTElement) => {
    //   const d = flatMapDeep(n.children, (n2: ASTElement) => {
    //     const d2 = flatMapDeep(n2.children);
    //     // @ts-ignore
    //     delete n2.children;
    //     return [n2, ...d2];
    //   });
    //   // @ts-ignore
    //   delete n.children;
    //   return [n, ...d];
    // });
    const slotsList = this.flatMapDeepAst([ast]);
    console.log('ast', slotsList);
    return [];
  }

  // @ts-ignore
  private genProps(componentOptions: ComponentOptions<any>): Array<IGenProps> {
    const propsObject = componentOptions.props;
    const propsArray: Array<IGenProps> = [];
    if (!propsObject) {
      return propsArray;
    }
    if (isArray(propsObject)) {
      propsObject.forEach((key) => {
        propsArray.push({
          propName: key,
          propType: [],
          propValue: undefined
        });
      });
    } else if (isObject(propsObject)) {
      for (let key in propsObject) {
        let prop = propsObject[key];
        if (toType(prop) === 'Object') {
          propsArray.push({
            propName: key,
            // @ts-ignore
            propType: this.conversionType(prop.type || toType(prop.default)),
            // @ts-ignore
            propValue: prop.default,
            // @ts-ignore
            componentNote: prop.note
          });
        } else {
          propsArray.push({
            propName: key,
            // @ts-ignore
            propType: this.conversionType(prop)
          });
        }
      }
    }
    return propsArray;
  }

  // 处理props的类型
  private conversionType(type) {
    if (type === undefined) {
      return 'any';
    } else if (isFunction(type)) {
      return type.name;
    } else if (isArray(type)) {
      return type.map(t => this.conversionType(t));
    } else {
      throw new GenVueFileError('prop类型声明有误');
    }
  }

  private flatMapDeepAst(list) {
    return  flatMapDeep(list, (n: ASTElement) => {
      return [n, ...this.flatMapDeepAst(n.children)];
    });
  }

}
