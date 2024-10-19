// app/store.js
import {configureStore} from '@reduxjs/toolkit';
import itemsReducer from '../storage/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
