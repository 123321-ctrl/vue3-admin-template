<template>
  <el-card class="CategoryCard">
    <el-form :inline="true" :model="form">
      <el-form-item label="一级分类">
        <el-select
          :disabled="screen !== 0"
          v-model="form.category1"
          @change="handler"
        >
          <el-option
            v-for="item in c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="screen !== 0"
          v-model="form.category2"
          @change="handler1"
        >
          <el-option
            v-for="item in c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="screen !== 0"
          v-model="form.category3"
          @change="handler2"
        >
          <el-option
            v-for="item in c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { CategoryResponse, Category } from '@/api/product/attr/type'

import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

defineProps(['screen'])

const form = reactive({
  category1: '',
  category2: '',
  category3: '',
})

const c1Arr = ref<Category[]>([])
const c2Arr = ref<Category[]>([])
const c3Arr = ref<Category[]>([])

const handler = async () => {
  form.category2 = ''
  c3Arr.value = []
  form.category3 = ''
  let res: CategoryResponse = await reqC2(form.category1)
  if (res.code == 200) {
    c2Arr.value = res.data
  }
}

const handler1 = async () => {
  form.category3 = ''
  let res: CategoryResponse = await reqC3(form.category2)
  if (res.code == 200) {
    c3Arr.value = res.data
  }
}

const handler2 = () => {
  categoryStore.changeForm(form)
}

onMounted(() => {
  reqC1().then((res: CategoryResponse) => {
    c1Arr.value = res.data
  })
})
</script>

<style scoped lang="scss">
.CategoryCard {
  margin-bottom: 20px;
}
</style>
