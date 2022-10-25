import axios from "axios";

export const instance = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
});

instance.interceptors.request.use((x) => {
  return x;
});

instance.interceptors.response.use((x) => {
  return x.data;
});
