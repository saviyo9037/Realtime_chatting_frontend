import React from 'react';

const Home = () => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4">
      <div className="max-w-xl mx-auto">
        {/* Stories */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Stories</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((story) => (
              <div key={story} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-200" />
                  </div>
                </div>
                <p className="text-xs mt-1">User{story}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-white rounded-lg shadow mb-4">
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
              <span className="font-semibold">user_{post}</span>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Post Image</span>
            </div>
            <div className="p-3">
              <div className="flex gap-4 mb-2">
                <button className="text-2xl hover:text-red-500">❤️</button>
                <button className="text-2xl hover:text-blue-500">💬</button>
                <button className="text-2xl hover:text-green-500">✈️</button>
              </div>
              <p className="text-sm">
                <span className="font-semibold">user_{post}</span> This is a sample post description
              </p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

