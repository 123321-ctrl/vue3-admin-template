<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item :index="item.path" v-if="!item.children && !item.meta.hidden">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-if="item.children && !item.meta.hidden">
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <!-- 递归组件 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'

defineProps(['menuList'])

// let $router = useRouter()
// const goRoute = (item: any) => {
//   //   console.log('item', item)
//   $router.push(item.index)
// }
</script>

// 递归组件必须要有名字
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss">
::v-deep .el-menu-item {
  border-color: none;
}
</style>
