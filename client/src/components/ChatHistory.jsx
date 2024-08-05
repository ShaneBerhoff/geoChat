import './styles/ChatHistory.css';
import { useState, useEffect } from 'react';

const ChatHistory = ({ messages, userInfo }) => {
    const dummyChatHistory = [
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:16", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:17", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:18", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { createdAt: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." }
    ];

    const [ elapsedTime, setElapsedTime ] = useState('');

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



    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    return (
        <div className="board-container">
            <div className="name-container">
                <p className="name"><strong>{userInfo.username}</strong> &lt; {elapsedTime} &gt;</p>
            </div>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <p className="message" key={index}>
                        {formatTime(message.createdAt)} {message.content}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
