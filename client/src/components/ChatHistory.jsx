import './styles/ChatHistory.css';
import { useState, useEffect, useRef } from 'react';

const ChatHistory = ({ messages, userInfo }) => {

    const [elapsedTime, setElapsedTime] = useState('');
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const calculateElapsedTime = () => {
            const startTime = new Date(userInfo.createdAt);
            const now = new Date();
            const difference = now - startTime;

            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setElapsedTime(`${hours}:${minutes}:${seconds}`);
        };

        calculateElapsedTime();
        const intervalId = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(intervalId);
    }, [userInfo.createdAt]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    return (
        <div className="board-container">
            <div className="name-container">
                <p className="name"><strong>{userInfo.username}</strong> &lt; {elapsedTime} &gt;</p>
            </div>
            <div className="messages-container" ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <p className="message" key={index}>
                        {formatTime(message.createdAt)} {message.content}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ChatHistory;
