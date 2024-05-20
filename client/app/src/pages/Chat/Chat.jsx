import { getUtuMsgHistoryApi } from "@/apis/message"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NavBar, Image } from "react-vant"
import './Chat.scoped.scss'
import { previewFileApi } from "@/apis/file"
import useUserDetail from "@/hooks/useUserDetail"
import { getUserId } from "@/utils"

const Chat = () => {

  //接收message页传递的senderId
  const location = useLocation()
  const { targetId, senderNickName: targetNickName } = location.state || {}

  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [avatarUrlTarget, setAvatarUrlTarget] = useState()

  //获取本人信息
  // const fetchMyProfile = () => {
  //   const userProfile = useUserDetail(getUserId())
  //   console.log('我的信息：', userProfile)
  // }

  const { userProfile, avatarUrl } = useUserDetail(getUserId())
  //console.log('我的信息：', userProfile)
  //console.log('我的头像：', avatarUrl)
  const [myNickName, setMyNickName] = useState()
  const [myAvatarUrl, setMyAvatarUrl] = useState()

  //初始化数据
  useEffect(() => {
    fetchMsg()
    fetchAvatarUrl()
  }, [])

  //更新我的昵称
  useEffect(() => {
    setMyNickName(userProfile.userDetail.nickName)
    setMyAvatarUrl(avatarUrl)
  }, [userProfile, avatarUrl])

  //加载与targetId的消息记录
  const fetchMsg = async () => {
    const res = await getUtuMsgHistoryApi({ targetUid: targetId })
    console.log('与targetId为：', targetId, '，的消息记录：', res.data)
    setMessageList(res.data)
  }

  //聊天对象头像
  const fetchAvatarUrl = async () => {
    const res = await previewFileApi(5)
    setAvatarUrlTarget(res.data)
    //console.log('我的头像：', res.data)
  }


  return (
    <div>
      <NavBar
        title="Chat Room"
        leftText="返回"
      // onClickLeft={() => }
      />

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

        <div className="chat-send-box">

        </div>

      </div>
    </div>
  )
}


export default Chat