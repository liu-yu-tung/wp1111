import mongoose from 'mongoose';
import { TextSchema, ImageSchema, UrlSchema, gro } from './Element';
const Schema =mongoose.Schema


const ContactsModelSchema = new Schema({
    name: TextSchema,
    link: UrlSchema,
    icon: ImageSchema,
    backgroundImage:ImageSchema,
    description: TextSchema,
    id: String
})

const ContactsModel = mongoose.model('ContactsModel',ContactsModelSchema)
export {ContactsModel};