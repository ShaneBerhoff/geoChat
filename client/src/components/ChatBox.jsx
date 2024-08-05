const Chatbox = ({ messages }) => {

    const dummyMessages = [
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            username: 'John Smith',
            createdAt: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
       
    ]


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