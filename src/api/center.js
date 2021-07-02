import request from "../utils/request";

export const reqOderList = (page,limit) => {
  return request({
    method: "GET",
    url: `/order/auth/${page}/${limit}`,
  });
};
