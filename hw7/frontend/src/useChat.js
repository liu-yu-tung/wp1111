import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const client = new WebSocket('ws://localhost:4000')
  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
  }
  const sendMessage = (playload) => { 
    sendData(["input", playload])
    setMessages([...messages, {name: playload.name, body: playload.body}]);
    setStatus({
      type: "success",
      playload: "Message sent."
    })
    console.log(playload);
  }
  return {
    status, messages, sendMessage
  };
};
export default useChat;