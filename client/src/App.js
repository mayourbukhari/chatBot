import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check server connection
    checkConnection();
    // Load chat history
    loadChatHistory();
  }, []);

  const checkConnection = async () => {
    try {
      await axios.get('/api/health');
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
      console.error('Server connection failed:', error);
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await axios.get('/api/chat/history');
      const history = response.data.reverse(); // Reverse to show oldest first
      setMessages(history.map(chat => [
        { text: chat.message, sender: 'user', timestamp: chat.timestamp },
        { text: chat.response, sender: 'ai', timestamp: chat.timestamp }
      ]).flat());
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: inputMessage
      });

      const aiMessage = { 
        text: response.data.response, 
        sender: 'ai', 
        timestamp: new Date(response.data.timestamp) 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai', 
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete('/api/chat/history');
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return (
    <div className="App">
      <header className="chat-header">
        <h1>🤖 AI Chatbot</h1>
        <p>Designed by  <a href="https://github.com/mayourbukhari" target="_blank" rel="noopener noreferrer">Syed Mohsin Bukhari</a></p>
        <div className="header-controls">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
          <button onClick={clearHistory} className="clear-btn">
            🗑️ Clear History
          </button>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>Welcome to AI Chatbot!</h2>
              <p>Powered by Google's Gemini AI. Start a conversation below.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading || !isConnected}
            className="message-input"
          />
          <button 
            type="submit" 
            disabled={isLoading || !isConnected || !inputMessage.trim()}
            className="send-button"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
