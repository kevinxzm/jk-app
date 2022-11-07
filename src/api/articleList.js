import { instance } from "utils/request";

export function getArtList(x) {
  return instance({
    method: "get",
    url: "/mp/articles",
    params: x,
  });
}
