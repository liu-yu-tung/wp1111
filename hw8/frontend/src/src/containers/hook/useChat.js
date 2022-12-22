import { useState, useRef, useEffect, createContext, useContext } from "react";
import { Button, Input, Tag, message } from 'antd'

import { useQuery, useMutation } from "@apollo/client";
import { CLEAR_DB_MUTATION, CREATE_CHATBOX_MUTATION, SEND_MESSAGE_MUTATION } from '../graphql/mutations'
import { GET_CHATBOX_MESSAGES_QUERY } from '../graphql/queries'
import { CHAT_MESSAGES_SUBSCRIPTION } from '../graphql/subscriptions'

const ChatContext = createContext({
  status: {},
  setstatus: () => {},
  me: "",
  signedIn: false,
  messages: [],
  startChat: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  TestingFunction: () => {},
  chattingWith: '',
  setChattingWith: '',
})

const ChatProvider = (props) => {
  const LOCALSTORAGE_KEY = "save-me";
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  
  const [status, setStatus] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  const [ready, setReady] = useState(false);
  const wsRef = useRef(null);
  const [chattingWith, setChattingWith] = useState('June')

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  const [uClearDB , ] = useMutation(CLEAR_DB_MUTATION);
  const [uSendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const [uCreateChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
  const {data , loading, subscribeToMore, error} = useQuery(GET_CHATBOX_MESSAGES_QUERY, {
    variables: {
      user1: me,
      user2: chattingWith
    }
  }) ;

  useEffect(() => {
    console.log("query error", error)
  }, [error])


  useEffect(() => {
    try {
      if (data)
      // console.log("query data: ", data.getChatBoxMessages.map(e => e.sender + " sent: " + e.body))
      setMessages(data.getChatBoxMessages.map(e => ({sender: e.sender, body: e.body})));
    } catch (e) {console.log(e)}
  }, [data])
  
  useEffect(() => {
    console.log("messages: ", messages)
  }, [messages])

  useEffect(() => {
    console.log("effect subscribe")
    try {
      subscribeToMore({
        document: CHAT_MESSAGES_SUBSCRIPTION,
        variables: {user1: me, user2: chattingWith},
        updateQuery: (prev, { subscriptionData }) => {
          console.log("receive subscription data")
          if (!subscriptionData.data) return prev;
          const newMessages = subscriptionData.data.chatMessages;
          return {
            getChatBoxMessages: newMessages
          };
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [chattingWith])

  const displayStatus = (s) => { if (s.msg) {
    const { type, msg } = s;
    const content = {
    content: msg, duration: 0.5 }
    switch (type) {
      case 'success':
        message.success(content)
        break
      case 'error':
      default:
        message.error(content)
      break
  }}}
  useEffect(() => {displayStatus(status)}, [status])

  const startChat = (name, to) => {
    console.log("start chat function called from:", name, " to: ", to)
    setStatus({
      type: "success",
      msg: "new chat with " + to
    })
  }
  const sendMessage = async ({from, to, body}) => {
    console.log("send messages function called", from, to, body)
    const newMessage = await uSendMessage({
      variables: {
        sender: from,
        body: body,
        receiver: to,
      }
    })
    try {
      if (newMessage.data.sendMessage) {
        setStatus({
          type: "success",
          msg: "message sent"
        })
      }
    } catch (e) {
      setStatus({
        type: "error",
        msg: "message not sent"
      })
    }
    
  }

  const clearMessages = () => {
    console.log("clearmessages function called")
  }

  const TestingFunction = async () => {
    console.log("test function called")
    const temp = await uClearDB();
    console.log("cleared: ", temp)
    // const temp = await uCreateChatBox({
    //   variables: {
    //     user1: "Jack",
    //     user2: "June"
    //   }
    // })
    // console.log('usetesting: ', temp);
  }

  return (
    <ChatContext.Provider
      value={{
        status, setStatus,
        me, signedIn, messages, setMe, setSignedIn,
        sendMessage, clearMessages, displayStatus, startChat, TestingFunction,
        chattingWith,
        setChattingWith,      
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export {ChatProvider, useChat};