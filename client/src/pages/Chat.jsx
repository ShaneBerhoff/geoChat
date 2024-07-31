import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
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
    <div id="chat">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}</strong> (<em>{formatTime(msg.timestamp)}</em>) {msg.content}
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" ref={inputRef} autoComplete="off" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;