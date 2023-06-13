<template>
  <div>{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss"></style>
