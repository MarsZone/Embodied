import { getUtuMsgHistoryApi } from "@/apis/message"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NavBar } from "react-vant"

const Chat = () => {
 
  //接收message页传递的senderId
  const location = useLocation()
  const { targetId } = location.state || {}

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  //初始化数据
  useEffect(() => {
    fetchMsg()
  }, [])

  //加载与targetId的消息记录
  const fetchMsg = async () => {
    const res = await getUtuMsgHistoryApi({targetUid: targetId})
    console.log('与targetId为：', targetId, '，的消息记录：', res.data)
    setMessages(res.data)
  }

  //发送对象


  return (
    <div>
      <NavBar
        title="Chat Room"
        leftText="返回"
      // onClickLeft={() => }
      />

      <div className="message-container">

      </div>

    </div>
  )
}


export default Chat