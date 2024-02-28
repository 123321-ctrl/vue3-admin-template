<!-- 图表单文件组件，供界面调用 -->
<template>
  <div class="chart">
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { watch, ref, onMounted, onBeforeUnmount } from 'vue'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
])

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '350px',
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  chartOption: {
    type: Object,
    default: () => ({
      // 线条颜色
      color: ['red', 'pink', 'orange'],
      // 标题
      title: {
        text: '标题',
      },
      // x轴
      xAxis: {
        show: false, // 默认是true，将x轴隐藏掉
        data: [10, 20, 30, 40, 50, 60],
        // 坐标轴线相关设置
        axisLine: {
          // 轴线样式
          lineStyle: {
            color: '#fff',
          },
        },
      },
      // y轴
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      series: {
        type: 'line', // 图表类型
        data: [0, 20, 40, 60, 80, 100],
      },
      // 网格配置  grid可以控制线形图 柱状图 图表大小
      grid: {
        left: '2%',
        right: '2%',
        top: '13%',
        bottom: '2%',
        containLabel: true, // 区域内是否包含坐标轴的刻度标签
      },
    }),
    required: true,
  },
  type: {
    type: String,
    default: 'canvas',
  },
})
const emit = defineEmits(['click'])
const chart = ref(null)
let myChart = null
watch(
  props.chartOption,
  (newValue) => {
    // 仅当 props.chartOption 被替换时触发
    setOptions(newValue)
  },
  { deep: true },
)

onMounted(() => {
  initChart()
  if (props.autoResize) {
    window.addEventListener('resize', resizeHandler)
  }
})
onBeforeUnmount(() => {
  if (!myChart) {
    return
  }
  if (props.autoResize) {
    window.removeEventListener('resize', resizeHandler)
  }
  myChart.dispose()
  myChart = null
})

const initChart = () => {
  myChart = echarts.init(chart.value, '', {
    renderer: props.type,
  })
  myChart.setOption(props.chartOption)
  myChart.on('click', handleClick)
}

const handleClick = (params) => {
  emit('click', params)
}
const refresh = () => {
  setOptions(props.chartOption)
}
const clearChart = () => {
  myChart && myChart.clear()
}
const resizeHandler = () => {
  myChart.resize()
}
const setOptions = (option) => {
  clearChart()
  resizeHandler()
  if (myChart) {
    myChart.setOption(option)
  }
}
</script>
