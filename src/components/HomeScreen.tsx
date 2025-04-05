import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold text-center text-indigo-600">List Mixer</h1>
      <p className="text-xl text-center text-gray-600">Choose a mode to begin</p>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <Link 
          to="/config" 
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 text-center min-w-[200px]"
        >
          Configuration
        </Link>
        <Link 
          to="/selector" 
          className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-center min-w-[200px]"
        >
          Selector
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen; 