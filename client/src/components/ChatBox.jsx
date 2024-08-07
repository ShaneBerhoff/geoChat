const Chatbox = ({ messages }) => {

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };


    return (
        <div>
            <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index}>
                        <em className='timestamp'>{formatTime(msg.createdAt)}</em> <strong>{msg.username}:</strong>  {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Chatbox;