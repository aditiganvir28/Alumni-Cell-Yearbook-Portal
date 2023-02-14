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


const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: "aditi10328@gmail.com",
        pass: "sedmznapvcnyavsh"
    }
})

//Geeting all the users data who have created their profile
const getUsersData = asyncHandler(async (req, res)=>{
    //Get all usersData from MongoDb
    const User = await Users.find();
    
    //If no usersData
    if(!User?.length){
        return res.send({message: "No userData found"});
    }
    
    res.send(User);
})

//Add a New User
const createUsersData = asyncHandler(async (req,res) =>{

    const { email, name, roll_no, academic_program, department, personal_email_id, contact_details,  current_company, designation, about, profile_img} =req.body;
    console.log(req.body);
    // Confirm data
    // if(!email || !name || !roll_no || !academic_program || !department || !contact_details || !personal_email_id || !designation || !about || !profile_img){
    //     // return res.status(400).json({meassage: 'All fields are required'})
    //     return res.send({message: "All fields are required"});
    // }

    // Check if email is in use
    // const existingUser = await Users.findOne({presonal_email_id: personal_email_id}).exec();

    //     if(existingUser){
    //         return res.send({message:"Email is already in use"});
    //     }

    // Create and store the new user
    const usersData = await Users.create({ email, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img})

    if(usersData){
        //created
        res.send({message: "New User Created"});
    }
    else{
        res.send({message: "Invalid Userdata Recieved"});
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

                return res.send({
                    message:`Sent a verification email to ${email}`
                });

            }catch(err){
                return res.status(500).send(err);
            }
})

//Verify the personal_email_id
const verify = async(req,res) => {
    const token = (req.params.id);

    //Check if we have an id
    if(!token){
        return res.send({message: "Missing token"});
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

    try{
        //Find user with matcjhing ID
        const user = await Users.findOne({_id: payload.ID}).exec();

        if(!user){
            return res.send({message: "User does not exist"});
        };

        //Update user verification status to true
        user.verified =true;
        await user.save();

        return res.redirect('http://localhost:3000/profile')
    } catch(err){
        return res.status(500).send(err);
    }
}

//Upadte users data
const updateUserData = asyncHandler(async (req,res) => {
    const {email, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} = req.body;

    //Confirm data
    // if(!email || !name || !roll_no || !academic_program || !department || !contact_details || !personal_email_id || !designation || !about || !profile_img){
    //     return res.status(400).json({meassage: 'All fields are required'})
    // }

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

    const updatedUserData = await Users.save();

    res.json('Your data is updated');
})

//find a user who logged in in user's data
const findAUser = asyncHandler (async (req,res)=>{
    const email = req.body.email;

    const User = await Users.find({email: email}).exec();

    if(!User.length){
        res.send({message: "No user Found"});
    }
    else{
        res.send({message:"User Found", User});
    }
})

//Get Users data who has logged in to be displayed on the profile page
const getProfileData = asyncHandler(async (req,res)=>{

    const {email} = req.body;

    const User = await Users.find({email: email}).exec();

    if(!User.length){
        res.send({message: "No User Found"})
    }else{

    res.send({message:"User Found", User});
    }
})

//Get a list of users whose name start with the word entered on the searchbar
const getWordEntered = asyncHandler(async (req,res) => {

    const wordEntered = req.body.wordentered;

    const User = await Users.find({name: {$regex: new RegExp('^'+wordEntered+'.*', 'i')}}).exec();

    if(!User?.length){
        // return res.status(400).json({message: 'No usersData found'});
        return res.send({message:"No userdata found"});
    }

    res.send(User);

})

//Get the Users data who is being searched
const getSearchWord = asyncHandler(async (req,res) =>{
    const searchWord = req.body.searchword;


    const User = await Users.find({email: searchWord});

    if(!User?.length){
        // return res.status(400).json({message: 'No usersData found'});
        return res.send({message:"No userdata found"});
    }

    res.send(User);
})

//Add comments to myComments section of user who is logged in
const myComments = asyncHandler(async (req,res)=>{
    const comment = req.body.comment;
    const friend_email = req.body.friend_email;
    const friend_name = req.body.friend_name;
    const user_email = req.body.user_email;
    //Find if the user exists in the table
    const User = await MyComments.find({user_email: user_email});
    //If Found
    if(!User?.length){
        const newUser = await MyComments.create({user_email});
        const addComment = await MyComments.findOneAndUpdate({_id: newUser._id}, {$push:{comment: {friend_email: friend_email, friend_name: friend_name, comment: comment}}}).exec();
        // MyComments.save();
        console.log(addComment)
        return res.send(newUser);
    }
        const addComment = await MyComments.findOneAndUpdate({_id: User[0]._id}, {$push: {comment: {friend_email: friend_email, friend_name: friend_name, comment: comment}}}).exec();
        // MyComments.save();
        console.log(addComment);
        return res.send(User);
})

//Add comments to the newComments Section of the friend for whom the comment is being made
const newComments = asyncHandler(async (req,res)=>{
    const comment = req.body.comment;
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name= req.body.user_name;

    console.log(friend_email);
    const User1 = await NewComments.find({user_email: friend_email});

    if(!User1?.length){
        const newComment = await NewComments.create({friend_email});
        const addedComment = await NewComments.findOneAndUpdate({_id: newComment._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}});
        console.log(addedComment);
        return res.send(newComment);
    }
    else{
        const addedComment = await NewComments.findOneAndUpdate({_id: User1[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment:comment}}});
        console.log(addedComment);
        return res.send(User1);
    }

    if(err){
        return res.send(err);
    }
})

//Get the Mycomments for the user who is logged in
const getMyComments = asyncHandler (async (req,res) => {
    const user_email= req.body.user_email;

    const User = MyComments.find({user_email: user_email}, (err, docs) =>{
        if(err){
            console.log(err);
        }
    
        res.json(docs);
    });
})

//Get the newComments for the user who is logged in
const getNewComments = asyncHandler (async (req, res) => {
    const friend_email = req.body.friend_email;

    const User = NewComments.find({friend_email: friend_email}, (err, docs) =>{
        if(err){
            console.log(err);
        }
    
        res.json(docs);
    });
})

//Adding the approved comments to the approved table and delete it from the newComments table
const approvedComments = asyncHandler (async (req,res) =>{
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name = req.body.user_name;
    const comment = req.body.comment;
    var Userid;
    console.log(friend_email);
    console.log(user_email);
    console.log(user_name);
    console.log(comment);
    const User = ApprovedCommetns.find({friend_email: friend_email}, (err, doc)=>{
        if(err){
            console.log(err);
        }
        // console.log(doc.length);
        if(doc.length===0){
            const NewUser = ApprovedCommetns.create({friend_email}, (err,docs)=>{
                if(err){
                    donsole.log(err);
                }
                // console.log(docs);
                const addApprovedComment = ApprovedCommetns.findOneAndUpdate({_id: docs._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                    if(err){
                        console.log(err);
                    }
                    // console.log(documents);
                });
                return(docs);
            });
        }
        else{
            const addApprovedComment = ApprovedCommetns.findOneAndUpdate({_id: doc[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                if(err){
                    console.log(err);
                }
                // console.log(documents);
            });
        }
    });

    //Delete that comment from NewComments
    const User1 = NewComments.find({friend: friend_email}, (err,docs)=>{
        if(err){
            console.log(err)
        }
        const deleteComment = NewComments.findOneAndUpdate({_id: docs[0]._id}, {$pull: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (err,doc)=>{
            if(err){
                console.log(err);
            }
    
            console.log(doc);
        });
    });
    
})

////Adding the rejected comments to the rejected table and delete it from the newComments table
const rejectedComments = asyncHandler (async (req, res) =>{
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name = req.body.user_name;
    const comment = req.body.comment;

    const User = RejectedComments.find({friend_email: friend_email}, (err, doc)=>{
        if(err){
            console.log(err);
        }
        // console.log(doc.length);
        if(doc.length===0){
            const NewUser = RejectedComments.create({friend_email}, (err,docs)=>{
                if(err){
                    donsole.log(err);
                }
                // console.log(docs);
                const addRejectedComment = RejectedComments.findOneAndUpdate({_id: docs._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                    if(err){
                        console.log(err);
                    }
                    // console.log(documents);
                });
                return(docs);
            });
        }
        else{
            const addRejectedComment = RejectedComments.findOneAndUpdate({_id: doc[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                if(err){
                    console.log(err);
                }
                // console.log(documents);
            });
        }
    });

    //Delete that comment from NewComments
    const User1 = NewComments.find({friend: friend_email}, (err,docs)=>{
        if(err){
            console.log(err)
        }
        const deleteComment = NewComments.findOneAndUpdate({_id: docs[0]._id}, {$pull: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (err,doc)=>{
            if(err){
                console.log(err);
            }
    
            console.log(doc);
        });
    });
    
})

//Get all the approved comments for the user who is logged in
const getApprovedComments = asyncHandler (async (req,res) => {
    const user_email = req.body.user_email;

    const User = ApprovedCommetns.find({user_email: user_email});

    if(!User?.length){
        return res.send({message: "No comments made"});
    }
    else{
        return res.send(User);
    }
})

//Get all the rejected comments for the user who is logged in
const getRejectedComments = asyncHandler (async (req,res) => {
    const user_email = req.body.user_email;

    const User = RejectedComments.find({user_email: user_email});

    if(!User?.length){
        return res.send({message: "No comments made"});
    }
    else{
        return res.send(User);
    }
})

module.exports = {
    getUsersData,
    createUsersData,
    updateUserData,
    verify,
    getProfileData,
    getWordEntered,
    getSearchWord,
    getRejectedComments,
    getApprovedComments,
    rejectedComments,
    approvedComments,
    getNewComments,
    getMyComments,
    myComments,
    newComments,
    findAUser
}