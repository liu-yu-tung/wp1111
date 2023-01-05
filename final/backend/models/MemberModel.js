import mongoose from 'mongoose';
import { TextSchema, ImageSchema, UrlSchema, groupRoleSchema} from './Element';
const Schema =mongoose.Schema


const MemberSchema = new Schema({
    name: TextSchema,
    role: String,
    group: String,
    avatar: ImageSchema,
    introduction: TextSchema,
    id: String,
    departmentYear: TextSchema,
    school: TextSchema,
    groupRole:[groupRoleSchema]
})

const MemberModel = mongoose.model('MemberModel',MemberSchema)

export {MemberSchema,MemberModel};