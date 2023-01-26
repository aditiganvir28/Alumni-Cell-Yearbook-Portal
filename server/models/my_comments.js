const mongoose = require("mongoose");
const Auth = require("./authModel");

const mySchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
    },
    comment:{
        type: String
    }
});

module.exports("my_comments", mySchema);