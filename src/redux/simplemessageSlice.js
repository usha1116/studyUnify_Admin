// store/simpleMessageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const simpleMessageSlice = createSlice({
  name: 'simpleMessage',
  initialState,
  reducers: {
    // Action to add a new message
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Action to remove a message by id
    removeMessage: (state, action) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
    // Action to update message batches (add/remove)
    updateMessage: (state, action) => {
      const index = state.messages.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
  },
});

// Export actions
export const { addMessage, removeMessage, updateMessage } = simpleMessageSlice.actions;

// Export reducer
export default simpleMessageSlice.reducer;

