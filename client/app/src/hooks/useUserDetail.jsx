//自定义hook：获取用户信息、头像url
import { previewFileApi } from '@/apis/file'
import { getProfileAPI } from '@/apis/user'
import { useState, useEffect } from 'react'

const useUserDetail = (uid) => {
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
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    //获取用户信息
    // const uid = parseInt(topicDetail.authorUid)
    const userProfileRes = await getProfileAPI(uid)
    setUserProfile(userProfileRes.data)

    //获取用户头像url (设定一个默认头像，暂定为5)
    var avatarId = parseInt(userProfileRes.data.userDetail.avatar) === null ? 5 : parseInt(userProfileRes.data.userDetail.avatar)
    const userAvatarRes = await previewFileApi(avatarId)
    setAvatarUrl(userAvatarRes.data)

    // console.log('用户详情：', userProfileRes.data)
    // console.log('用户头像：', userAvatarRes.data)
  }

  return { userProfile, avatarUrl }
}

export default useUserDetail