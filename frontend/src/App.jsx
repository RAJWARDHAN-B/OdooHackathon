
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Requests from './pages/Requests';
import Login from './pages/Login';

function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/profile" element={<Profile />} />
<Route path="/profile/:id" element={<Profile />} />
<Route path="/requests" element={<Requests />} />
<Route path="/requests/:userId" element={<Requests />} />
</Routes>
</BrowserRouter>
);
}

export default App

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/profile/:id" element={<Profile />} />
//       <Route path="/my-profile" element={<MyProfile />} />
//       <Route path="/swap-requests" element={<SwapRequest />} />
//       <Route path="/admin" element={<Admin />} />
//     </Routes>
//   );
// }
