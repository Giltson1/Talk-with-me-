import React from 'react';
import PropTypes from 'prop-types';
import MessageBubble from './MessageBubble';

function ChatBox({ messages, isLoading }) {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <MessageBubble 
          key={`msg-${index}-${Date.now()}`} 
          type={message.type} 
          message={message.text} 
        />
      ))}
      {isLoading && (
        <div className="loading-indicator">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
}

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['user', 'bot']).isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool
};

ChatBox.defaultProps = {
  messages: [],
  isLoading: false
};

export default ChatBox;
