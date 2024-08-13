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
  const [ leaderboard, setLeaderboard ] = useState([]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

    if (!SOCKET_URL) {
      console.error("Environment variables VITE_SOCKET_URL must be defined");
      return;
    }

    socket.current = io(SOCKET_URL, {
      withCredentials: true, //cookies
      transports: ['websocket']
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
      scrollToBottom();
    });

    // Load user info
    socket.current.on('user info', (info) => {
      setUserInfo(info);
    });

    // Load personal message history
    socket.current.on('load personal history', (msgArray) => {
      setMessageHistory(msgArray);
    });

    // Listen for leaderboard updates
    socket.current.on('leaderboard', (leaderboardArray) => {
      setLeaderboard(leaderboardArray);
    });

    // Listen for new chat messages
    socket.current.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

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
        <div id="chat" ref={chatContainerRef}>
          <Chatbox messages={messages} />
          <form id="form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input id="input" ref={inputRef} autoComplete="off" placeholder='Enter a message here' />
              <button type="submit" className="send-button">➤</button>
            </div>
          </form>
        </div>
        <div className="boards-container">
          <div className='leaderboard-container'>
            <Leaderboard leaderboardArray={leaderboard}/>
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
