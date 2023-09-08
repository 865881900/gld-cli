// 配置
export default {
  namespaced: true,
  state: {
    mapType: "pc", // 页面适应设备
    frameType: "vue", // 框架
    mapWidth: "100%", // 画布宽度
    mapHeight: "100%"// 画布高度
  },
  getters: {
    mapWidth(state) {
      return state.mapWidth;
    },
    mapHeight(state) {
      return state.mapHeight;
    }
  },
  mutations: {
    setMapType(state, mapType) {
      state.mapType = mapType;
    },
    setFrameType(state, frameType) {
      state.frameType = frameType;
    }
  },
  actions: {}
};
