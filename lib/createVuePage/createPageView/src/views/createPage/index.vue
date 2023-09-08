<template>
  <div class="pages">
    <el-header>
      <v-header></v-header>
    </el-header>
    <el-container>
      <el-aside width="300px" style="padding: 0px 10px">
        <v-component-tree />
      </el-aside>
      <div class="comPage">
        <div
          class="comPage-map"
          :style="{
            width: mapWidth,
            height: mapHeight,
          }"
        >
          <v-visualItem id="root"></v-visualItem>
        </div>
      </div>
      <div class="comPage-setting">
        设置
      </div>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import vComponentTree from "./components/v-component-tree";
import vVisualItem from "./components/v-visualItem";
import { getIdById } from "../../utils";
import vHeader from "./components/v-header";

export default {
  name: "Auto",
  data() {
    return {};
  },
  components: {
    vHeader,
    vComponentTree,
    vVisualItem
  },
  computed: {
    ...mapGetters({
      componentData: "component/componentData",
      componentType: "component/componentType",
      mapWidth: "config/mapWidth",
      mapHeight: "config/mapHeight"
    })
  },
  created() {
    const {
      componentType,
      componentData
    } = this;
    this.createComPageData({
      id: getIdById("root", new Date().getTime() + ""),
      componentType,
      componentData
    });
  },
  methods: {
    ...mapMutations({
      createComPageData: "comPageData/createComPageData"
    })
  }
};
</script>
<style lang="scss" scoped>
.pages {
  height: 100%;
  overflow: hidden;
  
  & > .el-header {
    border-bottom: 1px solid #dcdfe6;
  }
  
  .el-container {
    height: calc(100% - 60px);
    padding: 20px;
    
    .comPage {
      flex: 1;
      height: 100%;
      overflow: auto;
      padding: 10px;
      background-color: rgba(144, 147, 153, 0.58);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .comPage-setting {
      width: 300px;
    }
  }
  
  .el-container-container {
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    padding: 20px 0;
  }
  
}
</style>
