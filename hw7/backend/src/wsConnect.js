import Message from "./models/message"

const sendData = (data, ws) => {
    console.log(JSON.stringify(data))
    ws.send(JSON.stringify(data))
}
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws)
}
export default {
    initData: (ws) => {
        Message.find().sort({created_at: -1}).limit(100)
        .exec((err, res) => {
            if (err) throw err
            sendData(["init", res], ws)
        })
    },
    onMessage: (ws) => (
        async (btyeString) => {
            console.log("onMessage called")
            console.log(btyeString)
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
                    sendData(['output', [payload]], ws)
                    console.log("send: " + payload)
                    sendStatus({
                        type: 'success',
                        msg: 'recieved.'
                    }, ws)
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws)
                        sendStatus({
                            type: 'success',
                            msg: 'Message cache cleared.',
                        }, ws)
                    })
                    break
                }
                default: break
            }
        }
    )
}