import request from "../utils/request";

export const reqGoodsList = (data) => {
  return request({
    method: "POST",
    url: "/list",
    data,
  });
};
