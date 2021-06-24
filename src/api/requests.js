import request from '../utils/request'

export const reqGetCategoryType = ()=>{
  return request({
    method:'GET',
    url:'/product/getBaseCategoryList'
  })
}