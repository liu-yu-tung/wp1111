import { json, Router } from "express"
import fileUpload from "express-fileupload";
import fs from 'fs'
import { middleAuthencate } from "./authecation";
const router = Router();
router.use(fileUpload())



router.put("/:route",middleAuthencate,async (req,res)=>{
    //TODO
    if(req.user===""){
        return res.status(403).json({ error: 'Not login' });
    }
    let foldername=req.params.route
    let file = req.files.file
    if(!fs.existsSync(`publicfiles/${foldername}/`)){
        fs.mkdirSync(`publicfiles/${foldername}/`)
    }
    let path=`publicfiles/${foldername}/`+(file.name.split('/').pop())
    file.mv(path);
    res.status(200).json({path})
})

export default router