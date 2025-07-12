const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { createOdooUser } = require('../odoo/odooClient')

// Create user
router.post('/', async (req, res) => {
  const user = await User.create(req.body)

  // Sync to Odoo
  await createOdooUser(user.name)

  res.json(user)
})

// Get public users
router.get('/', async (req, res) => {
  const users = await User.find({ isPublic: true })
  res.json(users)
})

// Update user
router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

module.exports = router
