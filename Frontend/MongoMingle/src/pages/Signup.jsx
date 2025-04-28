import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName : "",
    email : "",
    password : ""
  });
  const {signup , isSigningUp} = useAuthStore();
  
  const validateForm = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        {/* lef side  */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
            <div className='w-full max-w-md space-y-8'>
              {/*  LOGO */}
              <div className='text-center m-8'>
                <div className='flex flex-col items-center gap-2 group'>
                    <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transitins-colors'>
                        < MessageSquare className='size-6 text-primary'/>
                    </div>
                    <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                    <h1 className='text-base-content/60'> Get Start with your free your account </h1> 
                  </div>  
              </div>
              {/* FORM */}
              <form onSubmit={submitHandler} className='space-y-6'>
                  <div className='form-control'>
                    <label className='label'>
                        <span className='label-text font-medium'>Full Name</span>
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        < User className='size-5 text-base-content/40' />
                      </div>
                      <input
                        type="text"
                        className={`input-borderd w-full pl-10`}
                        placeholder='John Doe'
                        value={formData.value}
                        onChange={(e) => setFormData({...formData, fullName : e.target.value})}
                       />
                    </div>
                  </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Signup