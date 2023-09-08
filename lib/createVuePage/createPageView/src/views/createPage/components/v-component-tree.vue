<!--
/**
@template: 组件树组件, 用于展示所有的组件
@author: ChaoPengWang(wangcp-a@glodon.com)
@update: 2022/4/16 9:36 PM
-->
<template>
  <div>
    <!-- 组件类型 -->
    <el-tabs v-model="componentType">
      <el-tab-pane
        v-for="item in componentTypeConfig"
        :label="item.note"
        :key="item.componentType"
        :name="item.label"
      />
    </el-tabs>
    <!-- 组件 -->
    <div class="components-map">
      <div class="components-list">
        <draggable
          v-if="draggableLoading"
          :sort="false"
          :disabled="false"
          animation="0"
          v-model="componentTree"
          @add="add"
          @start="start"
          @end="end"
          :group="group"
        >
          <el-tooltip
            :data-id="com._componentId"
            :open-delay="1000"
            v-for="com in componentTree"
            :key="com._componentId"
            effect="dark"
            :content="com._componentNote"
            placement="top-start"
          >
            <el-button>
              {{ com._componentTag }}
            </el-button>
          </el-tooltip>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { componentTypeConfig } from "../../../config";

export default {
  name: "vComponentTree",
  data: () => ({
    componentTypeConfig: componentTypeConfig,
    draggableLoading: true,
    group: {
      name: "group",
      pull: "clone",
      put: false // 可以拖入
    }
  }),
  computed: {
    ...mapGetters({
      componentData: "component/componentData",
      componentTree: "component/componentTree"
    }),
    
    componentType: {
      get() {
        return this.$store.state.component.componentType;
      },
      set(v) {
        this.$store.commit("component/setComponentType", v);
      }
    }
  },
  watch: {
    componentTree() {
      this.draggableLoading = false;
      setTimeout(() => {
        this.draggableLoading = true;
      }, 400);
    }
  },
  created() {
    this.registeringComponent("80f06f3d-a828-5dc6-b877-71bfd416e1cb");
  },
  methods: {
    ...mapMutations({
      registeringComponent: "component/registeringComponent"
    }),
    // 开始拖拽事件
    // 拖拽结束事件
    end() {
    },
    add(v) {
    },
    start(data) {
      this.registeringComponent(data.clone.dataset.id);
    }
  }
};
</script>

<style scoped lang="scss">
.components-map {
  padding: 10px;
  
  .components-list {
    display: flex;
    margin-bottom: 20px;
    
    & > .el-button {
      width: calc((100% - 20px) / 3);
      margin: 0;
      padding: 10px;
      white-space: break-spaces;
      word-break: break-all;
    }
    
    & > .el-button:nth-child(3n + 2) {
      margin: 0 10px;
    }
  }
}

/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: blue !important;
}

.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.itxst {
  margin: 10px;
  min-height: 200px;
}

.title {
  padding: 6px 12px;
}

.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>
