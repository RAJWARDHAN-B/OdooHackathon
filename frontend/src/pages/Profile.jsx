import { useState } from 'react';
import axios from 'axios';

function Profile() {
const [form, setForm] = useState({
name: '',
location: '',
skillsOffered: '',
skillsWanted: '',
availability: ''
});

const handleSubmit = (e) => {
e.preventDefault();
axios.post('http://localhost:5000/users', {
...form,
skillsOffered: form.skillsOffered.split(','),
skillsWanted: form.skillsWanted.split(','),
}).then(res => alert("User saved!"));
};

return (
<form onSubmit={handleSubmit}>
<input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
<input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
<input placeholder="Skills Offered (comma-separated)" onChange={e => setForm({ ...form, skillsOffered: e.target.value })} />
<input placeholder="Skills Wanted (comma-separated)" onChange={e => setForm({ ...form, skillsWanted: e.target.value })} />
<input placeholder="Availability" onChange={e => setForm({ ...form, availability: e.target.value })} />
<button type="submit">Save Profile</button>
</form>
);
}

export default Profile