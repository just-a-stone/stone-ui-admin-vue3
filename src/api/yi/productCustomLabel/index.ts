import request from '@/config/axios'

export interface ProductCustomLabelVO {
  id: number
  productId: number
  labelValue: string
  sort: number
}

// 查询产品自定义标签列表
export const getProductCustomLabelPage = async (params) => {
  return await request.get({ url: `/yi/product-custom-label/page`, params })
}

// 查询产品自定义标签详情
export const getProductCustomLabel = async (id: number) => {
  return await request.get({ url: `/yi/product-custom-label/get?id=` + id })
}

// 新增产品自定义标签
export const createProductCustomLabel = async (data: ProductCustomLabelVO) => {
  return await request.post({ url: `/yi/product-custom-label/create`, data })
}

// 修改产品自定义标签
export const updateProductCustomLabel = async (data: ProductCustomLabelVO) => {
  return await request.put({ url: `/yi/product-custom-label/update`, data })
}

// 删除产品自定义标签
export const deleteProductCustomLabel = async (id: number) => {
  return await request.delete({ url: `/yi/product-custom-label/delete?id=` + id })
}

// 导出产品自定义标签 Excel
export const exportProductCustomLabel = async (params) => {
  return await request.download({ url: `/yi/product-custom-label/export-excel`, params })
}
