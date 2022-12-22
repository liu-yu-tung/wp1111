import { useState, useRef, useEffect } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  // const sendMessage = (payload) => {
  //     // ... // update messages and status
  //     console.log(payload);
  // }

  const [ready, setReady] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    console.log("effect called")
    const client = new WebSocket("ws://localhost:8001");
    client.onopen = () => setReady(true);
    client.onclose = () => setReady(false);
    client.onmessage = (event) => console.log("onmessage: ", JSON.parse(event.data));
    wsRef.current = client;
    return () => client.close();
  }, []);

  const onMessage = (e) => {
    const {task, payload} = JSON.parse(e.data);
    console.log("ws on message: ", task, payload);
    switch (task) {
      case "output" : {
        // console.log("ws output task")
        console.log("output: ", messages, payload)
        setMessages(() => [...messages, ...payload]);
      }
      break;
      case "status" : {
        // console.log("ws status task")
        setStatus(payload)
      }
      break;
      case "init" : {
        setMessages(payload)
      }
      break
      case "cleared" : {
        setMessages([]);
      }
      break
      default: break;
      
    }}


  useEffect(() => {
    if (wsRef.current){
      
      
    wsRef.current.onmessage = onMessage
    }
  })

//   return {ready, send: wsRef.current?.send.bind(wsRef.current)};

  const sendString = (msg) => {
    wsRef.current?.send(msg)
  }
  const sendMessage = (msg) => {
    sendString(JSON.stringify({task: "input", payload: msg}))
    // console.log(messages);
    // setMessages([...messages, {Mname: msg.name, Mbody: msg.body}]);
    // setStatus({
    //     type: "success",
    //     msg: "Message sent." 
    // });
    // console.log(msg);
  }

  const clearMessages = () => {
    sendString(JSON.stringify({task: "clear"}))
  }

  return {
      status, messages, sendMessage, clearMessages
  };
};
export default useChat;