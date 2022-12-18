/* eslint-disable no-unused-vars */
import { createContext,useContext,useState,useEffect } from "react";
import { message } from 'antd'
 
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    displayStatus: () => {},
    sendMessage: () => {},
    startChat: () => {},
    setStatus: () => {}
});

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const client = new WebSocket('ws://localhost:4000');

const ChatProvider = (props) => {
    const [me,setMe] = useState(savedMe || '');
    const [signedIn,setSignedIn] = useState(false);
    const [messages,setMessages] = useState([]);
    const [status,setStatus] = useState({});

    useEffect(() => {
        if(signedIn){
            localStorage.setItem(LOCALSTORAGE_KEY,me);
        }
    },[signedIn,me])

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case 'chat': {
                setMessages(payload);
                break;
            }
            case 'message':{
                setMessages(prev => [...prev,payload]);
                break;
            }
            case 'status':{
                setStatus(payload);
                break;
            }
            default: break;
        }
    }

    const displayStatus = (s) => {
        if(s.msg){
            const { type,msg } = s;
            const content = { content: msg,duration: 0.5 };
            switch(type){
                case 'success':
                    message.success(content)
                    break;
                case 'error':
                default:
                    message.error(content)
                    break;
            }
        }
    };

    const sendData = async(data) => {
        await client.send(JSON.stringify(data));
    };

    const startChat = (name,to) => {
        sendData(["chat",{name,to}]);
    };
    
    const sendMessage = (payload) => {
        sendData(["message",payload]);
    };

    return (
        <ChatContext.Provider
            value={{
                status, me, setMe, setSignedIn, setStatus, messages, sendMessage, signedIn, displayStatus, startChat
            }}
            {...props}
        />
    );
};
const useChat = () => {
    return useContext(ChatContext)
};
export { ChatProvider,useChat };