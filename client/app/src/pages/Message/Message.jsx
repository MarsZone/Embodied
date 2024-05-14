import React, { useEffect, useState } from 'react'
import { NavBar, Toast } from 'react-vant'
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
    <div className="layout">
      <NavBar
        title="消息"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      <div className="container">
        {msgHisList.map(msg => (
          <div className='msg-box'>
            <div>发送用户id：{msg.senderUid}</div>
            <div>状态：{msg.status}</div>
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