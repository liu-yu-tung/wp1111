import Message from "./models/message"

const sendData = (data, ws) => {
    console.log(JSON.stringify(data))
    ws.send(JSON.stringify(data))
}
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws)
}
export default {
    onMessage: (ws) => (
        async (btyeString) => {
            console.log("onMessage called")
            console.log(btyeString)
            const {data} = btyeString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'input': {
                    const {name, body} = payload
                    //TODO: Save payload to DB
                    const message = new Message({name, body})
                    try {
                        await message.save()
                        console.log("msg saved")
                    }
                    catch (e) {
                        throw new Error ("Message DB save error: " + e)
                    }
                    //TODO: Response to clinet
                    sendData(['output', [payload]], ws)
                    console.log("send: " + payload)
                    sendStatus({
                        type: 'success',
                        msg: 'recieved.'
                    }, ws)
                    break
                }
                default: break
            }
        }
    )
}