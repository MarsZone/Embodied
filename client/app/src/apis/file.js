//文件上传相关接口
import { request } from "@/utils";
import logo from '@/assets/logo-embodied.png'

//1.上传文件
export function uploadFileApi(files) {
  //创建一个 FormData 对象
  const formData = new FormData()

  //假设 files 是一个文件对象或文件对象数组
  if (files instanceof File) {
    formData.append('files', files);
  } else if (Array.isArray(files)) {
    files.forEach((file, index) => {
      formData.append('files', file);
    });
  }

  return request({
    url: '/oss/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//2.预览文件URL
export function previewFileApi(fid) {
  //fid是否为空
  if (!fid || fid === '') {
    //返回默认图片
    return Promise.resolve({ data: logo })
  } else {
    return request({
      url: '/oss/preview',
      method: 'GET',
      params: { fid }
    })
  }
}


// export function previewFileApi(fid) {
//   return request({
//     url: '/oss/preview',
//     method: 'GET',
//     params: { fid }
//   })
// }