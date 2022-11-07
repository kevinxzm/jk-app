import { instance } from "utils/request";

export function deleteArt(id) {
  return instance({
    method: "delete",
    url: `/mp/articles/${id}`,
  });
}
