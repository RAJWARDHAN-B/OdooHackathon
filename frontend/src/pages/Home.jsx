import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import SwapRequestModal from '../components/SwapRequestModal';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchUsers();
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.get(`/users/search/skills?skill=${encodeURIComponent(search)}`);
      setUsers(response.data);
    } catch (error) {
      setError('Failed to search users');
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (user) => {
    const currentUserId = localStorage.getItem('currentUserId');
    const currentUserData = localStorage.getItem('currentUser');
    
    if (!currentUserId || !currentUserData) {
      navigate('/login');
      return;
    }

    try {
      const currentUser = JSON.parse(currentUserData);
      
      // Validate that we have valid user IDs
      if (!currentUser._id || !user._id) {
        setError('Invalid user data');
        return;
      }
      
      setCurrentUser(currentUser);
      setSelectedUser(user);
      setShowSwapModal(true);
    } catch (error) {
      console.error('Error parsing current user data:', error);
      setError('Invalid user session');
      navigate('/login');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.location?.toLowerCase().includes(search.toLowerCase()) ||
    user.skillsOffered?.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
    user.skillsWanted?.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Skill Swap Platform</h1>
            <p className="text-xl text-gray-600">Connect with people who can teach you new skills</p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by name, location, or skills..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              {search && (
                <button
                  onClick={() => {
                    setSearch('');
                    fetchUsers();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      {user.profilePhoto ? (
                        <img 
                          src={user.profilePhoto} 
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.location || 'Location not specified'}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(user.rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {user.rating ? `${user.rating}/5 (${user.totalRatings} reviews)` : 'No ratings yet'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Skills Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skillsOffered?.map((skill, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        )) || <span className="text-gray-500 text-sm">No skills offered</span>}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Skills Wanted</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skillsWanted?.map((skill, idx) => (
                          <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        )) || <span className="text-gray-500 text-sm">No skills wanted</span>}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.availability?.weekends && (
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Weekends</span>
                        )}
                        {user.availability?.evenings && (
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Evenings</span>
                        )}
                        {user.availability?.weekdays && (
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Weekdays</span>
                        )}
                        {user.availability?.custom && (
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {user.availability.custom}
                          </span>
                        )}
                        {!user.availability?.weekends && !user.availability?.evenings && 
                         !user.availability?.weekdays && !user.availability?.custom && (
                          <span className="text-gray-500 text-sm">Availability not specified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRequest(user)}
                    className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Request Skill Swap
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && selectedUser && currentUser && (
        <SwapRequestModal
          isOpen={showSwapModal}
          onClose={() => setShowSwapModal(false)}
          targetUser={selectedUser}
          currentUser={currentUser}
        />
      )}
    </>
  );
}
