import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectLists, addInvalidCombination, updateInvalidCombination, Selection, InvalidCombination } from '../features/lists/listsSlice';

interface InvalidCombinationBuilderProps {
  darkMode: boolean;
  onCancel: () => void;
  onSave: () => void;
  existingCombination?: InvalidCombination;
}

const InvalidCombinationBuilder: React.FC<InvalidCombinationBuilderProps> = ({ 
  darkMode, 
  onCancel, 
  onSave, 
  existingCombination 
}) => {
  const lists = useAppSelector(selectLists);
  const dispatch = useAppDispatch();
  
  const [selectedItems, setSelectedItems] = useState<Selection[]>(existingCombination?.items || []);
  const [error, setError] = useState('');

  const generateCombinationName = (): string => {
    // For existing combinations, keep the existing name
    if (existingCombination) {
      return existingCombination.name;
    }
    
    // For new combinations, generate a UUID
    return uuidv4();
  };

  const getDisplayName = (items: Selection[]): string => {
    if (items.length === 0) return 'Invalid Combination';
    
    const parts = items.map(item => {
      const list = lists.find(l => l.id === item.listId);
      return `${list?.name || 'Unknown'}: ${item.value}`;
    });
    
    return parts.join(' + ');
  };

  const handleItemToggle = (listId: string, itemId: string, value: string) => {
    setSelectedItems(prev => {
      const existingIndex = prev.findIndex(item => item.listId === listId);
      
      if (existingIndex >= 0) {
        // If this list already has an item selected, replace it
        const newItems = [...prev];
        newItems[existingIndex] = { listId, itemId, value };
        return newItems;
      } else {
        // Add new item
        return [...prev, { listId, itemId, value }];
      }
    });
  };

  const handleRemoveItem = (listId: string) => {
    setSelectedItems(prev => prev.filter(item => item.listId !== listId));
  };

  const handleSave = () => {
    if (selectedItems.length < 2) {
      setError('Please select items from at least 2 lists');
      return;
    }

    const generatedName = generateCombinationName();

    if (existingCombination) {
      dispatch(updateInvalidCombination({
        id: existingCombination.id,
        name: generatedName,
        items: selectedItems
      }));
    } else {
      dispatch(addInvalidCombination({
        name: generatedName,
        items: selectedItems
      }));
    }

    onSave();
  };

  const isItemSelected = (listId: string, itemId: string) => {
    return selectedItems.some(item => item.listId === listId && item.itemId === itemId);
  };

  const getSelectedItemForList = (listId: string) => {
    return selectedItems.find(item => item.listId === listId);
  };

  return (
    <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {existingCombination ? 'Edit Invalid Combination' : 'Add Invalid Combination'}
      </h3>

      {error && (
        <div className={`mb-4 p-3 rounded-md ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-800'}`}>
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Select Items (choose one from each list)
        </label>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select items from different lists that form an invalid combination. You must select from at least 2 lists.
        </p>

        <div className="space-y-4">
          {lists.map((list) => (
            <div key={list.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{list.name}</h4>
              
              {list.items.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No items in this list</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {list.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemToggle(list.id, item.id, item.value)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        isItemSelected(list.id, item.id)
                          ? darkMode 
                            ? 'bg-purple-600 text-white border-purple-600' 
                            : 'bg-indigo-600 text-white border-indigo-600'
                          : darkMode
                            ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item.value}
                    </button>
                  ))}
                  
                  {getSelectedItemForList(list.id) && (
                    <button
                      onClick={() => handleRemoveItem(list.id)}
                      className={`text-sm px-2 py-1 rounded ${
                        darkMode ? 'text-red-400 hover:bg-red-900' : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      Clear selection
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-6">
          <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Selected Combination:
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedItems.map((item, index) => {
              const list = lists.find(l => l.id === item.listId);
              return (
                <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}>
                  {list?.name}: {item.value}
                </span>
              );
            })}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <strong>Preview:</strong> {getDisplayName(selectedItems)}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
            darkMode 
              ? 'bg-red-800 hover:bg-red-700' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {existingCombination ? 'Update' : 'Save'} Combination
        </button>
      </div>
    </div>
  );
};

export default InvalidCombinationBuilder; 