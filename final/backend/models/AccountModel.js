import mongoose from 'mongoose';
const Schema =mongoose.Schema


const AccountSchema = new Schema({
    accountName: String,
    hash: String
})

const AccountModel = mongoose.model('AccountModel',AccountSchema)
export {AccountModel};