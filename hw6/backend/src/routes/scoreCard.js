import {query, Router} from 'express'
import ScoreCard from "../models/ScoreCard"

const router = Router()

router.delete("/cards", (req, res) => {
    console.log("router delete")
    deleteDB()
    res.status(200).send({message: `Database deleted`})
})

router.post("/card", (req, res) => {
    //console.log("router post")
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    saveData(name, subject, score, res)
    //res.send(`POST req send`)
})

router.get("/cards", (req, res) => {
    console.log("router get")
    //res.send(`GET req send`)
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