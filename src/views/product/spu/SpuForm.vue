<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="SPUParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU名称">
        <el-select v-model="SPUParams.tmId">
          <el-option
            v-for="item in allTrademark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU描述"
          v-model="SPUParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          action="/a/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性">
        <el-select
          :placeholder="
            unSelectSaleAttr.length
              ? `还未选择${unSelectSaleAttr.length}个`
              : '无'
          "
          v-model="saleAttrIdAndVal"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="saleAttrIdAndVal ? false : true"
          @click="addSaleAttr"
        >
          点击添加
        </el-button>
        <el-table :data="saleAttr" border style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="销售属性名"
            width="100"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template v-slot="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="(item, index) in row?.spuSaleAttrValueList"
                :key="item.id"
                class="mx-1"
                closable
                @close="row?.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item?.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.flag == true"
                placeholder="请输入属性值"
                v-model="row.saleAttrValue"
                size="small"
                style="width: 120px"
                @blur="changeBtn(row)"
              ></el-input>
              <el-button
                v-else
                type="primary"
                size="small"
                icon="Plus"
                @click="changeInput(row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template v-slot="scope">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="saleAttr.splice(scope.$index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="!saleAttr.length"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
const emit = defineEmits(['changeScreen'])

import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu/index'
import type {
  TradeMark,
  SpuData,
  AllTradeMark,
  SpuImage,
  SpuHasImage,
  SaleAttr,
  SaleAttrRes,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type'

let SPUParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})

let allTrademark = ref<TradeMark[]>([])
let imgList = ref<SpuImage[]>([])
let saleAttr = ref<SaleAttr[]>([])

let allSaleAttr = ref<HasSaleAttr[]>([
  {
    id: 1,
    name: '颜色',
  },
  {
    id: 2,
    name: '版本',
  },
  {
    id: 3,
    name: '尺码',
  },
])
let unSelectSaleAttr = computed(() => {
  let unSelect = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((i) => {
      return i.saleAttrName !== item.name
    })
  })
  return unSelect
})
let saleAttrIdAndVal = ref<string>('')

const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndVal.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndVal.value = ''
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

// 点击预览触发的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('uploadFile', uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const save = async () => {
  SPUParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  SPUParams.value.spuSaleAttrList = saleAttr.value
  let res = await reqAddOrUpdateSpu(SPUParams.value)
  if (res.code == 200) {
    ElMessage.success('成功')
    emit('changeScreen', {
      flag: 0,
      params: SPUParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.success('失败')
  }
}

const cancel = () => {
  emit('changeScreen', {
    flag: 0,
    params: 'update',
  })
}

const changeInput = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
const changeBtn = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row

  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('属性值不能为空')
    return
  }

  let newSaleAttrVal: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  row.spuSaleAttrValueList.push(newSaleAttrVal)
  row.flag = false
}

const initHasSpuData = async (row: SpuData) => {
  SPUParams.value = row
  let res1: SpuHasImage = await reqSpuImageList(row.id as number)
  let res2: SaleAttrRes = await reqSpuSaleAttr(row.id as number)
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = res2.data
}

const initAddSpu = (c3Id: number) => {
  Object.assign(SPUParams.value, {
    id: '',
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndVal.value = ''
  SPUParams.value.category3Id = c3Id
}

defineExpose({ initHasSpuData, initAddSpu })

onMounted(async () => {
  let res: AllTradeMark = await reqAllTrademark()
  allTrademark.value = res.data
})
</script>

<style scoped lang="scss"></style>
