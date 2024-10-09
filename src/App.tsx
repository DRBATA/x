import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Add initial greeting message
    setMessages([{ text: "Welcome to the Old English Village GP. How may I assist you today?", isUser: false }]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('/api/chatbot', { input, session_id: sessionId });
      
      // Add bot response to chat
      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
      
      // Update session ID if it's new
      if (response.data.session_id !== sessionId) {
        setSessionId(response.data.session_id);
      }
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later.", isUser: false }]);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h1>Old English Village GP</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
