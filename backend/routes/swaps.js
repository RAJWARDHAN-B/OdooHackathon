const express = require('express');
const Swap = require('../models/Swap');
const router = express.Router();

router.post('/', async (req, res) => {
const swap = new Swap(req.body);
const saved = await swap.save();
res.json(saved);
});

router.get('/', async (req, res) => {
const swaps = await Swap.find().populate('fromUser toUser');
res.json(swaps);
});

module.exports = router