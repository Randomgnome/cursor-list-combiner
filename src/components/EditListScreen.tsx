import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLists, updateListName, deleteList, addItem, deleteItem } from '../features/lists/listsSlice';

interface EditListScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const EditListScreen: React.FC<EditListScreenProps> = ({ darkMode, toggleDarkMode }) => {
  const { listId } = useParams<{ listId: string }>();
  const lists = useAppSelector(selectLists);
  const list = lists.find(l => l.id === listId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [listName, setListName] = useState(list?.name || '');
  const [newItemValue, setNewItemValue] = useState('');
  const [error, setError] = useState('');

  if (!list) {
    return (
      <div className={`max-w-3xl mx-auto p-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
        </div>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>
            List Not Found
          </h1>
          <p className="mb-6">The list you're looking for does not exist</p>
          <Link 
            to="/config" 
            className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-transform hover:scale-105 ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
            }`}
          >
            Return to Configuration
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateName = () => {
    if (!listName.trim()) {
      setError('Please enter a list name');
      return;
    }

    dispatch(updateListName({
      id: list.id,
      name: listName.trim()
    }));

    setError('');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemValue.trim()) {
      setError('Please enter an item value');
      return;
    }

    dispatch(addItem({
      listId: list.id,
      value: newItemValue.trim()
    }));

    setNewItemValue('');
    setError('');
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteItem({
      listId: list.id,
      itemId
    }));
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch(deleteList({ id: list.id }));
      navigate('/config');
    }
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
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>Edit List</h1>
        <div className="w-16 h-1 mx-auto rounded-full my-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
      </div>

      <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-6">
          <label htmlFor="listName" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            List Name
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
                if (error) setError('');
              }}
              className={`flex-1 px-4 py-2 rounded-md shadow-sm focus:outline-none ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            <button
              onClick={handleUpdateName}
              className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-colors ${
                darkMode 
                  ? 'bg-purple-700 hover:bg-purple-800' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Update
            </button>
          </div>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>

        <div className="mb-6">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Items</h2>
          
          <form onSubmit={handleAddItem} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newItemValue}
                onChange={(e) => {
                  setNewItemValue(e.target.value);
                  if (error) setError('');
                }}
                className={`flex-1 px-4 py-2 rounded-md shadow-sm focus:outline-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="Add new item"
              />
              <button
                type="submit"
                className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-colors ${
                  darkMode 
                    ? 'bg-green-700 hover:bg-green-800' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Add
              </button>
            </div>
          </form>

          {list.items.length === 0 ? (
            <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No items in this list yet. Add some!
            </p>
          ) : (
            <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {list.items.map((item) => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{item.value}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={`p-1 rounded-full transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                    }`}
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleDeleteList}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            darkMode 
              ? 'bg-red-800 text-white hover:bg-red-900' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Delete List
        </button>
      </div>
    </div>
  );
};

export default EditListScreen; 