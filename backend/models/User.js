const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{type:String,required:true},
  location: String,
  photo: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  isPublic: { type: Boolean, default: true },
})

module.exports = mongoose.model('User', UserSchema)
