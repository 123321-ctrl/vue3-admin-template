<template>
  <div class="charts" ref="charts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 40,
      right: 30,
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  }
  mycharts.setOption(option)
})
</script>

<style scoped lang="scss">
.charts {
  width: 100%;
  height: 400px;
}
</style>
