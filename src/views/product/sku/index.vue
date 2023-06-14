<template>
  <el-card>
    <Table :data="tableData">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column
        prop="skuName"
        label="名称"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="图片">
        <template v-slot="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量（g）"></el-table-column>
      <el-table-column prop="price" label="价格（元）"></el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button
            type="primary"
            size="small"
            icon="View"
            title="查看SKU列表"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.spuName}吗？`"
            width="250px"
            icon="Delete"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </Table>
    <Pagination
      :background="background"
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :pageSizes="pageSizes"
      @handleSizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></Pagination>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import Table from '@/components/table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ref, onMounted } from 'vue'

import { reqSku, reqSaleSku, reqCancelSaleSku } from '@/api/product/sku/index'
import { Records, SKUResponseData, SkuData } from '@/api/product/sku/type'

let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let background = ref(true)
let total = ref<number>(0)
let pageSizes = [10, 20, 30, 40]

let tableData = ref<Records>([])

const handleSizeChange = (val: number) => {
  console.log('size', val)
  pageSize.value = val
  currentPage.value = 1
  getSkuData()
}
const handleCurrentChange = (val: number) => {
  console.log('page', val)
  currentPage.value = val
  getSkuData()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    // 上架状态
    let res = await reqCancelSaleSku(row.id)
    if (res.code == 200) {
      ElMessage.success('下架成功')
      getSkuData()
    } else {
      ElMessage.error('下架失败')
    }
  } else {
    let res = await reqSaleSku(row.id)
    if (res.code == 200) {
      ElMessage.success('上架成功')
      getSkuData()
    } else {
      ElMessage.error('上架失败')
    }
  }
}

const getSkuData = async () => {
  let res: SKUResponseData = await reqSku(currentPage.value, pageSize.value)
  tableData.value = res.data.records
  total.value = res.data.total
}

onMounted(() => {
  getSkuData()
})
</script>

<style scoped lang="scss"></style>
