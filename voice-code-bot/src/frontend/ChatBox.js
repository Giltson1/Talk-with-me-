import React from 'react';
import MessageBubble from './MessageBubble';

function ChatBox({ messages }) {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <MessageBubble key={index} type={message.type} message={message.text} />
      ))}
    </div>
  );
}

export default ChatBox;
