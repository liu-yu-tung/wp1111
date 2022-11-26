import './App.css'
import { Button, Input, message, Tag } from 'antd'
import useChat from './useChat'
import { useEffect, useState, useRef } from 'react'

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('') 
  const bodyRef = useRef(null)

  const displayStauts = (s) => {
    if (s.msg) {
      const {type, msg} = s
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
          console.log("error")
          break
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStauts(status)
  }, [status])


  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>
        ): (
          messages.map(({name, body}, i) => (
            <p className='App-message' key={i}>
              <Tag color='blue'>{name}</Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStauts({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return 
          }
          sendMessage({name: username, body: msg})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
