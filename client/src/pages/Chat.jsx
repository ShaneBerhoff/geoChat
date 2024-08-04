import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NavBar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import './styles/Chat.css';

const ChatPage = () => {
    const [ messages, setMessages ] = useState([]);
    const [ hasEnteredUsername, setHasEnteredUsername ] = useState(false);

    const dummyMessages = [
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            sender: 'John Smith',
            timestamp: '2:24:15',
            content: 'Short message test.'
        },
        
    ]


    const inputRef = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io();
        socket.current.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        window.scrollTo(0, document.body.scrollHeight);
        });

        return () => {
        if (socket.current) {
            socket.current.disconnect();
        }
        };
    }, []);

    function handleEnteredUsername() {
        setHasEnteredUsername(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputRef.current.value) {
        socket.current.emit('chat message', {
            content: inputRef.current.value,
            sender: sessionStorage.getItem('username'),
            timestamp: Date.now(),
        });
        inputRef.current.value = '';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toTimeString().split(' ')[0];
    };

  return (
    <>
        <NavBar />
        <div className="container">
            <div id="chat">
                <ul id="messages">
                    {dummyMessages.map((msg, index) => (
                        <li key={index}>
                            <em className='timestamp'>{msg.timestamp}</em> <strong>{msg.sender}:</strong>  {msg.content}
                        </li>
                    ))}
                </ul>

                <form id="form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input id="input" ref={inputRef} autoComplete="off" placeholder='Enter a message here'/>
                        <button type="submit" className="send-button">➤</button>
                    </div>
                </form>
            </div>
            
            <div className="boards-container">
                <div className='leaderboard-container'>
                    <Leaderboard />
                </div>
                <div className='chat-history-container'>
                    <ChatHistory />
                </div>
            </div>

        </div>
    </>
);

};

export default ChatPage;