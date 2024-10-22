import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import Chatbox from '../components/ChatBox';
import RoomStatus from '../components/RoomStatus';
import { Helmet } from 'react-helmet-async';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

    socket.current = io({
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
    socket.current.on('invalid-session', () => {
      navigate('/');
    });

    // Load chat messages
    socket.current.on('load chat', (msgArray) => {
      setMessages(msgArray);
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

    // Highlight input form
    if (inputRef.current) {
      inputRef.current.focus();
    }

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
      <Helmet>
        <link rel="canonical" href="https://geochat.live/chatroom" />
        <meta name="robots" content="noindex, follow" />
        <title>Chat Room | geoChat - Real-time Local Messaging</title>
        <meta name="description" content="Chat in real-time with people nearby in our anonymous local chat rooms. Experience location-based messaging with a retro vibe." />
        <meta name="keywords" content="geoChat room, live chat, local messaging, anonymous chat room" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chat Room | geoChat - Real-time Local Messaging" />
        <meta property="og:description" content="Chat in real-time with people nearby in our anonymous local chat rooms. Experience location-based messaging with a retro vibe." />
        <meta property="og:url" content="https://geochat.live/chatroom" />
        {/* Twitter */}
        <meta property="twitter:title" content="Chat Room | geoChat - Real-time Local Messaging" />
        <meta property="twitter:description" content="Chat in real-time with people nearby in our anonymous local chat rooms. Experience location-based messaging with a retro vibe." />
      </Helmet>
      <div className="h-screen w-full text-primary bg-primary-darker flex flex-col py-2">
        <div className="h-screen w-full flex flex-row lg:px-10 md:px-4 sm:px-2 py-2 overflow-auto">
          <div className="w-2/3 flex flex-col items-center p-4 border-2 border-primary-dark">
            <Chatbox messages={messages} />
            <form className="mt-auto w-full flex items-center text-xl" onSubmit={handleSubmit}>
              <span className='pl-4 pr-1 select-none'>&gt;</span>
              <input className='flex-grow py-2 px-1 focus:outline-none placeholder:text-primary-dark bg-primary-darker' ref={inputRef} autoComplete="off" placeholder='Enter a chat here' />
              {/* <button type="submit" className="px-2 py-1 hover:bg-primary hover:text-white transition-colors rounded-full">➤</button> */}
            </form>
          </div>

          <div className="w-1/3 flex flex-col items-center pl-4 gap-4">
            <div className="h-1/2 w-full flex flex-col items-center border-2 border-primary-dark overflow-hidden">
              <RoomStatus userInfo={userInfo} socket={socket} />
              <Leaderboard leaderboardArray={leaderboard} />
            </div>
            <div className="h-1/2 w-full border-2 border-primary-dark">
              <ChatHistory messages={messageHistory} userInfo={userInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
