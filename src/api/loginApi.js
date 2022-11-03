import { instance } from "utils/request";

export const loginIn = (mobile, code) => {
  return instance({
    method: "post",
    url: "/authorizations",
    data: {
      mobile: mobile,
      code: code,
    },
  });
};

export const getPerInfor =() => {
  return instance({
    method:'get',
    url:"/user/profile",
  })
}






