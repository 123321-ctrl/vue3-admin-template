<template>
  <el-pagination
    class="pagination"
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[3, 5, 7, 9]"
    :background="background"
    layout="prev, pager, next, jumper, ->,sizes,total"
    :total="total"
    @size-change="(val:any) => emit('handleSizeChange', val)"
    @current-change="(val:any) => emit('currentChange', val)"
  />
</template>

<script setup lang="ts">
// import { ref } from 'vue'
defineProps(['background', 'total', 'pageSize', 'currentPage'])

const emit = defineEmits(['handleSizeChange', 'currentChange'])
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 20px;
}
</style>
