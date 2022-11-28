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
  startChat: () => {},
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
        //console.log("init: " + [...messages])
        break
      }
      case "output": {
        setMessages(() => [...msgRef.current, ...payload])
        //console.log("output: " + [...messages])
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
    console.log(payload.name)
    console.log(payload.to)
    console.log(payload.body)
    sendData(["message", payload])
    //sendData(["init", payload])
    setStatus({
      type: "success",
      msg: "Message sent."
    })
    setMessages([...msgRef.current])
    //why
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


  const startChat = (name, to) => {
    console.log("name, to: " + name + ", " + to)
    sendData(["chat", {name: name, to:to}])
  }

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
        displayStatus,
        startChat
      }}
      {...props}
      />
  )
};
const useChat = () => useContext(ChatContext)
export {ChatProvider, useChat}
