import React from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';

const Reels = () => {
  // Sample reels data
  const reels = [
    { id: 1, username: 'user1', likes: 1200, comments: 45, description: 'Amazing sunset view 🌅' },
    { id: 2, username: 'user2', likes: 850, comments: 23, description: 'Morning workout routine' },
    { id: 3, username: 'user3', likes: 2300, comments: 89, description: 'Try not to laugh challenge 😂' },
    { id: 4, username: 'user4', likes: 560, comments: 12, description: 'Cooking masterclass 🍳' },
  ];

  return (
    <div className="flex-1 bg-black min-h-screen">
      <div className="max-w-md mx-auto">
        {reels.map((reel) => (
          <div key={reel.id} className="relative h-screen border-b border-gray-800">
            {/* Video placeholder */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">Video Content</span>
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex">
              {/* Left - User info and description */}
              <div className="flex-1 flex flex-col justify-end p-4">
                <div className="text-white mb-4">
                  <p className="font-semibold">@{reel.username}</p>
                  <p className="text-sm">{reel.description}</p>
                </div>
              </div>

              {/* Right - Action buttons */}
              <div className="flex flex-col items-center justify-end pb-20 gap-6">
                <div className="flex flex-col items-center">
                  <button className="text-white text-3xl hover:scale-110 transition-transform">
                    <FaHeart />
                  </button>
                  <span className="text-white text-sm">{reel.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="text-white text-3xl hover:scale-110 transition-transform">
                    <FaComment />
                  </button>
                  <span className="text-white text-sm">{reel.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="text-white text-3xl hover:scale-110 transition-transform">
                    <FaShare />
                  </button>
                  <span className="text-white text-sm">Share</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="text-white text-3xl hover:scale-110 transition-transform">
                    <FaBookmark />
                  </button>
                  <span className="text-white text-sm">Save</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;

