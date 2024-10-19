import {createSlice} from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload); // Add a new item
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload.id); // Remove an item by id
    },
    updateItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update an item
      }
    },
  },
});

// Export actions
export const {addItem, removeItem, updateItem} = itemsSlice.actions;

// Export the reducer
export default itemsSlice.reducer;
