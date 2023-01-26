const User = require("../models/userModel");
const Auth = require("../models/authModel");
const asyncHandler = require('express-async-handler')

const getAllusers = asyncHandler(async(rq,res) => {
    //Get all users from mongodb
        const auths = await Auth.find().lean();
    //if no users
    if(!auths?.length){
        return res.status(400).json({message:"No users found"})
    }
    res.json(auths);
})

const createUsers = asyncHandler(async(rq,res) => {
    const {user_id, email} = req.body;

    //Create and store user
    const auths = await Auth.create(userObject);

    if(auths){
        //created
        res.status(201).json({message: `new user created`})
    }else{
        res.status(400).json({message: 'Invalid user data recieved'})

    }
})

module.exports = {
    getAllusers,
    createUsers
}