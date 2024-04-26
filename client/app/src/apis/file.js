//文件上传相关接口

import { request } from "@/utils";

//1.上传文件
export function uploadFileApi(files) {
  return request({
    url: '/oss/upload',
    method: 'POST',
    data: files
  })
}

//2.预览文件URL
export function previewFileApi(fid) {
  return request({
    url: '/oss/preview',
    method: 'GET',
    params: { fid }
  })
}