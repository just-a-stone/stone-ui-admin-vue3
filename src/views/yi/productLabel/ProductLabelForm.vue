<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="产品id" prop="productId">
        <el-input v-model="formData.productId" placeholder="请输入产品id" />
      </el-form-item>
      <el-form-item label="标签key" prop="labelKey">
        <el-select v-model="formData.labelKey" placeholder="请选择标签">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.PRODUCT_LABEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <!-- <el-input v-model="formData.labelKey" placeholder="请输入标签key" /> -->
      </el-form-item>
      <!-- <el-form-item label="标签value" prop="labelValue"> -->
      <!-- <el-input v-model="formData.labelValue" placeholder="请输入标签value" /> -->
      <!-- </el-form-item> -->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as ProductLabelApi from '@/api/yi/productLabel'
import { DICT_TYPE, getStrDictOptions } from '@/utils/dict'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  productId: undefined,
  labelKey: undefined,
  labelValue: undefined,
  sort: undefined
})
const formRules = reactive({
  productId: [{ required: true, message: '产品id不能为空', trigger: 'blur' }],
  labelKey: [{ required: true, message: '标签key不能为空', trigger: 'blur' }]
  // labelValue: [{ required: true, message: '标签value不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await ProductLabelApi.getProductLabel(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return

  const aDict = getStrDictOptions(DICT_TYPE.PRODUCT_LABEL).find(
    (d) => d.value == formData.value.labelKey
  )
  formData.value.labelValue = aDict ? aDict.label : ''

  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as ProductLabelApi.ProductLabelVO
    if (formType.value === 'create') {
      await ProductLabelApi.createProductLabel(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProductLabelApi.updateProductLabel(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    productId: undefined,
    labelKey: undefined,
    labelValue: undefined,
    sort: undefined
  }
  formRef.value?.resetFields()
}
</script>
