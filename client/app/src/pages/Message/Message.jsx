import React, { useEffect, useState } from 'react'
import { NavBar, Toast, Cell, Image } from 'react-vant'
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
      {msgHisList === null || avatarUrl ? (
        <div> loading... </div>
      ) : (
        <div>
          {msgHisList.map(msg => (
            <div className='msg-box'>
              {/* <Cell
              center
              key={msg.lastMsg}
              // title={`Avatar ${idx}`}
              label='Deserunt dolor ea eaque eos'
              icon={<Image width={44} height={44} src='/demo_1.jpg' round />}
              isLink
            /> */}
              <div className='msg-left'>
                {msg.senderId}
                <img src={avatarUrl} className='msg-avatar' />
              </div>
              <div className='msg-right'>
                <div className='msg-content'>
                  <div> {msg.senderNickName}</div>
                  <div> 5-16 </div>
                </div>
                <div className='msg-lastMsg'>
                  <div> {msg.lastMsg}</div>
                  <div> {msg.unReadCount}</div>
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