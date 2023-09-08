// 组件相关
import { genComponentJson } from "../../utils/genComponentJson";
import { componentTypeConfig } from "../../config";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    // 0: 页面组件 1:私有组件 2:基础组件
    componentData: genComponentJson.init(),
    componentType: componentTypeConfig[0].label,
    registeringComponentsMap: [{}], // 当组件给拖入后, 则全局注册组件
    Vue: {}
  },
  getters: {
    componentData(store) {
      return store.componentData;
    },
    componentType(store) {
      return store.componentType;
    },
    componentTree(store) {
      return store.componentData[`${store.componentType}Components`];
    }
  },
  mutations: {
    initVue(state, Vue) {
      state.Vue = Vue;
    },

    // 切换组件type
    setComponentType(state, componentType) {
      state.componentType = componentType;
    },
    // 注册组件
    registeringComponent(state, componentId) {
      if (!state.registeringComponentsMap.includes(componentId) && genComponentJson.componentMap.has(componentId)) {
        const com = genComponentJson.componentMap.get(componentId);
        Vue.component(com._componentOption.name, async function() {
          let data;
          eval(`data = ${com._componentOption.code}`);
          eval(`${com._componentRender};
          data.render = render`);
          return data;
        });
      }
    }
  }
};
