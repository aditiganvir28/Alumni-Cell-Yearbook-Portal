const mongoose = require("mongoose");
const Auth = require("./authModel");

const newSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Auth,
    },

    comments: [
        {
            user: String,
            comment: String,
        }
    ]
});

module.exports("new_comments", newSchema);