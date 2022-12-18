import { UserModel,MessageModel,ChatBoxModel } from '../models/chatbox'

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}
const makeName = (name,to) => {
    return [name,to].sort().join('_');
}
const broadcastMessage = (ws, chatBoxName, data, status) => {
    chatBoxes[chatBoxName].forEach((client) => {
        sendData(data, client);
    })
    sendStatus(status, ws);
}
const find_user = async(name) => {
    const user = await UserModel.findOne({name});
    if(user)
        return user;
    const newuser = await UserModel({name}).save();
    return newuser;
}
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if(!box)
        box = await new ChatBoxModel({ name, users: participants }).save();
    return box.populate(["users", {path: 'messages', populate: 'sender'}]);
}
const chatBoxes = {};
export default {
    onMessage: (wss,ws) => (
        async(byteString) => {
            const {data} = byteString;
            const [task,payload] = JSON.parse(data);
            switch(task){
                case 'chat': {
                    const {name,to} = payload;
                    const chatBoxName = makeName(name,to);
                    const sender = await find_user(name);
                    const receiver = await find_user(to);

                    if(ws.box != '' && chatBoxes[ws.box])
                        chatBoxes[ws.box].delete(ws);
                    ws.box = chatBoxName;

                    if(!chatBoxes[chatBoxName])
                        chatBoxes[chatBoxName] = new Set();
                    chatBoxes[chatBoxName].add(ws);

                    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
                    sendData(["chat", chatBox.messages.map(msg => {return {name: msg.sender.name, body: msg.body}})], ws);
                    break;
                }
                case 'message': {
                    const { name,body } = payload;
                    const sender = await find_user(name);
                    const chatBox = await validateChatBox(ws.box,[]);
                    const newmessage = await new MessageModel({sender: sender, body: body, chatBox: chatBox}).save();
                    chatBox.messages = [...chatBox.messages,newmessage];
                    await chatBox.save();
                    broadcastMessage(ws,ws.box,["message",payload],{type: 'success', msg: 'Message sent'});
                    break;
                }
                default: break;
            }
        }
    ),
    onClose: (ws) => (() => {
        if(ws.box !== "" && chatBoxes[ws.box])
            chatBoxes[ws.box].delete(ws);
    })
} 