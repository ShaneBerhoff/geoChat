import './styles/ChatHistory.css';

const ChatHistory = () => {
    const dummyChatHistory = [
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:16", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:17", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:18", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:19", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." },
        { time: "2:24:15", content: "Lorem Ipsum is simply dummy text of the printing industry." }
    ];

    return (
        <div className="board-container">
            <div className="name-container">
                <p className="name"><strong>John Smith</strong> &lt; 20:17 &gt;</p>
            </div>
            <div className="messages-container">
                {dummyChatHistory.map((message, index) => (
                    <p className="message" key={index}>
                        {message.time} <strong>John Smith</strong> {message.content}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
