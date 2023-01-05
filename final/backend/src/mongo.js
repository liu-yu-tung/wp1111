import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

export default{
    connect:() =>{
        dotenv.config()
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        }).then((res)=>console.log("mongo db connection created"));
        mongoose.connection.on('error',console.error.bind(console,'connection error:'))
    }
}