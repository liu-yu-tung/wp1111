import { MutationResolvers, TextType, LangType, Member, NewsFeedType } from "../types";
import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import { uuid as uuidv4 } from "uuidv4";
import { db } from "../../db"
import { initInputToken } from "antd/es/input/style";

const Mutation: MutationResolvers = {
  createMember: async (_, { member }, { members }: { members: Member[] }) => {
    const membertemp: Member = {
      ...member,
      id: uuidv4(),
    };
    members.push(membertemp);
    return membertemp;
  },
  modifyMember: async (
    _,
    { member, id },
    { members }: { members: Member[] }
  ) => {
    const targetIndex = members.findIndex((m) => m.id === id);
    const membertemp = { ...member, id: id };
    members[targetIndex] = membertemp;
    return membertemp;
  },
  greetings: async (_, { data }) => {
      return "Hello World " + data;
  },
  createNewsFeed: async (_, {input}) => {
    const currtime = new Date(Date.now());
    const newFeed: NewsFeedType = {
      ...input,
      Author: null,
      createdTime: currtime,
      lastUpdateTime: currtime,
      id: uuidv4()
    } 
    return newFeed
  },
  modifyNewsFeed:async (_, {id}, {input}) => {
    const currtime = new Date(Date.now());
    const index = db.findIndex((i) => i.id === id);
    db[index] = {
      ...input,
      id: db[index].id,
      createdTime: db[index].id,
      lastUpdateTime: currtime,
    }
    return db[index]
  },
  deleteNewsFeed: async (_, {id}) => {
    const index = db.findIndex((i) => i.id === id);
    if (index === -1) return false
    //db = db.filter((i) => i.id !== id);
    return true
  }

};

export default Mutation;
