import request from "../utils/request";

export const reqOrderList = () => {
  return request({
    method:'GET',
    url:'/order/auth/trade'
  })
};
