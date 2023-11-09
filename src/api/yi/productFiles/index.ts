import request from '@/config/axios'

export interface ProductFilesVO {
  id: number
  productId: number
  fileName: string
  fileUrl: string
  sort: number
}

// 查询产品资料(文件)列表
export const getProductFilesPage = async (params) => {
  return await request.get({ url: `/yi/product-files/page`, params })
}

// 查询产品资料(文件)详情
export const getProductFiles = async (id: number) => {
  return await request.get({ url: `/yi/product-files/get?id=` + id })
}

// 新增产品资料(文件)
export const createProductFiles = async (data: ProductFilesVO) => {
  return await request.post({ url: `/yi/product-files/create`, data })
}

// 修改产品资料(文件)
export const updateProductFiles = async (data: ProductFilesVO) => {
  return await request.put({ url: `/yi/product-files/update`, data })
}

// 删除产品资料(文件)
export const deleteProductFiles = async (id: number) => {
  return await request.delete({ url: `/yi/product-files/delete?id=` + id })
}

// 导出产品资料(文件) Excel
export const exportProductFiles = async (params) => {
  return await request.download({ url: `/yi/product-files/export-excel`, params })
}
