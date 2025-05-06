import { MessageSquare } from 'lucide-react'
import React from 'react'

function NoSelectedChat() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
            < MessageSquare className='w-10 h-10 text-pink-600 items-center animate-bounce'/>
            <h1 className='text-secondary text-2xl' >Welcome to MongoMingle!</h1>
            <h2 className='text-primary text-center'>select a conversation from the sideBar to start chatting</h2>
        </div>
    </div>
  )
}

export default NoSelectedChat