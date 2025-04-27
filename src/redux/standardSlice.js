import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schools: [
    {
      id: 1,
      standardName: "1",   
    }
  ],
};

const schoolSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {
    addSchool: (state, action) => {
      state.schools.push({
        id: state.schools.length + 1,
        standardName: `${action.payload}`,
      });
    },
    updateSchool: (state, action) => {
      const { id, newStandard } = action.payload;
      const school = state.schools.find((s) => s.id === id);
      if (school) {
        school.standardName = `Standard ${newStandard}`;
      }
    },
    deleteSchool: (state, action) => {
      state.schools = state.schools.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSchool, updateSchool, deleteSchool } = schoolSlice.actions;
export default schoolSlice.reducer;

