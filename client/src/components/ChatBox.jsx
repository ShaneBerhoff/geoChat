import { useEffect, useRef, useState } from 'react';
import NavBar from './Navbar';

const Chatbox = ({ messages }) => {
    const messagesContainerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    useEffect(() => {
        const handleScroll = () => {
            if (messagesContainerRef.current) {
                const { scrollHeight, clientHeight, scrollTop } = messagesContainerRef.current;
                const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
                setShowScrollButton(distanceFromBottom > 600);
            }
        };

        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current) {
            const { scrollHeight, clientHeight, scrollTop } = messagesContainerRef.current;
            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

            if (distanceFromBottom <= 300) {
                messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const { scrollHeight, clientHeight } = messagesContainerRef.current;
            messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    return (
        <div className="w-full h-full flex flex-col pb-2 overflow-hidden relative">
            <NavBar />
            <div
                ref={messagesContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-2 scrollbar-hide"
            >
                {messages.map((message, index) => (
                    <div key={index} className="flex items-baseline space-x-2 flex-wrap">
                        <span className="text-primary-dark text-sm">
                            {formatTime(message.createdAt)}
                        </span>
                        <span className="text-lg">
                            [{message.username}]
                        </span>
                        <p className="text-lg text-primary-dark">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>

            {showScrollButton && (
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={scrollToBottom}
                        className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
                        aria-label="Scroll to bottom"
                    >
                        <span className="text-primary text-lg">↓</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chatbox;