import React from 'react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { request } from '@/utils'
import { uploadFileApi } from '@/apis/file'
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

    // try {
    //   const body = new FormData()
    //   body.append('source', file)
    //   const resp = await fetch(DEMO_UPLOAD_API, {
    //     method: 'POST',
    //     body,
    //   })

    //   const json = await resp.json()
    //   const json = {url:'https://img.yzcdn.cn/vant/sand.jpg'}
    //   // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
    //   return json.image
    // } catch (error) {
    //   return { url: `demo_path/${file.name}` }
    // }

    const files = new FormData();
    files.append('files', file);

    fetch('http://120.78.142.84:8080/oss/upload', {
      method: 'POST',
      body: files
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('上传文件失败');
        }
        return response.json();
      })
      .then(data => {
        alert('文件上传成功');
        console.log('服务器返回的数据:', data);
      })
      .catch(error => {
        console.error('上传文件出错:', error);
      });

    //const resp = uploadFileApi(files)

    // const json = { url: 'https://img.yzcdn.cn/vant/sand.jpg' }
    // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
    // return json.image
  }

  return (
    <Uploader defaultValue={demoData} upload={upload} />



  )
}


export default Test