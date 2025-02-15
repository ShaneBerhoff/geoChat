import { useEffect, useRef, useState } from 'react';
import NavBar from './Navbar';

const Chatbox = ({ messages }) => {
    const messagesContainerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const initialScrollDone = useRef(false);

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

    useEffect(() => {
        if (messages.length > 0 && !initialScrollDone.current) {
          scrollToBottom();
          initialScrollDone.current = true;
        }
    }, [messages.length]);

    return (
        <div className="w-full h-full flex flex-col pb-2 overflow-hidden relative">
            <NavBar />
            <div
                ref={messagesContainerRef}
                className="overflow-y-auto px-4 space-y-2 scrollbar-hide"
            >
                {messages.map((message, index) => (
                    <div key={index} className="flex items-baseline space-x-2 flex-wrap">
                        <span className="text-primary-dark sm:text-sm text-xs">
                            {formatTime(message.createdAt)}
                        </span>
                        <span className="sm:text-lg text-md">
                            [{message.username}]
                        </span>
                        <p className="sm:text-lg text-md text-primary-dark break-words min-w-0">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>

            {showScrollButton && (
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={scrollToBottom}
                        className="w-10 h-10 hover:text-primary-darker rounded-sm hover:bg-primary transition-all duration-300 ease-in-out"
                        aria-label="Scroll to bottom"
                    >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M11 4h2v8h2v2h-2v2h-2v-2H9v-2h2V4zm-2 8H7v-2h2v2zm6 0v-2h2v2h-2zM4 18h16v2H4v-2z" fill="currentColor"/> </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chatbox;