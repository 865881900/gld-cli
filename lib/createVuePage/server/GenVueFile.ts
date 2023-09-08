import { ifVueFile, toType, toUnderscoreNotation } from "../../utils";
import { GenVueFileError } from "../../error/GenVueFileError";
import * as VueTemplateCompiler from "vue-template-compiler";
import message from "../../utils/Message";
import { MGenVueObject } from "../module/MGenVueObject";
import { MVueObject } from "../module/MVueObject";
import { MGenProps } from "../module/MGenProps";
import { IGenVueFile } from "../interface/IGenVueFile";

import { readFileSync } from "fs-extra";
import { parse } from "@vue/component-compiler-utils";
import { parse as babelParse } from "@babel/parser";
import * as traverse from "@babel/traverse";
import * as generator from "@babel/generator";
import { flatMapDeep, isArray, isFunction, isObject } from "lodash";
import { ComponentOptions } from "vue/src/types/options";
import { ASTElement } from "vue-template-compiler";
import { v5 as uuidv5 } from "uuid";
import { IComponentType } from "../enum";
import * as Vue from "vue/dist/vue.common.dev.js";


const { compileTemplate } = require("@vue/component-compiler-utils");

export class GenVueFile implements IGenVueFile {

  public async genVue(filePath: string, fileName: string, componentType: IComponentType): Promise<MGenVueObject> {
    const vueObject = new MVueObject(filePath);
    message.success(`开始解析组件${fileName},${filePath}`);
    if (!ifVueFile(fileName)) {
      throw new GenVueFileError("被解析的文件不是vue文件");
    }
    vueObject.componentData = readFileSync(filePath, "utf8");
    vueObject.componentDescriptor = parse({
      needMap: false,
      source: vueObject.componentData,
      // @ts-ignore
      compiler: VueTemplateCompiler
    });
    if (vueObject.componentDescriptor.script) {
      const content = vueObject.componentDescriptor.script.content;
      vueObject.componentOption = await this.genVueOption(content);
      // vueObject.componentProps = this.genProps(vueObject.componentOption);
      vueObject.componentId = vueObject.componentOption.id || uuidv5(vueObject.componentPath, uuidv5.URL);
      vueObject.componentFileName = fileName;
      vueObject.componentType = componentType;
      vueObject.componentName = vueObject.componentOption.name || fileName;
      vueObject.componentNote = vueObject.componentOption.note;
      vueObject.componentTag = toUnderscoreNotation(vueObject.componentName);
    }

    if (vueObject.componentDescriptor.template) {
      const { ast, render } = VueTemplateCompiler.compile(vueObject.componentDescriptor.template.content);
      vueObject.slots = this.flatMapDeepAst([ast]).filter(item => item.tag === "slot").map(item => {
        delete item.parent;
        return {
          slotsName: item.slotName || "default",
          // 是否为作用域插槽
          slotsVNode: item,
          slotsNote: item.attrsMap.note
        };
      });

      const compiler = compileTemplate({
        compiler: VueTemplateCompiler,
        source: vueObject.componentDescriptor.template.content
      });
      vueObject.componentRender = compiler.code;
      // vueObject.componentRender = VueTemplateCompiler.compileToFunctions(vueObject.componentDescriptor.template.content).render.toString();
    }
    return vueObject;
  }

  // @ts-ignore
  private async genVueOption(scriptString: string): Promise<ComponentOptions> {
    // 解析js代码为AST树
    const ast = babelParse(scriptString, {
      sourceType: "unambiguous"
    });
    // 删除type非ExportDefaultDeclaration的节点
    console.log("开始");
    let start, end, isExportDefaultDeclaration = false;
    traverse.default(ast, {
      Statement(path) {
        if (path.type === "ExportDefaultDeclaration") {
          start = path.node.start;
          end = path.node.end;
          isExportDefaultDeclaration = true;
        } else {
          if (!(isExportDefaultDeclaration && path.node.end <= end)) {
            path.remove();
          }
        }
      }
    });
    // 转化为js代码
    const jsCode = generator.default(ast);
    // 转为对象
    let componentOptions: ComponentOptions;
    const code = jsCode.code.replace("export", "").replace("default", "");
    componentOptions = eval(`componentOptions = ${code}`);
    componentOptions.code = code;
    componentOptions = Vue.util.mergeOptions({}, componentOptions);
    return componentOptions;
  }

  // @ts-ignore
  private genProps(componentOptions: ComponentOptions): Array<MGenProps> {
    const propsObject = componentOptions.props;
    const propsArray: Array<MGenProps> = [];
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
        if (toType(prop) === "Object") {
          propsArray.push({
            propName: key,
            // @ts-ignore
            propType: this.conversionType(prop.type || toType(prop.default)),
            // @ts-ignore
            propValue: prop.default,
            // @ts-ignore
            propNote: prop.note
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
      return "any";
    } else if (isFunction(type)) {
      return type.name;
    } else if (isArray(type)) {
      return type.map(t => this.conversionType(t));
    } else {
      throw new GenVueFileError("prop类型声明有误");
    }
  }

  private flatMapDeepAst(list) {
    return flatMapDeep(list, (n: ASTElement) => {
      return [n, ...this.flatMapDeepAst(n.children)];
    });
  }

}
