const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: { type: String, required: true },
  skillRequested: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  message: String,
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
swapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Swap', swapSchema);