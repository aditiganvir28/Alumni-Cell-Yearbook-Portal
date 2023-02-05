const Users = require("../models/userModel");
const Auth = require("../models/authModel");
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt =  require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.USER_NAME,
        pass:process.env.PASSWORD
    }
})

const getUsersData = asyncHandler(async (req, res)=>{
    //Get all usersData from MongoDb
    res.send("hello")
    console.log('hello');
    const User = await User.find().lean();

    //If no usersData
    if(!User?.length){
        return res.status(400).json({message: 'No usersData found'});
    }

    res.josn(User);

})

const createUsersData = asyncHandler(async (req,res) =>{

    console.log("just for you")
    const { user_id, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} =req.body;

    //Confirm data
    // if(!user_id || !name || !roll_no || !academic_program || !department || !contact_details || !presonal_email_id || !designation || !about || !profile_img){
    //     return res.status(400).json({meassage: 'All fields are required'})
    // }

    //Check if email is in use
    // try{
    // const existingUser = await Users.findOne({presonal_email_id: personal_email_id}).exec();

    //     if(existingUser){
    //         return res.status(409).send({
    //             message: "Email is already in use."
    //         });
    //     }

    //Create and store the new user

    const usersData = await Users.create({ user_id, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img})

    if(usersData){
        //created
        return res.status(201).json({message: 'New user Created'})
    }
    else{
        return res.status(400).json({message: 'Invalid userdata recieved'})
    }

    //Generate a veification token with th user's ID 
    //     const verificationToken = Users.generateVerificationToken();

    // //Email the user a unique verification link
    //     const url = `http://localhost:5000/verify/${verificationToken}`

    //             transporter.sendMail({
    //                 to: personal_email_id,
    //                 subject: 'Verify Account',
    //                 html: `Click <a href='${url}'>here</a> to confirm your email.` 
    //             })

    //             return res.status(201).send({
    //                 message:`Sent a verification email to ${email}`
    //             });
    //         }catch(err){
    //             return res.status(500).send(err);
    //         }

    if(err){
        console.log(err);
    }
})

const updateUserData = asyncHandler(async (req,res) => {
    const {user_id, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} = req.body;

    //Confirm data
    if(!user_id || !name || !roll_no || !academic_program || !department || !contact_details || !presonal_email_id || !designation || !about || !profile_img){
        return res.status(400).json({meassage: 'All fields are required'})
    }

    const userData = await User.findById(user_id).exec();

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
    const {token} = re.params;

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
            token, "12345678"
        );
    }catch(err) {
        return res.status(500)/send(err);
    }

    try{
        //Find user with matcjhing ID
        const user = await User.findOne({_id: payload.ID}).exec();

        if(!user){
            return res.status(404).send({
                message:"User does not exist"
            });
        };

        //Update user verification status to true

        user.verified =true;
        await user.save();

        return res.status(200).send({
            message:"Account Verified"
        });
    } catch(err){
        return res.status(500).send(err);
    }
}

module.exports = {
    getUsersData,
    createUsersData,
    updateUserData,
    verify
}