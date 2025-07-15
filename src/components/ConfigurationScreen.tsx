import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLists, selectInvalidCombinations, deleteInvalidCombination, InvalidCombination } from '../features/lists/listsSlice';
import InvalidCombinationBuilder from './InvalidCombinationBuilder';

interface ConfigurationScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ConfigurationScreen: React.FC<ConfigurationScreenProps> = ({ darkMode, toggleDarkMode }) => {
  const lists = useAppSelector(selectLists);
  const invalidCombinations = useAppSelector(selectInvalidCombinations);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showBuilder, setShowBuilder] = useState(false);
  const [editingCombination, setEditingCombination] = useState<InvalidCombination | null>(null);

  const handleAddCombination = () => {
    setEditingCombination(null);
    setShowBuilder(true);
  };

  const handleEditCombination = (combination: InvalidCombination) => {
    setEditingCombination(combination);
    setShowBuilder(true);
  };

  const handleDeleteCombination = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invalid combination?')) {
      dispatch(deleteInvalidCombination({ id }));
    }
  };

  const handleBuilderCancel = () => {
    setShowBuilder(false);
    setEditingCombination(null);
  };

  const handleBuilderSave = () => {
    setShowBuilder(false);
    setEditingCombination(null);
  };

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

      {lists.length >= 2 && (
        <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Invalid Combinations</h2>
            <button
              onClick={handleAddCombination}
              className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 focus:ring-red-500' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500'
              }`}
            >
              Add Invalid Combination
            </button>
          </div>

          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Define combinations of selections that should not be allowed.
          </p>

          {(!invalidCombinations || invalidCombinations.length === 0) ? (
            <div className="text-center py-8">
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No invalid combinations defined yet.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Add combinations that should be avoided during selection.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invalidCombinations && invalidCombinations.map((combination) => {
                // Group items by list for better display
                const itemsByList = combination.items.reduce((acc, item) => {
                  if (!acc[item.listId]) {
                    acc[item.listId] = [];
                  }
                  acc[item.listId].push(item);
                  return acc;
                }, {} as { [key: string]: typeof combination.items });

                return (
                  <div key={combination.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        {Object.entries(itemsByList).map(([listId, listItems]) => {
                          const list = lists.find(l => l.id === listId);
                          return (
                            <div key={listId} className="flex flex-wrap gap-1 items-center">
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {list?.name}:
                              </span>
                              {listItems.map((item, index) => (
                                <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                                  darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {item.value}
                                </span>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditCombination(combination)}
                        className={`px-2 py-1 text-sm rounded ${
                          darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCombination(combination.id)}
                        className={`px-2 py-1 text-sm rounded ${
                          darkMode ? 'bg-red-800 text-red-200 hover:bg-red-700' : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showBuilder && (
        <InvalidCombinationBuilder
          darkMode={darkMode}
          onCancel={handleBuilderCancel}
          onSave={handleBuilderSave}
          existingCombination={editingCombination || undefined}
        />
      )}
    </div>
  );
};

export default ConfigurationScreen; 