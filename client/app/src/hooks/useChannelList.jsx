//自定义hook：获取频道列表
import { useState, useEffect } from 'react'
import { getChannelApi } from '@/apis/topic'


const useChannelList = () => {
  //获取频道列表
  const [channelList, setChannelList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //1.封装函数，在函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelApi()
      setChannelList(res.data)
      setLoading(false);
    }
    //2.调用函数
    getChannelList()
  }, [])

  return { channelList, loading }
}

export default useChannelList