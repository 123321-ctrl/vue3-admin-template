<template>
  <el-card style="height: 80px; margin-bottom: 10px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入搜索用户名"
          v-model="searchName"
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
    <el-button type="primary" size="default" @click="addUser">添加</el-button>
    <el-button
      type="primary"
      size="default"
      :disabled="!deleteIdList"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>
    <Table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" />
      <el-table-column type="index" label="#" width="45" align="center" />
      <el-table-column
        prop="username"
        label="用户名字"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="用户名称"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}吗？`"
            width="250px"
            icon="Delete"
            @confirm="deleteUser(row.id)"
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
  <Drawer ref="drawer" :drawerTitle="drawerTitle"></Drawer>
  <roleDrawer ref="roledrawer" @getAllUser="getAllUser"></roleDrawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Drawer from '@/components/drawer/index.vue'
import roleDrawer from '@/components/drawer/roleDrawer.vue'
import { ElMessage } from 'element-plus'

import { reqUserInfo, deleterUser, deleterUserList } from '@/api/acl/user'
import { AllUserRes, Records, user } from '@/api/acl/user/type'

let searchName = ref<string>('')
let tableData = ref<Records>([])
let deleteIdList = ref<user[]>([])

let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let background = ref(true)
let total = ref<number>(0)
let pageSizes = [5, 7, 9, 11]

const drawer = ref<any>()
const roledrawer = ref<any>()
const drawerTitle = ref<string>('')

const handleSizeChange = (val: number) => {
  console.log('size', val)
  pageSize.value = val
  currentPage.value = 1
  getAllUser()
}
const handleCurrentChange = (val: number) => {
  console.log('page', val)
  currentPage.value = val
  getAllUser()
}

const search = () => {
  getAllUser()
  searchName.value = ''
}

const reset = () => {
  searchName.value = ''
  getAllUser()
}

const setRole = (row: user) => {
  roledrawer.value.drawer = true
  roledrawer.value.getUserInfo(row)
}

const addUser = () => {
  drawer.value.drawer = true
  drawerTitle.value = '添加用户'
  drawer.value.init()
  currentPage.value = 1
}

const editUser = async (row: user) => {
  drawer.value.drawer = true
  drawerTitle.value = '修改用户'
  drawer.value.updateUser(row)
}

const deleteUser = async (userId: number) => {
  let res = await deleterUser(userId)
  if ((res.code = 200)) {
    ElMessage.success('删除成功')
    getAllUser()
  } else {
    ElMessage.error('删除失败')
  }
}

const handleSelectionChange = async (val: user[]) => {
  deleteIdList.value = val
}

const deleteSelectUser = async () => {
  let idList = deleteIdList.value.map((item) => {
    return item.id
  })
  console.log(idList)
  let res = await deleterUserList(idList as number[])
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAllUser()
  } else {
    ElMessage.error('删除失败')
  }
}

const getAllUser = async () => {
  let res: AllUserRes = await reqUserInfo(
    currentPage.value,
    pageSize.value,
    searchName.value,
  )
  if (res.code == 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

onMounted(() => {
  getAllUser()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
