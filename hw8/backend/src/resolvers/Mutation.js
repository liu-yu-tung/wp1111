import {v4 as uuidv4} from 'uuid';
import { findChatBox, validateChatBox, makeName, appendMessage } from '../models/useChatBox'

const Mutation = {
  sendMessage: async (parent, args, { pubsub, ChatBoxModel }, info) => {
    const sender = args.data.sender
    const receiver = args.data.receiver
    const body = args.data.body
    const chatBox = await findChatBox(ChatBoxModel, sender, receiver) ;
    if ( chatBox ) {
      const newMessage = await appendMessage(ChatBoxModel, chatBox, sender, body);
      const chatBoxName = makeName(sender, receiver)
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
