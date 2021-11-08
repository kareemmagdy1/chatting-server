const User=require("../models/User");
const Msg=require("../models/Message")
const ContactProposal=require("../models/ContactProposal")


const getMsgs=(req,res,next)=>{
    console.log("here");
    try{
        //let id="6184f30f10a4b104130eb4e7"
        let id=req.params.id;
        Msg.findOne({from:id},function(err,msg){
            console.log(msg);
            return res.status(200).json({"msg":msg})
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({"msg":err.message})
    }

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

module.exports.getMsg=getMsg;
module.exports.postMsg=postMsg;
module.exports.defaultRoute=defaultRoute;