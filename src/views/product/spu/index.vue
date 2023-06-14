<template>
  <Category :screen="screen" />
  <el-card>
    <div v-show="screen == 0">
      <el-button
        type="primary"
        size="default"
        :disabled="!categoryStore.categoryForm?.category3"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <Table :data="tableData">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="spuName" label="SPU名称" width="200" />
        <el-table-column prop="description" label="SPU描述"></el-table-column>
        <el-table-column label="操作" width="250">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="修改SPU"
              @click="updateSpu(row)"
            ></el-button>
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
    </div>
    <SpuForm
      ref="spu"
      v-show="screen == 1"
      @changeScreen="changeScreen"
    ></SpuForm>
    <SkuForm v-show="screen == 2"></SkuForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import Category from '@/components/Category/index.vue'
import Table from '@/components/table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import SkuForm from './SkuForm.vue'
import SpuForm from './SpuForm.vue'

import { reqSpu } from '@/api/product/spu'
import { SPUResponseData, Records, SpuData } from '@/api/product/spu/type'

import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

let screen = ref<number>(0) //0:显示已有SPU 1：添加或修改已有SPU 2：添加SKU结构
let spu = ref<any>()

let tableData = ref<Records>([])

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let background = ref(true)
let total = ref<number>(0)
let pageSizes = [3, 5, 7, 9]
let category3Id = ref<string | undefined>('')

watch(
  () => categoryStore.categoryForm?.category3,
  (newVal) => {
    category3Id.value = newVal
    tableData.value = []
    if (newVal) {
      getSpuList()
    }
  },
)

const handleSizeChange = (val: number) => {
  console.log('size', val)
  pageSize.value = val
  currentPage.value = 1
  getSpuList()
}
const handleCurrentChange = (val: number) => {
  console.log('page', val)
  currentPage.value = val
  getSpuList()
}

const getSpuList = async () => {
  const res: SPUResponseData = await reqSpu(
    currentPage.value,
    pageSize.value,
    category3Id.value,
  )
  if (res.code == 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

const addSpu = () => {
  screen.value = 1
  spu.value.initAddSpu(category3Id.value)
}

const updateSpu = (row: SpuData) => {
  screen.value = 1
  // 获取子组件的实例vc，这里子组件用的是v-show，模板已经存在
  // 这里主要是通过子组件发请求
  spu.value.initHasSpuData(row)
}

const changeScreen = (obj: any) => {
  screen.value = obj.flag
  if (obj.params === 'add') {
    currentPage.value = 1
  }
  getSpuList()
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
