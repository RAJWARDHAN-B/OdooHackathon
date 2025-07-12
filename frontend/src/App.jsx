import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SwapRequest from './pages/SwapRequest';
import MyProfile from './pages/MyProfile';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/swap-requests" element={<SwapRequest />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
