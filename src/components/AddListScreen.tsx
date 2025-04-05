import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addList } from '../features/lists/listsSlice';

interface AddListScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AddListScreen: React.FC<AddListScreenProps> = ({ darkMode, toggleDarkMode }) => {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listName.trim()) {
      setError('Please enter a list name');
      return;
    }
    
    dispatch(addList({ name: listName.trim() }));
    navigate('/config');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/config" 
          className={`flex items-center space-x-1 ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-800'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Configuration</span>
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
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>Add New List</h1>
        <div className="w-16 h-1 mx-auto rounded-full my-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
      </div>

      <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="listName" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              List Name
            </label>
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-4 py-3 rounded-md shadow-sm focus:outline-none ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder="Enter list name"
            />
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-3 text-white font-medium rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 focus:ring-purple-500' 
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500'
              }`}
            >
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListScreen; 