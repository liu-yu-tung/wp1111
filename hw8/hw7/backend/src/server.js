import express from 'express'
import http from 'http';
import WebSocket from 'ws'
import mongoose from 'mongoose';
import wsConnect from './wsConnect';
import mongo from './mongo.js';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server: server});
const db = mongoose.connection;
const PORT = process.env.PORT || 4000;

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
    // Define WebSocket connection logic
        ws.box = '';
        ws.onmessage = wsConnect.onMessage(wss,ws);
        ws.onclose = wsConnect.onClose(ws);
    });
});

server.listen(PORT, () =>
    console.log(`server listening on port ${PORT}!`),
);


