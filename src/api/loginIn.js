import { instance } from "utils/request";

export function loginIn(mobile, code) {
  return instance({
    method: "post",
    url: "/authorizations",
    data: {
      mobile: mobile,
      code: code,
    },
  });
}
