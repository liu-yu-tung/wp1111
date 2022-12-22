import { Tabs, Button, Input, Tag, message } from 'antd'
import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import Message from '../components/Message'
import {useChat} from './hook/useChat'
import ChatModal from '../components/Chatmodal';


const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 500px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`

const ChatBoxWrapper = styled.div`
  height: calc(440px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  // background: red;
`
const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-width: 500px;
  max-width: 700px;
  margin: auto;
`
const MessageFooter = styled.div`
  height: 20px;
`;

function App() {
  const {setStatus, me, status, messages, sendMessage, clearMessages, displayStatus, startChat, sendTestingMessage, setChattingWith} = useChat();
  const [userName, setUserName] = useState('');
  const [chatBoxes, setChatBoxes] = useState([]) // label, children, key
  const [activeKey, setActiveKey] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [msg, setMsg] = useState('')
  const [body, setBody] = useState('');
  const bodyRef = useRef(null)

  const [waitToScrollDown, setWaitToScrollDown] = useState(false)
  const FooterRef = useRef(null)
  const [msgUpdated, setMsgUpdated] = useState(true)

  const scrollToBottom = () => {
    FooterRef.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" });
  };

  useEffect(() => {
    setChattingWith(activeKey)
    console.log("active key changed: ", activeKey)
  }, [activeKey])

  useEffect(() => {
    if (!msgUpdated)setMsgUpdated(true);
    // if (waitToScrollDown) {
      scrollToBottom();
      setWaitToScrollDown(false);
    // }
  }, [msgUpdated])

  useEffect(() => {
    let chatBoxesBuffer = chatBoxes
    try {chatBoxesBuffer.find(chatBox => chatBox.key === activeKey).children = extractChat(activeKey)} catch (e) {console.log(e)} // bug
    setChatBoxes(chatBoxesBuffer)
    setMsgUpdated(false)
  }, [messages])

  const sendMessageAndFocus = (data) => {
    sendMessage(data);
    bodyRef.current.focus();
  }

  const extractChat = (friend) => {
    // console.log("messages: ", messages); 
    return (
    // renderChat(messages.filter(({name, body}) => ((name === friend) || (name === me))))
    renderChat(friend)
  )}

  const renderChat = (friend) => (
    <ChatBoxWrapper>
      {messages.length === 0 ?
        (<p style={{ color: '#ccc' }}> No messages... {messages}</p>) :
        (messages.map( ( msg, index) => (
          <Message isMe={me === msg.sender} name={msg.sender} message={msg.body} key={friend+"-"+index} />
        )))
      }
      <MessageFooter ref={FooterRef} />
    </ChatBoxWrapper>
  )

  const createChatBox = (name) => {
    if (chatBoxes.some(({key}) => key === name)) {
      throw new Error(name + "'s chat box has already been opend")
    }
    const chat = extractChat(name)
    const newActiveKey = name;
    const newChatBox = {
      label: name,
      children: chat,
      key: newActiveKey,
    }
    setChatBoxes([...chatBoxes, newChatBox]);
    setWaitToScrollDown(true);
    setActiveKey(newActiveKey);
    startChat(me, name)
  };

  const removeChatBox = (targetKey) => {
    console.log("removing: ", targetKey)
    const index = chatBoxes.findIndex(({key}) => key === activeKey)  
    const newChatBox = chatBoxes.filter(({key}) => key !== targetKey)  

    
    setChatBoxes(newChatBox);
    setActiveKey(
      activeKey ? 
        activeKey === targetKey ?
          index === 0 ? ''
          : chatBoxes[index - 1].key
        : activeKey
      : ''
    );
  }

  return (
    <ChatRoomWrapper>
      <Title name={me}/>
      <ChatBoxesWrapper
        tabBarStyle={{ height: '36px'}}
        type="editable-card"
        onChange={(key) => {
          setActiveKey(key);
          extractChat(key);
          startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            removeChatBox(targetKey)
          }
        }}
        items={chatBoxes}
      ></ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          createChatBox(name)
          extractChat(name);
          setModalOpen(false);
        }}
        onCancel={() => {setModalOpen(false)}}
      />
      <Input.Search
        autoFocus
        ref={bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a message."
            })
            return;
          }
          sendMessageAndFocus(({ from: me, body: msg, to: activeKey }))
          setBody('')
          setWaitToScrollDown(true)
        }}
      ></Input.Search>
    </ChatRoomWrapper>
  )
}

export default App
