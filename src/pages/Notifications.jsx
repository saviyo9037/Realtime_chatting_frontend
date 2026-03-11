import React, { useState } from 'react';
import { FaHeart, FaComment, FaUserPlus, FaEllipsisH } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: 'john_doe', message: 'liked your post', time: '2 minutes ago', read: false },
    { id: 2, type: 'comment', user: 'jane_smith', message: 'commented on your post', time: '15 minutes ago', read: false },
    { id: 3, type: 'follow', user: 'bob_wilson', message: 'started following you', time: '1 hour ago', read: true },
    { id: 4, type: 'like', user: 'alice_brown', message: 'liked your comment', time: '2 hours ago', read: true },
    { id: 5, type: 'follow', user: 'charlie_davis', message: 'started following you', time: '3 hours ago', read: true },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <FaHeart className="text-red-500" />;
      case 'comment':
        return <FaComment className="text-blue-500" />;
      case 'follow':
        return <FaUserPlus className="text-green-500" />;
      default:
        return null;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button 
              onClick={markAllAsRead}
              className="text-sm text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>
          
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span>{' '}
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <FaEllipsisH />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

