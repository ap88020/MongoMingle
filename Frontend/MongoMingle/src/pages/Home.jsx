import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar';
import NoSelectedChat from '../components/NoSelectedChat';
import ChatContainer from '../components/chatContainer';

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className='bg-base-200 p-2'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg mt-[-3rem] shadow-green-700 w-full max-w-6xl h-[calc(100vh-8rem)] flex overflow-hidden items-start'>
          < SideBar/> 
          <div className='flex-1 px-2 py-1'>
              {!selectedUser ? <NoSelectedChat /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;