import { GraphQLError } from "graphql";
import { ContactsModel } from "../../models/ContactsModel";
import { NewsFeedModel } from "../../models/NewsFeedModel";
import { MemberModel } from "../../models/MemberModel";
import { v4 as uuidv4 } from 'uuid';
import { merge } from "lodash";

const IsMember=(user)=>{
    if(user==""){
        throw new GraphQLError("Not validate")
    }
}


const Mutation = {
    createContacts:async(_,{contacts},context)=>{
        IsMember(context.user)
        return await new ContactsModel({id:uuidv4(),...contacts}).save()
    },
    modifyContacts:async(_,{id,contacts},context)=>{
        IsMember(context.user)
        const ori=await ContactsModel.findOne({id})
        merge(ori,contacts)
        await ori.save()
        return await ContactsModel.findOne({id})
    },
    deleteContacts:async(_,{id},context)=>{
        IsMember(context.user)
        const mem=await ContactsModel.findOne({id})
        await ContactsModel.deleteMany({id})
        return mem
    },

  modifyMember: async (_, { member },context) => {
    IsMember(context.user)
    const id = member.id;
    const ori=await MemberModel.findOne({id})
    merge(ori,member)
    await ori.save()
    return await MemberModel.findOne({ id });
  },
  deleteMember: async (_, { id },context) => {
    IsMember(context.user)
    const mem = await MemberModel.findOne({ id });
    await NewsFeedModel.updateMany(
      { Author: mem._id },
      { $unset: { Author: "" } }
    );
    await MemberModel.deleteMany({ id });
    return mem;
  },
  createMember: async (_, { member },context) => {
    IsMember(context.user)
    return await new MemberModel({ id: uuidv4(), ...member }).save();
  },

  modifyNewsFeed: async (_, { id, input },context) => {
    IsMember(context.user)
    if (input?.Author) {
      const member = await MemberModel.findOne({ id: input.Author.id });
      input.Author = member._id;
      if (!input.Author) {
        throw new GraphQLError("No this author");
      }
    }
    /*
        const original=NewsFeedModel.findOne({id})
        if(!original){
            throw GraphQLError("not exist")
        }*/

    const lastUpdateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
    });
    const ori=await NewsFeedModel.findOne({id})
    merge(ori,input,{lastUpdateTime})
    await ori.save()
    return await NewsFeedModel.findOne({ id }).populate("Author");
  },
  createNewsFeed: async (_, { input },context) => {
    IsMember(context.user)
    const time = new Date(Date.now());
    const lastUpdateTime = time.toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
    });
    const createdTime = time.toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
    });

    if (input?.Author) {
      const member = await MemberModel.findOne({ id: input.Author.id });
      input.Author = member._id;
      if (!input.Author) {
        throw GraphQLError("No this author");
      }
    }
    const id = uuidv4();
    await new NewsFeedModel({
      id,
      lastUpdateTime,
      createdTime,
      ...input,
    }).save();
    return await NewsFeedModel.findOne({ id }).populate("Author");
  },
  deleteNewsFeed: async (_, { id },context) => {
    IsMember(context.user)
    await NewsFeedModel.deleteMany({ id });
    return true;
  },
};

export default Mutation;
