import mongoose from 'mongoose';

const Schema =mongoose.Schema


const TextSchema = new Schema({
    en: String,
    ch: String,
})

const ImageSchema = new Schema({
    url:String
})

const UrlSchema = new Schema({
    url:String
})

const groupRoleSchema = new Schema({
    group:String,
    role:String
})

export {TextSchema,ImageSchema,UrlSchema,groupRoleSchema};