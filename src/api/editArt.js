import { instance } from "utils/request";

export function editArt(id,data, draft = false) {
  return instance({
    method: "put",
    url: `/mp/articles/${id}?draft=${draft}`,
    data:data,
  });
}
