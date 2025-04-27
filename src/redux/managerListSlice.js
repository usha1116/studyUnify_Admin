import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  managers: [],
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    addManager: (state, action) => {
      state.managers.push(action.payload);
    },
    editManager: (state, action) => {
      const index = state.managers.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.managers[index] = action.payload;
      }
    },
    deleteManager: (state, action) => {
      state.managers = state.managers.filter(m => m.id !== action.payload);
    },
  },
});

export const { addManager, editManager, deleteManager } = managerSlice.actions;
export default managerSlice.reducer;
