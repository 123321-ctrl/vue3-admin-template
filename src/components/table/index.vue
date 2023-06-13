<template>
  <el-table :data="data" border style="width: 100%; margin-top: 10px">
    <slot></slot>
  </el-table>
</template>

<script setup lang="ts">
defineProps(['data'])
// const emit = defineEmits(['updateAttr', 'removeAttr'])
</script>

<style scoped lang="scss"></style>
