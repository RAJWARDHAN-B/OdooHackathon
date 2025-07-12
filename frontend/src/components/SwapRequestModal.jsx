import { useState, useEffect } from 'react';
import api from '../utils/api';

function SwapRequestModal({ isOpen, onClose, targetUser, currentUser }) {
  const [form, setForm] = useState({
    skillOffered: '',
    skillRequested: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && targetUser) {
      // Pre-populate with a skill the target user wants
      if (targetUser.skillsWanted && targetUser.skillsWanted.length > 0) {
        setForm(prev => ({
          ...prev,
          skillRequested: targetUser.skillsWanted[0]
        }));
      }
    }
  }, [isOpen, targetUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.skillOffered || !form.skillRequested) {
      setError('Please select both skills');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const swapData = {
        fromUser: currentUser._id,
        toUser: targetUser._id,
        skillOffered: form.skillOffered,
        skillRequested: form.skillRequested,
        message: form.message
      };

      console.log('Sending swap data:', swapData); // Debug log

      await api.post('/swaps', swapData);
      onClose();
      // You might want to show a success message or redirect
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error('Swap creation error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Failed to create swap request');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Request Skill Swap</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Swapping with:</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              {targetUser.profilePhoto ? (
                <img 
                  src={targetUser.profilePhoto} 
                  alt={targetUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-blue-600">
                  {targetUser.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="font-medium">{targetUser.name}</p>
              <p className="text-sm text-gray-600">{targetUser.location}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I will offer this skill: *
            </label>
            <select
              required
              value={form.skillOffered}
              onChange={(e) => setForm({ ...form, skillOffered: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a skill you can offer</option>
              {currentUser.skillsOffered?.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to learn this skill: *
            </label>
            <select
              required
              value={form.skillRequested}
              onChange={(e) => setForm({ ...form, skillRequested: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a skill you want to learn</option>
              {targetUser.skillsOffered?.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (optional)
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a personal message to your request..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SwapRequestModal; 