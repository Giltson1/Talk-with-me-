import React from 'react';

function MessageBubble({ type, message }) {
  return (
    <div className={`message-bubble ${type}`}>
      {message}
    </div>
  );
}

export default MessageBubble;
