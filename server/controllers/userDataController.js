const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')
const MyComments = require('../models/my_comments')
const NewComments = require('../models/new_comments')
const ApprovedCommetns = require('../models/approved_comments')
const RejectedComments = require('../models/rejected_comments')
const Memories = require('../models/memories')
const Comments = require('../models/comments')


// adding environment variable ****************
const gmailUser = process.env.GMAIL_USER
const gmailPass = process.env.GMAIL_PASS
const serverLink = process.env.SERVER_LINK
const clientLink = process.env.CLIENT_LINK

//Api to set up sender to send a mail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {

    user: gmailUser,

    pass: gmailPass,
  },
})


//Geeting all the users data who have created their profile
const getUsersData = asyncHandler(async (req, res) => {
  //Get all usersData from MongoDb
  const User = await Users.find()

  //If no usersData
  if (!User?.length) {
    return res.send({ message: 'No userData found' })
  }
  // Map over each user to extract only the necessary data
  const userData = User.map(user => ({
    email: user.email,
    name: user.name,
    roll_no: user.roll_no,
    academic_program: user.academic_program
  }))

  return res.send(userData)
})

//Add a New User
const createUsersData = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    roll_no,
    academic_program,
    department,
    personal_email_id,
    contact_details,
    alternate_contact_details,
    address,
    current_company,
    designation,
    about,
    profile_img,
    question_1,
    question_2,
  } = req.body

  // Confirm data
  if (
    !email ||
    !name ||
    !roll_no ||
    !academic_program ||
    !department ||
    !contact_details ||
    !alternate_contact_details ||
    !address ||
    !personal_email_id ||
    !about ||
    !profile_img ||
    !question_1 ||
    !question_2
  ) {
    return res.send({ message: 'All fields are required.' })
  }

  console.log(personal_email_id)
  console.log(roll_no)
  console.log(contact_details)

  // Check if email is in use
  const existingUser = await Users.find({personal_email_id: personal_email_id}).exec();
  console.log(existingUser)
  console.log("1")
  if(existingUser.length!==0){
    return res.send({message:"Personal Email Id is already in use"});
}
  // // // // Check if contact_no is in use
  const existingUser2 = await Users.findOne({contact_details: contact_details}).exec();
  console.log(existingUser2)
  console.log("2")
      if(existingUser2){
          return res.send({message:"Mobile Number is already in use"});
      }

  // // // check if roll no. is a number or not
  if (isNaN(roll_no)) {
    return res.send({ message: 'Roll No. should be in Digits' })
  }

  // //Check if roll.no is in use
  const existingUser3 = await Users.findOne({roll_no: roll_no}).exec();
      console.log(existingUser3)
      console.log("3")
      if(existingUser3){
          return res.send({message:"Roll_No is already in use"});
      }

  // Create and store the new user
  const usersData = await Users.create({
    email,
    name,
    roll_no,
    academic_program,
    department,
    contact_details,
    alternate_contact_details,
    address,
    personal_email_id,
    current_company,
    designation,
    about,
    profile_img,
    question_1,
    question_2,
  }) 

  if (usersData) {
    //created
    console.log("created")
    return res.send({message:"Sent an OTP to your contact number."})
    
  } else {
    return res.send({ message: 'Invalid Userdata Recieved' })
  }
})

// ---------------------- verify phone otp -------------------------

const verifyPhoneOtp = async (req, res, next) => {
  try {
    const userId = req.body.userId

    const user = await Users.findOne({ email: userId }).exec()
    if (!user) {
      res.send({ message: 'User not found' })
      return
    }

    user.one_step_verified = true
    await user.save()

    const verificationToken = user.generateVerificationToken()
    try {
      //Email the user a unique verification link
      const url = `${serverLink}/verify/${verificationToken}`
      console.log('Reaches')
      transporter.sendMail({
        to: user.personal_email_id,
        subject: 'Verify Account',
        // html: `Click <a href='${url}'>here</a> to confirm your email.`,
        html: `<p>Thank you for registering on the Yearbook Portal.<br/>
        
        It's a pleasure to have you join the Alumni Community of IIT Indore! We congratulate you on your graduation!<br/>
        To stay connected with your Batch and the Institute, we urge you to join the following WhatsApp Group-
        <a href='https://chat.whatsapp.com/GD4OCbSgrmR397TkAb48YZ'>Whatsapp Group Link</a><br/>
        We also urge you to create your profile on the Alumni Portal by visiting
        <a href='https://alumni.iiti.ac.in/'>Alumni Portal Link</a><br/>
        You can connect with us on LinkedIn to ensure all your updates can be featured on the Official Page of the Alumni Cell.
      <a href = 'https://in.linkedin.com/company/alumni-cell-iit-indore'>LinkedIn</a></p><br/>
      Please verify your registered email by clicking on the link below.
        <a href='${url}'>Verify</a><br/>
      <p>Regards,<br/>
      The Alumni Cell,<br/>
      Indian Institute of Technology Indore</p>`,
      })
      
      // const userData = user.map(user => ({
      //   email: user.email,
      //   name: user.name,
      //   roll_no: user.roll_no,
      //   academic_program: user.academic_program,
      //   department: user.department,
      //   current_company: user.current_company,
      //   designation: user.designation,
      //   about: user.about,
      //   profile_img: user.profile_img,
      //   one_step_verified: user.one_step_verified,
      //   two_step_verified: user.two_step_verified,
      // }))

      return res.send({
        message: `Sent a verification email to your personal email_id`, user
      })
    } catch (err) {
      console.log(err)
    }
  } catch (error) {
    next(error)
  }
}

//Verify the personal_email_id
const verify = async (req, res) => {
  const token = req.params.id

  //Check if we have an id
  if (!token) {
    return res.send({ message: 'Missing token' })
  }

  //Verify the token from the URL
  let payload = null
  try {
    payload = jwt.verify(token, process.env.SECRET)
  } catch (err) {
    return res.send(err)
  }

  try {
    //Find user with matcjhing ID
    const user = await Users.findOne({ _id: payload.ID }).exec()

    if (!user) {
      return res.send({ message: 'User does not exist' })
    }

    //Update user verification status to true
    user.two_step_verified = true
    await user.save()

    return res.redirect(`${clientLink}/`)
  } catch (err) {
    return res.status(500).send(err)
  }
}

//Resend Mail
const resendMail = asyncHandler(async (req, res) => {
  //Generate a veification token with th user's ID
  const userId = req.body.userId
  const personalMailId = req.body.personalMailId
  const user = await Users.findOne({ email: userId }).exec()
  if (!user) {
    res.send({ message: 'User not found' })
    return
  }

  const verificationToken = user.generateVerificationToken()
  try {
    //Email the user a unique verification link
    const url = `${serverLink}/verify/${verificationToken}`
    console.log('Reaches')
    transporter.sendMail({
      to: personalMailId,
      subject: 'Verify Account',
      // html: `Click <a href='${url}'>here</a> to confirm your email.`,
      html: `<p>Thank you for registering on the Yearbook Portal.<br/>
        
      It's a pleasure to have you join the Alumni Community of IIT Indore! We congratulate you on your graduation!<br/>
      To stay connected with your Batch and the Institute, we urge you to join the following WhatsApp Group-
      <a href='https://chat.whatsapp.com/GD4OCbSgrmR397TkAb48YZ'>Whatsapp Group Link</a><br/>
      We also urge you to create your profile on the Alumni Portal by visiting
      <a href='https://alumni.iiti.ac.in/'>Alumni Portal Link</a><br/>
      You can connect with us on LinkedIn to ensure all your updates can be featured on the Official Page of the Alumni Cell.
    <a href = 'https://in.linkedin.com/company/alumni-cell-iit-indore'>LinkedIn</a></p><br/>
    Please verify your registered email by clicking on the link below.
      <a href='${url}'>Verify</a><br/>
    <p>Regards,<br/>
    The Alumni Cell,<br/>
    Indian Institute of Technology Indore</p>`,
    })

    return res.send({
      message: `Sent a verification email to your personal email_id`,
    })
  } catch (err) {
    console.log(err)
  }
})

//Upadte users data
const updateUser = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    roll_no,
    academic_program,
    department,
    // personal_email_id,
    // contact_details,
    // alternate_contact_details,
    address,
    current_company,
    designation,
    about,
    profile_img,
    question_1,
    question_2,
  } = req.body

  if (
    !email ||
    !name ||
    !roll_no ||
    !academic_program ||
    !department ||
    !address ||
    !about ||
    !profile_img ||
    !question_1 ||
    !question_2
  ) {
    return res.send({ message: 'All fields are required' })
  }

  // // // check if roll no. is a number or not
  if (isNaN(roll_no)) {
    return res.send({ message: 'Roll No. should be in Digits' })
  }

  const user = await Users.findOne({ email }) // find the user in the database by email

  // update user data
  user.name = name
  user.roll_no = roll_no
  user.academic_program = academic_program
  user.department = department
  // user.personal_email_id = personal_email_id
  // user.contact_details = contact_details
  // user.alternate_contact_details = alternate_contact_details
  user.address = address
  user.current_company = current_company
  user.designation = designation
  user.about = about
  user.profile_img = profile_img
  user.question_1 = question_1
  user.question_2 = question_2

  await user.save() // save the updated user data

  res.status(200).json({ message: 'User data updated successfully', user })
})

//find a user who logged in in user's data
const findAUser = asyncHandler(async (req, res) => {
  const email = req.body.email

  const User = await Users.find({ email: email }).exec()

  if (!User.length) {
    res.send({ message: 'No user Found' })
  } else {
    // const userData = User.map(user => ({
    //   email: user.email,
    //   name: user.name,
    //   roll_no: user.roll_no,
    //   academic_program: user.academic_program,
    //   department: user.department,
    //   current_company: user.current_company,
    //   about: user.about
    // }))
    res.send({ message: 'User Found', User})
  }
})

//Get Users data who has logged in to be displayed on the profile page
const getProfileData = asyncHandler(async (req, res) => {
  const { email } = req.body

  const User = await Users.find({ email: email }).exec()

  if (!User.length) {
    res.send({ message: 'No User Found' })
  } else {
    res.send({ message: 'User Found', User: User })
  }
})

//Get a list of users whose name start with the word entered on the searchbar
const getWordEntered = asyncHandler(async (req, res) => {
  const wordEntered = req.body.wordentered

  if (wordEntered.length === 0) {
    return res.send([])
  }

  const User = await Users.find({
    name: { $regex: new RegExp('^' + wordEntered + '.*', 'i') },
  }).exec()

  if (!User?.length) {
    // return res.status(400).json({message: 'No usersData found'});
    return res.send([])
  }

  res.send(User)
})

//Get the Users data who is being searched
const getSearchWord = asyncHandler(async (req, res) => {
  const searchWord = req.body.searchword

  const User = await Users.find({ email: searchWord })

  if (!User?.length) {
    // return res.status(400).json({message: 'No usersData found'});
    return res.send({})
  }

  // Map over each user to extract only the necessary data
  const userData = User.map(user => ({
    email:user.email,
    name: user.name,
    roll_no: user.roll_no,
    academic_program: user.academic_program,
    department: user.department,
    about: user.about,
    profile_img: user.profile_img
  }))

  res.send(userData)
})

//delete a user

const deleteUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  console.log(email)
  const User = await Users.find({ email: email }).exec()

  if (!User?.length) {
    return res.send({ message: 'User Not Found' })
  }

  const del = Users.deleteOne({ email: email }, function (err, result) {
    res.send(result === 1 ? { msg: 'Deleted' } : { msg: 'error: ' + err })
  })

  // return res.send({message: "User deleted"});
})

//Memories_Image
const memory_img = asyncHandler(async (req, res) => {
  const user_email = req.body.user_email
  const name = req.body.name
  const memory_img = req.body.memory_img
  console.log(memory_img)
  const User = await Memories.find({ user_email: user_email }).exec()
  try {
    if (!User?.length) {
      const NewUser = await Memories.create({ user_email, name })
      const addImage = await Memories.findOneAndUpdate(
        { _id: NewUser._id },
        { $push: { memory_img: memory_img } },
      )

      return res.send({ message: 'Image Uploaded Successfully.' })
    }
    try {
      const addImage = await Memories.findOneAndUpdate(
        { _id: User[0]._id },
        { $push: { memory_img: memory_img } },
      )
    } catch (err) {
      console.log(err)
    }

    return res.send({ message: 'Image Upload Successfully.' })
  } catch (err) {
    console.log(err)
  }
})

const comments = asyncHandler(async (req, res) => {
  const comment_sender_id = req.body.comment_sender_id
  const comment_sender_name = req.body.comment_sender_name
  const comment_sender_roll_no = req.body.comment_sender_roll_no
  const comment_sender_email_id = req.body.comment_sender_email_id
  const comment_sender_academic_program =
    req.body.comment_sender_academic_program
  const comment_reciever_id = req.body.comment_reciever_id
  const comment_reciever_name = req.body.comment_reciever_name
  const comment_reciever_roll_no = req.body.comment_reciever_roll_no
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  const comment_reciever_academic_program =
    req.body.comment_reciever_academic_program
  const comment = req.body.comment
  const status = req.body.status

  console.log(comment_reciever_email_id)

  const User = await Comments.find({
    comment_reciever_email_id: comment_reciever_email_id,
  })
  try {
    if (!User?.length) {
      const newUser = await Comments.create({
        comment_reciever_id,
        comment_reciever_name,
        comment_reciever_roll_no,
        comment_reciever_email_id,
        comment_reciever_academic_program,
      })

      const newUser2 = await Comments.findOneAndUpdate(
        { comment_reciever_email_id: newUser.comment_reciever_email_id },
        {
          $push: {
            comment_sender: {
              id: comment_sender_id,
              name: comment_sender_name,
              roll_no: comment_sender_roll_no,
              email_id: comment_sender_email_id,
              comment: comment,
              status: status,
              academic_program: comment_sender_academic_program,
            },
          },
        },
      )

      return res.send({ message: 'Comment added', newUser2 })
    }

    const newUser2 = await Comments.findOneAndUpdate(
      { comment_reciever_email_id: User[0].comment_reciever_email_id },
      {
        $push: {
          comment_sender: {
            id: comment_sender_id,
            name: comment_sender_name,
            roll_no: comment_sender_roll_no,
            email_id: comment_sender_email_id,
            academic_program: comment_sender_academic_program,
            comment: comment,
            status: status,
          },
        },
      },
    )
    console.log('reached')
    console.log(newUser2)
    return res.send({ message: 'Comment added', newUser2 })
  } catch (err) {
    console.log(err)
  }
})

// const getComments = asyncHandler(async (req, res) => {
//   const email = req.body.email
//   console.log(email)
//   //Get all Comments from MongoDb
//   // const User = await Comments.find()

//   const users = await Comments.find({
//     "comment_sender": {
//       "$elemMatch": {
//         "email_id": email,
//       }
//     }
//   });
//   var comm
//   users.map((user)=>{
//     comm = user.comment_sender.filter(sender => sender.email_id === email)
//   })

//   const approvedUsers = comm.map(user => ({
//     name: user.name,
//     comment: user.comment
//   }))
  

//   console.log(users)
//   console.log(approvedUsers)
//   //If no comments
//   if (!users) {
//     return res.send({ message: 'No users found'})
//   }
//   return res.send({message:"User found", User: approvedUsers})
// })

const getComments = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(email);
  //Get all Comments from MongoDb
  // const User = await Comments.find()

  const users = await Comments.find({
    comment_sender: {
      $elemMatch: {
        email_id: email,
      },
    },
  });
  let comments = [];
  users.forEach((user) => {
    const comment = user.comment_sender.find((sender) => sender.email_id === email);
    console.log(user.name)
    if (comment) {
      comments.push({ name: user.comment_reciever_name, comment: comment.comment });
    }
  });

  console.log(comments)

  //If no comments
  if (!comments) {
    return res.send({ message: 'No comments found' });
  }
  return res.send({ message: 'Comment found', User: comments });
});

const setApprovedComments = asyncHandler(async (req, res) => {
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  const comment_sender_email_id = req.body.comment_sender_email_id
  const comment = req.body.comment

  const user = await Comments.find({
    comment_reciever_email_id: comment_reciever_email_id,
  })
  if (!user?.length) {
    return res.send({ message: 'No user found' })
  }
  for (var i = 0; i <= user[0].comment_sender.length; i++) {
    if (
      user[0].comment_sender[i].email_id === comment_sender_email_id &&
      user[0].comment_sender[i].comment === comment
    ) {
      user[0].comment_sender[i].status = 'approved'
      await user[0].save()
      break
    }
  }
  res.send({ message: 'comment added in approved section', user })
})

const setRejectedComments = asyncHandler(async (req, res) => {
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  const comment_sender_email_id = req.body.comment_sender_email_id
  const comment = req.body.comment

  const user = await Comments.find({
    comment_reciever_email_id: comment_reciever_email_id,
  })
  if (!user?.length) {
    return res.send({ message: 'No user found' })
  }

  for (var i = 0; i <= user[0].comment_sender.length; i++) {
    
    if (
      user[0].comment_sender[i].email_id === comment_sender_email_id &&
      user[0].comment_sender[i].comment === comment
    ) {
      user[0].comment_sender[i].status = 'rejected'

      await user[0].save()
      break
    }
  }
  res.send({ message: 'comment added in rejected section', user })
})

const getRecieversComments = asyncHandler(async (req,res)=>{
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  
    //Get all usersData from MongoDb
    const users = await Comments.find({comment_reciever_email_id:comment_reciever_email_id})
    console.log(users)
    //If no usersData
    if (users.length===0) {
      console.log("reached")
      return res.send({ message: 'No userData found' })
    }
    var approvedComments=[]
    users.map(user => {
      approvedComments = user.comment_sender.filter(sender => sender.status === "approved")

    })
    
    const comments = [];

  users.forEach(user => {
    user.comment_sender.forEach(comment => {
      if(comment.status==="new"){
        comments.push({ name: comment.name, comment: comment.comment, email_id: comment.email_id });
      }
      
    });
  });
      const approvedUsers = approvedComments.map(user => ({
        name: user.name,
        comment: user.comment,
        email: user.email_id
      }))

      console.log(approvedComments)

    return res.send({ message: "Approved users found", users: approvedUsers, user2: comments})

})

const removeCommentFromMyComments = asyncHandler(async(req,res)=>{
  const email = req.body.email;
  const comment = req.body.comment;

  const users = await Comments.find({
    comment_sender: {
      $elemMatch: {
        email_id: email,
        comment: comment,
      },
    },
  });

  await Promise.all(users.map(async (user) => {
    const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment);
    if (commentIndex !== -1) {
      user.comment_sender.pull(user.comment_sender[commentIndex]);
      await user.save();
    }
  }));

  res.send({ message: 'Comment removed successfully' });
})

const removeCommentFromApprovedComments = asyncHandler(async(req,res)=>{
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  const comment = req.body.comment
  const email = req.body.email

    //Get all usersData from MongoDb
    const users = await Comments.find({comment_reciever_email_id:comment_reciever_email_id})

    //If no usersData
    if (users.length===0) {
      return res.send({ message: 'No userData found' })
    }
    let commentRemoved = false;
    await Promise.all(users.map(async (user) => {
      const commentIndex = user.comment_sender.findIndex((sender) => sender.email_id === email && sender.comment === comment && sender.status==="approved");
      if (commentIndex !== -1) {
        user.comment_sender[commentIndex].status="new"
        await user.save();
        commentRemoved = true;
      }
    }));

    if (!commentRemoved) {
      return res.send({ message: 'Comment not found in approved comments' });
    }

    return res.send({ message: "Comment removed from approved comments"})
})

module.exports = {
  getUsersData,
  createUsersData,
  updateUser,
  verify,
  getProfileData,
  getWordEntered,
  getSearchWord,
  findAUser,
  verifyPhoneOtp,
  resendMail,
  deleteUser,
  memory_img,
  comments,
  getComments,
  setApprovedComments,
  setRejectedComments,
  getRecieversComments,
  removeCommentFromMyComments,
  removeCommentFromApprovedComments
}
