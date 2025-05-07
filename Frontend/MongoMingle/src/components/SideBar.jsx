import { MessageSquare, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkelton from './sideBarSkelton/SideBarSkelton'

const SideBar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const onlineUsers = [];

    useEffect( ()=> {
        getUsers();
    },[getUsers]);

    if(isUsersLoading) return <SideBarSkelton />;
  return (
      <aside className='h-full w-10 lg:w-72 border-r border-yellow-400 flex flex-col transition-all duration-200'>
          <div className='border-b border-green-500 w-full p-5'>
            <div className='flex items-center gap-2'>
              < User size={20} />
              <span className='font-medium hidden lg:block'>Contacts</span>
            </div>
            {/* TODO : online filter toggle  */}
            <div className='overflow-y-auto w-full py-3'>
                
            </div>
          </div>
      </aside>
  )
}

export default SideBar;