import React, { useState, useEffect, useRef } from 'react';
import {useChat} from './containers/hook/useChat';
import ChatRoom from "./containers/ChatRoom"
import SignIn from "./containers/SignIn"

function App() {
  const {signedIn, TestingFunction} = useChat();

  return (
    <div>
      {signedIn? 
        <ChatRoom /> : <SignIn/>
      }
    </div>
    
  )
}

export default App
