import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Tabbar } from 'react-vant'
import axios from 'axios'
import { request } from '@/utils'


const Test = () => {
  const { data, setData } = useGetData();

  //封装请求数据的Hook
  function useGetData() {
    //获取接口数据渲染
    const [data, setData] = useState(null)

    useEffect(() => {
      //请求数据
      async function getData() {
        //axios请求数据
        //const res = await axios.get('http://127.0.0.1:4523/m1/4185540-0-default/pet/1')
        //const res = await axios.get('http://127.0.0.1:4523/m1/4182675-0-default/api/users/list')
        //const res = await axios.get('/api/users/userDetail?uid=1')
        const res = await axios.get('http://120.78.142.84:8080/api/users/userDetail?uid=1')
        
        //const res = await request.get('/users/userDetail?uid=1')
        //setData(res)
        setData(res.data)
      }
      getData()
    }, [])

    return {
      data,
      setData
    }
  }


  return (
    //使用自定义Hook
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>

      <Button onClick={() => console.log(data)}>点击</Button>
    </div>
  )
}


export default Test