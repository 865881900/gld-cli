<template>
  <div class="auto">
    <div class="auto-template">左侧</div>
    <div class="auto-container">中间</div>
    <div class="auto-setting">右侧</div>
  </div>
</template>
<script>
export default {
  name: 'Auto'
};
</script>
<style lang="scss" scoped>
.auto {
  display: flex;
  height: 100%;
  width: 100%;
  .auto-template,
  .auto-setting {
    width: 200px;
  }
}
</style>
