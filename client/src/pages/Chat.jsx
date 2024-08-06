import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NavBar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import './styles/Chat.css';
import Chatbox from '../components/ChatBox';

const ChatPage = () => {
  const [ messages, setMessages ] = useState([]);
  const [ messageHistory, setMessageHistory ] = useState([]);
  const [ userInfo, setUserInfo ] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const serverIp = process.env.REACT_APP_SERVER_IP;
    const port = process.env.REACT_APP_SERVER_PORT;

    if (!serverIp || !port) {
      console.error("Environment variables REACT_APP_SERVER_IP and REACT_APP_SERVER_PORT must be defined");
      return;
    }

    socket.current = io(`http://${serverIp}:${port}`, {
      auth: {
        token: token
      }
    });

    // Connection checks
    socket.current.on('connect', () => {
      console.log('Connected to server');
    });
    socket.current.on('connect_error', (err) => {
      console.log('Connection error:', err.message);
    });

    // Load chat messages
    socket.current.on('load chat', (msgArray) => {
        setMessages(msgArray);
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Load user info
    socket.current.on('user info', (info) => {
        setUserInfo(info);
    });

    // Load personal message history
    socket.current.on('load personal history', (msgArray) => {
        setMessageHistory(msgArray);
    });

    // Listen for new chat messages
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


  return (
    <>
        <NavBar />
        <div className="container">
            <div id="chat">
                <Chatbox messages={messages}/>
                
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
                    <ChatHistory messages={messageHistory} userInfo={userInfo} />
                </div>
            </div>

        </div>
    </>
);

};

export default ChatPage;