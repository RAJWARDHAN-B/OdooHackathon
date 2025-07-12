const express = require('express')
const router = express.Router()
const SwapRequest = require('../models/SwapRequest')

router.post('/', async (req, res) => {
  const request = await SwapRequest.create(req.body)
  res.json(request)
})

router.get('/:userId', async (req, res) => {
  const requests = await SwapRequest.find({ toUser: req.params.userId }).populate('fromUser')
  res.json(requests)
})

router.put('/:id', async (req, res) => {
  const updated = await SwapRequest.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  await SwapRequest.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

module.exports = router
