const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Swap', swapSchema)