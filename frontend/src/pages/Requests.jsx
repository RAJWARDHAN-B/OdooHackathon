import React, { useEffect, useState } from 'react'
import api from '../api'

function Requests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api.get('/swaps/<your_user_id>').then(res => setRequests(res.data))
  }, [])

  const updateStatus = (id, status) => {
    api.put(`/swaps/${id}`, { status }).then(() => {
      setRequests(r => r.map(req => req._id === id ? { ...req, status } : req))
    })
  }

  return (
    <div>
      <h2>Swap Requests</h2>
      {requests.map(req => (
        <div key={req._id}>
          <p>From: {req.fromUser.name}</p>
          <p>Status: {req.status}</p>
          <button onClick={() => updateStatus(req._id, 'accepted')}>Accept</button>
          <button onClick={() => updateStatus(req._id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  )
}

export default Requests
