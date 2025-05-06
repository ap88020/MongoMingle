import { MessageSquare } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkelton from './sideBarSkelton/SideBarSkelton'

const SideBar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const onlineUsers = [];

    // useEffect( ()=> {
    //     getUsers();
    // },[getUsers]);

    // if(isUsersLoading) return <SideBarSkelton />;
  return (
    <SideBarSkelton></SideBarSkelton>
  )
}

export default SideBar