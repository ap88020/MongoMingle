import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SettingPage from './pages/Setting';
import Profile from './pages/Profile';
import HomePage from './pages/Home';

import { Loader } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Run the authentication check once on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('authUser:', authUser); // Debugging: Check the authUser state
  console.log('isCheckingAuth:', isCheckingAuth); // Debugging: Check if we are still loading

  // Show loader until the authentication check is complete
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-20 h-20 text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Conditionally render HomePage or redirect to login */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={ !authUser ? <Signup /> : <Navigate to="/" /> } />
        <Route path="/login" element={ !authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <Profile /> : < Navigate to={"/login"} /> } />
      </Routes>
    </div>
  );
}

export default App;
