const User = require("../models/User")

const getStatus = (req, res, next) => {
    let id = req.userId;
    User.findById(id, function (err, user) {
        if (err) {
            return res.status(500).json({ "msg": err.message })
        }
        if (!user) {
            return res.status(404).json({ "msg": "no user found of that id" })
        }
        return res.status(200).json({ "msg": "status retrieved successfully", "status": user.status })
    })
}

const postStatus = (req, res, next) => {
    let id = req.userId;
    let newStatus = "offline";
    try {
        User.findById(id, function (err, user) {
            if (err) {
                return res.status(500).json({ "msg": err.message })
            }
            if (!user) {
                return res.status(404).json({ "msg": "no user found of that id" })
            }
            user.status = newStatus;
            user.save();
            return res.status(200).json({ "msg": "changed status  successfully" })
        })
    } catch (err) {
        return res.status(500).json({ "responseMessage": err });
    }
}

module.exports.getStatus = getStatus;
module.exports.postStatus = postStatus;
