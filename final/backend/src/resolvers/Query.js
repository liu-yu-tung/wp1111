import { GraphQLError } from "graphql";
import { ContactsModel } from "../../models/ContactsModel";
import { NewsFeedModel } from "../../models/NewsFeedModel";
import { MemberModel } from "../../models/MemberModel";
const addText=(dict,key,level)=>{
    if(level<=0)return;
    for(let dkey in dict){
        if (dkey===key){
            dict["text"]=dict[dkey]
        }
        else if (typeof(dict[dkey])==='object' && dict[dkey]!==null && dkey!=="_id" && dkey[0]!=='$'){
            //console.log(dkey)
            addText(dict[dkey],key,level-1) 
        }
    }
    
}
const Query = {
    getContacts: async () => {
        return await ContactsModel.find()
    },
    getNewsFeeds: async()=>{
        return await NewsFeedModel.find().populate('Author')
    },
    getNewsFeed: async(_,{id})=>{
        return await NewsFeedModel.findOne({id}).populate('Author')
    },
    getMembers: async()=>{
        return await MemberModel.find()
    },
    getMember: async(_, {id})=>{
        return await MemberModel.findOne({id})
    }
};



export default Query;
