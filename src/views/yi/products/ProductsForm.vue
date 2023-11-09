<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <!-- <el-form-item label="发行机构ID" prop="orgId">
        <el-input v-model="formData.orgId" placeholder="请输入发行机构ID" />
      </el-form-item> -->
      <el-form-item label="机构名称" prop="orgName">
        <el-autocomplete
          v-model="formData.orgName"
          value-key="orgName"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="true"
          clearable
          placeholder="请输入机构名称"
          @select="handleSelectOrgs"
        />
        <!-- <el-input v-model="formData.orgName" placeholder="请输入机构名称" /> -->
      </el-form-item>
      <!-- <el-form-item label="机构图标链接" prop="orgIconUrl">
        <el-input v-model="formData.orgIconUrl" placeholder="请输入机构图标链接" />
      </el-form-item> -->
      <el-form-item label="产品类型" prop="productType">
        <el-radio-group v-model="formData.productType">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.PRODUCT_TYPE)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="formData.productName" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品期限(月)" prop="productTermMonth">
        <el-input v-model="formData.productTermMonth" placeholder="请输入产品期限(月)" />
      </el-form-item>
      <el-form-item label="投资领域" prop="investmentArea">
        <el-select v-model="formData.investmentArea" placeholder="请选择投资领域">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INVESTMENT_AREA)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="大小配比" prop="dxpb">
        <el-radio-group v-model="formData.dxpb">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.DXPB)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="安全评级(1-5)" prop="securityRate">
        <el-input-number
          v-model="formData.securityRate"
          placeholder="请输入安全评级"
          min="0"
          max="5"
          :step="0.5"
        />
      </el-form-item>
      <el-form-item label="发行进度" prop="releaseStatus">
        <el-radio-group v-model="formData.releaseStatus">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.RELEASE_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发行进度更新日期" prop="releaseStatusUpdateAt">
        <el-date-picker
          v-model="formData.releaseStatusUpdateAt"
          type="date"
          value-format="x"
          placeholder="选择发行进度更新日期"
        />
      </el-form-item>
      <el-form-item label="在售状态" prop="saleStatus">
        <el-radio-group v-model="formData.saleStatus">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.SALE_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="募集规模" prop="fundraisingSize">
        <el-input v-model="formData.fundraisingSize" placeholder="示例：7亿" />
      </el-form-item>
      <el-form-item label="付息方式" prop="interestPaymentMethod">
        <el-select v-model="formData.interestPaymentMethod" placeholder="请选择付息方式">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INTEREST_PAYMENT_METHOD)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投资区域-地区" prop="investRegionCity">
        <!-- <el-input v-model="formData.investRegionProvince" placeholder="请选择" /> -->
        <el-cascader
          v-model="formData.investRegionCity"
          :options="provinceCityData"
          :props="props"
          @change="handleChange"
        />
      </el-form-item>
      <!-- <el-form-item label="投资区域-市" prop="investRegionCity">
        <el-input v-model="formData.investRegionCity" placeholder="请输入投资区域-市" />
      </el-form-item> -->
      <el-form-item label="起售日期" prop="saleStartAt">
        <el-date-picker
          v-model="formData.saleStartAt"
          type="date"
          value-format="x"
          placeholder="选择起售日期"
        />
      </el-form-item>
      <el-form-item label="收益类型" prop="incomeTye">
        <el-radio-group v-model="formData.incomeTye">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.INCOME_TYPE)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="抵/质押率" prop="mortgagePledgeRate">
        <el-input-number v-model="formData.mortgagePledgeRate" placeholder="示例:13.2" />
      </el-form-item>
      <el-form-item label="补充说明" prop="supplementaryNotes">
        <el-input
          v-model="formData.supplementaryNotes"
          type="textarea"
          placeholder="请输入补充说明"
        />
      </el-form-item>
      <el-form-item label="融资方" prop="financialInstitution">
        <el-input
          v-model="formData.financialInstitution"
          type="textarea"
          placeholder="请输入融资方"
        />
      </el-form-item>
      <el-form-item label="资金用途" prop="howToUse">
        <el-input v-model="formData.howToUse" type="textarea" placeholder="请输入资金用途" />
      </el-form-item>
      <el-form-item label="还款来源" prop="repaymentSource">
        <el-input v-model="formData.repaymentSource" type="textarea" placeholder="请输入还款来源" />
      </el-form-item>
      <el-form-item label="风控措施" prop="riskControlMeasures">
        <el-input
          v-model="formData.riskControlMeasures"
          type="textarea"
          placeholder="请输入风控措施"
        />
      </el-form-item>
      <el-form-item label="项目亮点" prop="projectHighlights">
        <el-input
          v-model="formData.projectHighlights"
          type="textarea"
          placeholder="请输入项目亮点"
        />
      </el-form-item>
      <el-form-item label="募集账号-名称" prop="raiseAccountName">
        <el-input v-model="formData.raiseAccountName" placeholder="请输入募集账号-名称" />
      </el-form-item>
      <el-form-item label="募集账号-开户行" prop="raiseAccountBankName">
        <el-input v-model="formData.raiseAccountBankName" placeholder="请输入募集账号-开户行" />
      </el-form-item>
      <el-form-item label="募集账号-账号" prop="raiseAccountNo">
        <el-input v-model="formData.raiseAccountNo" placeholder="请输入募集账号-账号" />
      </el-form-item>
      <el-form-item label="募集账号-备注" prop="raiseAccountRemark">
        <el-input v-model="formData.raiseAccountRemark" placeholder="请输入募集账号-备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE, getStrDictOptions } from '@/utils/dict'
import * as ProductsApi from '@/api/yi/products'
import { getOrgsPage } from '@/api/yi/orgs'
import * as AreaApi from '@/api/system/area'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  orgId: undefined,
  orgName: undefined,
  orgIconUrl: undefined,
  productType: undefined,
  productName: undefined,
  productTermMonth: undefined,
  investmentArea: undefined,
  dxpb: undefined,
  securityRate: undefined,
  releaseStatus: undefined,
  releaseStatusUpdateAt: undefined,
  saleStatus: undefined,
  fundraisingSize: undefined,
  interestPaymentMethod: undefined,
  investRegionProvince: undefined,
  investRegionCity: undefined,
  saleStartAt: undefined,
  incomeTye: undefined,
  mortgagePledgeRate: undefined,
  supplementaryNotes: undefined,
  financialInstitution: undefined,
  howToUse: undefined,
  repaymentSource: undefined,
  riskControlMeasures: undefined,
  projectHighlights: undefined,
  raiseAccountName: undefined,
  raiseAccountBankName: undefined,
  raiseAccountNo: undefined,
  raiseAccountRemark: undefined
})
const formRules = reactive({
  orgId: [{ required: true, message: '发行机构ID不能为空', trigger: 'blur' }],
  orgName: [{ required: true, message: '机构名称不能为空', trigger: 'blur' }],
  orgIconUrl: [{ required: true, message: '机构图标链接不能为空', trigger: 'blur' }]
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
      formData.value = await ProductsApi.getProducts(id)
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
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as ProductsApi.ProductsVO
    if (formType.value === 'create') {
      await ProductsApi.createProducts(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProductsApi.updateProducts(data)
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
    orgId: undefined,
    orgName: undefined,
    orgIconUrl: undefined,
    productType: undefined,
    productName: undefined,
    productTermMonth: undefined,
    investmentArea: undefined,
    dxpb: undefined,
    securityRate: undefined,
    releaseStatus: undefined,
    releaseStatusUpdateAt: undefined,
    saleStatus: undefined,
    fundraisingSize: undefined,
    interestPaymentMethod: undefined,
    investRegionProvince: undefined,
    investRegionCity: undefined,
    saleStartAt: undefined,
    incomeTye: undefined,
    mortgagePledgeRate: undefined,
    supplementaryNotes: undefined,
    financialInstitution: undefined,
    howToUse: undefined,
    repaymentSource: undefined,
    riskControlMeasures: undefined,
    projectHighlights: undefined,
    raiseAccountName: undefined,
    raiseAccountBankName: undefined,
    raiseAccountNo: undefined,
    raiseAccountRemark: undefined
  }
  formRef.value?.resetFields()
}

const dataOrgs = ref([])
const searchOrgsForm = ref({
  pageNo: 1,
  pageSize: 5,
  orgName: ''
})

// 加载机构数据
const handleSupport = async (name: string) => {
  try {
    searchOrgsForm.value.orgName = name ? name : ''
    const data = await getOrgsPage(searchOrgsForm)
    dataOrgs.value = data.list
    return dataOrgs.value
  } catch (error) {
    console.log(error)
  }
}

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  const results = await handleSupport(queryString)

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}

const handleSelectOrgs = (item: Record<string, any>) => {
  console.debug(item)
  formData.value.orgId = item.id
  formData.value.orgName = item.orgName
  formData.value.orgIconUrl = item.iconUrl
}

// 省市数据
const provinceCityData = ref([])

const getProvinceCityData = async () => {
  const data = await AreaApi.getAreaTree()
  provinceCityData.value = data.map((childOne) => {
    childOne.id += ''
    childOne.children = childOne.children.map((childTwo) => {
      childTwo.id += ''
      const { children, ...rest } = childTwo
      return rest
    })
    return childOne
  })
}

const props = {
  expandTrigger: 'hover' as const,
  value: 'id',
  label: 'name'
}

const handleChange = (value) => {
  console.debug(value)
  formData.value.investRegionProvince = value[0]
  formData.value.investRegionCity = value[1]
}

onMounted(() => {
  getProvinceCityData()
})
</script>
