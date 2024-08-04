import './styles/ChatHistory.css';

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

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    return (
        <div className="board-container">
            <div className="name-container">
                <p className="name"><strong>{userInfo.username}</strong> &lt; {formatTime(userInfo.createdAt)} &gt;</p>
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
