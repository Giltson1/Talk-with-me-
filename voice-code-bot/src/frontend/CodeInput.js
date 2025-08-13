import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function CodeInput({ code, setCode, onSubmit }) {
  return (
    <div>
      <TextareaAutosize
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        minRows={5}
        maxRows={20}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: '1rem' }}
      />
      <br />
      <button onClick={onSubmit}>Analyze</button>
    </div>
  );
}

export default CodeInput;
