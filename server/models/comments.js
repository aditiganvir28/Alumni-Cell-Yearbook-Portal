const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  comment_reciever_id: String,
  comment_reciever_name: String,
  comment_reciever_roll_no: Number,
  comment_reciever_email_id: String,
  comment_reciever_academic_program: String,

  comment_sender: [
    {
      id: String,
      name: String,
      roll_no: Number,
      email_id: String,
      academic_program: String,
      comment: String,
      status: String,
    },
  ],
})

module.exports = mongoose.model('Comments', commentsSchema)
