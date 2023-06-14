<template>
  <Category :screen="screen" />
  <el-card>
    <div v-show="screen == 0">
      <el-button
        type="primary"
        size="default"
        :disabled="!categoryStore.categoryForm?.category3"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <Table :data="tableData">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="120" />
        <el-table-column label="属性值名称">
          <template v-slot="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.attrName}吗？`"
              width="250px"
              icon="Delete"
              @confirm="removeAttr(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
    </div>
    <div v-show="screen == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrForm.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!attrForm.attrName"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrForm.attrValueList">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template v-slot="{ row, $index }">
            <el-input
              :ref="(vc:any)=>inputArr[$index] = vc"
              placeholder="请输入属性值"
              v-model="row.valueName"
              :autofocus="true"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template v-slot="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="deleteAttrValue(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="!attrForm.attrValueList.length"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import Table from '@/components/table/index.vue'
import { reactive, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, deleteAttrs } from '@/api/product/attr'
import { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

let tableData = ref<Attr[]>([])
let screen = ref<number>(0)
let attrForm = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

let inputArr = ref<any>([])

watch(
  () => categoryStore.categoryForm?.category3,
  (newVal) => {
    tableData.value = []
    if (newVal) {
      getAttrList()
    }
  },
)

const getAttrList = async () => {
  if (categoryStore.categoryForm) {
    const { category1, category2, category3 } = categoryStore.categoryForm
    let res: AttrResponseData = await reqAttr(category1, category2, category3)
    if (res.code == 200) {
      tableData.value = res.data
    }
  }
}

const addAttr = async () => {
  screen.value = 1
  // 清空attrForm
  Object.assign(attrForm, {
    id: undefined,
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
}

const addAttrValue = () => {
  attrForm.attrValueList.push({
    valueName: '',
  })
  nextTick(() => {
    inputArr.value[attrForm.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  if (categoryStore.categoryForm) {
    attrForm.categoryId = categoryStore.categoryForm.category3
  }
  let res = await reqAddOrUpdateAttr(attrForm)
  if (res.code == 200) {
    screen.value = 0
    getAttrList()
    ElMessage.success('保存成功')
  } else {
    ElMessage.error('保存失败')
  }
}

const deleteAttrValue = (_row: AttrValue, index: number) => {
  console.log('index', index)
  attrForm.attrValueList.splice(index, 1)
}

let removeAttr = async (id: number) => {
  let res = await deleteAttrs(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAttrList()
  } else {
    ElMessage.success('删除失败')
  }
}

const updateAttr = (row: Attr) => {
  screen.value = 1
  // 这里注意：Object.assign()是浅拷贝，当修改一个引用变量时会是另一个变量也改变
  // 要换成深拷贝
  Object.assign(attrForm, JSON.parse(JSON.stringify(row)))
}

const cancel = () => {
  screen.value = 0
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
