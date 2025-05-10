import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessagesSkelton from './sideBarSkelton/MessagesSkelton';

const ChatContainer = () => {
  const {messages , getMessages , isMessagesLoading, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  },[selectedUser._id , getMessages])

  if(isMessagesLoading) return (
      <div className='flex-1 flex flex-col overflow-auto'>
        < ChatHeader />
        < MessagesSkelton />
        < MessagesInput />
      </div>
  )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        < ChatHeader />
        <p>Messages.....</p>
        < MessagesInput />
    </div>
  )
}

export default ChatContainer;