import { validate } from 'graphql';
import { findChatBox, getChatName, validateChatBox } from '../models/useChatBox'


const Query = {
  getChatBoxMessages: async (parent, args, { ChatBoxModel }, info) => {
    const chatBoxName = getChatName(args.user1, args.user2) ;
    // const chatBox = await findChatBox(ChatBoxModel, args.user1, args.user2) ;
    const chatBox = await validateChatBox(ChatBoxModel, args.user1, args.user2) ;
    console.log(chatBox)
    if (chatBox) return chatBox.messages ;

  },
  getChatBoxes: async (parent, args, { ChatBoxModel }, info) => {
    const temp = await ChatBoxModel.find({});
    console.log(temp);
    return temp ;
  }
};

export { Query as default };
