import axios from "axios";
import { getToken } from "utils/token.js";
import { createBrowserHistory } from "history";
import { removeToken } from "utils/token.js";
var history = createBrowserHistory();

export const instance = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
});

instance.interceptors.request.use((x) => {
  // 加header头的时候看x。
  var token = getToken();
  token && (x.headers.Authorization = "Bearer " + token);
  return x;
});

instance.interceptors.response.use(
  (x) => {
    return x.data;
  },
  (x) => {
    if (x.response.status == 401) {
      removeToken();
      window.location.pathname = "/login";
      return Promise.reject(x);
    }
  }
);
