<template>
  <div style="display: flex; ">
  
    <div style="width: 400px; display: inline-block" class="div2 div">
      <draggable :list="list2" group="group">
        <p
          v-for="i in list2"
          :key="i.id"
        >
          {{i.name}}
        </p>
        <div class="div1 div">
          <draggable :list="list3" group="group">
            <p
              v-for="i in list3"
              :key="i.id"
            >
              {{i.name}}
            </p>
          </draggable>
        </div>
    
      </draggable>
    </div>
    <div style="width: 400px; display: inline-block" class="div1 div">
      <draggable :list="list1" group="group">
        <p
          v-for="i in list1"
          :key="i.id"
        >
          {{i.name}}
        </p>
      </draggable>
    </div>
    <p @click="click">   comPageData: {{comPageData}}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getIdById } from "../utils";
export default {
  name: "test",
  data: () => {
    return {
      list1: [
        {
          name: 'element-1-1',
          id: '1-1'
        },
        {
          name: 'element-1-2',
          id: '1-2'
        },
        {
          name: 'element-1-3',
          id: '1-3'
        },
        {
          name: 'element-1-4',
          id: '1-4'
        },
      ],
  
      list2: [
        {
          name: 'element-2-1',
          id: '2-1'
        },
        {
          name: 'element-2-2',
          id: '2-2'
        },
        {
          name: 'element-2-3',
          id: '2-3'
        },
        {
          name: 'element-2-4',
          id: '2-4'
        },
      ],
  
      list3: [
        {
          name: 'element-3-1',
          id: '3-1'
        },
      ]
    }
  },
  computed: {
    ...mapGetters(["comPageData"]),
  },
  
  methods: {
    ...mapMutations(['createComPageData', 'setActiveComPageDataId', 'setActiveComPageData']),
    click() {
      this.setActiveComPageDataId(getIdById('12', new Date().getTime() + ''))
      setTimeout(() => {
        this.setActiveComPageData(1);
      }, 1000)
    }
  },
  
};
</script>
<style scoped lang="scss">
.div {
  padding: 10px;
  background-color: #d7d2d2;
  & > div {
    min-height: 40px;
  }
}
.div1 {
  p {
    background-color: rgba(255, 0, 0, 0.24);
    margin-bottom: 10px;
  }
  
}

.div2 {
  p {
    background-color: rgba(0, 51, 255, 0.24);
    margin-bottom: 10px;
  }
}


</style>
