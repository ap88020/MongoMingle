import { MessageSquare, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkelton from './sideBarSkelton/SideBarSkelton'
import { useAuthStore } from '../store/useAuthStore'

const SideBar = () => {
    const {getUsers, users ,selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const { onlineUsers } = useAuthStore(); 

    // console.log(users);
    useEffect( ()=> {
        getUsers();
    },[getUsers]);

    if(isUsersLoading) return <SideBarSkelton />;
  return (
  <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
  <div className="p-5 shrink-0">
    <div className="flex items-center justify-center lg:justify-start gap-2">
      <User size={20} />
      <span className="font-medium hidden lg:block">Contacts</span>
    </div>
  </div>

  <div className="overflow-y-auto flex-1 px-1 lg:px-5 pb-5">
    {Array.isArray(users) && users.map((user) => (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`
          w-full p-2 lg:p-3 flex items-center gap-2 lg:gap-3 hover:bg-base-300 transition-colors
          ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
        `}
      >
        <div className="relative mx-auto lg:mx-0">
          <img
            src={user.profilePic || "/vite.svg"}
            alt={user.name}
            className="size-10 lg:size-12 object-cover rounded-full"
          />
          {onlineUsers.includes(user._id) && (
            <span className="absolute bottom-0 right-0 size-2.5 lg:size-3 bg-green-500 rounded-full ring-2 ring-zinc-200" />
          )}
        </div>

        <div className="hidden lg:block text-left min-w-0">
          <div className="font-medium truncate">{user.fullName}</div>
          <div>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
        </div>
      </button>
    ))}
  </div>
</aside>

  )
}

export default SideBar;