const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    status:{
        type: ["online","offline","away","do no disturb"],
        default: "online"
    },
    profilePic:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    contracts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User"
    }]
});

UserSchema.methods.validPassword = function (password) {

    return this.password == password;
}

const User = mongoose.model("User", UserSchema);

module.exports=User;