import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const sendMessage = (msg) => { 
    setMessages([...messages, {name: msg.name, body: msg.body}]);
    setStatus({
      type: "success",
      msg: "Message sent."
    })
    console.log(msg);
  }
  return {
    status, messages, sendMessage
  };
};
export default useChat;