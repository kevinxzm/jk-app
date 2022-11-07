import { instance } from "utils/request";

export function getChannel() {
  return instance({
    method: "get",
    url: "/channels",
  });
}
