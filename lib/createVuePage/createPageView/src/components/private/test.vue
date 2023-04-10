<template>
  <div>
    <div>你好</div>
    <div>
      <slot name="slot1"></slot>
      <slot :slot:header="a"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data: () => ({
    a: 12
  }),
  props: {
    title: {
      type: [String],
      default: '这是title',
      note: '这是说明'
    },
    name: Number
  }
};
</script>
