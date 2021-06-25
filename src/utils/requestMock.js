import axios from "axios";
import NProgress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'

const request = axios.create({
  baseURL: "/mock",
  timeout: 10000,
});

request.interceptors.request.use(function(config) {
  NProgress.start();
  // 在发送请求之前做些什么
  return config;
});

const messages = {
  401: "未授权",
  403: "禁止访问",
  404: "找不到资源",
  500: "服务器错误",
};

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // let message = '出现错误',请求成功，
    if (response.data.code === 200) {
      NProgress.done();
      // 请求成功并且功能成功对响应数据做点什么
      return response.data.data;
    } else {
      NProgress.done();
      // 请求成功，功能失败
      return Promise.reject(response.data.message || "未知错误,请联系赖军红");
    }
  },
  function(error) {
    /* 
    // 请求失败/响应失败，
    1.响应回来，但是失败的
      状态码：4开头和5开头
    2.响应没有回来，请求中断
      网络超时  断网
    */
    let message = "未知错误，请联系赖军红";
    NProgress.done();
    if (error.response) {
      message = messages[error.response.status];
    } else {
      if (error.message.indexOf("timeout") > -1) {
        message = "请求超时";
      } else if (error.message.indexOf("Network") > -1) {
        message = "网络连接断开，请检查网络";
      }
    }
    // 对响应错误做点什么
    console.dir(error);
    console.log(message);
    return Promise.reject(error);
  }
);

export default request;
