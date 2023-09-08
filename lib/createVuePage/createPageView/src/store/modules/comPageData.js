// 页面组件树相关
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    // 组件树
    comPageDataMap: {},
    activeComPageDataId: ""
  },
  getters: {
    comPageDataMap(store) {
      return store.comPageDataMap;
    },
    aaa(store) {
      return '12323123123';
    }
  },
  mutations: {
    /**
     * 创建一个comPage对象
     * @param state
     * @param id 新的comPage对象的id
     * @param parentId 父comPage的id
     * @param componentId 组件的id
     */
    createComPageData(state, { id, parentId, componentId, componentData, componentType }) {
      // 获取组件
      const component = componentData[`${componentType}Components`].find(item => item._componentId === componentId) || {
        "_componentPath": "",
        "_componentData": "",
        "_componentDescriptor": "",
        "_componentOption": {},
        "_componentProps": [],
        "_componentId": "root",
        "_componentFileName": "root",
        "_componentType": "root",
        "_componentName": "root",
        "_componentTag": "div",
        "_slots": [
          {
            "slotsName": "default",
            "slotsVNode": {
              "type": 1,
              "tag": "slot",
              "attrsList": [],
              "attrsMap": {
                "name": "slot1"
              },
              "rawAttrsMap": {},
              "children": [],
              "plain": false,
              "slotName": "\"slot1\"",
              "static": false,
              "staticRoot": false
            }
          }
        ],
        "_componentRender": ""
      };
      state.comPageDataMap[id] = Vue.observable({
        tag: component._componentTag,
        componentId,
        id,
        parent: parentId,
        scopedSlots: component._slots.map(item => {
          return {
            slotsName: item.slotsName,
            slotsComPageId: "",
            list: []
          };
        }), // 插槽
        props: component._componentOption.props, // prop
        style: {
          height: "100%",
          width: "100%"
        },
        class: []
      });
    },

    // 修改当前正在编辑的 ComPageDataId
    setActiveComPageDataId(state, activeComPageDataId) {
      // state.activeComPageDataId = activeComPageDataId;
    },

    /**
     *  修改当前正在编辑的ComPageData对象的值
     * @param key 需要需改的属性
     * @param v 修改的值
     */
    setActiveComPageData(state, key, v) {
      // state.comPageDataMap[state.activeComPageDataId].key = v;
    }
  },
  actions: {}
};
