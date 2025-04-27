import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  managers: [],
};

const managerIdSlice = createSlice({
  name: "managerId",
  initialState,
  reducers: {
    addManager: (state, action) => {
      state.managers.push(action.payload); // ID is now passed from component
    },
    updateManager: (state, action) => {
      const index = state.managers.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.managers[index] = action.payload;
      }
    },
    deleteManager: (state, action) => {
      state.managers = state.managers.filter((manager) => manager.id !== action.payload);
    },
  },
});

export const { addManager, updateManager, deleteManager } = managerIdSlice.actions;
export default managerIdSlice.reducer;

