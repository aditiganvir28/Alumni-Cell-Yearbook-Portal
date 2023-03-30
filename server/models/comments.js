const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  comment_sender: [
    {
      id: String,
      name: String,
      roll_no: Number,
      email_id: String,
      academic_program: String,
    },
  ],

  comment_reciever: [
    {
      id: String,
      name: String,
      roll_no: Number,
      email_id: String,
      academic_program: String,
    },
  ],

  comment: String,
  Status: String,
})

module.exports = mongoose.model('Comments', commentsSchema)
