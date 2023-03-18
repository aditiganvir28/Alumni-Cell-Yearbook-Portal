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
const fast2sms = require("fast-two-sms");

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: "sonih6664@gmail.com",
        pass: "zonxexpoudhsqytv"
    }
})
const { createJwtToken } = require("../utils/token.util");
const { generateOTP} = require("../utils/otp.util");

//Geeting all the users data who have created their profile
const getUsersData = asyncHandler(async (req, res)=>{
    //Get all usersData from MongoDb
    const User = await Users.find();
    
    //If no usersData
    if(!User?.length){
        return res.send({message: "No userData found"});
    }
    
    return res.send(User);
})

//Add a New User
const createUsersData = asyncHandler(async (req,res) =>{

    const { email, name, roll_no, academic_program, department, personal_email_id, contact_details, alternate_contact_details, address, current_company, designation, about, profile_img} =req.body;

    console.log(req.body);

    // Confirm data
    if(!email || !name || !roll_no || !department || !contact_details || !alternate_contact_details || !address || !personal_email_id || !designation || !about || !profile_img){

        return res.send({message: "All fields are required"});
    }

    // Check if email is in use
    // const existingUser = await Users.findOne({presonal_email_id: personal_email_id}).exec();

    //     if(existingUser){
    //         return res.send({message:"Email is already in use"});
    //     }

    // // Check if contact_no is in use
    // const existingUser2 = await Users.findOne({contact_details: contact_details}).exec();

    //     if(existingUser2){
    //         return res.send({message:"Mobile number is already in use"});
    //     }

    // Create and store the new user
    const usersData = await Users.create({ email, name, roll_no, academic_program, department, contact_details, alternate_contact_details, address, personal_email_id, current_company, designation, about, profile_img})

    if(usersData){
        //created
        res.send({message: `Sent a verification email to ${personal_email_id}`});
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
                    message:`Sent a verification email to ${personal_email_id}`
                });
            }catch(err){
                console.log(err);
            }
    try{
    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    usersData.phoneOTP = otp;
    await usersData.save();

    const accountSid = "AC3d44bb903d40babb4fdad3c626de8edc";
    const authToken = "6cce98e7ef4d627822b3e5c47d5b43db";
    const client = require("twilio")(accountSid, authToken);
    client.messages
        .create({ 
            body: `Your otp is ${otp}` , 
            from: "+15074426876", 
            to: usersData.contact_details
         }).then(message => 
            console.log(message.sid));
        } catch (error) {
        console.log(error);
}
})
  
// ---------------------- verify phone otp -------------------------
  
  verifyPhoneOtp = async (req, res, next) => {
    try {
      const phoneOtp = req.body.phoneOTP;
      const userId = req.body.userId;

      const user = await Users.findOne({email: userId}).exec();
      console.log(userId);
      if (!user) {
        res.send({message: "User not found"});
        return;
      }

      if (user.phoneOTP !== phoneOtp) {
        res.send({message: "Incorrect OTP"});
        return;
      }
      const token = createJwtToken({ userId: user._id });
      
    user.phoneOTP = "";
    user.two_step_verified= true;
    await user.save();
    res.send("Mobile number verified");
    // return res.redirect('http://localhost:3000/')
    } catch (error) {
      next(error);
    }
  };

//Resend OTP

const resendOTP = asyncHandler(async(req,res)=>{
    
    try{
        const userId = req.body.userId;

        const user = await Users.findOne({email: userId}).exec();

        if (!user) {
            res.send({message: "User not found"});
            return;
          }

        // generate otp
        const otp = generateOTP(6);
        // save otp to user collection
        user.phoneOTP = otp;
        await user.save();
        console.log(user.phoneOTP)
    
        const accountSid = "AC3d44bb903d40babb4fdad3c626de8edc";
        const authToken = "6cce98e7ef4d627822b3e5c47d5b43db";
        const client = require("twilio")(accountSid, authToken);
        client.messages
            .create({ 
                body: `Your otp is ${otp}` , 
                from: "+15074426876", 
                to: user.contact_details
             }).then(message => 
                console.log(message.sid));
            } catch (error) {
            console.log(error);
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
        user.one_step_verified =true;
        await user.save();

        return res.redirect('http://localhost:3000/otpVerification')
    } catch(err){
        return res.status(500).send(err);
    }
}

//Resend Mail
const resendMail = asyncHandler(async(req,res)=>{
    //Generate a veification token with th user's ID 
    const userId = req.body.userId;
    const personalMailId = req.body.personalMailId
    console.log(personalMailId)
    console.log("reached")
    const user = await Users.findOne({email: userId}).exec();
    if (!user) {
        res.send({message: "User not found"});
        return;
      }

    const verificationToken = user.generateVerificationToken();
    try{
        //Email the user a unique verification link
    const url = `http://localhost:5000/verify/${verificationToken}`

    transporter.sendMail({
                to: personalMailId,
                subject: 'Verify Account',
                html: `Click <a href='${url}'>here</a> to confirm your email.` 
            })

            return res.send({
                message:`Sent a verification email to ${personalMailId}`
            });
        }catch(err){
            console.log(err);
        }
})


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

    if(wordEntered.length === 0){
        return res.send([]);
    }

    const User = await Users.find({name: {$regex: new RegExp('^'+wordEntered+'.*', 'i')}}).exec();

    if(!User?.length){
        // return res.status(400).json({message: 'No usersData found'});
        return res.send([]);
    }

    res.send(User);

})

//Get the Users data who is being searched
const getSearchWord = asyncHandler(async (req,res) =>{
    const searchWord = req.body.searchword;


    const User = await Users.find({email: searchWord});

    if(!User?.length){
        // return res.status(400).json({message: 'No usersData found'});
        return res.send({});
    }

    res.send(User);
})

//Add comments to myComments section of user who is logged in
const myComments = asyncHandler(async (req,res)=>{
    const comment = req.body.comment;
    const friend_email = req.body.friend_email;
    const friend_name = req.body.friend_name;
    const user_email = req.body.user_email;
    
    //Find the user in UserModel
    const UserData = await Users.find({email: user_email});
    
    //Find if the user exists in the table
    const User = await MyComments.find({user_email: user_email});
    
    //If not Found
    if(!User?.length){
        const newUser = await MyComments.create({user_email});
        const addComment = await MyComments.findOneAndUpdate({_id: newUser._id}, {$push:{comment: {friend_email: friend_email, friend_name: friend_name, comment: comment}}}).exec();

        console.log(`Added a comment in ${UserData.name}`)

        return res.send({message: `Comment added in MyComments of ${UserData.name}`,newUser});
    }
        const addComment = await MyComments.findOneAndUpdate({_id: User[0]._id}, {$push: {comment: {friend_email: friend_email, friend_name: friend_name, comment: comment}}}).exec();

        console.log(`Added a comment in ${UserData.name}`)
        return res.send({message: `Comment added in MyComments of ${UserData.name}`,User});
})

//Add comments to the newComments Section of the friend for whom the comment is being made
const newComments = asyncHandler(async (req,res)=>{
    const comment = req.body.comment;
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name= req.body.user_name;

    //Find the user in UserModel
    const UserData = await Users.find({email: friend_email});

    const User1 = await NewComments.find({friend_email: friend_email});
try{
    if(!User1?.length){
        const newComment = await NewComments.create({friend_email});
        const addedComment = await NewComments.findOneAndUpdate({_id: newComment._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}});

        return res.send({message:`Comment added in new comment section of ${UserData.name}`,newComment});
    }
    else{
        const addedComment = await NewComments.findOneAndUpdate({_id: User1[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment:comment}}});

        return res.send({message:`Comment added in new comment section of ${UserData.name}`,User1});
    }}
    catch{
        if(err){
            return res.send(err);
        }
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
        // console.log(docs);
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

    //Find the user in UserModel
    const UserData = await Users.find({email: friend_email});

    const User = ApprovedCommetns.find({friend_email: friend_email}, (err, doc)=>{
        if(err){
            console.log(err);
        }
        // console.log(doc.length);
        if(doc.length===0){
            const NewUser = ApprovedCommetns.create({friend_email}, (err,docs)=>{
                if(err){
                    console.log(err);
                }
                // console.log(docs);
                const addApprovedComment = ApprovedCommetns.findOneAndUpdate({_id: docs._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                    if(err){
                        console.log(err);
                    }
                    // console.log(documents);
                });
                // res.send({message:`Comment added in approved comments section of ${UserData}`,docs});
            });
        }
        else{
            const addApprovedComment = ApprovedCommetns.findOneAndUpdate({_id: doc[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                if(err){
                    console.log(err);
                }
                // res.send({message:`Comment added in approved comments section of ${UserData}`,documents});
            });
        }
    });
    
})

////Adding the rejected comments to the rejected table and delete it from the newComments table
const rejectedComments = asyncHandler (async (req, res) =>{
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name = req.body.user_name;
    const comment = req.body.comment;

    //Find the user in UserModel
    const UserData = await Users.find({email: friend_email});

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
                // res.send({message:`Comment added in rejected comment section of ${UserData}`, docs});
            });
        }
        else{
            const addRejectedComment = RejectedComments.findOneAndUpdate({_id: doc[0]._id}, {$push: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (e,documents)=>{
                if(err){
                    console.log(err);
                }
                // res.send({message:`Comment added in rejected comments section of ${UserData}`, documents})
            });
        }
    });
    
})

const deleteComments = asyncHandler(async(req,res)=>{
    const friend_email = req.body.friend_email;
    const user_email = req.body.user_email;
    const user_name = req.body.user_name;
    const comment = req.body.comment;

    const UserData = await Users.find({email: friend_email});

    // const User = await NewComments.find({friend: friend_email}).exec();

    // if(!User?.length){
    //     return res.send({message:"No user Found"})
    // }

    // console.log(User);

    const User1 = NewComments.find({friend_email: friend_email}, (err,docs)=>{
        if(err){
            console.log(err)
        }
        const deleteComment = NewComments.findOneAndUpdate({_id: docs[0]._id}, {$pull: {comments: {user_email: user_email, user_name: user_name, comment: comment}}}, (err,doc)=>{
            if(err){
                console.log(err);
                res.send(err);
            }
    
            console.log(doc);
            res.send({message:"Comment deleted", doc})
        });
    });
    
})

    // const del = NewComments.findOneAndRemove({friend_email: User.friend_email}, {$pull: {comments: {user_email: user_email, user_name:user_name, comment: comment}}});
    // // del.save();
    // // if(err){
    // //     console.log(err);
    // // }
    // console.log(del);
    // res.send({message:`Comment deleted from the New comment of ${UserData}`})
    // console.log("deleted");

//Get all the approved comments for the user who is logged in
const getApprovedComments = asyncHandler (async (req,res) => {
    const friend_email = req.body.friend_email;

    const User = ApprovedCommetns.find({friend_email: friend_email}, (err,docs)=>{
        if(err){
            console.log(err)
        }
        if(!docs?.length){
            return res.send({message: "No comments made"});
        }
        else{
            return res.send(docs);
            console.log(docs);
        }
    })
    });

    

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
    findAUser,
    verifyPhoneOtp,
    resendOTP,
    resendMail,
    deleteComments
}