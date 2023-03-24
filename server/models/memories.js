const mongoose = require('mongoose')

const memoriesSchema = new mongoose.Schema({
  user_email: {
    type: String,
  },

  name: {
    tyoe: String,
  },

  memory_img: {
    type: String,
  },
})

module.exports = mongoose.model('Memories', memoriesSchema)
