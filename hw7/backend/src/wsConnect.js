import Message from "./models/message"
import {MessageModel, UserModel, ChatBoxModel} from './models/chatbox'

const makeName = (name, to) => { return [name, to].sort().join('_')}
const validateUser = async(name) => {
    console.log("Finding..."+ name);
    const existing = await UserModel.findOne({name})
    console.log(existing)
    if (existing) return existing
    //else 
}
const sendData = (data, ws) => {
    //console.log(JSON.stringify(data))
    ws.send(JSON.stringify(data))
    //console.log("broadcast data")
}
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws)
    //console.log("broadcast status")
}
const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client)
        sendStatus(status, client)
        console.log("broadcast client")
    })
}
export default {
    initData: (ws) => {
        Message.find().sort({created_at: -1}).limit(100)
        .exec((err, res) => {
            if (err) throw err
            sendData(["init", res], ws)
        })
    },
    onMessage: (wss, ws) => (
        async (btyeString) => {
            console.log("onMessage called")
            //console.log(btyeString)
            const {data} = btyeString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'chat': {
                    const {name, to} = payload;
                    console.log("chat: ")
                    console.log(name)
                    console.log(to)
                    break
                }
                case 'message': {
                    const {name, to, body} = payload;
                    console.log("message: ")
                    console.log(name)
                    console.log(to)
                    console.log(body)
                    const sender = name
                    const message = new MessageModel({body})
                    try {
                        await message.save()
                        console.log("msg saved")
                    }
                    catch (e) {
                        throw new Error ("Message DB save error: " + e)
                    }
                    break
                }
                case 'input': {
                    const {name, body} = payload
                    const message = new Message({name, body})
                    try {
                        await message.save()
                        console.log("msg saved")
                    }
                    catch (e) {
                        throw new Error ("Message DB save error: " + e)
                    }
                    const data = ['output', [payload]]
                    const status = {
                        type: 'success',
                        msg: 'recieved.'
                    }
                    broadcastMessage(wss, data, status)
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws)
                        sendStatus({
                            type: 'success',
                            msg: 'Message cache cleared.',
                        }, ws)
                    }
                    )
                    const data = ['cleared']
                    const status = {
                        type: 'success',
                        msg: 'Message cache cleared.',
                    }
                    broadcastMessage(wss, data, status)

                    break
                }
                default: break
            }
        }
    )
}