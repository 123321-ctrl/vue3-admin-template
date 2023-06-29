<template>
  <div class="charts" ref="charts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'

let charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.6],
        radius: '90%',
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.charts {
  width: 100%;
  height: 270px;
}
</style>
