import Vuex from "vuex";
import Vue from "vue";
import config from "./modules/config";
import comPageData from "./modules/comPageData";
import component from "./modules/component";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    config,
    comPageData,
    component
  }
});
