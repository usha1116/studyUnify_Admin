import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [
    { id: 1, standard: "1", subjectName: "Hindi" },
  ], 
  nextId: 1,    
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      const { standard, subjectName } = action.payload;

      const newSubject = {
        id: state.nextId,
        standard,
        subjectName,
      };

      state.subjects.push(newSubject);
      state.nextId += 1;
    },

    updateSubject: (state, action) => {
      const { id, subjectName } = action.payload;
      const index = state.subjects.findIndex((sub) => sub.id === id);
      if (index !== -1) {
        state.subjects[index].subjectName = subjectName;
      }
    },

    deleteSubject: (state, action) => {
      const { id } = action.payload;
      state.subjects = state.subjects.filter((sub) => sub.id !== id);
    },
  },
});

export const { addSubject, updateSubject, deleteSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
