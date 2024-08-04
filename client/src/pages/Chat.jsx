import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NavBar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import './styles/Chat.css';

const ChatPage = () => {
  const [ messages, setMessages ] = useState([]);
  const [ messageHistory, setMessageHistory ] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null);

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
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');

    socket.current = io('http://localhost:3000', {
      auth: {
        token: token
      }
    });
    socket.current.on('load chat'), (msgArray) => {
        setMessages(msgArray);
        window.scrollTo(0, document.body.scrollHeight);
    }
    socket.current.on('load personal history'), (msgArray) => {
        setMessageHistory(msgArray);
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputRef.current.value) {
      const message = {
        content: inputRef.current.value,
        createdAt: Date.now(),
      };
      socket.current.emit('chat message', message);
      setMessageHistory((prevHistory) => [...prevHistory, message]);
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
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <em className='timestamp'>{formatTime(msg.timestamp)}</em> <strong>{msg.sender}:</strong>  {msg.content}
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
                    <ChatHistory messages={messageHistory} />
                </div>
            </div>

        </div>
    </>
);

};

export default ChatPage;