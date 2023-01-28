const User = require("../models/userModel");
const Auth = require("../models/authModel");
const asyncHandler = require('express-async-handler');

const getUsersData = asyncHandler(async (req, res)=>{
    //Get all usersData from MongoDb
    const User = await User.find().lean();

    //If no usersData
    if(!User?.length){
        return res.status(400).json({message: 'No usersData found'});
    }

    res.josn(User);

})

const createUsersData = asyncHandler(async (req,res) =>{
    const { user_id, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img} =req.body;

    //Confirm data
    if(!user_id || !name || !roll_no || !academic_program || !department || !contact_details || !presonal_email_id || !designation || !about || !profile_img){
        return res.status(400).json({meassage: 'All fields are required'})
    }

    //Create and store the new user

    const usersData = await User.create({ user_id, name, roll_no, academic_program, department, contact_details, personal_email_id, current_company, designation, about, profile_img})

    if(usersData){
        //created
        return res.status(201).json({message: 'New user Created'})
    }
    else{
        return res.status(400).json({message: 'Invalid userdata recieved'})
    }
})

const updataUserData = asyncHandler(async (req,res) => {
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

module.exports = {
    getUsersData,
    createUsersData,
    updataUserData
}