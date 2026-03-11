
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaCog, FaUserPlus, FaTh, FaBookmark, FaUser } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();

  // Sample posts for demo
  const posts = [
    { id: 1, likes: 120, comments: 15 },
    { id: 2, likes: 85, comments: 8 },
    { id: 3, likes: 200, comments: 22 },
    { id: 4, likes: 95, comments: 12 },
    { id: 5, likes: 150, comments: 18 },
    { id: 6, likes: 75, comments: 5 },
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4">
      <div className="max-w-xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FaUserPlus />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FaCog />
              </button>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
            <p className="text-sm text-gray-400 mt-1">Role: {user?.role || 'user'}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-4 border-y">
            <div className="text-center">
              <p className="font-bold text-lg">{posts.length}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">1.2K</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">500</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button className="flex-1 py-3 flex items-center justify-center gap-2 border-b-2 border-black">
              <FaTh /> Posts
            </button>
            <button className="flex-1 py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700">
              <FaBookmark /> Saved
            </button>
            <button className="flex-1 py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700">
              <FaUser /> Tagged
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 p-1">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="aspect-square bg-gray-200 relative group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30">
                  <span className="text-white font-bold">❤️ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

