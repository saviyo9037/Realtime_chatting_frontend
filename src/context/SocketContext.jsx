import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

const SOCKET_URL = 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isAuthenticated && token) {
      const newSocket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      newSocket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('newMessage', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on('messagesRead', (data) => {
        console.log('Messages read:', data);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, token]);

  const sendMessage = (receiverId, message) => {
    if (socket) {
      socket.emit('sendMessage', { receiverId, message });
    }
  };

  const sendTyping = (receiverId) => {
    if (socket) {
      socket.emit('typing', { receiverId });
    }
  };

  const markAsRead = (senderId) => {
    if (socket) {
      socket.emit('markRead', { senderId });
    }
  };

  const value = {
    socket,
    onlineUsers,
    messages,
    sendMessage,
    sendTyping,
    markAsRead,
    isOnline: (userId) => onlineUsers.includes(userId),
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

