import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserId as _getUserId } from '@/utils'
import OtherProfile from './OtherProfile/OtherProfile'
import MyProfile from './MyProfile/MyProfile'

const Profile = () => {
  //从url参数中获取用户名
  const { userId } = useParams()
  const [loginUserId, setLoginUserId] = useState(_getUserId)

  return (
    <div>
      {userId === loginUserId ? (
        <MyProfile userId={loginUserId}></MyProfile>
      ) : (
        <OtherProfile userId={userId}></OtherProfile>
      )
      }
    </div>
  )
}

export default Profile