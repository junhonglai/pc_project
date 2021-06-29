import request from '../utils/request'

export const reqGoodsDetail = (id)=>{
  return request({
    method:'GET',
    url:`/item/${id}`
  })
}