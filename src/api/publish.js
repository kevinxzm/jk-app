import { instance } from "utils/request";

export function publishArt(data, draft = false) {
  return instance({
    method: "post",
    url: `/mp/articles?draft=${draft}`,
    data: data,
  });
}
