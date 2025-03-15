// hooks/useChat.js
import { useState, useEffect, useRef } from 'react';

export function useChat() {  // Named export
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const API_BASE_URL = 'http://localhost:8000';

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            text: input,
            sender: 'user',
            isError: false,
            gifUrl: null,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Backend error');

            const botMessage = {
                text: data.reply || 'No reply received',
                sender: 'bot',
                isError: false,
                gifUrl: data.gif_url || null,
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                text: `Error: ${error.message} (Backend might be slow or down. Try again!)`,
                sender: 'bot',
                isError: true,
                gifUrl: null,
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/clear_chat/`);
            setMessages([]);
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return { messages, input, setInput, isLoading, messagesEndRef, handleSend, clearChat };
}