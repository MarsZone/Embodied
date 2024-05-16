import React, { useEffect, useState } from 'react'
import { NavBar, Toast, Cell, Image } from 'react-vant'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { getMsgHistoryApi } from '@/apis/message'
import './Message.scoped.scss'

const Message = () => {

  const [msgHisList, setMsgHisList] = useState([])

  //初始化数据
  useEffect(() => {
    fetchMsgHistory()
  }, [])

  //获取消息历史
  const fetchMsgHistory = async () => {
    const msgHisRes = await getMsgHistoryApi()
    setMsgHisList(msgHisRes.data)
    console.log(msgHisRes.data)
  }

  return (
    <div className="message-layout">
      <NavBar
        title="消息"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
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
            </div>
            <div className='msg-right'>
              <div className='msg-lastMsg'>
                <div> {msg.senderNickName}</div>
                <div> {msg.lastMsg}</div>
              </div>
              <div className='msg-lastTime'>
                <div> 5-16 </div>
                <div> {msg.unReadCount}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Message