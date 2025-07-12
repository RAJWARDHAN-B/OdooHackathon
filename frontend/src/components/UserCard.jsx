import React from 'react'
import api from '../api'

function UserCard({ user }) {
  const sendRequest = () => {
    api.post('/swaps', { fromUser: '<your_user_id>', toUser: user._id })
  }

  return (
    <div>
      <h4>{user.name}</h4>
      <p>Skills: {user.skillsOffered.join(', ')}</p>
      <button onClick={sendRequest}>Send Swap Request</button>
    </div>
  )
}

export default UserCard
