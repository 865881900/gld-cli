<!--
@template: 头部组件
@author: ChaoPengWang(wangcp-a@glodon.com)
@update: 2023/9/6
-->


<template>
  <div class="header">
    <div class="logo">
      Automatic Page
    </div>
    
    <div class="setting">
      <div class="setting-item">
        框架类型：
        <el-select
          v-model="frameType"
        >
          <el-option
            v-for="opt in frameTypeOption"
            :key="opt.value"
            :value="opt.value"
            :label="opt.label"
          ></el-option>
        
        </el-select>
      </div>
      
      <div class="setting-item">
        视图类型：
        <el-select
          v-model="mapType"
        >
          <el-option
            v-for="opt in mapTypeOption"
            :key="opt.value"
            :value="opt.value"
            :label="opt.label"
          ></el-option>
        
        </el-select>
      </div>
    
    </div>
  </div>
</template>

<script>
import { mapTypeOption, frameTypeOption } from "../../../options";

export default {
  name: "vHeader",
  data() {
    return {
      mapTypeOption: mapTypeOption,
      frameTypeOption: frameTypeOption
    };
  },
  computed: {
    
    mapType: {
      get() {
        return this.$store.state.config.mapType;
      },
      set(v) {
        this.$store.commit("config/setMapType", v);
      }
    },
    
    frameType: {
      get() {
        return this.$store.state.config.frameType;
      },
      set(v) {
        this.$store.commit("config/setFrameType", v);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .setting {
    line-height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    
    .setting-item {
      margin-left: 40px;
      
      .el-select {
        width: 100px;
      }
    }
  }
}
</style>
