import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const client = new WebSocket('ws://localhost:4000')
  client.onmessage = (byteString) => {
    const {data} = byteString
    const [task, payload] = JSON.parse(data)
    console.log("client onmessage: " + task + ", payload: " + payload)
    switch (task) {
      case "output": {
        setMessages(() => [...messages, ...payload])
        break
      }
      case "status": {
        setStatus({
          type: payload.type,
          msg: payload.msg
        })
        break
      }
      default: break 
    }
  }
  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
    //console.log("send " + JSON.stringify(data))
  }
  const sendMessage = (payload) => { 
    sendData(["input", payload])
    setMessages([...messages, {name: payload.name, body: payload.body}]);
    setStatus({
      type: "success",
      msg: "Message sent."
    })
    console.log("send payload: " + payload);
  }
  return {
    status, messages, sendMessage
  };
};
export default useChat;