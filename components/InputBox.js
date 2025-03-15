// C:\Users\Dell\chatbot-frontend\components\InputBox.js
export default function InputBox({ input, setInput, onSend, isLoading }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) onSend();
    };

    return (
        <div className="input-box">
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="input-field"
                    placeholder="Type a message..."
                    disabled={isLoading}
                />
                <button
                    onClick={onSend}
                    className="send-button"
                    disabled={isLoading || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}