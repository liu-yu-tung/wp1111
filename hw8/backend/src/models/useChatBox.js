import ChatBoxModel from "./chatbox"

const makeName = (name, to) => {return [name.toLowerCase(), to.toLowerCase()].sort().join('_')}

const saveToDB = async (dataModel) => {
  try {await dataModel.save()} catch (error) {
    // console.log("this is a error: ")
    console.log(error)
    // console.log("error end here!")
    sendStatus({
      type: "error",
      msg: "error when saving to db"
    }, ws)
  }
}

const findChatBox = async (ChatBoxModel, User1, User2) => {
  const chatBoxName = makeName(User1, User2) 
  let newChatBox = await ChatBoxModel.findOne({ name: chatBoxName }) 
  if (newChatBox) {return newChatBox}
  return false
}

const validateChatBox = async (ChatBoxModel, User1, User2) => {
  const chatBoxName = makeName(User1, User2) ;
  let newChatBox = await findChatBox(ChatBoxModel, User1, User2);
  if (!newChatBox) {
    newChatBox = new ChatBoxModel({name: chatBoxName, users: [User1.toLowerCase(), User2.toLowerCase()], messages: []})
    await saveToDB(newChatBox)
  }
  return newChatBox
}

const appendMessage = async (ChatBoxModel, ChatBox, from, body) => {
  console.log("appending message: ", from, body)
  const newMessage = {
    sender: from.toLowerCase(),
    body: body
  }
  const newMessages = [...ChatBox.messages, newMessage]
  try {
    await ChatBoxModel.updateOne( {_id: ChatBox._id}, {$set: {messages: newMessages}})
  } catch (error) {
    console.log("failed to update message")
  }
  return newMessage;
}


export { validateChatBox, makeName, findChatBox, appendMessage }