import Message from "./models/message"

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
    onMessage: (wss) => (
        async (btyeString) => {
            console.log("onMessage called")
            //console.log(btyeString)
            const {data} = btyeString
            const [task, payload] = JSON.parse(data)
            switch (task) {
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