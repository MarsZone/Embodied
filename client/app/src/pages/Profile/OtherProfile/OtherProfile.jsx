import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Image, Toast, Button } from 'react-vant'
import { ChatO } from '@react-vant/icons'
import useUserDetail from '@/hooks/useUserDetail'
import './OtherProfile.scoped.scss'
import { checkFollowAPI, checkFriendAPI, followAPI, unFollowAPI } from '@/apis/user'

const OtherProfile = () => {
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
    console.log('是否关注：', checkFollowRes.data)
    checkFollowRes.data === 'true' ? setIsFollow(true) : setIsFollow(false)

    //查看是否好友
    const checkFriendRes = await checkFriendAPI(userId)
    console.log('是否好友：', checkFriendRes.data)
    checkFriendRes.data === 'true' ? setIsFriend(true) : setIsFriend(false)
  }

  //加关注(取消关注)
  const onClickFollow = async () => {
    if (isFollow) {
      const unFollowRes = await unFollowAPI(userId)
      unFollowRes.code === 20000 ? setIsFollow(false) : setIsFollow(true)
      Toast.info('取消关注')
    } else {
      const followRes = await followAPI(userId)
      followRes.code === 20000 ? setIsFollow(true) : setIsFollow(false)
      Toast.info('关注成功')
    }
  }

  //加好友(取消好友)
  const onClickFriend = async () => {
    if (isFriend) {

    } else {

    }
  }

  //发消息
  const onClickMessage = () => {

  }

  return (
    <div>
      {isFollow === null ? (
        <div>loading...</div>
      ) : (
        <div className="layout">
          <div className='top-layout'>
            <div className='profile-social'>
              <div className='profile-img'>
                <Image round fit='cover' src={userImgUrl} />
              </div>

              <div className='profile-social-right'>
                <table>
                  <tr className='top-row'>
                    <td>2,146</td>
                    <td>51M</td>
                    <td>11</td>
                  </tr>
                  <tr className='bottom-row'>
                    <td>关注</td>
                    <td>粉丝</td>
                    <td>获赞</td>
                  </tr>
                </table>

                <div className='profile-social-button'>
                  {
                    isFollow ? (
                      <Button
                        onClick={onClickFollow} className='follow-button' >
                        已关注
                      </Button>
                    ) : (
                      <Button
                        onClick={onClickFollow} className='follow-button' >
                        关注
                      </Button>
                    )
                  }

                  {
                    isFriend ? (
                      <Button
                        onClick={onClickFollow} className='friend-button' >
                        已好友
                      </Button>
                    ) : (
                      <Button
                        onClick={onClickFollow} className='friend-button' >
                        加好友
                      </Button>
                    )
                  }

                  <ChatO onClick={onClickMessage} className='message-icon' />
                </div>
              </div>

            </div>

            <div className='profile-user'>
              <div className='profile-username'>{username}</div>
              <div className='profile-intro'>留下你的介绍吧......</div>
            </div>
          </div>


          <div className='bottom-layout'>

          </div>
        </div>
      )}

    </div>
  )

}

export default OtherProfile