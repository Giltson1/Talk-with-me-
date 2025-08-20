import React from 'react';
import PropTypes from 'prop-types';

function MessageBubble({ type, message }) {
  const bubbleStyle = {
    maxWidth: '70%',
    padding: '10px 15px',
    margin: '5px 0',
    borderRadius: '18px',
    wordWrap: 'break-word',
    ...(type === 'user' ? {
      backgroundColor: '#007bff',
      color: 'white',
      alignSelf: 'flex-end',
      marginLeft: 'auto'
    } : {
      backgroundColor: '#f1f1f1',
      color: 'black',
      alignSelf: 'flex-start',
      marginRight: 'auto'
    })
  };

  return (
    <div className={`message-bubble ${type}`} style={bubbleStyle}>
      {message}
    </div>
  );
}

MessageBubble.propTypes = {
  type: PropTypes.oneOf(['user', 'bot']).isRequired,
  message: PropTypes.string.isRequired
};

export default MessageBubble;
