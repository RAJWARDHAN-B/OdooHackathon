const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, index: false }, // Explicitly disable indexing on password
  location: String,
  profilePhoto: String, // URL to profile photo
  skillsOffered: [String],
  skillsWanted: [String],
  availability: {
    weekends: { type: Boolean, default: false },
    evenings: { type: Boolean, default: false },
    weekdays: { type: Boolean, default: false },
    custom: String
  },
  isPublic: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);