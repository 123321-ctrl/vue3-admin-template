<template>
  <div class="charts" ref="map"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJSON from './china.json'

let map = ref()
echarts.registerMap('china', chinaJSON)

onMounted(() => {
  let mycharts = echarts.init(map.value)
  mycharts.setOption({
    geo: [
      {
        map: 'china',
        roam: true, //鼠标缩放
        left: 50,
        top: 0,
        right: 50,
        bottom: 0,
        label: {
          show: true,
          color: 'white',
          fontSize: 16,
        },
        itemStyle: {
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
          opacity: 0.8,
        },
        emphasis: {
          itemStyle: {
            color: 'pink',
          },
          label: {
            fontSize: 20,
          },
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [126.642464, 45.756967], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'pink',
          symbolSize: 30,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.charts {
  width: 100%;
  height: 700px;
}
</style>
