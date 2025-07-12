import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    profilePhoto: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: {
      weekends: false,
      evenings: false,
      weekdays: false,
      custom: ''
    },
    isPublic: true
  });

  const [skillInput, setSkillInput] = useState({ offered: '', wanted: '' });

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${id}`);
      setForm(response.data);
    } catch (error) {
      setError('Failed to fetch user profile');
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (id) {
        await api.put(`/users/${id}`, form);
        setSuccess('Profile updated successfully!');
      } else {
        const response = await api.post('/users', form);
        setSuccess('Profile created successfully!');
        navigate(`/profile/${response.data._id}`);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (type) => {
    const skill = skillInput[type].trim();
    if (skill && !form[`skills${type === 'offered' ? 'Offered' : 'Wanted'}`].includes(skill)) {
      setForm(prev => ({
        ...prev,
        [`skills${type === 'offered' ? 'Offered' : 'Wanted'}`]: [...prev[`skills${type === 'offered' ? 'Offered' : 'Wanted'}`], skill]
      }));
      setSkillInput(prev => ({ ...prev, [type]: '' }));
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setForm(prev => ({
      ...prev,
      [`skills${type === 'offered' ? 'Offered' : 'Wanted'}`]: prev[`skills${type === 'offered' ? 'Offered' : 'Wanted'}`].filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAvailabilityChange = (field) => {
    setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: !prev.availability[field]
      }
    }));
  };

  if (loading && id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {id ? 'Edit Profile' : 'Create Profile'}
            </h1>
            {id && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={!isEditing}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  disabled={!isEditing}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo URL
              </label>
              <input
                type="url"
                disabled={!isEditing}
                value={form.profilePhoto}
                onChange={(e) => setForm({ ...form, profilePhoto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                disabled={!isEditing}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Skills</h3>
              
              {/* Skills Offered */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills I Can Offer
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={skillInput.offered}
                    onChange={(e) => setSkillInput({ ...skillInput, offered: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('offered'))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Add a skill..."
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addSkill('offered')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skillsOffered.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill('offered', skill)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Wanted */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills I Want to Learn
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={skillInput.wanted}
                    onChange={(e) => setSkillInput({ ...skillInput, wanted: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('wanted'))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Add a skill..."
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addSkill('wanted')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skillsWanted.map((skill, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill('wanted', skill)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={form.availability.weekends}
                    onChange={() => handleAvailabilityChange('weekends')}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <span className="text-sm text-gray-700">Weekends</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={form.availability.evenings}
                    onChange={() => handleAvailabilityChange('evenings')}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <span className="text-sm text-gray-700">Evenings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={form.availability.weekdays}
                    onChange={() => handleAvailabilityChange('weekdays')}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                  />
                  <span className="text-sm text-gray-700">Weekdays</span>
                </label>
                <div>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={form.availability.custom}
                    onChange={(e) => setForm({ 
                      ...form, 
                      availability: { ...form.availability, custom: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Custom availability (e.g., 'Monday mornings')"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Setting */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  disabled={!isEditing}
                  checked={form.isPublic}
                  onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                />
                <span className="text-sm text-gray-700">Make my profile public</span>
              </label>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : (id ? 'Update Profile' : 'Create Profile')}
                </button>
                {id && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;