import { useEffect, useRef } from 'react';

const Chatbox = ({ messages }) => {
    const messagesContainerRef = useRef(null);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    useEffect(() => {
        if (messagesContainerRef.current) {
            const { scrollHeight, clientHeight } = messagesContainerRef.current;
            messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [messages]);

    return (
        <div className="w-full h-full flex flex-col pb-2 overflow-hidden font-mono">
            <div
                ref={messagesContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-2"
            >
                {messages.map((message, index) => (
                    <div key={index} className="flex items-baseline space-x-2">
                        <span className="text-xs  italic">
                            {formatTime(message.createdAt)}
                        </span>
                        <span className="text-sm  font-bold">
                            {message.username}
                        </span>
                        <p className="text-sm ">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chatbox;