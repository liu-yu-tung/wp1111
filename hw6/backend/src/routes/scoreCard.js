import {query, Router} from 'express'
import ScoreCard from "../models/ScoreCard"

const router = Router()

router.delete("/cards", (req, res) => {
    console.log("router delete")
    deleteDB()
    res.status(200).send({message: `Database deleted`})
})

router.post("/card", (req, res) => {
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    saveData(name, subject, score, res)
})

router.get("/cards", async (req, res) => {
    console.log(req.query)
    const type = req.query.type
    const str = req.query.queryString
    let find = false
    find = await ScoreCard.find({[type]:str})
    if (find != '') {
        console.log("found")
        const messages = find.map((i) => `Found card with ${type}:(${i.name}, ${i.subject}, ${i.score})`)
        console.log(messages)
        res.status(200).send({messages: messages})
    }
    else {
        if(type === 'name') {
            console.log("no name")
            res.status(200).send({message: `Name (${str}) not found` })
        }
        else {
            console.log("no sub")
            res.status(200).send({message: `Subject (${str}) not found`} )
        }
    }
})

const saveData = async (name, subject, score, res) => {
    const nameExisting = await ScoreCard.findOne({name: name, subject: subject})
    let exist = false
    if (nameExisting) {
        const updateResult = await ScoreCard.findOneAndUpdate(
            {"name": name, "subject": subject},
            {score: score}
        )
        console.log(updateResult)
        console.log('exist')
        exist = true
        res.status(200).send({message: `Updating(${name}, ${subject}, ${score})`, card: nameExisting})
    }
    try {
        if (!exist) {
            const newScoreCard = new ScoreCard({name, subject, score})
            console.log("Created data", newScoreCard)
            res.status(200).send({message: `Adding(${name}, ${subject}, ${score})`, card: newScoreCard})
            return newScoreCard.save()
        }
    }
    catch (e) {
        throw new Error("Data creation error: " + e)
    }
}

const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({})
        console.log("Database deleted")
    }
    catch (e) {
        throw new Error("Database deletion failed")
    }
}
export default router