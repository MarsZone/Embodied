//自定义hook：获取用户数据
import { previewFileApi } from '@/apis/file'
import { getProfileAPI } from '@/apis/user'
import { useState, useEffect } from 'react'

const useUserDetail = (uid) => {
  const [userDetail, setUserDetail] = useState()

  useEffect(() => {
    //根据用户id获取用户数据
    const getUserData = async (uid) => {
      //获取用户详细信息
      const getProfileRes = await getProfileAPI(uid)
      //获取头像链接
      const getAvatarUrlRes = await previewFileApi(getProfileRes.data.avatar)

      //合并用户数据
      const userData = {
        ...getProfileRes.data,
        avatarUrl: getAvatarUrlRes
      }
      setUserDetail(userData)
    }

    getUserData()
  }, [uid])

  return userDetail
}

export default useUserDetail