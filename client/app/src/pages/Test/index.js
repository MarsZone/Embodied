import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Tabbar } from 'react-vant'
import { FriendsO, HomeO, Search, SettingO } from '@react-vant/icons'
import axios from 'axios'


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
        const res = await axios.get('http://127.0.0.1:4523/m1/4182675-0-default/api/users/list')
        //const res = await axios.post('http://127.0.0.1:4523/m1/4182675-0-default/api/users/register')
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