import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, User } from 'lucide-react';

const Profile = () => {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const handleImageUpload = async (e) => {};
  
  return (
    <div className='h-screen m-auto p-20'>
      <div className=' max-w-2xl auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='items-center flex justify-center flex-col'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className=''> Your profile information </p>
          </div>
          {/* avatar upload section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img 
                src={authUser.profilePic || "/vite.svg"}
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdateProfile ? "animate-pulse pointer-events-none" : ""} 
                `}
              >
                < Camera className='w-5 h-5 text-base-200' />
                <input 
                  type="file"
                  id="avatar-upload"
                  className='hidden'
                  accept='/image*'
                  onChange={handleImageUpload}
                  disabled={isUpdateProfile}
                   />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              { isUpdateProfile ? 'Uploading....' : "click the camera icon to update your photo" }
            </p>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                < User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser?.name} </p>
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                < User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser?.email} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile