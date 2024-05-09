import { useState } from "react"
import { useParams } from "react-router-dom"
import { NavBar } from "react-vant"

const Chat = () => {

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  //发送对象
  const targetId = 2

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