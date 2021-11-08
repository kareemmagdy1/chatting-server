const User=require("../models/User");
const Msg=require("../models/Message")
const ContactProposal=require("../models/ContactProposal")
const defaultRoute=(req,res,next)=>{
  
    console.log("default");
    return res.status(200).json({"msg":"default route reached"})

}
const postAcceptContactProposal=(req,res,next)=>{
    let requestId=req.body.id;
    ContactProposal.findById(requestId,function(err,request){
        if(err){
            return res.status(500).json({"msg":"An Error Occurred","err":err.message})
        }
        if(request){
            let from =request.sender;
            let receiver=request.receiver;
            User.findById(from,function(err,user){
                if(err){
                    return res.status(500).json({"msg": "An error occurred"})
                }
                if(!user){
                    return res.status(500).json({"msg": "could not find sending user"})
                }
                user.contracts.add(receiver);
            })
            User.findById(receiver,function(err,user){
                if(err){
                    return res.status(500).json({"msg": "An error occurred"})
                }
                if(!user){
                    return res.status(500).json({"msg": "could not find receiving user"})
                }
                user.contracts.add(from);
            })
            ContactProposal.deleteOne({id:requestId},function(err){
                if(err){
                    return res.status(500).json({"err":err.message})
                }
            })
            return res.status(200).json({"msg":"added users to each others contracts"})
        }
    })
}

const postDeclineContactProposal=(req,res,next)=>{
    ContactProposal.deleteOne({id:requestId},function(err){
        if(err){
            return res.status(500).json({"err":err.message})
        }
        return res.status(204).json({"err":"contact proposal deleted"})
    })
}
const getContacts=(req,res,next)=>{
    try{
        let id=req.params.id;
        User.findOne({id:id},function(err,user){
            if(err){
                return res.status(500).json({"msg":err})
            }
            return res.status(200).json({"msg":"contracts retrieved successfully","contracts":user.contracts})
        })
    }catch(err){
        return res.status(500).json({"msg":err.message})
    }
}
const getProposals=(req,res,next)=>{
    try{
        let receiver=req.params.receiver;
        ContactProposal.findMany({receiver:receiver},function(err,proposals){
            if(err){
                return res.status(500).json({"msg":"error happened","err":err.message})
            }
            return res.status(200).json({"contact-proposals":proposals})
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({"msg":err.message})
    }
}
const postContactProposal=(req,res,next)=>{
    try{
        let firstUserId=req.body.first;
        let secondUserId=req.body.second;
        let proposal=new ContactProposal({from:firstUserId,receiver:secondUserId})
        proposal.save(function(err,proposal){
            if(err){
                return res.status(500).json({"msg":"error happened","err":err})
            }
            return res.status(201).json({"msg":"contact proposal created successfully","id":proposal._id.toString()})
        })
    }catch(err){
        return res.status(500).json({"err":err.message})
    }
}
const getMsg=(req,res,next)=>{
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

const postAcceptProposal=(req,res,next)=>{
    req.body.
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
module.exports.getProposals=getProposals;
module.exports.postContactProposal=postContactProposal;
module.exports.getContacts=getContacts;
module.exports.getMsg=getMsg;
module.exports.postMsg=postMsg;
module.exports.defaultRoute=defaultRoute;