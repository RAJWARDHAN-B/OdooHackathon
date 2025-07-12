const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
const user = new User(req.body);
const saved = await user.save();
res.json(saved);
});

router.get('/', async (req, res) => {
const users = await User.find();
res.json(users);
});

module.exports = router