import {v4 as uuidv4} from 'uuid';
import { findChatBox, validateChatBox, getChatName, appendMessage } from '../models/useChatBox'

const Mutation = {
  sendMessage: async (parent, args, { pubsub, ChatBoxModel }, info) => {
    const chatBox = await findChatBox(ChatBoxModel, args.data.sender, args.data.receiver) ;
    if ( chatBox ) {
      const newMessage = await appendMessage(ChatBoxModel, chatBox, args.data.sender, args.data.body);

      const chatBoxName = getChatName(args.data.sender, args.data.receiver)
      pubsub.publish(`chatbox ${chatBoxName}`, {chatMessages: [...chatBox.messages, newMessage]});
      return newMessage;
    }
  },
  createChatBox: async (parent, args, { ChatBoxModel }, info) => {
    const chatBox = await validateChatBox(ChatBoxModel, args.user1, args.user2)
    return chatBox
    
  },
  clearDB: async (parent, args, { ChatBoxModel }, info) => {
    await ChatBoxModel.deleteMany({});
    return await ChatBoxModel.find({});
  }
};

export { Mutation as default };
