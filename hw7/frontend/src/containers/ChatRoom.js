import Title from "./components/Title"
import Message from "./components/Message"
import {useChat} from "./hooks/useChat"
import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import {Input} from "antd"

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`
const FootRef = styled.div`
  height: 20px;
`
const ChatRoom = () => {
  const {me, messages, sendMessage, displayStauts} = useChat()
  const [username , setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  const msgRef = useRef(null)
  const msgFooter = useRef(null)

  const displayMessages = () => (
    messages.length === 0 ? (
      <p style={{ color: '#ccc' }}>
        No messages...
      </p>
    ): (
      messages.map(({name, body}, i) => (
        <Message name={name} isMe={name === me} message={body} key={i}/>
      ))
    )
  )

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView(
      {behavior: 'smooth', block: "start"}
    )
  }
  useEffect(() => {
    scrollToBottom()
    setMsgSent(false)
  }, [msgSent])

  return (<>
    <Title name={me} />
    <ChatBoxesWrapper>
      {displayMessages()}
      <FootRef ref={msgFooter} />
    </ChatBoxesWrapper>
    <Input
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          msgRef.current.focus()
        }
      }}
      style={{ marginBottom: 10 }}
    ></Input>
    <Input.Search ref={msgRef}
      value={msg}
      onChange={(e) => setMsg(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg || !username) {
          displayStauts({
            type: 'error',
            msg: 'Please enter a username and a message body.'
          })
          return 
        }
        sendMessage({name: username, body: msg})
        setMsg('')
        setMsgSent(true)
      }}
    ></Input.Search>

  </>)
}

export default ChatRoom