const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Auth", userSchema);