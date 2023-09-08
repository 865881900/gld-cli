<template>
  <div>
    <div @click="click">你好{{ a }}</div>
    <div>
      <slot :name="aaaa"></slot>
      <slot name="name2"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: "test",
  props: {
    p1: [String, Number],
    p2: {
      type: String,
      default: '12'
    }
  },
  data() {
    return {
      a: 12,
      aaaa: "name1"
    };
  },
  beforeCreate() {
    console.log(11212);
  },
  methods: {
    click() {
      this.a++;
    }
  }
  
};
</script>
