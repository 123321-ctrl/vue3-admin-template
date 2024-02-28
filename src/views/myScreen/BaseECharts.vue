<template>
  <div :style="{ width: width, height: height }" class="box" ref="box">
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps(['options', 'width', 'height'])
const emits = defineEmits(['resize'])

let charts = ref()
let box = ref(null)
let mycharts

const getWindowInfo = () => {
  const { width, height } = useElementSize(box.value)
  emits('resize', { width: width.value, height: height.value })
  mycharts.resize()
}
window.addEventListener('resize', getWindowInfo)

onMounted(() => {
  mycharts = echarts.init(charts.value)
  mycharts.setOption(props.options)
})
</script>
<style scoped lang="scss">
.box {
  flex: 1;
  min-height: 50px;
  background-color: pink;
}
.charts {
  width: 100%;
  height: 100%;
}
</style>
