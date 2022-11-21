import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import mongo from './mongo'
import wsConnect from './wsConnect'

mongo.connect()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!")
    wss.on('connection', (ws) => {
        //console.log(ws)
        let time = new Date()
        ws.onmessage = wsConnect.onMessage(ws)
        console.log("ws on msg " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())
        console.log("=====")
    })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})