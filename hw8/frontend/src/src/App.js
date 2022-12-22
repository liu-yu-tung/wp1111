import React, { useState, useEffect, useRef } from 'react';
import {useChat} from './containers/hook/useChat';
import ChatRoom from "./containers/ChatRoom"
import SignIn from "./containers/SignIn"
import {Button} from 'antd'

function App() {
  const {signedIn, TestingFunction} = useChat();

  return (
    <div>
      <Button onClick={async () => { await TestingFunction(); console.log("test");}}>test button (currently, it clears all data)</Button>         
      {signedIn? 
        <ChatRoom /> : <SignIn/>
      }
    </div>
    
  )
}

export default App
