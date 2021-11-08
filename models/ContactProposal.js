const mongoose = require('mongoose');
const ContactProposalSchema = new mongoose.Schema({
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


const ControlProposal = mongoose.model("ContactProposal", ContactProposalSchema);

module.exports=ControlProposal;