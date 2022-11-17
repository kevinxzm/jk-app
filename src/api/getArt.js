import { instance } from "utils/request";

export function getArt(id) {
  return instance({
    method: "get",
    url: `/mp/articles/${id}`,
  });
}



