const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Msg=require("../models/Message")

const defaultRoute=(req,res,next)=>{
  
    console.log("default");
    return res.status(200).json({"msg":"default route reached"})

}

const postMsg=(req,res,next)=>{
    let from=req.body.from;
    let to=req.body.to;
    let time=req.body.time;
    let content=req.body.content;
    const message=new Msg({from:from,to:to,time:time,content:content});
    message.save(function(err,doc){
        if(err){
            console.log(err)
            return res.status(400).json({"msg":err})
        }
        console.log("msg inserted");
        console.log(message);
        return res.status(201).json({"message":message,"msg":"msg created successfully"})
    })
}

module.exports.postMsg=postMsg;
module.exports.defaultRoute=defaultRoute;