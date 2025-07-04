import React from 'react';
import VoiceButton from './components/VoiceButton';
import CodeInput from './components/CodeInput';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>🧠 Voice Code Bot</h1>
      <VoiceButton />
      <CodeInput />
      <ChatBox />
    </div>
  );
}

export default App;
