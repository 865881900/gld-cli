<template>
  <div>
    <slot name='title'></slot>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    name: {
      type: String,
      value: '',
      note: '这是注解',
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
html {
  overflow: auto;
}

body {
  min-width: 1000px;
}
* {
  margin: 0;
  padding: 0;
}
</style>
