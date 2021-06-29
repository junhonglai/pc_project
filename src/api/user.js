import request from "../utils/request";

// 注册用户
export const reqRegister = (data) => {
  return request({
    method: "POST",
    url: "/user/passport/register",
    data,
  });
};
// 用户登录
export const reqLogin = (data) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data,
  });
};