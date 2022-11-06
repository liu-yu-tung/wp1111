import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import routes from './routes'
import db from './db'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})
app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`)
})

export default {
    connnect: () => {

    }
}