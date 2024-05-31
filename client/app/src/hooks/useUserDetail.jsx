//自定义hook：获取用户信息、头像url
import { previewFileApi } from '@/apis/file'
import { getProfileAPI } from '@/apis/user'
import { useState, useEffect } from 'react'

const useUserDetail = (uid) => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    phone: '',
    userDetail: {
      id: null,
      uid: null,
      firstName: '',
      secondName: '',
      nickName: '',
      gender: '',
      birthdate: '',
      country: '',
      address: '',
      avatar: '',
      createTime: ''
    }
  })

  useEffect(() => {
    fetchUserProfile()
    fetchUserAvatar()
  }, [])

  useEffect(() => {
    fetchUserAvatar()
  }, [userProfile])

  const fetchUserProfile = async () => {
    //获取用户信息
    const userProfileRes = await getProfileAPI(uid)
    setUserProfile(userProfileRes.data)
    // console.log('用户详情：', userProfileRes.data)
  }

  const fetchUserAvatar = async () => {
    //获取用户头像url (设定一个默认头像，暂定为5)
    let avatarId = userProfile.userDetail.avatar === null ? 5 : parseInt(userProfile.userDetail.avatar)
    const userAvatarRes = await previewFileApi(avatarId)
    setAvatarUrl(userAvatarRes.data)
    // console.log('用户头像：', userAvatarRes.data)
  }

  return { userProfile, avatarUrl }
}

export default useUserDetail