import type { UploadType } from "@/types";
import { http, API_URL } from "@/utils/request";
const PREFIX = API_URL.UPLOAD;
/* 上传接口 */
export const urls = {
  "upload&post": `${PREFIX}/upload`,
  "upload&get": `${PREFIX}/upload`,
  "download&get": `${PREFIX}/download`,
  "delete&get": `${PREFIX}/delete`,
};

export function objectUploadPost(data: FormData) {
  return http<UploadType, true>({
    url: `${PREFIX}/upload`,
    method: "post",
    data,
  });
}
