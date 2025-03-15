// components/Message.js
import React from 'react';

export default function Message({ sender, text, isError, gifUrl, timestamp }) {
    console.log(`Rendering message - Sender: ${sender}, Text: ${text}, GIF: ${gifUrl}, Timestamp: ${timestamp}`);
    const messageClass = sender === 'user' ? 'user' : 'bot';
    const errorClass = isError ? 'error-message' : '';

    return (
        <div className={`message ${messageClass}`}>
            <div className={`message-content ${errorClass}`}>
                <p>{text}</p>
                {sender === 'bot' && (
                    gifUrl ? (
                        <img
                            src={gifUrl}
                            alt="GIF"
                            onError={(e) => console.log('Failed to load GIF:', gifUrl, e)}
                            onLoad={() => console.log('GIF loaded successfully:', gifUrl)}
                        />
                    ) : (
                        <p style={{ fontStyle: 'italic', color: '#888' }}>
                            Couldn’t load a GIF for this one!
                        </p>
                    )
                )}
                <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
            </div>
        </div>
    );
}