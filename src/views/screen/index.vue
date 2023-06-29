<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">top</div>
      <div class="bottom">
        <div class="left">
          <Tourists></Tourists>
          <Sex></Sex>
          <Age></Age>
        </div>
        <div class="center">
          <Map></Map>
          <Line></Line>
        </div>
        <div class="right">111</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tourists from './components/tourists/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import { ref, onMounted } from 'vue'

let screen = ref()

const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: aquamarine;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    background-color: gray;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
      }
      .center {
        flex: 2;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
