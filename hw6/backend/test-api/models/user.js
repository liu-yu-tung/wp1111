import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    id: Number, // equal {type: Number}
    name: String
})

const User = mongoose.model('User', UserSchema)

export default User