import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/requests">Requests</Link>
    </nav>
  )
}

export default Navbar
