import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLists, addSelection, Selection, selectLastSelections } from '../features/lists/listsSlice';

interface SelectorScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SelectorScreen: React.FC<SelectorScreenProps> = ({ darkMode, toggleDarkMode }) => {
  const lists = useAppSelector(selectLists);
  const lastSelections = useAppSelector(selectLastSelections);
  const dispatch = useAppDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<Selection[] | null>(null);

  const generateRandomSelection = (): Selection[] => {
    const selection: Selection[] = [];
    
    lists.forEach(list => {
      if (list.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.items.length);
        const item = list.items[randomIndex];
        
        selection.push({
          listId: list.id,
          itemId: item.id,
          value: item.value
        });
      }
    });
    
    return selection;
  };

  const isSelectionEqual = (a: Selection[], b: Selection[]): boolean => {
    if (a.length !== b.length) return false;
    
    // Create sorted copies to ensure consistent comparison 
    const sortedA = [...a].sort((x, y) => x.listId.localeCompare(y.listId));
    const sortedB = [...b].sort((x, y) => x.listId.localeCompare(y.listId));
    
    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i].itemId !== sortedB[i].itemId) return false;
    }
    
    return true;
  };

  const isSelectionInHistory = (selection: Selection[]): boolean => {
    return lastSelections.some(historicalSelection => 
      isSelectionEqual(historicalSelection, selection)
    );
  };

  const handleGenerate = () => {
    if (lists.length === 0 || lists.every(list => list.items.length === 0)) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      let selection = generateRandomSelection();
      
      // Try up to 10 times to get a selection that hasn't appeared in history
      let attempts = 0;
      const maxAttempts = 20; // Increase max attempts to ensure uniqueness
      while (isSelectionInHistory(selection) && attempts < maxAttempts) {
        selection = generateRandomSelection();
        attempts++;
      }
      
      setCurrentSelection(selection);
      dispatch(addSelection(selection));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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

        <div className="flex items-center space-x-4">
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
      </div>

      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>Selector</h1>
        <div className="w-16 h-1 mx-auto rounded-full my-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
      </div>

      <div className={`rounded-lg shadow-lg p-8 mb-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {lists.length === 0 ? (
          <div className="py-12">
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>You need to create some lists first.</p>
            <Link 
              to="/config" 
              className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
              }`}
            >
              Go to Configuration
            </Link>
          </div>
        ) : lists.every(list => list.items.length === 0) ? (
          <div className="py-12">
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your lists don't have any items.</p>
            <Link 
              to="/config" 
              className={`px-4 py-2 text-white font-medium rounded-md shadow-md transition-transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
              }`}
            >
              Add Items
            </Link>
          </div>
        ) : (
          <>
            {!currentSelection ? (
              <div className="flex justify-center items-center py-16">
                <motion.button
                  onClick={handleGenerate}
                  className={`px-8 py-6 text-white text-2xl font-bold rounded-xl shadow-lg focus:outline-none focus:ring-4 w-48 h-48 flex items-center justify-center ${
                    darkMode 
                      ? 'bg-gradient-to-r from-emerald-800 to-green-800 hover:from-emerald-700 hover:to-green-700 focus:ring-green-700 focus:ring-opacity-50' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:ring-green-500 focus:ring-opacity-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "GO"
                  )}
                </motion.button>
              </div>
            ) : (
              <div className="py-8">
                <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Your Selection</h2>
                
                <div className="grid gap-6 mb-10 max-w-xl mx-auto">
                  {currentSelection.map((selection, index) => {
                    const list = lists.find(l => l.id === selection.listId);
                    return (
                      <div key={index} className={`p-6 rounded-lg shadow-md border-l-4 transform transition-all duration-200 hover:scale-102 ${
                        darkMode 
                          ? 'bg-gray-700 border-purple-500 shadow-purple-900/20' 
                          : 'bg-gray-50 border-indigo-500 shadow-indigo-900/10'
                      }`}>
                        <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{list?.name}</h3>
                        <p className={`text-xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selection.value}</p>
                      </div>
                    );
                  })}
                </div>
                
                <motion.button
                  onClick={handleGenerate}
                  className={`px-6 py-3 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-emerald-800 to-green-800 hover:from-emerald-700 hover:to-green-700 focus:ring-green-700' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:ring-green-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Re-Roll"
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectorScreen; 