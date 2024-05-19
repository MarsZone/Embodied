import React, { useEffect, useState } from 'react'
import { NavBar, Toast, Badge, Image } from 'react-vant'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { getMsgHistoryApi } from '@/apis/message'
import './Message.scoped.scss'
import { previewFileApi } from '@/apis/file'

const Message = () => {

  const [msgHisList, setMsgHisList] = useState([])
  const [avatarUrl, setAvatarUrl] = useState()


  //初始化数据
  useEffect(() => {
    fetchMsgHistory()
    fetchAvatarUrl()
  }, [])

  //获取消息历史
  const fetchMsgHistory = async () => {
    const res = await getMsgHistoryApi()
    setMsgHisList(res.data)
    console.log('消息历史：', res.data)
  }

  //发送人头像
  const fetchAvatarUrl = async () => {
    const res = await previewFileApi(5)
    setAvatarUrl(res.data)
    console.log('头像url：', res.data)
  }

  return (
    <div className="message-layout">
      <NavBar
        title="消息"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      {msgHisList === null || avatarUrl === null ? (
        <div> loading... </div>
      ) : (
        <div>
          {msgHisList.map(msg => (
            <div className='msg-box'>
              <div className='msg-left'>
                <Image
                  cover round
                  className='msg-avatar'
                  src={avatarUrl} />
              </div>

              <div className='msg-right'>
                <div className='msg-content'>
                  <div className='msg-sender'>
                    {msg.senderNickName}
                  </div>
                  <div className='msg-last-time'>
                    {msg.lastMsgDateTime}
                  </div>
                </div>
                <div className='msg-lastMsg'>
                  <div className='msg-last-content'>
                    {msg.lastMsg}
                  </div>
                  <div>
                    <Badge content={msg.unReadCount} max="99" color='grey'/>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>)
      }

      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Message