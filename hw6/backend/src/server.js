import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import db from './db'

const app = express()
const port = process.env.PORT || 4000

db.connect()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})