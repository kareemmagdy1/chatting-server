const User=require("../models/User");
const Msg=require("../models/Message")
const ContactProposal=require("../models/ContractProposal")




const getContracts=(req,res,next)=>{
    try{
        let id=req.query.id;
        User.findById({_id:id},function(err,user){
            if(err){
                return res.status(500).json({"msg":err})
            }
            if(!user){
                return res.status(400).json({"msg":"user null"})
            }
            if(user._id.toString()==id){
                console.log("sh8al")
            }
            console.log("userId: ",id)
            console.log(user)
            console.log(user._id.toString())
            return res.status(200).json({"msg":"contracts retrieved successfully","contracts":user.contracts})
        })
    }catch(err){
        return res.status(500).json({"msg":err.message})
    }
}


const postAcceptContractProposal=(req,res,next)=>{
    
    let requestId=req.params.id;
    console.log(requestId);
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
                user.contracts.push(receiver);
                user.save();
            })
            User.findById(receiver,function(err,user){
                if(err){
                    return res.status(500).json({"msg": "An error occurred"})
                }
                if(!user){
                    return res.status(500).json({"msg": "could not find receiving user"})
                }
                console.log(user._id.toString())
                user.contracts.push(from);
                user.save();
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

const postDeclineContractProposal=(req,res,next)=>{
    let requestId=req.params.id;
    console.log(requestId)
    console.log("deny")
    
    ContactProposal.deleteOne({id:requestId},function(err){
        if(err){
            return res.status(500).json({"err":err.message})
        }
        return res.status(204).json({"err":"contact proposal deleted"})
    })
}



const getProposals=(req,res,next)=>{
    try{
        let receiver=req.query.receiver;
        console.log(receiver);
        ContactProposal.find({receiver:receiver},function(err,proposals){
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

const postContractProposal=(req,res,next)=>{
    console.log("here in proposal");
    try{
        console.log("here")
        let firstUserId=req.body.first;
        let secondUserId=req.body.second;
        let proposal=new ContactProposal({sender:firstUserId,receiver:secondUserId})
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

module.exports.postAcceptContractProposal=postAcceptContractProposal;
module.exports.postDeclineContractProposal=postDeclineContractProposal
module.exports.getProposals=getProposals;
module.exports.postContractProposal=postContractProposal;
module.exports.getContracts=getContracts;