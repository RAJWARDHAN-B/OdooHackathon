import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function Requests() {
  const { userId } = useParams();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'incoming', 'outgoing'
  const [feedbackForm, setFeedbackForm] = useState({});

  useEffect(() => {
    fetchSwaps();
  }, [userId, activeTab]);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const currentUserId = userId || localStorage.getItem('currentUserId');
      if (!currentUserId) {
        setError('User ID not found');
        return;
      }

      let endpoint = `/swaps/user/${currentUserId}`;
      if (activeTab !== 'all') {
        endpoint += `?type=${activeTab}`;
      }

      const response = await api.get(endpoint);
      setSwaps(response.data);
    } catch (error) {
      setError('Failed to fetch swap requests');
      console.error('Error fetching swaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (swapId, newStatus) => {
    try {
      await api.patch(`/swaps/${swapId}/status`, { status: newStatus });
      fetchSwaps(); // Refresh the list
    } catch (error) {
      setError('Failed to update swap status');
      console.error('Error updating swap:', error);
    }
  };

  const handleDelete = async (swapId) => {
    if (!window.confirm('Are you sure you want to delete this swap request?')) {
      return;
    }

    try {
      await api.delete(`/swaps/${swapId}`);
      fetchSwaps(); // Refresh the list
    } catch (error) {
      setError('Failed to delete swap request');
      console.error('Error deleting swap:', error);
    }
  };

  const handleFeedback = async (swapId) => {
    const feedback = feedbackForm[swapId];
    if (!feedback || !feedback.rating) {
      setError('Please provide a rating');
      return;
    }

    try {
      const currentUserId = userId || localStorage.getItem('currentUserId');
      await api.post(`/swaps/${swapId}/feedback`, {
        ...feedback,
        fromUserId: currentUserId
      });
      setFeedbackForm(prev => ({ ...prev, [swapId]: {} }));
      fetchSwaps(); // Refresh the list
    } catch (error) {
      setError('Failed to submit feedback');
      console.error('Error submitting feedback:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (swap, currentUserId) => {
    const isIncoming = swap.toUser._id === currentUserId;
    const isOutgoing = swap.fromUser._id === currentUserId;

    if (swap.status === 'pending' && isIncoming) {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusUpdate(swap._id, 'accepted')}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusUpdate(swap._id, 'rejected')}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      );
    }

    if (swap.status === 'accepted') {
      return (
        <button
          onClick={() => handleStatusUpdate(swap._id, 'completed')}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Mark Complete
        </button>
      );
    }

    if (swap.status === 'pending' && isOutgoing) {
      return (
        <button
          onClick={() => handleDelete(swap._id)}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Cancel
        </button>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading swap requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Swap Requests</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {['all', 'incoming', 'outgoing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} ({swaps.filter(s => {
                  if (tab === 'all') return true;
                  if (tab === 'incoming') return s.toUser._id === (userId || localStorage.getItem('currentUserId'));
                  if (tab === 'outgoing') return s.fromUser._id === (userId || localStorage.getItem('currentUserId'));
                  return false;
                }).length})
              </button>
            ))}
          </div>

          {/* Swap Requests List */}
          <div className="space-y-4">
            {swaps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No swap requests found.</p>
              </div>
            ) : (
              swaps.map((swap) => (
                <div key={swap._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{swap.fromUser.name}</span>
                          <span className="text-gray-500">→</span>
                          <span className="font-medium">{swap.toUser.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                          {swap.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Offering:</p>
                          <p className="font-medium">{swap.skillOffered}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Requesting:</p>
                          <p className="font-medium">{swap.skillRequested}</p>
                        </div>
                      </div>

                      {swap.message && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Message:</p>
                          <p className="text-sm">{swap.message}</p>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 mt-2">
                        Created: {new Date(swap.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {getStatusActions(swap, userId || localStorage.getItem('currentUserId'))}
                    </div>
                  </div>

                  {/* Feedback Section for Completed Swaps */}
                  {swap.status === 'completed' && !swap.feedback && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Leave Feedback</h4>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                          <select
                            value={feedbackForm[swap._id]?.rating || ''}
                            onChange={(e) => setFeedbackForm(prev => ({
                              ...prev,
                              [swap._id]: { ...prev[swap._id], rating: parseInt(e.target.value) }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select rating</option>
                            {[5, 4, 3, 2, 1].map(rating => (
                              <option key={rating} value={rating}>{rating} stars</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                          <input
                            type="text"
                            value={feedbackForm[swap._id]?.comment || ''}
                            onChange={(e) => setFeedbackForm(prev => ({
                              ...prev,
                              [swap._id]: { ...prev[swap._id], comment: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Optional comment..."
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => handleFeedback(swap._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Display Feedback */}
                  {swap.feedback && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < swap.feedback.rating ? 'fill-current' : 'fill-gray-300'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{swap.feedback.rating}/5</span>
                      </div>
                      {swap.feedback.comment && (
                        <p className="text-sm text-gray-700">{swap.feedback.comment}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;