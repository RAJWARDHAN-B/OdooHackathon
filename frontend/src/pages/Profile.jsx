import React, { useState } from 'react'
import api from '../api'

function Profile() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    photo: '',
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    isPublic: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const saveProfile = () => {
    const data = {
      ...form,
      skillsOffered: form.skillsOffered.split(','),
      skillsWanted: form.skillsWanted.split(','),
    }
    api.post('/users', data)
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="photo" placeholder="Photo URL" onChange={handleChange} />
      <input name="skillsOffered" placeholder="Skills offered (comma-separated)" onChange={handleChange} />
      <input name="skillsWanted" placeholder="Skills wanted (comma-separated)" onChange={handleChange} />
      <input name="availability" placeholder="Availability" onChange={handleChange} />
      <label>
        Public? <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
      </label>
      <button onClick={saveProfile}>Save</button>
    </div>
  )
}

export default Profile
