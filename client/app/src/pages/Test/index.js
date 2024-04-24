import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Tabbar } from 'react-vant'
import { FriendsO, HomeO, Search, SettingO } from '@react-vant/icons'
import axios from 'axios'
import { request } from '@/utils'

import { Uploader } from 'react-vant'
import { uploadFileApi } from '@/apis/file'

const Test = () => {

  const DEMO_UPLOAD_API = 'https://nextjs-upload-service.vercel.app/api/upload'

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

    // const body = new FormData()
    // body.append('source', file)

    // const resp = await fetch(DEMO_UPLOAD_API, {
    //   method: 'POST',
    //   body,
    // })

    // const resp = await uploadFileApi(body)

    const formData = new FormData();
    formData.append('source', file);

    const resp = await axios.post('http://120.78.142.84:8080/oss/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    })


    // const json = await resp.json()
    // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
    // return json.image

    console.log(resp.data.id)
  }



  return (
    <Uploader defaultValue={demoData} upload={upload} />
  )
}


export default Test