import fs from "fs"

class configFile{
    constructor(fileName){
        this.fileName=fileName
        console.log(__dirname)
        fs.readFile(fileName,"utf8",(err,jsonString)=>{
            if(err){
                console.log("file open failed")
                console.log(err)
                return
            }
            this.json=JSON.parse(jsonString)
        })
    }
    save=()=>{
        fs.writeFile(this.fileName,JSON.stringify(this.json,null,2),err=>{
            if(err){
                console.log("file write failed")
                console.log(err)
            }else{
                console.log("file saved")
            }
        })
    }
}


export default configFile