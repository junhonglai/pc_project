import request from "../utils/request";

// 注册用户
export const reqRegister = ({ phone, password, code }) => {
  return request({
    method: "POST",
    url: "/user/passport/register",
    data: {
      phone,
      password,
      code,
    },
  });
};
// 用户登录
export const reqLogin = ({ phone, password }) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
  });
};

// 获取验证码
export const reqCode = (phone) => {
  return request({
    method: "GET",
    url: `/user/passport/sendCode/${phone}`,
  });
};

// 退出登录
export const reqLogout = () => {
  return request({
    method: "GET",
    url: "/user/passport/logout",
  });
};
