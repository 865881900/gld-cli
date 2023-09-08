import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuedraggable from "vuedraggable";

Vue.component("draggable", vuedraggable);

// import { axios } from './http';
// Vue.use(BaseRouterLoading, axios.axios);

// // 全部引入UI框架
import Element from "element-gui";
import "element-gui/lib/theme-chalk/index.css";

Vue.use(Element);

// 引入全局的css样式
import('@/assets/css/index.scss');

new Vue({
  components: {
    App
  },
  router,
  store,
  render:(h) => h('App'),
  created() {
    this.$store.commit("component/initVue", Vue);
  }
}).$mount("#app");
