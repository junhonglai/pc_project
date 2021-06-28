import request from '../utils/request'

export const reqGoodsDetail = ()=>{
  return request({
    method:'GET',
    url:`/item/${id}`
  })
}