import { useEffect, useRef } from "react";
import useState from 'react-usestateref';

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
const useChat = () => {
  const [messages, setMessages, msgRef] = useState([]);
  const [status, setStatus] = useState({});

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
    setMessages([...msgRef.current, {name: payload.name, body: payload.body}]);
    setStatus({
      type: "success",
      msg: "Message sent."
    })
  }
  const clearMessages = () => {
    sendData(["clear"])
  }
  const client = useWs(onMessage)
  return { status, messages, sendMessage, clearMessages};
};
export default useChat;