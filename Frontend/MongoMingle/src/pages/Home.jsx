import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar';
import NoSelectedChat from '../components/NoSelectedChat';
import ChatContainer from '../components/chatContainer';

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className='border h-screen bg-base-200'>
      <div className='border flex items-center justify-center pt-20 px-4'>
        <div className='border border-red-300 mt-[-5rem] bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          < SideBar/> 
          {!selectedUser ? <NoSelectedChat /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}

export default Home 