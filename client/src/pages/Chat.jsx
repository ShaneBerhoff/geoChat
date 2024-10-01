import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NavBar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import ChatHistory from '../components/ChatHistory';
import Chatbox from '../components/ChatBox';
import RoomStatus from '../components/RoomStatus';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null);

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
    <div className="min-h-screen max-h-screen w-full text-primary bg-background flex justify-center">
      <div className="w-full flex flex-col items-center p-4">
        <Chatbox messages={messages} />
        <form className="mt-auto w-full flex items-center font-mono" onSubmit={handleSubmit}>
          <span className='pl-4 select-none'>&gt;</span>
          <input className='flex-grow py-2 px-1 focus:outline-none placeholder:text-primary bg-background' ref={inputRef} autoComplete="off" placeholder='Enter a chat here' />
          {/* <button type="submit" className="px-2 py-1 hover:bg-secondary hover:text-white transition-colors rounded-full">➤</button> */}
        </form>
      </div>

      <div className="w-full max-w-md flex flex-col items-center p-4">
        <RoomStatus userInfo={userInfo} socket={socket} />
        <Leaderboard leaderboardArray={leaderboard} />
        <ChatHistory messages={messageHistory} userInfo={userInfo} />
      </div>
    </div>

  );
};

export default ChatPage;
