import LogIn from "../components/Login"
import Title from "../components/Title"
import {useChat} from './hook/useChat';
import styled from 'styled-components'
import { Button } from 'antd'


const Wrapper = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;
const LoginWrapper = styled.div``

export default () => {

  const {me, setMe, signedIn, setSignedIn ,displayStatus, sendTestingMessage } = useChat()

  const handleLogin = (name) => {
    console.log(name, signedIn);
    if (!name) 
      displayStatus({
        type: "error",
        msg: "Missing user name"
      })
    else setSignedIn(true);
  }
  return (
    <Wrapper>
      <Title name={me}/>
      <LoginWrapper><LogIn me={me} setName={setMe} onLogin={handleLogin} /></LoginWrapper>
    </Wrapper>
  )
}