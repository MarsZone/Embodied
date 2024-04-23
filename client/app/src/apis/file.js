//文件上传相关接口

import { request } from "@/utils";

//1.上传文件
export function uploadFileApi(file){
  return request({
    url: '/oss/upload',
    method: 'POST',
    data: file
  })
}

//2.预览文件
export function previewFileApi(fid){
  return request({
    url: '/oss/preview',
    method: 'GET',
    fid
  })
}