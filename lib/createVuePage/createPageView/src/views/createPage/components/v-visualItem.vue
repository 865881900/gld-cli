<!--
@template: component选择组件
@author: ChaoPengWang(wangcp-a@glodon.com)
@update: 2023/9/1
-->
<script>
import { mapGetters, mapMutations } from "vuex";
import { getIdById } from "../../../utils";

export default {
  name: "vVisualItem",
  props: {
    id: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      comPageDataMap: "comPageData/comPageDataMap",
      componentData: "component/componentData",
      componentType: "component/componentType",
    })
  },
  methods: {
    ...mapMutations({
      createComPageData: "comPageData/createComPageData"
    })
  },
  render(h, context) {
    const com = this.comPageDataMap[this.id];
    const tag = com.tag;
    const component = {
      style: com.style,
      staticClass: [...com.class, "visual-item"]
    };
    console.log(com);
  
    const children = [];
    const {componentData, componentType} = this;
    
    if (this.id === "root") {
      children[0] = com.scopedSlots.map((slots) => {
        return h("draggable", {
          staticClass: ["draggable-all"],
          props: {
            list: slots.list
          },
          attrs: {
            group: {
              name: "group",
              pull: true,
              put: true // 可以拖入
            }
          }
        }, slots.list.map((slotsItem, index) => {
          let id = slotsItem.id;
          // 未被初始化的
          if (!slotsItem.tag) {
            id = getIdById(slotsItem._componentId, new Date().getTime() + "");
            this.createComPageData({
              id,
              parentId: com.id,
              componentId: slotsItem._componentId,
              componentData,
              componentType,
            });
            slots.list.splice(index, 1, this.comPageDataMap[id]);
          }
          return h("v-visualItem", {
            props: {
              id: slots.list[index].id
            }
          });
        }));
      });
    } else {
      component.scopedSlots = com.scopedSlots.reduce((obj, slot) => {
        obj[slot.slotsName] = () => h("draggable", {
          staticClass: ["draggable-all"],
          attrs: {
            group: {
              name: "group",
              pull: true,
              put: true // 可以拖入
            }
          },
          props: {
            list: slot.list
          }
        }, slot.list.map((slotListItem, index) => {
          let id = slotListItem.id;
          if (!slotListItem.tag) {
            id = getIdById(slotListItem._componentId, new Date().getTime() + "");
            this.createComPageData({
              id,
              parentId: com.id,
              componentId: slotListItem._componentId,
              componentData,
              componentType,
            });
            slot.list.splice(index, 1, this.comPageDataMap[id]);
          }
          
          return h("v-visualItem", {
            props: {
              id: id
            }
          });
        }));
        return obj;
      }, {});
    }
    
    return h(tag, component, children);
  }
};
</script>

<style scoped lang="scss">
.draggable-all {
  padding: 20px;
  height: 100%;
  width: 100%;
}


.visual-item {
  border: 1px solid #e6a23c;
}

</style>
