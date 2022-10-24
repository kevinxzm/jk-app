import axios from "axios";

const instance = axios.create({ baseURL: "http://geek.itheima.net/v1_0" });

instance.interceptors.response.use((x) => {
  console.log(x);
  return x.data;
});

async function loginIn() {
  const result = await instance({
    method: "post",
    url: "/authorizations",
    data: { mobile: "13911111111", code: "246810" },
  });
  console.log(result);
}

loginIn();
