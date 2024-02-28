<template>
  <!-- <BaseECharts
      :options="options"
      width="30%"
      height="100px"
      @resize="resize"
    /> -->

  <chartView
    class="chart-content"
    :chart-option="chartOpt"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <chartView
    class="chart-content"
    :chart-option="chartOpt2"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <chartView
    class="chart-content"
    :chart-option="chartOpt4"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <chartView
    class="chart-content"
    :chart-option="chartOpt3"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <chartView
    class="chart-content"
    :chart-option="chartRadarOpt"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <chartView
    class="chart-content"
    :chart-option="chartGaugeOpt"
    :auto-resize="true"
    height="100%"
  ></chartView>
  <div class="echartMapTestView">
    <h2>echarts省市地图封装示例</h2>
    <chart-view
      class="map-view"
      :chart-option="mapOpt"
      height="100%"
      @click="handleMapClick"
    />
  </div>
</template>
<script setup>
// import axios from 'axios'
// import BaseECharts from './BaseECharts.vue'
import chartView from './components/chart/index.vue'
import eChartFn from './components/chart/index.js'
import mapJson from '@/data/mapdata.json'
import detailJson from '@/data/4401.json'

import { ref } from 'vue'
console.log('modulesFiles', eChartFn)
const chartOpt = eChartFn.testBar()
const chartOpt2 = eChartFn.testBar2()
const chartOpt4 = eChartFn.testLine()
const chartOpt3 = eChartFn.getPieChart(
  [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
  ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
)
const chartRadarOpt = eChartFn.getRadarChart()
const chartGaugeOpt = eChartFn.getGaugeChart()

// 初始化地图
const mapOpt = ref({})
const mapName = ref('广州市')
const mapPopData = ref([]) //地图数据

// const mapRequest = (url) => {
//   return axios.get(`/echarts/data/${url}.json`)
// }
const initData = () => {
  // mapRequest('mapdata').then((result) => {
  //   const res = result.data

  //   mapPopData.value = res

  //   initMap('4401')
  // })
  mapPopData.value = mapJson
  initMap()
}
const findElem = (arrayToSearch, attr, val) => {
  if (arrayToSearch != null) {
    for (var i = 0; i < arrayToSearch.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (arrayToSearch[i][attr] == val) {
        return i
      }
    }
  } else {
    return -1
  }
  return -1
}
const initMap = () => {
  const mapData = detailJson
  const jsonMap = { mark: mapName.value, json: mapData }

  const data = mapData.features.map((item) => {
    const { name, adcode } = item.properties

    let hoverObj = {}

    const objIndex = findElem(mapPopData.value, 'adcode', adcode)
    if (objIndex !== -1) {
      hoverObj = mapPopData.value[objIndex]
    } else {
      hoverObj = null
    }
    return {
      name,
      mapProperty: item.properties,
      hoverObj: hoverObj,
    }
  })
  mapOpt.value = eChartFn.getSimpleMap(jsonMap, data)
  // mapRequest(url)
  //   .then((res) => {
  //     const mapData = res.data
  //     const jsonMap = { mark: mapName.value, json: mapData }

  //     const data = mapData.features.map((item) => {
  //       const { name, adcode } = item.properties

  //       let hoverObj = {}

  //       const objIndex = findElem(mapPopData.value, 'adcode', adcode)
  //       if (objIndex !== -1) {
  //         hoverObj = mapPopData.value[objIndex]
  //       } else {
  //         hoverObj = null
  //       }
  //       return {
  //         name,
  //         mapProperty: item.properties,
  //         hoverObj: hoverObj,
  //       }
  //     })
  //     mapOpt.value = eChartFn.getSimpleMap(jsonMap, data)
  //   })
  //   .catch((err) => {
  //     console.log(err, '加载地图失败')
  //   })
}
initData()

// 地图点击事件
const handleMapClick = (params) => {
  const { name, seriesType } = params
  if (seriesType !== 'map') return
  const { data } = params
  const code = data.mapProperty.adcode
  console.log(11111, data)
  console.log(22222, name, code)
}

// const options = ref({
//   series: [
//     {
//       type: 'liquidFill',
//       data: [0.6],
//       radius: '90%',
//     },
//   ],
// })

// const resize = ({ width, height }) => {
//   console.log('hhh', width, height)
// }
</script>
<style scoped lang="scss">
.chart-content {
  width: 100%;
  height: 400px;
}
.echartMapTestView {
  padding: 10px;
  width: 520px;
  height: 520px;
  .map-view {
    width: 100%;
    height: 100%;
  }
}
</style>
