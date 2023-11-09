import request from '@/config/axios'

export interface ProductLabelVO {
  id: number
  productId: number
  labelKey: string
  labelValue: string
  sort: number
}

// 查询产品标签列表
export const getProductLabelPage = async (params) => {
  return await request.get({ url: `/yi/product-label/page`, params })
}

// 查询产品标签详情
export const getProductLabel = async (id: number) => {
  return await request.get({ url: `/yi/product-label/get?id=` + id })
}

// 新增产品标签
export const createProductLabel = async (data: ProductLabelVO) => {
  return await request.post({ url: `/yi/product-label/create`, data })
}

// 修改产品标签
export const updateProductLabel = async (data: ProductLabelVO) => {
  return await request.put({ url: `/yi/product-label/update`, data })
}

// 删除产品标签
export const deleteProductLabel = async (id: number) => {
  return await request.delete({ url: `/yi/product-label/delete?id=` + id })
}

// 导出产品标签 Excel
export const exportProductLabel = async (params) => {
  return await request.download({ url: `/yi/product-label/export-excel`, params })
}
