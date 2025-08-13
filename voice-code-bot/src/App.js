import React, { useState } from 'react';
import VoiceButton from './frontend/VoiceButton';
import CodeInput from './frontend/CodeInput';
import ChatBox from './frontend/ChatBox';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [messages, setMessages] = useState([]); // holds all user+bot messages

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:5000/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      const newMessages = [
        ...messages,
        { type: 'user', text: code },
        { type: 'bot', text: data.feedback || `Error: ${data.error}` },
      ];
      setMessages(newMessages);
    } catch (err) {
      setMessages([...messages, { type: 'bot', text: 'Connection error' }]);
    }
  };

  return (
    <div className="app-container">
      <h1>🧠 Voice Code Bot</h1>
      <VoiceButton />
      <CodeInput
        code={code}
        setCode={setCode}
        onSubmit={handleAnalyze}
      />
      <ChatBox messages={messages} />
    </div>
  );
}

export default App;
