import mongoose from 'mongoose'

const Schema = mongoose.Schema
const DataSchema = new Schema({
    name: String,
    subject: String,
    score: Number
})

const ScoreCard = mongoose.model('User', DataSchema)

export default ScoreCard 