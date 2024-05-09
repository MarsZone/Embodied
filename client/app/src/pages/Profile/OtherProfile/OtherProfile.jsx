import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Image, NavBar, Toast, Flex, Tabs, Cell, Dialog, Space, Typography, Button, } from 'react-vant'
import useUserDetail from '@/hooks/useUserDetail'
import './OtherProfile.scoped.scss'
import { checkFollowAPI, followAPI, getMyFriendsAPI, unFollowAPI } from '@/apis/user'

const OtherProfile = () => {

  const navigate = useNavigate()

  const { userId } = useParams()
  const { userProfile, avatarUrl } = useUserDetail(16)
  console.log('用户详情：', userProfile, '头像url：', avatarUrl)

  const username = userProfile.userName
  const userImgUrl = 'https://img.yzcdn.cn/vant/cat.jpeg'

  const [isFollow, setIsFollow] = useState()
  const [isFriend, setIsFriend] = useState()

  //初始化
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    //查看是否关注
    const checkFollowRes = await checkFollowAPI(userId)
    checkFollowRes.data === true ? setIsFollow(true) : setIsFollow(false)

    //查看是否好友
    const getFriendsRes = await getMyFriendsAPI()
  }

  //加关注(取消关注)
  const onClickFollow = async () => {
    if (isFollow) {
      const unFollowRes = await unFollowAPI(userId)
      if (unFollowRes.code === 20000) {
        console.log('取消关注成功')
        setIsFollow(false)
      } else {
        console.log('取消关注失败')
      }
    } else {
      const followRes = await followAPI(userId)
      if (followRes.code === 20000) {
        console.log('关注成功')
        setIsFollow(true)
      } else {
        console.log('关注失败')
      }
    }


    console.log()
  }

  //加好友(取消好友)
  const onClickFriend = () => {

  }

  //发消息
  const onClickMessage = () => {

  }

  return (
    <div className="layout">
      <NavBar
        className='nav-bar'
        title={`profile of ${username}`}
      />

      {/* <div className="container"> */}

      <div className='top-layout'>
        <div className='profile-img'>
          <Image round fit='cover' src={userImgUrl} />
        </div>
        <div className='profile-username'>{username}</div>

        <div className='profile-social'>
          <Space
            align="center"
            gap={40}>
            <Typography.Link>
              关注<div className='count'>111</div>
            </Typography.Link>
            <Typography.Link>
              粉丝<div className='count'>222</div>
            </Typography.Link>
            <Typography.Link>
              获赞<div className='count'>333</div>
            </Typography.Link>
          </Space>
        </div>

        <div className='function-button'>
          {
            isFollow ? (
              <Button
                onClick={onClickFollow} type='primary' plain round >
                已关注
              </Button>
            ) : (
              <Button
                onClick={onClickFollow} type='primary' plain round >
                关注
              </Button>
            )
          }

          <Button
            onClick={onClickFriend} type='primary' plain round>
            加好友
          </Button>
          <Button
            onClick={onClickMessage} type='primary' plain round>
            发消息
          </Button>
        </div>

      </div>

      <div className='bottom-layout'>

      </div>
    </div>
  )
}

export default OtherProfile