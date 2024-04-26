import React from 'react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { request } from '@/utils'
import { previewFileApi, uploadFileApi } from '@/apis/file'
import { Uploader } from 'react-vant'
import FileUpload from '@/components/fileUpload'

const Test = () => {

  const DEMO_UPLOAD_API = 'http://120.78.142.84:8080/oss/upload'
  // const DEMO_UPLOAD_API = 'https://nextjs-upload-service.vercel.app/api/upload'


  const demoData = [
    {
      url: 'https://img.yzcdn.cn/vant/sand.jpg',
      filename: '图片名称',
    },
    {
      url: 'https://img.yzcdn.cn/vant/tree.jpg',
      filename: '图片名称',
    },
  ]

  const upload = async (file) => {

    const files = new FormData();
    files.append('files', file);

    var imgId = ''

    // const uploadResp = await fetch('http://120.78.142.84:8080/oss/upload', {
    //   method: 'POST',
    //   body: files
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('上传文件失败');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     alert('文件上传成功');
    //     console.log('服务器返回的数据:', data);
    //     imgId = data.data[0].id
    //     console.log(imgId)
    //   })
    //   .catch(error => {
    //     console.error('上传文件出错:', error);
    //   });

    const uploadResp = await uploadFileApi(files)
      .then(data => {
        imgId = data.data[0].id
      })

    imgId = parseInt(imgId)
    const getUrlResp = await previewFileApi(imgId)
    console.log('获取url接口返回：', getUrlResp.data)

    return getUrlResp.data
  }

  return (
    <Uploader defaultValue={demoData} upload={upload} />

  )
}


export default Test