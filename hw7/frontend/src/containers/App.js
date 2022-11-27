import { Button, Input, message, Tag } from 'antd'
import {useChat} from './hooks/useChat'
import styled from 'styled-components'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'
import { useEffect, useState, useRef } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`
const App = () => {
  
  const { status, signedIn, displayStatus } = useChat()

  useEffect(() => {
    displayStatus(status)
    console.log("new status") 
  }, [status])

  return (
    <Wrapper> {signedIn? <ChatRoom />: <SignIn />} </Wrapper>
  ) 
}
export default App
