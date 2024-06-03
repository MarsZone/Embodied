import React, { useEffect, useState } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Image, Button, Tabs, Dialog } from 'react-vant'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from '@/store/modules/user'
import './MyProfile.scoped.scss'
import useUserDetail from '@/hooks/useUserDetail'
import { getUserId as _getUserId } from '@/utils'
import { getUserExtendsAPI } from '@/apis/user'

const MyProfile = () => {
  const tabs = [
    {
      key: '/myPost',
      title: "我的创作"
    },
    {
      key: '/like',
      title: "点赞"
    },
    {
      key: '/bookmark',
      title: "收藏"
    }];

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userId } = useParams()
  const [followsCount, setFollowsCount] = useState('--')
  const [followersCount, setFollowersCount] = useState('--')
  const [collectsCount, setCollectsCount] = useState('--')

  const { userProfile, avatarUrl } = useUserDetail(_getUserId())
  console.log('用户详情：', userProfile, '头像url：', avatarUrl)
  console.log('用户头像：', avatarUrl)

  //数据初始化
  useEffect(() => {
    getUserExtendsInfo()
  }, [])

  const getUserExtendsInfo = async () => {
    const res = await getUserExtendsAPI(_getUserId())
    console.log('关注数量等：', res.data)
    setFollowersCount(res.data.followersCount);
    setFollowsCount(res.data.followsCount);
  }

  const onTabChange = (path) => {
    console.log('切换路由：', path)
    navigate(`/profile/${userId}${path}`)
  }

  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

  return (
    <div className="layout">

      <Dialog
        visible={logoutDialogVisible}
        title='确认退出当前账号？'
        showCancelButton
        onConfirm={() => {
          console.log('确认退出')
          dispatch(clearUserInfo())
          navigate('/login')
        }}
        onCancel={() => setLogoutDialogVisible(false)}
      />

      <div className='top-layout'>

        <div className='profile-social'>
          <div className='profile-img'>
            <Image round fit='cover' src={avatarUrl} />
          </div>

          <div className='profile-social-right'>
            <table>
              <tr className='top-row'>
                <td>{followsCount}</td>
                <td>{followersCount}</td>
                <td>11</td>
              </tr>
              <tr className='bottom-row'>
                <td>关注</td>
                <td>粉丝</td>
                <td>获赞</td>
              </tr>
            </table>

            <div className='profile-button'>
              <Button
                className='profile-edit-button'
                onClick={() => navigate('/userDetail')}>
                编辑个人信息
              </Button>

              <Button
                className='profile-logout-button'
                onClick={() => setLogoutDialogVisible(true)}>
                退出
              </Button>
            </div>
          </div>

        </div>

        <div className='profile-user'>
          <div className='profile-username'>{userProfile.userDetail.nickName}</div>
          <div className='profile-intro'>留下你的介绍吧......</div>
        </div>
      </div>


      <div className='bottom-layout'>
        <Tabs
          className='profile-tabs'
          defaultActive={tabs[0].key}
          onChange={(name, tabIndex) => onTabChange(name)}>
          {tabs.map(
            item => (
              <Tabs.TabPane name={item.key} key={item.key} title={item.title}>
                <div>
                  <Outlet />
                </div>
              </Tabs.TabPane>
            )
          )}
        </Tabs>
      </div>

      <div className="footer">
        <TabNavigator />
      </div>

    </div>
  )
}

export default MyProfile