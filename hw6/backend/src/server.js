import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import db from './db'

const app = express()
const path = require('path')

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    console.log("prod")
    app.use(express.static(path.join(__dirname, "../frontend", "build")))
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })

}
else {
    console.log("no prod")
}
const port = process.env.PORT || 4000

db.connect()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})