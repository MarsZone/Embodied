import { getUtuMsgHistoryApi, sendMsgApi } from "@/apis/message"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { NavBar, Image, ActionBar, Popup, Input, Button, Sticky, Lazyload } from "react-vant"
import { Arrow } from '@react-vant/icons';
import './Chat.scoped.scss'
import { previewFileApi } from "@/apis/file"
import useUserDetail from "@/hooks/useUserDetail"
import { getUserId } from "@/utils"
import useWebSocket from "@/hooks/useWebSocket";

const Chat = () => {
  const navigate = useNavigate()
  //接收message页传递的senderId
  const location = useLocation()
  const { targetId, senderNickName: targetNickName } = location.state || {}

  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [avatarUrlTarget, setAvatarUrlTarget] = useState()
  const [sendMsgVisible, setSendMsgVisible] = useState(false)
  const { userProfile, avatarUrl } = useUserDetail(getUserId())
  const [myNickName, setMyNickName] = useState()
  const [myAvatarUrl, setMyAvatarUrl] = useState()

  //更新我的昵称
  useEffect(() => {
    setMyNickName(userProfile.userDetail.nickName)
    setMyAvatarUrl(avatarUrl)
  }, [userProfile, avatarUrl])

  //初始化数据
  useEffect(() => {
    fetchMsg()
    fetchAvatarUrl()
  }, [])

  //加载与targetId的消息记录
  const fetchMsg = async () => {
    const res = await getUtuMsgHistoryApi({ targetUid: targetId })
    console.log('与targetId为：', targetId, '，的初始化消息记录：', res.data)
    const reversedList = res.data.reverse();
    setMessageList(reversedList)
  }

  //聊天对象头像
  const fetchAvatarUrl = async () => {
    const res = await previewFileApi(5)
    setAvatarUrlTarget(res.data)
    //console.log('我的头像：', res.data)
  }

  //发送消息
  const handleWebSocketMessage = (event) => {
    if (typeof event.data === 'string') {
      let obj = JSON.parse(event.data)
      console.log('obj：', obj)
      //第一次连接的情况
      if (obj.code === 10000) {
        return
      }

      //处理string格式的消息
      setMessageList((prevMessages) => {
        console.log('更新前的messageList：', prevMessages)
        const updatedMessageList = [...prevMessages, obj.data]
        console.log('更新后的messageList：', updatedMessageList)
        return updatedMessageList
      })
    }
  }

  const ws = useWebSocket(handleWebSocketMessage)

  const onSubmitMsg = async () => {
    //通过 WebSocket 发送消息
    if (ws && ws.readyState === WebSocket.OPEN) {
      //构建符合后端期望格式的消息
      let message = {}
      message.command = '10200'
      message.targetUser = targetId
      message.message = newMessage
      let str = JSON.stringify(message)
      ws.send(str)
    }
    setNewMessage('')
    setSendMsgVisible(false)
  }

  //定位到底部
  const bottomRef = useRef(null)
  const scrollToButtom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToButtom()
  }, [messageList])

  return (
    <div>
      <Sticky>
        <NavBar
          title="Chat Room"
          leftText=""
          onClickLeft={() => navigate('/message')}
        />
      </Sticky>

      <div className="message-container">
        {messageList === null || avatarUrlTarget === null
          || userProfile === null ? (
          <div> loading... </div>
        ) : (
          <div>
            {messageList.map(msg => (
              <div className='chat-indv' key={msg.id}>
                {msg.senderId === targetId ? (
                  <div className="chat-box target-chat-box">
                    <div className="chat-box-left">
                      <Image
                        cover round
                        className='msg-avatar'
                        src={avatarUrlTarget} />
                    </div>
                    <div className="chat-box-right">
                      <div className="chat-sender-target">
                        {targetNickName}
                      </div>
                      <div className="chat-content">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="chat-box my-chat-box">
                    <div className="chat-box-left">
                      <Image
                        cover round
                        className='msg-avatar'
                        src={avatarUrl} />
                    </div>
                    <div className="chat-box-right">
                      <div className="chat-sender-my">
                        {myNickName}
                      </div>
                      <div className="chat-content">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 这个 div 将始终位于底部 */}
        <div ref={bottomRef} />

        <Sticky position='bottom'>
          <div className="chat-send-box">
            <Input
              className="comment-input"
              value={newMessage}
              onFocus={() => setSendMsgVisible(true)}
              placeholder='请输入消息...'
            >
            </Input>

            <Button
              className="comment-button"
              text={'发送'}
              onClick={onSubmitMsg}
            />
          </div>
        </Sticky>

        <Popup
          visible={sendMsgVisible}
          style={{ height: '30%' }}
          position='bottom'
          onClose={() => setSendMsgVisible(false)}
        >
          <Input
            suffix={
              <Button size="small" type="primary" onClick={onSubmitMsg}>
                发送
              </Button>}
            placeholder="留下你的评论吧..."
            value={newMessage}
            onChange={text => setNewMessage(text)}
          />
        </Popup>

        {/* <div className="chat-send-box">
          <ActionBar>
            <ActionBar.Button 
              className="comment-button"
              text={newMessage}
              onClick={() => setSendMsgVisible(true)}
            />
            <ActionBar.Icon
              icon={<Arrow />}
              text='发送'
              onClick={onSubmitMsg}
            />
          </ActionBar>
        </div> */}

      </div>
    </div >
  )
}


export default Chat