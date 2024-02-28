<template>
  <div class="echart">
    <div class="top">
      <div class="left">
        <component1></component1>
      </div>
      <div class="center">
        111
        <!-- <component1></component1> -->
      </div>
      <div class="right">333</div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
import component1 from './../../components/echart/component1.vue'
</script>

<style scoped lang="scss">
.echart {
  width: 100%;
  .top {
    display: flex;
    height: 285px;
    .left {
      width: 40%;
      display: flex;
    }
    .center {
      width: 40%;
    }
    .right {
      width: 20%;
    }
  }
}
</style>
