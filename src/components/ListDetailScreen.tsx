import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectLists, 
  updateListName, 
  deleteList, 
  addItem, 
  updateItem, 
  deleteItem 
} from '../features/lists/listsSlice';

const ListDetailScreen: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const lists = useAppSelector(selectLists);
  const list = lists.find(l => l.id === listId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [listName, setListName] = useState(list?.name || '');
  const [newItemValue, setNewItemValue] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemValue, setEditingItemValue] = useState('');

  if (!list) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">List not found</h2>
        <Link 
          to="/config" 
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          Back to Configuration
        </Link>
      </div>
    );
  }

  const handleNameSubmit = () => {
    if (listName.trim()) {
      dispatch(updateListName({ id: list.id, name: listName.trim() }));
      setIsEditingName(false);
    }
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch(deleteList({ id: list.id }));
      navigate('/config');
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemValue.trim()) {
      dispatch(addItem({ listId: list.id, value: newItemValue.trim() }));
      setNewItemValue('');
    }
  };

  const startEditingItem = (itemId: string, currentValue: string) => {
    setEditingItemId(itemId);
    setEditingItemValue(currentValue);
  };

  const handleUpdateItem = () => {
    if (editingItemId && editingItemValue.trim()) {
      dispatch(updateItem({ 
        listId: list.id, 
        itemId: editingItemId, 
        value: editingItemValue.trim() 
      }));
      setEditingItemId(null);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch(deleteItem({ listId: list.id, itemId }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link to="/config" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Configuration
        </Link>
        <h1 className="text-3xl font-bold text-indigo-600">List Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          {isEditingName ? (
            <div className="flex-1 mr-2">
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onBlur={handleNameSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
              />
            </div>
          ) : (
            <h2 className="text-xl font-semibold flex-1">{list.name}</h2>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditingName(true)}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              {isEditingName ? 'Save' : 'Edit Name'}
            </button>
            <button
              onClick={handleDeleteList}
              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Items</h3>
          {list.items.length === 0 ? (
            <p className="text-gray-500">No items in this list yet. Add one below.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {list.items.map((item) => (
                <li key={item.id} className="py-3">
                  {editingItemId === item.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editingItemValue}
                        onChange={(e) => setEditingItemValue(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-2"
                        onBlur={handleUpdateItem}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateItem()}
                        autoFocus
                      />
                      <button 
                        onClick={handleUpdateItem}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">{item.value}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditingItem(item.id, item.value)}
                          className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleAddItem} className="flex items-center">
          <input
            type="text"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-2"
            placeholder="Add a new item"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListDetailScreen; 