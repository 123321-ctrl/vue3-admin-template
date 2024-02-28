const testBar = (data) => {
  const defaultConfig = {
    title: { text: 'Referer of a Website', left: 'center' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  }

  const opt = Object.assign({}, defaultConfig, data)
  console.log('opt', opt)
  return opt
}

const testBar2 = (data) => {
  const defaultConfig = {
    // color: ['#61C77E'],
    title: {
      text: '调阅次数',
      left: 'center',
      textStyle: {
        color: '#000000',
        fontSize: 20,
      },
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      textStyle: {
        color: 'black',
        fontSize: 14,
      },
      // formatter: '{b}: {c} 次',
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
        margin: 12,
      },
      axisLine: {
        lineStyle: {
          color: ['#E8E8E8'],
        },
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: ['#E8E8E8'],
          type: 'dotted',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
    legend: {
      top: '8%',
      data: ['调阅次数', '数', '阅', '次数'],
    },
    series: [
      {
        name: '调阅次数',
        type: 'bar',
        barWidth: '20',
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '数',
        type: 'bar',
        barWidth: '20',
        emphasis: {
          focus: 'series',
        },
        data: [300, 300, 300, 300, 300, 300, 300],
      },
      {
        name: '阅',
        type: 'bar',
        barWidth: '20',
        emphasis: {
          focus: 'series',
        },
        data: [300, 300, 300, 300, 300, 300, 300],
      },
      {
        name: '次数',
        type: 'bar',
        barWidth: '20',
        emphasis: {
          focus: 'series',
        },
        data: [300, 300, 300, 300, 300, 300, 300],
      },
    ],
  }
  const opt = Object.assign({}, defaultConfig)
  return opt
}

export default {
  testBar,
  testBar2,
}
