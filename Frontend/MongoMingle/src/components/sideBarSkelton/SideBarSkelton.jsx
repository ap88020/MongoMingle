import { User } from 'lucide-react';
import React from 'react'

const SideBarSkelton = () => {
    const skeltonContacts = Array(8).fill(null);
  return (
    <aside className='h-full w-20 lg:w-72 border-r border-red-200 flex flex-col transition-all duration-200'>
        {/* Headers */}
        <div className='border-b border-red-200 w-full'>
            <div className='flex items-center gap-2'>
                < User />
                <span className='font-medium hidden lg:block'>Contect</span>
            </div>
        </div>
        {/* Skelton contants */}
        <div className='overflow-y-auto w-full py-3 '>
            {
              skeltonContacts.map((_,idx) => (
                <div key={idx} className='w-full p-3 flex items-start gap-3'>
                  {/* Avatar Skelton */}
                  <div className='relative mx-auto lg:mx-0'>
                    <div className='border skelton size-12 rounded-full'></div>
                  </div>
                  {/* User info skelton only visible on larger screen */}
                  <div className='hidden lg:block text-left min-w-0 flex-1'>
                      <div className='skelton h-4 w-32 mb-2'></div>
                      <div className='skelton h-3 w-16'></div>
                  </div>
                </div>
              ))
            }
        </div>
    </aside>
  )
};
export default SideBarSkelton;