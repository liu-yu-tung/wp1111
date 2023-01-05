import express from 'express';
import cors from 'cors';
//import db from './db';
import routes from './routes'
import fileUpload from "express-fileupload";
import { ContactsModel } from '../models/ContactsModel';
import { NewsFeedModel } from '../models/NewsFeedModel';
import { MemberModel } from '../models/MemberModel';
import { AccountModel } from '../models/AccountModel';
import mongo from './mongo.js';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import * as fs from 'fs'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import { MD5 } from 'crypto-js';

mongo.connect()
const pubsub = createPubSub();
const yoga = new createYoga({
    schema: createSchema({
      typeDefs: fs.readFileSync('./src/schema.graphql','utf-8'),
      resolvers: {
        Query,
        Mutation,
      },
    }),
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';
      // try to retrieve a user with the token
      const account = await AccountModel.findOne({hash:MD5(token).toString()})
      const user = (account?.accountName)??""
      // add the user to the context
      return { user };
    },
    graphiql:{
      subscriptionsProtocol:'WS'
    },
    //logging:'debug'
  });
const app = express();
app.use(cors())
app.use(express.json())
app.use('/',routes);

app.use('/graphql', yoga);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`)
});
/*
const box=new ContactsModel({
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
}).save()

const box2=new MemberModel({
  name: {
    en:"no",
    ch:"不"
  },
  role: "yes",
  group: "yes",
  avatar: {
    url:"yes"
  },
  introduction: {
    en:"ino",
    ch:"i不"
  },
  id:"1",
}).save()

*/
/*const box3=new NewsFeedModel({
  title: {
          en: "english title 2",
          ch: "chinese title 2",
        },
        Author: '63b2e354a3acfe198d97ff4e',
        createTime: "2022-12-21",
        lastUpdateTime: "2023-1-4",
        body: {
          en: "en body 2",
          ch: "ch body 2",
        },
        img: { url: "" },
        id: "1",
}).save()*/