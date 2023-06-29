<template>
  <div class="charts" ref="charts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    gird: {
      left: 40,
      right: 0,
      top: 0,
      bottom: 10,
    },
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'pink', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'skyblue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
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
