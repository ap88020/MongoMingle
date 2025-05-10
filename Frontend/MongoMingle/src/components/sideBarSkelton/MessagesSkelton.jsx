import React from 'react';

const MessagesSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="space-y-4 px-2">
            {skeletonMessages.map((_, idx) => (
                <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full skeleton" />
                    </div>
                    <div className="chat-header mb-1">
                        <div className="h-4 w-16 skeleton rounded" />
                    </div>
                    <div className="chat-bubble bg-transparent p-0">
                        <div className="h-16 w-[200px] skeleton rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessagesSkeleton;
