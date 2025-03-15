// C:\Users\Dell\chatbot-frontend\components\TypingIndicator.js
import { motion } from 'framer-motion';

export default function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="typing-indicator"
        >
            <span className="typing-content">Typing...</span>
        </motion.div>
    );
}