const express = require('express');
const Swap = require('../models/Swap');
const User = require('../models/User');
const router = express.Router();

// Create a new swap request
router.post('/', async (req, res) => {
  try {
    const swap = new Swap(req.body);
    const saved = await swap.save();
    const populated = await saved.populate('fromUser toUser');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all swaps (for admin or general view)
router.get('/', async (req, res) => {
  try {
    const swaps = await Swap.find().populate('fromUser toUser');
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get swap by ID
router.get('/:id', async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id).populate('fromUser toUser');
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    res.json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get swaps for a specific user (incoming and outgoing)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query; // 'incoming', 'outgoing', or undefined for both
    
    let query = {};
    if (type === 'incoming') {
      query.toUser = userId;
    } else if (type === 'outgoing') {
      query.fromUser = userId;
    } else {
      query.$or = [{ fromUser: userId }, { toUser: userId }];
    }
    
    const swaps = await Swap.find(query).populate('fromUser toUser');
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update swap status (accept/reject)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['accepted', 'rejected', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const swap = await Swap.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('fromUser toUser');
    
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    res.json(swap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add feedback to a completed swap
router.post('/:id/feedback', async (req, res) => {
  try {
    const { rating, comment, fromUserId } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    if (swap.status !== 'completed') {
      return res.status(400).json({ error: 'Can only add feedback to completed swaps' });
    }
    
    swap.feedback = { rating, comment, fromUser: fromUserId };
    await swap.save();
    
    // Update user rating
    const targetUser = swap.toUser;
    const user = await User.findById(targetUser);
    if (user) {
      const newTotalRatings = user.totalRatings + 1;
      const newRating = ((user.rating * user.totalRatings) + rating) / newTotalRatings;
      user.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal
      user.totalRatings = newTotalRatings;
      await user.save();
    }
    
    const populated = await swap.populate('fromUser toUser');
    res.json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete swap request (only if pending)
router.delete('/:id', async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    if (swap.status !== 'pending') {
      return res.status(400).json({ error: 'Can only delete pending swap requests' });
    }
    
    await Swap.findByIdAndDelete(req.params.id);
    res.json({ message: 'Swap request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;