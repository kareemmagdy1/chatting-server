const mongoose = require('mongoose');
const ContractProposalSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,        
    }
});


const ContactProposal = mongoose.model("ContactProposal", ContractProposalSchema);

module.exports=ContactProposal;