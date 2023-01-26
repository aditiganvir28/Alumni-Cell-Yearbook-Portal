const mongoose = require("mongoose");
const Auth = require("./authModel");

const approvedSchema = new mongoose.Schema({
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

module.exports("approved_comments", approvedSchema);