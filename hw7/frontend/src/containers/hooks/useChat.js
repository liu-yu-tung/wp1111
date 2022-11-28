/*
import { useEffect, useRef, createContext, useContext } from "react";
import useState from 'react-usestateref';
import {message} from 'antd'

const LOCALSTORAGE_KEY = 'save-me'
const saveMe = localStorage.getItem(LOCALSTORAGE_KEY)

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  sendMessage: () => {},
  clearMessages: () => {},
})

function useWs(onMessage) {
  const [ready, setReady] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const client = new WebSocket("ws://localhost:4000");
    console.log("new ws")
    client.onopen = () => setReady(true);
    client.onclose = () => setReady(false);
    client.onmessage = onMessage;
    wsRef.current = client;
    return () => {client.close(); console.log("close")}
  }, []);

  return {ready, send: wsRef.current?.send.bind(wsRef.current)};
}


const ChatProvider = (props) => {
  const [messages, setMessages, msgRef] = useState([]);
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(saveMe || "")
  const [signedIn, setSignedIn] = useState(false)

  const displayStatus = (s) => {
    if (s.msg) {
      const {type, msg} = s
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        default:
          message.error(content)
          console.log("error")
          break
      }
    }
  }
  const onMessage = (byteString) => {
    const {data} = byteString
    const [task, payload] = JSON.parse(data)
    switch (task) {
      case "init": {
        setMessages(payload)
        console.log("init: " + [...messages])
        break
      }
      case "output": {
        setMessages(() => [...msgRef.current, ...payload])
        console.log("output: " + [...messages])

        break
      }
      case "status": {
        setStatus(payload)
        break
      }
      case "cleared": {
        setMessages([])
        break
      }
      default: break 
    }
  }
  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
  }
  const sendMessage = (payload) => { 
    sendData(["input", payload])
    setStatus({
      type: "success",
      msg: "Message sent."
    })
    setMessages([...msgRef.current])
    //setMessages([...msgRef.current, {name: payload.name, body: payload.body}]);
    console.log(payload)
  }
  const clearMessages = () => {
    sendData(["clear"])
  }
  const client = useWs(onMessage)
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn])

  //return { status, me, setMe, signedIn, setSignedIn, messages, sendMessage, clearMessages, displayStatus};
  return (
    <ChatContext.Provider
      value = {{
        status,
        me,
        signedIn,
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus
      }}
      {...props}
      />
  )
};
const useChat = () => useContext(ChatContext)
export {ChatProvider, useChat}

*/
import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: '',
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {}
});

const client = new WebSocket('ws://localhost:4000');

// user define hook
const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);

    // web socket (don't need to import "ws" in client part)
    

    // send data to backend via web socket
    const sendData = async (data) => {
        await client.send(JSON.stringify(data)); // JSON.stringify => convert object to string
        //console.log('sent data');
    };

    // client web socket receive message
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        //console.log('task:', task);
        //console.log('payload:', payload);
        switch (task) {
            case "init": {
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages(() => [...messages, ...payload]);
                //console.log('in output: ', messages);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendMessage = (payload) => {
        // send data
        sendData(["input", payload]);
    }

    const clearMessages = () => {
        sendData(["clear"]);
    }


    const displayStatus = (s) => {
      if(s.msg) {
        const { type, msg } = s;
        const content = { content: msg, duration: 0.5 };
        switch (type) {
          case 'success':
            message.success(content);
            break;
          case 'error':
            message.error(content);
            break;
          default:          
            break;
        }
      }
  }

  useEffect(() => {
      if(signedIn) {
          localStorage.setItem(LOCALSTORAGE_KEY, me);
      }
  }, [signedIn]);

  return (
      <ChatContext.Provider
          value={{
              status, 
              me, 
              signedIn, 
              messages, 
              setMe,
              setSignedIn, 
              sendMessage,
              clearMessages,
              displayStatus
          }}
          {...props}
      />
  );

  //return { status, me, setMe, signedIn, setSignedIn, messages, sendMessage, clearMessages, displayStatus };
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };