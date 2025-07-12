import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentUserId = localStorage.getItem('currentUserId');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover-lift">
              <div className="w-8 h-8 bg-[#00a09d] rounded-lg flex items-center justify-center mr-3 animate-pulse-slow">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-lift ${
                isActive('/') 
                  ? 'bg-[#00a09d] text-white shadow-md' 
                  : 'text-gray-700 hover:text-[#00a09d] hover:bg-[#f8f9fa]'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-lift ${
                isActive('/profile') 
                  ? 'bg-[#00a09d] text-white shadow-md' 
                  : 'text-gray-700 hover:text-[#00a09d] hover:bg-[#f8f9fa]'
              }`}
            >
              Profile
            </Link>
            
            <Link
              to="/requests"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-lift ${
                isActive('/requests') 
                  ? 'bg-[#00a09d] text-white shadow-md' 
                  : 'text-gray-700 hover:text-[#00a09d] hover:bg-[#f8f9fa]'
              }`}
            >
              Requests
            </Link>

            {currentUserId ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome!</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#ff5722] text-white rounded-lg hover:bg-[#e64a19] transition-all duration-200 hover-lift text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-[#00a09d] text-white rounded-lg hover:bg-[#008784] transition-all duration-200 hover-lift text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
