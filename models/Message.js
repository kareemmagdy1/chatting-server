const mongoose = require('mongoose');
const MsgSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,        
    },
    content: {
        type: String,
        required: true
    },
    time : { 
        type : Date, 
        default: Date.now ,
        required:true 
    }
});


const Msg = mongoose.model("Msg", MsgSchema);

module.exports=Msg;