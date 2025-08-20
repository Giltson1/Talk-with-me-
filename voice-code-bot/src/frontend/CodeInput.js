import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

function CodeInput({ code, setCode, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="code-input-container">
      <TextareaAutosize
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your code here... (Ctrl+Enter to submit)"
        minRows={5}
        maxRows={20}
        disabled={disabled}
        style={{ 
          width: '100%', 
          fontFamily: 'monospace', 
          fontSize: '1rem',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          resize: 'vertical'
        }}
      />
      <button 
        onClick={onSubmit} 
        disabled={disabled || !code.trim()}
        style={{ 
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: disabled ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {disabled ? 'Analyzing...' : 'Analyze Code'}
      </button>
    </div>
  );
}

CodeInput.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

CodeInput.defaultProps = {
  disabled: false
};

export default CodeInput;
