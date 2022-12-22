import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
mutation createChatBox($user1: String!, $user2: String!) {
  createChatBox(user1: $user1, user2: $user2) {
    name
    messages {
      sender
      body
    }
  }
}
`;

export const SEND_MESSAGE_MUTATION = gql`
mutation sendMessage($sender: String!, $body: String!, $receiver: String!) {
  sendMessage(data: {sender: $sender, body: $body, receiver: $receiver}) {
    sender
    body
  }
}
`

export const CLEAR_DB_MUTATION = gql`
mutation clearDB {
  clearDB {
    name
    messages {
      sender
      body
    }
  }
}
`