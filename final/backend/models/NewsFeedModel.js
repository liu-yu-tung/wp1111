import mongoose from 'mongoose';
import { TextSchema, ImageSchema, UrlSchema } from './Element';
import { MemberSchema } from './MemberModel';
const Schema =mongoose.Schema


const NewsFeedSchema = new Schema({
    title: TextSchema,
    Author: {type: mongoose.Schema.Types.ObjectId, ref: 'MemberModel'},
    createdTime: Date,
    lastUpdateTime: Date,
    body: TextSchema,
    imgs: [ImageSchema],
    id: String,
})

const NewsFeedModel = mongoose.model('NewsFeedModel',NewsFeedSchema)
export {NewsFeedModel};