import { gql } from '@apollo/client';

export const CHAT_MESSAGES_SUBSCRIPTION = gql`
  subscription chatMessages($user1: String!, $user2: String!) {
    chatMessages(user1: $user1, user2: $user2) {
      sender
      body
    }
  }
`