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
        
            const formatWithLeadingZero = (num) => (num < 10 ? '0' + num : num);
        
            setElapsedTime(`${formatWithLeadingZero(hours)}:${formatWithLeadingZero(minutes)}:${formatWithLeadingZero(seconds)}`);
        };
        

        calculateElapsedTime();
        const intervalId = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(intervalId);
    }, [userInfo.createdAt]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            const { scrollHeight, clientHeight } = messagesContainerRef.current;
            messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [messages]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    return (
        <div className="w-full h-full flex flex-col overflow-hidden ">
            <div className="pt-4 px-4">
                <p className="flex flex-wrap items-baseline justify-center text-3xl">
                    <span className="">{userInfo.username}</span>
                    <span className="text-xl">&nbsp;&lt;{elapsedTime}&gt;&nbsp;</span>
                </p>
            </div>
            <div
                ref={messagesContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-2 text-primary-dark"
            >
                {messages.map((message, index) => (
                    <div key={index} className="flex items-baseline space-x-2 flex-wrap">
                        <span className="text-sm">
                            {formatTime(message.createdAt)}
                        </span>
                        <p className="text-lg break-words min-w-0">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatHistory;
