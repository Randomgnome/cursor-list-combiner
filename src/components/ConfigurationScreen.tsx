import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectLists } from '../features/lists/listsSlice';

interface ConfigurationScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ConfigurationScreen: React.FC<ConfigurationScreenProps> = ({ darkMode, toggleDarkMode }) => {
  const lists = useAppSelector(selectLists);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/" 
          className={`flex items-center space-x-1 ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-800'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </Link>
        
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>Configuration</h1>
        <div className="w-16 h-1 mx-auto rounded-full my-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
      </div>

      <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Your Lists</h2>
          <Link 
            to="/config/add-list" 
            className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 focus:ring-purple-500' 
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500'
            }`}
          >
            Add List
          </Link>
        </div>

        {lists.length === 0 ? (
          <div className="text-center py-10">
            <p className={`mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>You haven't created any lists yet.</p>
            <Link 
              to="/config/add-list" 
              className={`px-6 py-3 text-white font-medium rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 focus:ring-purple-500' 
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500'
              }`}
            >
              Create your first list
            </Link>
          </div>
        ) : (
          <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {lists.map((list) => (
              <li key={list.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{list.name}</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{list.items.length} items</p>
                  </div>
                  <button
                    onClick={() => navigate(`/config/list/${list.id}`)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConfigurationScreen; 