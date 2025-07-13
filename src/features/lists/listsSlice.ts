import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Define types
export interface ListItem {
  id: string;
  value: string;
}

export interface List {
  id: string;
  name: string;
  items: ListItem[];
}

export interface Selection {
  listId: string;
  itemId: string;
  value: string;
}

export interface InvalidCombination {
  id: string;
  name: string;
  items: Selection[]; // Array of selections that form the invalid combination
}

export interface ListsState {
  lists: List[];
  lastSelections: Selection[][];
  invalidCombinations: InvalidCombination[];
}

// Initial state
const initialState: ListsState = {
  lists: [],
  lastSelections: [],
  invalidCombinations: [],
};

// Create slice
export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ name: string }>) => {
      const newList: List = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: [],
      };
      state.lists.push(newList);
    },
    updateListName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.id);
      if (list) {
        list.name = action.payload.name;
      }
    },
    deleteList: (state, action: PayloadAction<{ id: string }>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload.id);
    },
    addItem: (state, action: PayloadAction<{ listId: string; value: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (list) {
        list.items.push({
          id: Date.now().toString(),
          value: action.payload.value,
        });
      }
    },
    updateItem: (state, action: PayloadAction<{ listId: string; itemId: string; value: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (list) {
        const item = list.items.find(item => item.id === action.payload.itemId);
        if (item) {
          item.value = action.payload.value;
        }
      }
    },
    deleteItem: (state, action: PayloadAction<{ listId: string; itemId: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== action.payload.itemId);
      }
    },
    addSelection: (state, action: PayloadAction<Selection[]>) => {
      // Add to the beginning of the array
      state.lastSelections.unshift(action.payload);
      
      // Keep only the last 5 selections
      if (state.lastSelections.length > 5) {
        state.lastSelections = state.lastSelections.slice(0, 5);
      }
    },
    addInvalidCombination: (state, action: PayloadAction<{ name: string; items: Selection[] }>) => {
      // Initialize invalidCombinations if it doesn't exist (for backward compatibility with existing persisted state)
      if (!state.invalidCombinations) {
        state.invalidCombinations = [];
      }
      
      const newInvalidCombination: InvalidCombination = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: action.payload.items,
      };
      state.invalidCombinations.push(newInvalidCombination);
    },
    updateInvalidCombination: (state, action: PayloadAction<{ id: string; name: string; items: Selection[] }>) => {
      // Initialize invalidCombinations if it doesn't exist
      if (!state.invalidCombinations) {
        state.invalidCombinations = [];
      }
      
      const invalidCombination = state.invalidCombinations.find(combo => combo.id === action.payload.id);
      if (invalidCombination) {
        invalidCombination.name = action.payload.name;
        invalidCombination.items = action.payload.items;
      }
    },
    deleteInvalidCombination: (state, action: PayloadAction<{ id: string }>) => {
      // Initialize invalidCombinations if it doesn't exist
      if (!state.invalidCombinations) {
        state.invalidCombinations = [];
      }
      
      state.invalidCombinations = state.invalidCombinations.filter(combo => combo.id !== action.payload.id);
    },
  },
});

// Export actions
export const {
  addList,
  updateListName,
  deleteList,
  addItem,
  updateItem,
  deleteItem,
  addSelection,
  addInvalidCombination,
  updateInvalidCombination,
  deleteInvalidCombination,
} = listsSlice.actions;

// Export selectors
export const selectLists = (state: RootState) => state.lists.lists;
export const selectLastSelections = (state: RootState) => state.lists.lastSelections;
export const selectInvalidCombinations = (state: RootState) => state.lists.invalidCombinations || [];

export default listsSlice.reducer; 