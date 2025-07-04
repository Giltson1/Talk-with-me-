import React from 'react';
import MessageBubble from './MessageBubble';

function ChatBox() {
  return (
    <div className="chat-box">
      <MessageBubble type="user" message="Why doesn't my loop run?" />
      <MessageBubble type="bot" message="It looks like you're missing a colon at the end of your for loop." />
    </div>
  );
}

export default ChatBox;
