const Msg=require("../models/Message")

//TODO functionality : use websockets instead of normal restapis
const getMsgs=(req,res)=>{
    try{
        let userId=req.params.id;
        Msg.findOne({receiver:userId},function(err,msg){
            console.log(msg);
            return res.status(200).json({"msg":msg})
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({"msg":err.message})
    }

}

const editMsg=(req,res)=>{
    let msgId=req.body.id;
    let newMsg=req.body.message;
    Msg.updateOne({id:msgId},{content:newMsg},function(err){
        if(err){
            return res.status(500).json({"err":err.message})
        }

        return res.status(204).json({"msg":"message updated successfully"})
    })
} 

const deleteMsg=(req,res)=>{
    let msgId=req.body.id;
    let newMsg=req.body.message;
    Msg.deleteOne({id:msgId},{content:newMsg},function(err){
        if(err){
            return res.status(500).json({"err":err.message})
        }

        return res.status(204).json({"msg":"message updated successfully"})
    })
}

const postMsg=(req,res)=>{
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
        return res.status(201).json({"message":message,"msg":"msg created successfully"})
    })
}

module.exports.editMsg=editMsg;
module.exports.deleteMsg=deleteMsg;
module.exports.getMsgs=getMsgs;
module.exports.postMsg=postMsg;
