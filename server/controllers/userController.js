const User = require("../models/userModel");
const Auth = require("../models/authModel");
const asyncHandler = require('express-async-handler')

const getAllusers = asyncHandler(async(rq,res) => {
    //Get all users from mongodb
        const users = await User.find().lean();


})

const createUsers = asyncHandler(async(rq,res) => {
    const {user_id} = req.body;

    d
})

// module.exports.usersData = async(req, res, next) =>{
//     try{
//         const {}
//     }
// }