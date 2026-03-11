import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../services/api';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const Messages = () => {
  const { user } = useAuth();
  const { socket, messages, sendMessage, isOnline } = useSocket();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Handle selectedUser from navigation state
  useEffect(() => {
    if (location.state?.selectedUser) {
      setSelectedUser(location.state.selectedUser);
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch conversations from API
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await api.getConversations();
        setConversations(data);
      } catch (error) {
        console.log('Using demo conversations');
        // Keep empty or set sample data as fallback
        setConversations([]);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedUser && socket) {
      // Fetch conversation history
      const fetchConversation = async () => {
        try {
          const data = await api.getConversation(selectedUser._id);
          setChatMessages(data);
        } catch (error) {
          console.log('Using demo messages');
          setChatMessages([
            { sender: selectedUser._id, message: 'Hey there!', timestamp: new Date(Date.now() - 3600000) },
            { sender: user?.id, message: 'Hi! How are you?', timestamp: new Date(Date.now() - 3500000) },
            { sender: selectedUser._id, message: 'I am good, thanks!', timestamp: new Date(Date.now() - 3400000) },
          ]);
        }
      };
      fetchConversation();

      // Listen for new messages
      const handleNewMessage = (message) => {
        setChatMessages(prev => [...prev, message]);
      };

      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [selectedUser, socket, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedUser) {
      sendMessage(selectedUser._id, messageText);
      setChatMessages(prev => [...prev, {
        sender: user?.id,
        message: messageText,
        timestamp: new Date()
      }]);
      setMessageText('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="h-screen flex max-w-6xl mx-auto">
        {/* Conversations List */}
        <div className={`w-full md:w-1/3 border-r bg-white ${selectedUser ? 'hidden md:block' : ''}`}>
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-65px)]">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => setSelectedUser(conv.user)}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b ${
                  selectedUser?._id === conv.user._id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {conv.user.name.charAt(0)}
                  </div>
                  {isOnline(conv.user._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-semibold">{conv.user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage.message}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center">
              <button 
                onClick={() => setSelectedUser(null)}
                className="md:hidden mr-3"
              >
                <FaArrowLeft />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                {isOnline(selectedUser._id) && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="ml-3">
                <p className="font-semibold">{selectedUser.name}</p>
                <p className="text-xs text-gray-500">
                  {isOnline(selectedUser._id) ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => {
                const isOwnMessage = msg.sender === user?.id;
                return (
                  <div
                    key={index}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        isOwnMessage
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-400'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <FaPaperPlane className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

