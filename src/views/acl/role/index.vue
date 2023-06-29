<template>
  <el-card style="height: 80px; margin-bottom: 10px">
    <el-form :inline="true" class="form">
      <el-form-item label="角色名称">
        <el-input
          placeholder="请输入搜索角色名称"
          v-model="searchRole"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search">
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" size="default" icon="Plus" @click="addRole">
      添加角色
    </el-button>
    <Table :data="tableData">
      <el-table-column type="index" label="#" width="45" align="center" />
      <el-table-column prop="roleName" label="角色名称" width="150" />
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setPermission(row.id)"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.roleName}吗？`"
            width="250px"
            icon="Delete"
            @confirm="deleteRole(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
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
  <el-dialog
    v-model="dialogFormVisible"
    :title="form.id ? '更新' : '添加'"
    width="40%"
  >
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <powerDrawer ref="powerdrawer"></powerDrawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import powerDrawer from '@/components/drawer/powerDrawer.vue'
import { ElMessage } from 'element-plus'

import {
  reqRoleInfo,
  addOrUpdateRole,
  reqDeleteRole,
} from '@/api/acl/role/index'
import { Records, Role } from '@/api/acl/role/type'

let powerdrawer = ref()

let searchRole = ref<string>('')
let tableData = ref<Records>([])

let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let background = ref(true)
let total = ref<number>(0)
let pageSizes = [10, 20, 30, 40]

const dialogFormVisible = ref(false)
let form = reactive<Role>({
  id: '',
  roleName: '',
})

const addRole = () => {
  Object.assign(form, {
    id: '',
    roleName: '',
  })
  form.roleName = ''
  dialogFormVisible.value = true
}

const submit = async () => {
  console.log('form', form)
  let res = await addOrUpdateRole(form)
  if (res.code == 200) {
    dialogFormVisible.value = false
    ElMessage.success('保存成功')
    currentPage.value = form.id ? currentPage.value : 1
    getAllRole()
  } else {
    ElMessage.error('保存失败')
  }
}

const updateRole = (row: Role) => {
  dialogFormVisible.value = true
  console.log('row', row)
  Object.assign(form, row)
}

const handleSizeChange = (val: number) => {
  console.log('size', val)
  pageSize.value = val
  currentPage.value = 1
  getAllRole()
}
const handleCurrentChange = (val: number) => {
  console.log('page', val)
  currentPage.value = val
  getAllRole()
}

const search = () => {
  getAllRole()
  searchRole.value = ''
}

const reset = () => {
  searchRole.value = ''
  getAllRole()
}

const setPermission = (roleId: number) => {
  powerdrawer.value.drawer = true
  powerdrawer.value.getAllPermission(roleId)
}

const deleteRole = async (roleId: number) => {
  let res = await reqDeleteRole(roleId)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAllRole()
  } else {
    ElMessage.error('删除失败')
  }
}

const getAllRole = async () => {
  let res = await reqRoleInfo(
    currentPage.value,
    pageSize.value,
    searchRole.value,
  )
  if (res.code == 200) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}

onMounted(() => {
  getAllRole()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
