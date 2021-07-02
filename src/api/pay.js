import request from "../utils/request";

// 获取订单
export const reqOrderList = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};

// 提交订单
export const reqSubmitOrder = ({
  tradeNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList,
}) => {
  return request({
    method: "POST",
    url: `/order/auth/submitOrder`,
    params: { tradeNo },
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    },
  });
};


// 查询订单支付状态
export const reqQueryPayStatus = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};
// 获取支付二维码
export const reqQrcode = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};