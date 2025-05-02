import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, User } from 'lucide-react';

const Profile = () => {
  const { authUser, isUpdateProfile, uploadImageProfile } = useAuthStore();
  const [selectedImage , setSelectedImage] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);  
      await uploadImageProfile({profilePic : base64Image});
    }

  };
  
  return (
    <div className='flex justify-center w-full mt-[-5rem]' > 
        <div className='h-screen m-auto p-20'>
        <div className=' max-w-2xl auto'>
          <div className='bg-base-300 rounded-xl p-6 space-y-8'>
            <div className='items-center flex justify-center flex-col'>
              <h1 className='text-2xl font-semibold'>Profile</h1>
              <p className=''> Your profile information </p>
            </div>
            {/* avatar upload section */}
            <div className='flex flex-col items-center gap-4'>
              <div className='relative'>
                <img 
                  src={ selectedImage || authUser.profilePic || "/vite.svg"}
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
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser.fullName} </p>
              </div>
              <div className='space-y-1.5'>
                <div className='text-sm text-zinc-400 flex items-center gap-2'>
                  < User className='w-4 h-4' />
                  Email
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser?.email} </p>
              </div>
            </div>
            <div className='bg-base-300 rounded-xl'>
                <h2 className='text-lg font-medium mb-4'>Account Information</h2>
                <div className='space-y-3 text-sm'>
                    <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                      <div className='flex justify-evenly gap-16'>
                        <div className=''>Member Since</div>
                        <div className='text-green-500'> { authUser.createdAt?.split("T")[0] } </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                      <div className='flex items-center justify-evenly gap-16'>
                        <div className=''>Account status</div>
                        <div className='text-green-500'> Active </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile