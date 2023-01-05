import { QueryResolvers, TextType, LangType, Member } from "../types";
import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { db } from "../../db"
const Query: QueryResolvers = {
  greetings: async () => {
    return "Hello World";
  },
  getContactts: async () => {
    return [
      {
        name: {
          en: "facebook",
          ch: "臉書",
        },
        link: {
          url: "https://www.facebook.com/",
        },
        icon: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
        },
        backgroundImage: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
        },
        description: {
          en: "fac",
          ch: "臉書中文敘述",
        },
      },
      {
        name: {
          en: "Instagram",
          ch: "Instagram",
        },
        link: {
          url: "https://www.instagram.com/",
        },
        icon: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        },
        backgroundImage: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        },
        description: {
          en: "english description for Instagram",
          ch: "IG中文敘述",
        },
      },
      {
        name: {
          en: "Email",
          ch: "電子信箱",
        },
        link: {
          url: "https://mail.google.com/",
        },
        icon: {
          url: "https://static.vecteezy.com/system/resources/thumbnails/001/500/730/small/email-icon-free-vector.jpg",
        },
        backgroundImage: {
          url: "https://static.vecteezy.com/system/resources/thumbnails/001/500/730/small/email-icon-free-vector.jpg",
        },
        description: {
          en: "english description for Email",
          ch: "電子信箱中文敘述",
        },
      },
    ];
  },
  getContacts: async (_, { lang }) => {
    const isEn = lang === LangType.En;
    console.log(isEn);
    console.log(LangType);
    return [
      {
        name: {
          // en: "facebook",
          // ch: "臉書",
          text: isEn ? "facebook" : "臉書",
        },
        link: {
          url: "https://www.facebook.com/",
        },
        icon: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
        },
        backgroundImage: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
        },
        description: {
          // en: "",
          // ch: "臉書中文敘述",
          text: isEn ? "english description for facebook" : "臉書中文敘述",
        },
      },
      {
        name: {
          // en: "Instagram",
          // ch: "Instagram",
          text: "Instagram",
        },
        link: {
          url: "https://www.instagram.com/",
        },
        icon: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        },
        backgroundImage: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        },
        description: {
          // en: "english description for Instagram",
          // ch: "IG中文敘述",
          text: isEn ? "english description for Instagram" : "IG中文敘述",
        },
      },
      {
        name: {
          // en: "Email",
          // ch: "電子信箱",
          text: isEn ? "Email" : "電子信箱",
        },
        link: {
          url: "https://mail.google.com/",
        },
        icon: {
          url: "https://static.vecteezy.com/system/resources/thumbnails/001/500/730/small/email-icon-free-vector.jpg",
        },
        backgroundImage: {
          url: "https://static.vecteezy.com/system/resources/thumbnails/001/500/730/small/email-icon-free-vector.jpg",
        },
        description: {
          en: "english description for Email",
          ch: "電子信箱中文敘述",
          text: isEn ? "english description for Email" : "電子信箱中文敘述",
        },
      },
    ];
  },
  getMembers: async (_, __, { members }: { members: Member[] }) => {
    return members;
  },
  getNewsFeeds: async () => {
    return db
  },
  getNewsFeed: async (_, {id}) => {
    const index = db.findIndex((i) => i.id === id)
    return db[index]
  }
};

export default Query;
