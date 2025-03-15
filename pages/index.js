// pages/index.js
import Head from 'next/head';
import { useChat } from '../hooks/useChat'; // Adjust if default export
import Message from '../components/Message';
import Image from 'next/image'; // For the chat icon

export default function Home() {
  const { messages, input, setInput, isLoading, messagesEndRef, handleSend, clearChat } = useChat();

  return (
    <div className="chat-container">
      <Head>
        <title>Chatbot</title>
      </Head>
      <div className="header">
        <Image src="/chat-icon.svg" alt="Chat Icon" width={40} height={40} />
        <h1>Chatbot</h1>
        <button onClick={clearChat}>Clear Chat</button>
      </div>
      <div className="chat-window">
        <div className="message-container">
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              text={msg.text}
              isError={msg.isError}
              gifUrl={msg.gifUrl}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
        {isLoading && (
          <div className="typing-indicator">
            <span className="typing-content">Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-box">
        <div className="input-container">
          <input
            className="input-field"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            disabled={isLoading}
          />
        </div>
        <button className="send-button" onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}