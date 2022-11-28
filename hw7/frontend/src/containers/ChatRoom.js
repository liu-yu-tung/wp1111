import { useEffect, useState, useRef } from 'react';
import { Tabs, Input, Tag } from "antd";
import styled from "styled-components";
import { useChat } from './hooks/useChat';
import Title from './components/Title';
import Message from "./components/Message";
import ChatModal from "./components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const ChatBoxWrapper =styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;
const ChatRoom = ()=> {
    const { me, messages, sendMessage, displayStatus } = useChat();
    const [ msg, setMsg ] = useState('');
    const [ msgSent, setMsgSent ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ chatBoxes, setChatBoxes ] = useState([]);
    const [ activeKey, setActiveKey ] = useState('');

    const msgFooter = useRef(null);

    const displayChat = (chat) => (
        chat.length ===0 ? (
            <p style={{ color: '#ccc' }}>No messages...</p>
        ):(
        <ChatBoxWrapper>
            {chat.map(({name, body}, i) => {
                return (<Message isMe={name === me} message={body} />);
            })}
            <FootRef ref = {msgFooter} />
        </ChatBoxWrapper>
    ));
    const extractChat = (friend) => {
        return displayChat(
            messages.filter(({name, body})=>((name === friend)||(name === me )))
        );
    }
    const createChatBox = (friend) => {
        if (chatBoxes.some(({key}) => key === friend)){
            throw new Error(friend + "'s chat bos has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,
        { label: friend, children: chat, key: friend}]);
        setMsgSent(true);
        return friend;
    }
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndes(({key})=> key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);
            
        return activeKey
            ? activeKey === targetKey 
                ? index === 0
                    ?'' 
                    : chatBoxes[index - 1].key
                : activeKey
            : '';
    }
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView
        ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    },[msgSent])
    return (
        <>
        <Title name={me} />
        <>
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px'}}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if(action === 'remove'){
                        setActiveKey(removeChatBox(targetKey,activeKey));
                    }
                }}
                items={chatBoxes}
            />
            <ChatModal
                open={modalOpen}
                onCreate={({name})=>{
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
            />
        </>
        <Input.Search
            value = {msg}
            onChange={(e)=>setMsg(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg)=>{
            if (!msg ) {
                displayStatus({
                type: 'error',
                msg: 'Please enter and a message body.'
                })
                return
            }
            sendMessage({name: me,to: activeKey, body: msg });
            setMsg('');
            setMsgSent(true);
            }}
        ></Input.Search>
        </>
    );
}

export default ChatRoom