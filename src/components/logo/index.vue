<template>
  <div class="logo">
    <img :src="logo.logo" alt="" />
    <p>{{ logo.title }}</p>
  </div>
</template>

<script setup lang="ts">
import logo from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 12px;
  img {
    height: 40px;
    width: 40px;
  }
  p {
    font-size: 20px;
    margin-left: 20px;
  }
}
</style>
