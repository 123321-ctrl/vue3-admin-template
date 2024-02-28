<template>
  <div class="charts1" ref="charts1"></div>
  <div class="charts2" ref="charts2"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'

let charts1 = ref()
let charts2 = ref()
let option1 = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true,
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 18,
    },
  },
  yAxis: {
    type: 'value',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        normal: {
          color: function (params: any) {
            let colorList = [
              '#C33531',
              '#EFE42A',
              '#64BD3D',
              '#C33531',
              '#EFE42A',
              '#64BD3D',
              '#C33531',
            ]
            return colorList[params.dataIndex]
          },
        },
        borderRadius: [5, 5, 0, 0],
      },
    },
  ],
})
let option2 = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
      ],
    },
  ],
})

onMounted(() => {
  let mycharts1 = echarts.init(charts1.value)
  mycharts1.setOption(option1.value)

  let mycharts2 = echarts.init(charts2.value)
  mycharts2.setOption(option2.value)

  window.addEventListener('resize', function () {
    mycharts1.resize()
    mycharts2.resize()
  })
})
</script>

<style scoped lang="scss">
.charts1 {
  width: 60%;
  height: 100%;
}
.charts2 {
  width: 40%;
  height: 100%;
}
</style>
