import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './styles/Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [messages, setMessages] = useState([
        { text: 'Welcome to geoChat.', typed: false },
        { text: 'Enter an alias to start chatting.', typed: false },
    ]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (currentMessageIndex < messages.length) {
            const timer = setTimeout(() => {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[currentMessageIndex].typed = true;
                    return updatedMessages;
                });
                setCurrentMessageIndex(currentMessageIndex + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messages, currentMessageIndex]);

    async function handleUsernameSubmit(event) {
        event.preventDefault();
        const username = inputRef.current.value;
        try {
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username }),
            });
            if (response.ok) {
                console.log("Sent to chatroom");
                navigate('/chatroom');
            } else if (response.status === 409) {
                setIsUsernameValid(false);
                setMessages([]);
                setMessages([
                    { text: "This username is taken. Please select another.", typed: false },
                ]);
                setCurrentMessageIndex(0);
            } else {
                setIsUsernameValid(false);
                setMessages([
                    ...messages,
                    { text: "Server error", typed: false },
                ]);
                setCurrentMessageIndex(0);
                navigate('/access-denied');
            }
        } catch (error) {
            setIsUsernameValid(false);
            setMessages([
                ...messages,
                { text: "Error with username fetch operation", typed: false },
            ]);
            setCurrentMessageIndex(0);
            navigate('/access-denied');
        } 
       
    }

    return (
        <div className="wrapper">
            <div className='content-container'>
                <div className='terminal'>
                    {messages.map((message, index) => (
                        <p key={index} className={`typed-text ${message.typed ? 'typed' : ''}`}>&gt; {message.text}</p>
                    ))}
                    <form className={`form ${!isUsernameValid ? 'invalid' : ''}`} id="form" onSubmit={handleUsernameSubmit}>
                        <span style={{ paddingRight: '8px'}}>&gt; </span>
                        <input
                            id="username"
                            ref={inputRef} 
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Welcome;