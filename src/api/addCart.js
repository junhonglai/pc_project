import request from "../utils/request";

// 请求添加到购物车
export const reqAddCart = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

// 请求购物车列表
export const reqCartList = () => {
  return request({
    method: "GET",
    url: `/cart/cartList`,
  });
};

// 切换商品选中状态
export const reqChangeChecked = (skuID, isChecked) => {
  return request({
    method: "GET",
    url: `/cart/checkCart/${skuID}/${isChecked}`,
  });
};

// 改变商品数量
export const reqChangeNum = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

// 删除单个商品
export const reqDelete = (skuId) => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};
