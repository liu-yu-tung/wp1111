import { gql } from '@apollo/client';

export const GET_CHATBOX_MESSAGES_QUERY = gql`
  query getChatBoxMessages($user1: String!, $user2: String!) {
    getChatBoxMessages(user1: $user1, user2: $user2) {
      sender
      body
    }
  }
`