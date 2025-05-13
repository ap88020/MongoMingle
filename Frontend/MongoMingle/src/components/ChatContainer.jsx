import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessagesSkelton from './sideBarSkelton/MessagesSkelton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser , subscribeToMessages , unSubscribeFromMessages} = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeFromMessages(); 
  }, [selectedUser?._id , subscribeToMessages , unSubscribeFromMessages]);

  if (isMessagesLoading) return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <MessagesSkelton />
      <MessagesInput />
    </div>
  );

  return (
<div className="flex flex-col h-full max-h-screen">
  <ChatHeader />

  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((message) => (
      <div
        key={message._id}
        // className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
      className={`chat ${String(message.senderId).trim() === String(authUser._id).trim() ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="size-10 rounded-full border">
            <img
              src={
                message.senderId === authUser._id
                ? selectedUser.profilePic || "/vite.svg"
                : authUser.profilePic || "/vite.svg"
              }
              alt="profile-pic"
            />
          </div>
        </div>
        <div className="chat-header mb-1">
          <time className="text-xs opacity-50 ml-1">
            {formatMessageTime(message.createdAt)}
          </time>
        </div>
        <div className="chat-bubble flex flex-col">
          {message.image && (
            <img
              src={message.image}
              alt="Attachment"
              className="sm:max-w-[200px] rounded-mb mb-2"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
      </div>
    ))}
  </div>

  <MessagesInput />
</div>

  );
};

export default ChatContainer;