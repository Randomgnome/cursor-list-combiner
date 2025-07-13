import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ConfigurationScreen from './components/ConfigurationScreen';
import AddListScreen from './components/AddListScreen';
import EditListScreen from './components/EditListScreen';
import SelectorScreen from './components/SelectorScreen';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference, otherwise default to dark mode
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? false : true; // Default to dark mode if no preference is saved
  });

  useEffect(() => {
    // Apply the theme to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col items-center justify-center space-y-8">
              <button 
                onClick={toggleDarkMode} 
                className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              <div className={`text-center ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>
                <h1 className="text-5xl font-bold mb-2">List Mixer</h1>
                <div className="w-24 h-1 mx-auto rounded-full mb-4 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Choose a mode to begin</p>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-8">
                <Link 
                  to="/config" 
                  className={`px-8 py-4 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 text-center min-w-[200px] ${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-800 to-purple-800 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-purple-500' 
                      : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500'
                  }`}
                >
                  Configuration
                </Link>
                <Link 
                  to="/selector" 
                  className={`px-8 py-4 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 text-center min-w-[200px] ${
                    darkMode 
                      ? 'bg-gradient-to-r from-emerald-800 to-green-800 text-white hover:from-emerald-700 hover:to-green-700 focus:ring-green-500' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-green-500'
                  }`}
                >
                  Selector
                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/config" element={<ConfigurationScreen darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/config/add-list" element={<AddListScreen darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/config/list/:listId" element={<EditListScreen darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/selector" element={<SelectorScreen darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
      
      {/* Stagewise Toolbar - only renders in development mode */}
      <StagewiseToolbar 
        config={{
          plugins: [ReactPlugin]
        }}
      />
    </div>
  );
}

export default App; 