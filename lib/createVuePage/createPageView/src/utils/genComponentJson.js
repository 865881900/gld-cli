/**
 * 对生成的组件json进行初始化之前的处理
 */
import components from "../components/components.json";
import { cloneDeep, isArray } from "lodash";
import { componentTypeConfig, genComponentPropsConfig } from "../config";
import { verifyConform } from "./verify";

/**
 * 解析node服务生成的JSON文件, 并做缓存
 */
class GenComponentJson {

  // id与组件对象详情的映射, 以便快速的定位到组件
  constructor() {
    this.componentMap = new Map();
  }

  /**
   * 开始处理组件JSON数据
   * componentType: 0: 页面组件 1:私有组件 2:基础组件
   * @return {{privateComponents: *[], pageComponents: *[], baseComponents: *[]}}
   */
  init() {
    const componentData = {
      privateComponents: [],
      pageComponents: [],
      baseComponents: []
    };
    // 对组件根据genComponentPropsConfig配置进行分类
    components.forEach(com => {
      this.componentMap.set(com._componentId, com);
      let _component = {};
      // genComponentPropsConfig.forEach(p => _component[p] = com[p]);
      _component = cloneDeep(com);
      const componentTypeConfigItem = componentTypeConfig.find(item => item.componentType === com._componentType);
      verifyConform(componentTypeConfigItem, (data) => data !== undefined, `不支持当前类型组件:${com.componentName}`);
      componentData[`${componentTypeConfigItem.label}Components`].push(_component);
    });
    return componentData
  }

  /**
   * 根据组件id返回组件的实例
   * @param componentId
   * @return {null|unknown}
   */
  getComponent(componentId) {
    const { componentMap } = this;
    if (componentMap.has(componentId)) {
      return componentMap.get(componentId);
    }
    return null;
  }
}

export const genComponentJson = new GenComponentJson();
