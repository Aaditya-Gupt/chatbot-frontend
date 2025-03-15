// C:\Users\Dell\chatbot-frontend\components\ChatWindow.js
import { useEffect } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, isLoading, messagesEndRef }) {
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messagesEndRef]);

    return (
        <div className="chat-window">
            <div className="message-container">
                {messages.map((msg, idx) => (
                    <Message key={idx} text={msg.text} sender={msg.sender} isError={msg.isError} />
                ))}
            </div>
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
}