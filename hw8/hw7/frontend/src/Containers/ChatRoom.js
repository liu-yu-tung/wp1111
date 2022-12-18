/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState,useEffect,useRef } from 'react';
import {  Tabs,Input,Tag } from 'antd'
import { useChat } from '../hooks/useChat.js'
import Title from '../Components/title.js';
import Message from '../Components/Message.js';
import ChatModal from '../Components/chatModal.js';
import styled from 'styled-components';

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;
const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const FootRef = styled.div`
  height: 20px;
`;
 
const ChatRoom = () => {
  const { me,messages,sendMessage,displayStatus,startChat } = useChat();
  const [chatBoxes,setChatBoxes] = useState([]); //{label,children,key}
  const [activeKey,setActiveKey] = useState('');
  const [msg,setMsg] = useState('');
  const [msgSent,setMsgSent] = useState(false);
  const [modalOpen,setModalOpen] = useState(false);

  const msgFooter = useRef(null);

  const displayChat = (chat) => {
    return  (chat.length === 0)?
        (<p style={{ color: '#ccc' }}>No messages...</p>) :
        (<ChatBoxWrapper>
          {
            chat.map(({name,body},i) => <Message name = {name} isMe = {(name === me)} message = {body} key = {i}/>)
          }
          <FootRef ref = {msgFooter} />
        </ChatBoxWrapper>)
  }
  useEffect(() => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    if(index !== -1) {
        var newChatBoxes = [...chatBoxes];
        newChatBoxes[index].children = displayChat(messages);
        setChatBoxes(newChatBoxes);
        setMsgSent(true);
    }
}, [messages]);

  const createChatBox = (friend) => {
    if(chatBoxes.some(({key}) => (key === friend)))
      throw new Error(friend + "'s chat box has already opened.");
    const chat = displayChat(messages);
    setChatBoxes(prev => [...prev,{label: friend,children: chat,key:friend}]);
    setMsgSent(true);
    return friend;
  }
  const removeChatBox = (targetKey,activeKey) => {
    const index = chatBoxes.findIndex(({key}) => (key === activeKey));
    const newChatBoxes = chatBoxes.filter(({key}) => (key !== targetKey));
    setChatBoxes(newChatBoxes);

    return activeKey?
      activeKey === targetKey?
        index === 0?
          '':chatBoxes[index - 1].key
        :activeKey
      :'';
  };

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  },[msgSent])

  return (
    <>
      <Title name = {me}/>
      <>
        <ChatBoxesWrapper
          tabBarStyle = {{height: '36px'}}
          type="editable-card"
          activeKey = {activeKey}
          onChange = {(key) => {
            setActiveKey(key);
            startChat(me,key);
            setMsgSent(true);
          }}
          onEdit = {(targetKey,action) => {
            if(action === 'add')
              setModalOpen(true);
            else if(action === 'remove'){
              setActiveKey(removeChatBox(targetKey,activeKey));
            }
          }}
          items = {chatBoxes}
        />
        <ChatModal 
          open = {modalOpen}
          onCreate = {({name}) => {
            startChat(me,name);
            setActiveKey(createChatBox(name));
            setModalOpen(false);
          }}
          onCancel = {() => {
            setModalOpen(false);
          }}
        />
      </>
      <Input.Search
        enterButton="Send"
        value = {msg}
        onChange = {(e) => {setMsg(e.target.value)}}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!msg)
            displayStatus({type: "error",msg: 'Please enter a username and a message body.'});
          else if(activeKey === ''){
            displayStatus({type: "error",msg: 'Please add a chatbox first.'});
            setMsg('');
          }
          else{
            sendMessage({name: me,body:msg});
            setMsg('');
            setMsgSent(true);
          }
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
