import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();           
    navigate("/login");       
  };

  return (
    <header className='border-base-100 border-b bg-base-300 w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 p-8 h-6'>
        <div className='flex items-center justify-between h-full'>
          <Link 
            to="/"
            className='flex items-center gap-2 hover:opacity-80 transition-all'
          >
            <div className='bg-primary/10 size-9 rounded-lg flex items-center justify-center'>
              <MessageSquare className='w-5 h-5 text-primary' />
            </div>
            <h1>MongoMingle</h1>
          </Link>
          <div className='flex items-center gap-2'>
            <Link to="/profile" className='btn btn-sm gap-2 transition-colors'>
              <User className='w-4 h-4' />
              <span className='hidden sm:inline'>Profile</span>
            </Link>
            <Link to="/setting" className='btn btn-sm gap-2 transition-colors'>
              <Settings className='w-4 h-4' />
              <span className='hidden sm:inline'>Settings</span>
            </Link>
            <button onClick={handleLogout} className='btn btn-sm gap-2 transition-colors'>
              <LogOut className='w-4 h-4' />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
