import React, { useState, useEffect } from 'react'
import api from '../api'
import UserCard from '../components/UserCard'

function Home() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data))
  }, [])

  const filtered = users.filter(u =>
    u.skillsOffered.join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Browse Users</h2>
      <input placeholder="Search by skill..." onChange={e => setSearch(e.target.value)} />
      {filtered.map(user => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  )
}

export default Home
