import axios from "axios";
import { ElMessage } from "element-plus";
import Notify from "./notify";

const request = axios.create({
  baseURL: "/api",
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
  }
});

request.interceptors.request.use(
  config => {
    Notify.showFullLoading();
    return config;
  },
  error => {
    ElMessage.error("请求超时!");
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      ElMessage.error(response.data.message || "请求失败!");
      return Promise.reject(new Error(response.data.message || "Error"));
    }
    Notify.hideFullLoading();
    return response.data;
  },
  error => {
    ElMessage.error("网络异常,请稍后重试!");
    Notify.hideFullLoading();
    return Promise.reject(error);
  }
);

export default request;
