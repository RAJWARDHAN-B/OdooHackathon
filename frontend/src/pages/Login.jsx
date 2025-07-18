import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email && password) {
        // Try to find existing user by email
        const response = await api.get('/users');
        const existingUser = response.data.find(user => user.email === email);
        
        if (existingUser) {
          // User exists, use their data
          localStorage.setItem('currentUserId', existingUser._id);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          navigate('/');
        } else {
          // Create new user
          const newUserData = {
            name: email.split('@')[0],
            email: email,
            password: password,
            location: 'Unknown',
            skillsOffered: ['JavaScript', 'React', 'Node.js', 'Python'], // Default skills
            skillsWanted: ['C++', 'Java', 'Machine Learning'], // Default wanted skills
            availability: {
              weekends: false,
              evenings: false,
              weekdays: false
            }
          };

          const createResponse = await api.post('/users', newUserData);
          const newUser = createResponse.data;
          
          localStorage.setItem('currentUserId', newUser._id);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          
          navigate('/');
        }
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      // Create a demo user in the database
      const demoUserData = {
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demopassword', // Added password field
        location: 'Demo City',
        skillsOffered: ['JavaScript', 'React', 'Node.js', 'Python'],
        skillsWanted: ['C++', 'Java', 'Machine Learning'],
        availability: {
          weekends: true,
          evenings: true,
          weekdays: false
        }
      };

      const response = await api.post('/users', demoUserData);
      const demoUser = response.data;

      localStorage.setItem('currentUserId', demoUser._id);
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
      
      navigate('/');
    } catch (error) {
      console.error('Demo login error:', error);
      // If user already exists, try to get them
      try {
        const response = await api.get('/users');
        const existingUser = response.data.find(user => user.email === 'demo@example.com');
        if (existingUser) {
          localStorage.setItem('currentUserId', existingUser._id);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          navigate('/');
        } else {
          setError('Failed to create demo user');
        }
      } catch (getError) {
        setError('Failed to setup demo user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#00a09d] rounded-lg flex items-center justify-center animate-pulse-slow">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-fade-in">
          Sign in to SkillSwap
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in">
          Connect with people who can teach you new skills
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 animate-fade-in hover-lift">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded animate-fade-in">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00a09d] focus:border-[#00a09d] sm:text-sm transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00a09d] focus:border-[#00a09d] sm:text-sm transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00a09d] hover:bg-[#008784] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a09d] disabled:bg-gray-400 transition-all duration-200 hover-lift"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a09d] transition-all duration-200 hover-lift"
              >
                Demo Login (Skip Authentication)
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Information</span>
              </div>
            </div>

            <div className="mt-6 bg-[#00a09d] bg-opacity-10 p-4 rounded-md animate-fade-in">
              <h3 className="text-sm font-medium text-white mb-2">For Demo Purposes:</h3>
              <ul className="text-sm text-white space-y-1">
                <li>• Use any email and password to login</li>
                <li>• Click "Demo Login" to skip authentication</li>
                <li>• Create profiles and test the skill swap functionality</li>
                <li>• All data is stored locally for this demo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
