const asyncHandler = require('express-async-handler');
require("dotenv").config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt =  require('jsonwebtoken');
const Users = require("../models/userModel");
const MyComments = require("../models/my_comments");
const NewComments = require("../models/new_comments");
const ApprovedCommetns = require("../models/approved_comments");
const RejectedComments = require("../models/rejected_comments");
const session= require('express-session');

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: "sonih6664@gmail.com",
        pass: "efpefifpnzxwnnqb"
    }
})

//Geeting all the users data who have created their profile
const getUsersData = asyncHandler(async (req, res)=>{
    //Get all usersData from MongoDb
    const User = await Users.find();
    
    //If no usersData
    if(!User?.length){
        console.log('princy')
        // return res.status(400).json({message: 'No usersData found'});
        res.send("No userData found");
    }
    
    res.josn(User);
})

//Add a New User
const createUsersData = asyncHandler(async (req,res) =>{

    const { email, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} =req.body;

    //Confirm data
    // if(!user_id || !name || !roll_no || !academic_program || !department || !contact_details || !presonal_email_id || !designation || !about || !profile_img){
    //     return res.status(400).json({meassage: 'All fields are required'})
    // }

    // Check if email is in use
    // const existingUser = await Users.findOne({presonal_email_id: personal_email_id}).exec();

    //     if(existingUser){
    //         return res.status(409).send({
    //             message: "Email is already in use."
    //         });
    //     }

    // Create and store the new user
    const usersData = await Users.create({ email, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img})

    if(usersData){
        //created
        req.session.user=usersData;
        res.status(201).json({message: 'New user Created'})
    }
    else{
        res.status(400).json({message: 'Invalid userdata recieved'})
    }

    //Generate a veification token with th user's ID 
        const verificationToken = usersData.generateVerificationToken();
        try{
            //Email the user a unique verification link
        const url = `http://localhost:5000/verify/${verificationToken}`

        transporter.sendMail({
                    to: personal_email_id,
                    subject: 'Verify Account',
                    html: `Click <a href='${url}'>here</a> to confirm your email.` 
                })

                return res.status(201).send({
                    message:`Sent a verification email to ${email}`
                });
            }catch(err){
                return res.status(500).send(err);
            }

    if(err){
        console.log(err);
    }
})

const updateUserData = asyncHandler(async (req,res) => {
    const {email, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} = req.body;

    //Confirm data
    if(!email || !name || !roll_no || !academic_program || !department || !contact_details || !presonal_email_id || !designation || !about || !profile_img){
        return res.status(400).json({meassage: 'All fields are required'})
    }

    const userData = await Users.findById(user_id).exec();

    userData.name= name
    userData.roll_no= roll_no
    userData.academic_program= academic_program
    userData.department= department
    userData.contact_details= contact_details
    userData.personal_email_id= personal_email_id
    userData.current_company= current_company
    userData.designation=designation
    userData.about= about
    userData.profile_img = profile_img

    const updatedUserData = await User.save();

    res.json('Your data is updated');
})

const verify = async(req,res) => {
    const token = (req.params.id);

    //Check if we have an id

    if(!token){
        return res.status(422).send({
            message:"Missing Token"
        })
    }

    //Verify the token from the URL
    let payload = null
    try{
        payload = jwt.verify(
            token, process.env.SECRET
            
        );
    }catch(err) {
        return res.send(err);
    }
})

//Get the Mycomments for the user who is logged in
const getMyComments = asyncHandler (async (req,res) => {
    const user_email= req.body.user_email;

    const User = MyComments.find({user_email: user_email});

    if(!User?.length){
        return res.send("No comments made");
    }
    else{
        return res.send(User);
    }
})

//Get the newComments for the user who is logged in
const getNewComments = asyncHandler (async (req, res) => {
    const user_email = req.body.user_email;

    const User = MyComments.find({user_email: user_email});

    if(!User?.length){
        return res.send("No comments made");
    }
    else{
        return res.send(User);
    }
})

//Adding the approved comments to the approved table and delete it from the newComments table
const approvedComments = asyncHandler (async (req,res) =>{
    const user_email = req.body.user_email;
    const friend_email = req.body.friend_email;
    const friend_name = req.body.friend_name;
    const friend_comment = req.body.friend_comment;

    const User = ApprovedCommetns.find({user_email: user_email});

    try{
        //Find user with matching ID
        const user = await Users.findOne({_id: payload.ID}).exec();

        if(!user){
            console.log("reached")
            return res.status(404).send({
                message:"User does not exist"
            });
            
        };

        //Update user verification status to true

        user.verified =true;
        await user.save();

    if(!User.length){
        const NewUser = RejectedComments.create({user_email});
        const addApprovedComment = RejectedComments.update({_id: NewUser._id}, {$push: {comments: {friend_email: friend_email, friend_name: friend_name, comment: friend_comment}}});
        RejectedComments.save();
    }
}

module.exports = {
    getUsersData,
    createUsersData,
    updateUserData,
    verify,
    getProfileData,
    getWordEntered,
    getSearchWord
}