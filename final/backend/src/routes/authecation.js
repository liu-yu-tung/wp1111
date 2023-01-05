import { Router } from "express"
import { AccountModel } from '../../models/AccountModel'
import { MD5 } from "crypto-js";

async function middleAuthencate(req, res, next){
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    const token=req.headers.authorization
    const account = await AccountModel.findOne({hash:MD5(token).toString()})
    req.user = (account?.accountName)??""
    
    next();
};

const router = Router();

router.get("/",async (req,res)=>{
    if (!req.headers.authorization) {
        return res.status(200).json({ account: "" });
    }
    const token=req.headers.authorization
    const account = await AccountModel.findOne({hash:MD5(token).toString()})
    return res.status(200).json({ account: (account?.accountName)??"" });
})

export {middleAuthencate,router as authecationRouter}