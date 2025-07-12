import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/profiles?public=true').then((res) => setProfiles(res.data));
  }, []);

  const handleRequest = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Skill Swap Platform</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by skill or availability"
          className="border p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-4">
        {profiles
          .filter((p) =>
            p.skillsOffered.join(',').toLowerCase().includes(search.toLowerCase()) ||
            p.skillsWanted.join(',').toLowerCase().includes(search.toLowerCase())
          )
          .map((profile) => (
            <div key={profile.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{profile.name}</h2>
                  <p className="text-sm text-gray-600">Rating: {profile.rating || 'N/A'}</p>
                  <div className="mt-2">
                    <p className="font-semibold">Skills Offered:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skillsOffered.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold mt-2">Skills Wanted:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skillsWanted.map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRequest(profile.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
