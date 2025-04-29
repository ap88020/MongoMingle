import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SettingPage from './pages/Setting';
import Profile from './pages/Profile';
import HomePage from './pages/Home';

import { Loader } from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('authUser:', authUser); 
  console.log('isCheckingAuth:', isCheckingAuth);

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
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={ !authUser ? <Signup /> : <Navigate to="/" /> } />
        <Route path="/login" element={ !authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <Profile /> : < Navigate to={"/login"} /> } />
      </Routes>
      < Toaster />
    </div>
  );
}

export default App;
