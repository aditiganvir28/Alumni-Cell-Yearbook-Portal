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
    // user: 'yearbookiiti@gmail.com',
    user: gmailUser,
    // pass: 'ukminlnnlztqdaqu',
    pass: gmailPass,
  },
})

//Otp Verification tokens
const { createJwtToken } = require('../utils/token.util')
const { generateOTP } = require('../utils/otp.util')

//Geeting all the users data who have created their profile
const getUsersData = asyncHandler(async (req, res) => {
  //Get all usersData from MongoDb
  const User = await Users.find()

  //If no usersData
  if (!User?.length) {
    return res.send({ message: 'No userData found' })
  }
  return res.send(User)
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

  console.log(req.body)

  // Confirm data
  if (
    !email ||
    !name ||
    !roll_no ||
    !department ||
    !contact_details ||
    !alternate_contact_details ||
    !address ||
    !personal_email_id ||
    !designation ||
    !about ||
    !profile_img ||
    !question_1 ||
    !question_2
  ) {
    return res.send({ message: 'All fields are required' })
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
    res.send({ message: `Sent a verification email to your personal email id` })
  } else {
    res.send({ message: 'Invalid Userdata Recieved' })
  }

  //Generate a veification token with th user's ID
  const verificationToken = usersData.generateVerificationToken()
  try {
    //Email the user a unique verification link
    // const url = `http://localhost:5000/verify/${verificationToken}`
    const url = `${serverLink}/verify/${verificationToken}`

    transporter.sendMail({
      to: personal_email_id,
      subject: 'Verify Account',
      // html: `Click <a href='${url}'>here</a> to confirm your email.`,
      html: `<p>Thank you for registering on the Yearbook Portal.
      Please verify your registered email by clicking on the link below
      <a href='${url}'>Verify</a><br>
      In case you enter the wrong OTP, you will have to sign in again and fill all the details.
      It's a pleasure to have you join the Alumni Community of IIT Indore! We congratulate you on your graduation!
      To stay connected with your Batch and the Institute, we urge you to join the following WhatsApp Group
      <a href='#'>Whatsapp</a><br>
      We also urge you to create your profile on the Alumni Portal by visiting
      <a href='https://alumni.iiti.ac.in/'>Alumni Cell</a><br>
      You can connect with us on LinkedIn to ensure all your updates can be featured on the Official Page of the Alumni Cell.
    <a href = 'https://in.linkedin.com/company/alumni-cell-iit-indore'>Linkedin</a></p>
    <p>Regards,<br>
    The Alumni Cell,<br>
    Indian Institute of Technology, Indore</p>`,
    })
  } catch (err) {
    console.log(err)
  }
  try {
    // generate otp
    const otp = generateOTP(6)
    // save otp to user collection
    usersData.phoneOTP = otp
    await usersData.save()

    // const accountSid = 'AC5e1a6c286440f64dfe905f3e413626bc'
    // const authToken = '616ea49c9fe06650a6dee1c6078f41ba'
    // const client = require('twilio')(accountSid, authToken)
    // client.messages
    //   .create({
    //     messagingServiceSid: 'MG00b633e7e2ca484f1297811f96eae80b',
    //     body: `Your otp for verication of your profile on the Yearbook Portal is: ${otp}`,
    //     to: usersData.contact_details,
    //   })
    //   .then((message) => console.log(message.sid))
    // const accountSid = 'AC3d44bb903d40babb4fdad3c626de8edc'
    // const authToken = '6cce98e7ef4d627822b3e5c47d5b43db'
    // const client = require('twilio')(accountSid, authToken)
    // client.messages
    //   .create({
    //     body: `Your otp is ${otp}`,
    //     from: '+15074426876',
    //     to: usersData.contact_details,
    //   })
    //   .then((message) => console.log(message.sid))
  } catch (error) {
    console.log(error)
  }
})

// ---------------------- verify phone otp -------------------------

verifyPhoneOtp = async (req, res, next) => {
  try {
    const phoneOtp = req.body.phoneOTP
    const userId = req.body.userId

    const user = await Users.findOne({ email: userId }).exec()
    console.log(userId)
    if (!user) {
      res.send({ message: 'User not found' })
      return
    }

    if (user.phoneOTP !== phoneOtp) {
      res.send({ message: 'Incorrect OTP' })
      return
    }
    const token = createJwtToken({ userId: user._id })

    user.phoneOTP = ''
    user.two_step_verified = true
    await user.save()
    res.send({ message: 'Mobile number verified', user })
    // return res.redirect('http://localhost:3000/')
  } catch (error) {
    next(error)
  }
}

//Resend OTP

const resendOTP = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId

    const user = await Users.findOne({ email: userId }).exec()

    if (!user) {
      res.send({ message: 'User not found' })
      return
    }

    // generate otp
    const otp = generateOTP(6)
    // save otp to user collection
    user.phoneOTP = otp
    await user.save()
    console.log(user.phoneOTP)

    // const accountSid = 'AC5e1a6c286440f64dfe905f3e413626bc'
    // const authToken = '616ea49c9fe06650a6dee1c6078f41ba'
    // const client = require('twilio')(accountSid, authToken)
    // client.messages
    //   .create({
    //     messagingServiceSid: 'MG00b633e7e2ca484f1297811f96eae80b',
    //     body: `Your otp for verication of your profile on the Yearbook Portal is: ${otp}`,
    //     to: usersData.contact_details,
    //   })
    //   .then((message) => console.log(message.sid))
    const accountSid = 'AC3d44bb903d40babb4fdad3c626de8edc'
    const authToken = '6cce98e7ef4d627822b3e5c47d5b43db'
    const client = require('twilio')(accountSid, authToken)
    client.messages
      .create({
        body: `Your otp is ${otp}`,
        from: '+15074426876',
        to: user.contact_details,
      })
      .then((message) => console.log(message.sid))
  } catch (error) {
    console.log(error)
  }
})

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
    user.one_step_verified = true
    await user.save()

    return res.redirect(`${clientLink}/otpVerification/${token}`)
  } catch (err) {
    return res.status(500).send(err)
  }
}

//Resend Mail
const resendMail = asyncHandler(async (req, res) => {
  //Generate a veification token with th user's ID
  const userId = req.body.userId
  const personalMailId = req.body.personalMailId
  console.log(personalMailId)
  console.log('reached')
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
      html: `<p>Thank you for registering on the Yearbook Portal.
      Please verify your registered email by clicking on the link below.
      <a href='${url}'>Verify</a>
      In case you enter the wrong OTP, you will have to sign in again and fill all the details.
      It's a pleasure to have you join the Alumni Community of IIT Indore! We congratulate you on your graduation!
      To stay connected with your Batch and the Institute, we urge you to join the following WhatsApp Group
      <a href='#'>Whatsapp</a>
      We also urge you to create your profile on the Alumni Portal by visiting
      <a href='https://alumni.iiti.ac.in/'>Alumni Cell</a>
      You can connect with us on LinkedIn to ensure all your updates can be featured on the Official Page of the Alumni Cell.
    <a href = 'https://in.linkedin.com/company/alumni-cell-iit-indore'>Linkedin</a></p>
    <p>Regards,<br>
    The Alumni Cell,<br>
    Indian Institute of Technology, Indore</p>`,
    })

    return res.send({
      message: `Sent a verification email to ${personalMailId}`,
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
    personal_email_id,
    contact_details,
    alternate_contact_details,
    address,
    current_company,
    designation,
    about,
    profile_img,
  } = req.body

  if (
    !email ||
    !name ||
    !roll_no ||
    !department ||
    !contact_details ||
    !alternate_contact_details ||
    !address ||
    !personal_email_id ||
    !designation ||
    !about ||
    !profile_img
  ) {
    return res.send({ message: 'All fields are required' })
  }

  const user = await Users.findOne({ email }) // find the user in the database by email

  // update user data
  user.name = name
  user.roll_no = roll_no
  user.academic_program = academic_program
  user.department = department
  user.personal_email_id = personal_email_id
  user.contact_details = contact_details
  user.alternate_contact_details = alternate_contact_details
  user.address = address
  user.current_company = current_company
  user.designation = designation
  user.about = about
  user.profile_img = profile_img

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
    res.send({ message: 'User Found', User })
  }
})

//Get Users data who has logged in to be displayed on the profile page
const getProfileData = asyncHandler(async (req, res) => {
  const { email } = req.body

  const User = await Users.find({ email: email }).exec()

  if (!User.length) {
    res.send({ message: 'No User Found' })
  } else {
    res.send({ message: 'User Found', User })
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

  res.send(User)
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

      return res.send({ message: 'Image Uploaded Successfully' })
    }
    try {
      const addImage = await Memories.findOneAndUpdate(
        { _id: User[0]._id },
        { $push: { memory_img: memory_img } },
      )
    } catch (err) {
      console.log(err)
    }

    return res.send({ message: 'Image Upload Successfully' })
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
  console.log(User)
  try {
    if (!User?.length) {
      console.log('create')
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

const getComments = asyncHandler(async (req, res) => {
  //Get all Comments from MongoDb
  const User = await Comments.find()

  //If no comments
  if (!User?.length) {
    return res.send({ message: 'No users found' })
  }
  return res.send(User)
})

const setApprovedComments = asyncHandler(async (req, res) => {
  const comment_reciever_email_id = req.body.comment_reciever_email_id
  const comment_sender_email_id = req.body.comment_sender_email_id
  const comment = req.body.comment

  console.log(comment)

  const user = await Comments.find({
    comment_reciever_email_id: comment_reciever_email_id,
  })
  if (!user?.length) {
    return res.send({ message: 'No user found' })
  }
  console.log(user[0].comment_sender)
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
  console.log(user[0].comment_sender)
  for (var i = 0; i <= user[0].comment_sender.length; i++) {
    console.log(i)
    if (
      user[0].comment_sender[i].email_id === comment_sender_email_id &&
      user[0].comment_sender[i].comment === comment
    ) {
      user[0].comment_sender[i].status = 'rejected'

      await user[0].save()
      break
    }
  }
  res.send({ message: 'comment added in approved section', user })
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
  resendOTP,
  resendMail,
  deleteUser,
  memory_img,
  comments,
  getComments,
  setApprovedComments,
  setRejectedComments,
}
