import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    componentMap: {
      // 页面布局组件
      pageComponents: [],
      // 私有组件
      privateComponents: []
    }
  },
  getters: {},
  mutations: {
    setPageComponents(state, data) {
      state.componentMap.pageComponents = data;
    },
    setUiComponents(state, ui, data) {
      state.componentMap[ui] = data;
    },
    setPrivateComponents(state, data) {
      state.componentMap.privateComponents = data;
    }
  },
  actions: {}
});
