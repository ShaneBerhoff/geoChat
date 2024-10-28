import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import Chatbox from '../components/ChatBox';
import RoomStatus from '../components/RoomStatus';
import { Helmet } from 'react-helmet-async';
import MainLayout from '../components/ui/mainLayout';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null);
  const navigate = useNavigate();

  const MESSAGE_EXPIRY_TIME = 60 * 60 * 1000; //60min
  console.log(MESSAGE_EXPIRY_TIME);
  // message cleanup
  useEffect(() => {
    const cleanupMessages = () => {
      const currentTime = Date.now();
      setMessages(prevMessages =>
        prevMessages.filter(msg =>
          (currentTime - msg.createdAt) < MESSAGE_EXPIRY_TIME
        )
      );
    };

    const cleanup = setInterval(cleanupMessages, 60000); // Check every minute

    return () => clearInterval(cleanup);
  }, [MESSAGE_EXPIRY_TIME]);

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
      navigate('/');
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
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const MAX_LENGTH = 500;

    if (inputRef.current.value) {
      if (inputRef.current.value.length > MAX_LENGTH) {
        inputRef.current.value = '';
        return;
      }
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
      <MainLayout>
        <div className="h-full w-full text-primary bg-primary-darker flex sm:flex-row flex-col-reverse">
          <div className="sm:w-2/3 w-full sm:h-full h-2/3 flex flex-col items-center p-4 border-2 border-primary-dark">
            <Chatbox messages={messages} />
            <form className="mt-auto w-full flex items-center sm:text-xl text-md" onSubmit={handleSubmit}>
              <span className='pl-4 pr-1 select-none'>&gt;</span>
              <input className='flex-grow py-2 px-1 focus:outline-none placeholder:text-primary-dark bg-primary-darker' ref={inputRef} autoComplete="off" placeholder='Enter a chat here' maxLength={500} />
            </form>
          </div>

          <div className="sm:w-1/3 w-full sm:h-full h-1/3 sm:flex flex-col items-center sm:pl-4 sm:gap-4">
            <div className="sm:h-1/2 h-full w-full flex flex-col items-center border-2 border-primary-dark overflow-hidden">
              <RoomStatus userInfo={userInfo} socket={socket} />
              <Leaderboard leaderboardArray={leaderboard} />
            </div>
            <div className="h-1/2 w-full sm:flex hidden border-2 border-primary-dark">
              <ChatHistory messages={messageHistory} userInfo={userInfo} />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ChatPage;
