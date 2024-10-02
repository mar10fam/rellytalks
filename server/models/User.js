const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 40,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        min: 6
    },
    description: {
        type: String,
        default: "",
        max: 180
    },
    pfp: {
        type: String,
        default: ""
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);