import React, { useState } from 'react';
import PropTypes from 'prop-types';

function VoiceButton({ onVoiceInput, disabled }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onVoiceInput) {
        onVoiceInput(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button 
      className="voice-button" 
      onClick={handleVoiceClick}
      disabled={disabled || isListening}
      style={{
        padding: '10px 20px',
        backgroundColor: isListening ? '#28a745' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled || isListening ? 'not-allowed' : 'pointer',
        marginBottom: '20px'
      }}
    >
      {isListening ? '🎙️ Listening...' : '🎙️ Speak Your Question'}
    </button>
  );
}

VoiceButton.propTypes = {
  onVoiceInput: PropTypes.func,
  disabled: PropTypes.bool
};

VoiceButton.defaultProps = {
  onVoiceInput: null,
  disabled: false
};

export default VoiceButton;
