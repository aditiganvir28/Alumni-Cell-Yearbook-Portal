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

//Api to set up sender to send a mail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yearbookiiti@gmail.com',
    pass: 'ukminlnnlztqdaqu',
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
    const url = `http://localhost:5000/verify/${verificationToken}`

    transporter.sendMail({
      to: personal_email_id,
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
    const accountSid = 'AC3d44bb903d40babb4fdad3c626de8edc'
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)
    client.messages
      .create({
        body: `Your otp is ${otp}`,
        from: '+15074426876',
        to: '+919404584441',
      })
      .then((message) => console.log(message.sid))
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
    res.send('Mobile number verified')
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
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)
    client.messages
      .create({
        body: `Your otp is ${otp}`,
        from: '+15074426876',
        to: '+919404584441',
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

    return res.redirect(`http://localhost:3000/otpVerification/${token}`)
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
    const url = `http://localhost:5000/verify/${verificationToken}`
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

  res.status(200).json({ message: 'User data updated successfully' })
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

//Add comments to myComments section of user who is logged in
const myComments = asyncHandler(async (req, res) => {
  const comment = req.body.comment
  const friend_email = req.body.friend_email
  const friend_name = req.body.friend_name
  const user_email = req.body.user_email

  //Find the user in UserModel
  const UserData = await Users.find({ email: user_email })

  //Find if the user exists in the table
  const User = await MyComments.find({ user_email: user_email })

  //If not Found
  if (!User?.length) {
    const newUser = await MyComments.create({ user_email })
    const addComment = await MyComments.findOneAndUpdate(
      { _id: newUser._id },
      {
        $push: {
          comment: {
            friend_email: friend_email,
            friend_name: friend_name,
            comment: comment,
          },
        },
      },
    ).exec()

    console.log(`Added a comment in ${UserData.name}`)

    return res.send({
      message: `Comment added in MyComments of ${UserData.name}`,
      newUser,
    })
  }
  const addComment = await MyComments.findOneAndUpdate(
    { _id: User[0]._id },
    {
      $push: {
        comment: {
          friend_email: friend_email,
          friend_name: friend_name,
          comment: comment,
        },
      },
    },
  ).exec()

  console.log(`Added a comment in ${UserData.name}`)
  return res.send({
    message: `Comment added in MyComments of ${UserData.name}`,
    User,
  })
})

//Add comments to the newComments Section of the friend for whom the comment is being made
const newComments = asyncHandler(async (req, res) => {
  const comment = req.body.comment
  const friend_email = req.body.friend_email
  const user_email = req.body.user_email
  const user_name = req.body.user_name

  //Find the user in UserModel
  const UserData = await Users.find({ email: friend_email })

  const User1 = await NewComments.find({ friend_email: friend_email })
  try {
    if (!User1?.length) {
      const newComment = await NewComments.create({ friend_email })
      const addedComment = await NewComments.findOneAndUpdate(
        { _id: newComment._id },
        {
          $push: {
            comments: {
              user_email: user_email,
              user_name: user_name,
              comment: comment,
            },
          },
        },
      )

      return res.send({
        message: `Comment added in new comment section of ${UserData.name}`,
        newComment,
      })
    } else {
      const addedComment = await NewComments.findOneAndUpdate(
        { _id: User1[0]._id },
        {
          $push: {
            comments: {
              user_email: user_email,
              user_name: user_name,
              comment: comment,
            },
          },
        },
      )

      return res.send({
        message: `Comment added in new comment section of ${UserData.name}`,
        User1,
      })
    }
  } catch {
    if (err) {
      return res.send(err)
    }
  }
})

//Get the Mycomments for the user who is logged in
const getMyComments = asyncHandler(async (req, res) => {
  const user_email = req.body.user_email

  const User = MyComments.find({ user_email: user_email }, (err, docs) => {
    if (err) {
      console.log(err)
    }

    res.json(docs)
  })
})

//Get the newComments for the user who is logged in
const getNewComments = asyncHandler(async (req, res) => {
  const friend_email = req.body.friend_email
  const User = NewComments.find({ friend_email: friend_email }, (err, docs) => {
    if (err) {
      console.log(err)
    }
    // console.log(docs);
    res.json(docs)
  })
})

//Adding the approved comments to the approved table and delete it from the newComments table
const approvedComments = asyncHandler(async (req, res) => {
  const friend_email = req.body.friend_email
  const user_email = req.body.user_email
  const user_name = req.body.user_name
  const comment = req.body.comment
  var Userid

  //Find the user in UserModel
  const UserData = await Users.find({ email: friend_email })

  const User = ApprovedCommetns.find(
    { friend_email: friend_email },
    (err, doc) => {
      if (err) {
        console.log(err)
      }
      // console.log(doc.length);
      if (doc.length === 0) {
        const NewUser = ApprovedCommetns.create(
          { friend_email },
          (err, docs) => {
            if (err) {
              console.log(err)
            }
            // console.log(docs);
            const addApprovedComment = ApprovedCommetns.findOneAndUpdate(
              { _id: docs._id },
              {
                $push: {
                  comments: {
                    user_email: user_email,
                    user_name: user_name,
                    comment: comment,
                  },
                },
              },
              (e, documents) => {
                if (err) {
                  console.log(err)
                }
                // console.log(documents);
              },
            )
            // res.send({message:`Comment added in approved comments section of ${UserData}`,docs});
          },
        )
      } else {
        const addApprovedComment = ApprovedCommetns.findOneAndUpdate(
          { _id: doc[0]._id },
          {
            $push: {
              comments: {
                user_email: user_email,
                user_name: user_name,
                comment: comment,
              },
            },
          },
          (e, documents) => {
            if (err) {
              console.log(err)
            }
            // res.send({message:`Comment added in approved comments section of ${UserData}`,documents});
          },
        )
      }
    },
  )
})

////Adding the rejected comments to the rejected table and delete it from the newComments table
const rejectedComments = asyncHandler(async (req, res) => {
  const friend_email = req.body.friend_email
  const user_email = req.body.user_email
  const user_name = req.body.user_name
  const comment = req.body.comment

  //Find the user in UserModel
  const UserData = await Users.find({ email: friend_email })

  const User = RejectedComments.find(
    { friend_email: friend_email },
    (err, doc) => {
      if (err) {
        console.log(err)
      }
      // console.log(doc.length);
      if (doc.length === 0) {
        const NewUser = RejectedComments.create(
          { friend_email },
          (err, docs) => {
            if (err) {
              donsole.log(err)
            }
            // console.log(docs);
            const addRejectedComment = RejectedComments.findOneAndUpdate(
              { _id: docs._id },
              {
                $push: {
                  comments: {
                    user_email: user_email,
                    user_name: user_name,
                    comment: comment,
                  },
                },
              },
              (e, documents) => {
                if (err) {
                  console.log(err)
                }
                // console.log(documents);
              },
            )
            // res.send({message:`Comment added in rejected comment section of ${UserData}`, docs});
          },
        )
      } else {
        const addRejectedComment = RejectedComments.findOneAndUpdate(
          { _id: doc[0]._id },
          {
            $push: {
              comments: {
                user_email: user_email,
                user_name: user_name,
                comment: comment,
              },
            },
          },
          (e, documents) => {
            if (err) {
              console.log(err)
            }
            // res.send({message:`Comment added in rejected comments section of ${UserData}`, documents})
          },
        )
      }
    },
  )
})

const deleteComments = asyncHandler(async (req, res) => {
  const friend_email = req.body.friend_email
  const user_email = req.body.user_email
  const user_name = req.body.user_name
  const comment = req.body.comment

  const UserData = await Users.find({ email: friend_email })

  const User1 = NewComments.find(
    { friend_email: friend_email },
    (err, docs) => {
      if (err) {
        console.log(err)
      }
      const deleteComment = NewComments.findOneAndUpdate(
        { _id: docs[0]._id },
        {
          $pull: {
            comments: {
              user_email: user_email,
              user_name: user_name,
              comment: comment,
            },
          },
        },
        (err, doc) => {
          if (err) {
            console.log(err)
            res.send(err)
          }

          console.log(doc)
          res.send({ message: 'Comment deleted', doc })
        },
      )
    },
  )
})

//Get all the approved comments for the user who is logged in
const getApprovedComments = asyncHandler(async (req, res) => {
  const friend_email = req.body.friend_email

  const User = ApprovedCommetns.find(
    { friend_email: friend_email },
    (err, docs) => {
      if (err) {
        console.log(err)
      }
      if (!docs?.length) {
        return res.send({ message: 'No comments made' })
      } else {
        return res.send(docs)
        console.log(docs)
      }
    },
  )
})

//Get all the rejected comments for the user who is logged in
const getRejectedComments = asyncHandler(async (req, res) => {
  const user_email = req.body.user_email

  const User = RejectedComments.find({ user_email: user_email })

  if (!User?.length) {
    return res.send({ message: 'No comments made' })
  } else {
    return res.send(User)
  }
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

module.exports = {
  getUsersData,
  createUsersData,
  updateUser,
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
  deleteComments,
  deleteUser,
  memory_img,
}
