import { getUtuMsgHistoryApi } from "@/apis/message"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NavBar, Image } from "react-vant"
import './Chat.scoped.scss'
import { previewFileApi } from "@/apis/file"

const Chat = () => {

  //接收message页传递的senderId
  const location = useLocation()
  const { targetId } = location.state || {}

  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [avatarUrlTarget, setAvatarUrlTarget] = useState()

  //初始化数据
  useEffect(() => {
    fetchMsg()
    fetchAvatarUrl()
  }, [])

  //加载与targetId的消息记录
  const fetchMsg = async () => {
    const res = await getUtuMsgHistoryApi({ targetUid: targetId })
    console.log('与targetId为：', targetId, '，的消息记录：', res.data)
    setMessageList(res.data)
  }

  //聊天对象/自己头像
  const fetchAvatarUrl = async () => {
    const res = await previewFileApi(5)
    setAvatarUrlTarget(res.data)
    console.log('头像url：', res.data)
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
        {messageList === null || avatarUrlTarget === null ? (
          <div> loading... </div>
        ) : (
          <div>
            {messageList.map(msg => (
              <div className='chat-indv'>
                {msg.senderId === targetId ? (
                  <div className="chat-info">
                    <div className="chat-target-avatar">
                      <Image
                        cover round
                        className='msg-avatar'
                        src={avatarUrlTarget} />
                    </div>
                    <div className="chat-sender">
                      发送人：{msg.senderId}
                    </div>
                    <div className="chat-content">
                      聊天内容：{msg.content}
                    </div>
                  </div>
                ) : (
                  <div>本人：{msg.content}</div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}


export default Chat