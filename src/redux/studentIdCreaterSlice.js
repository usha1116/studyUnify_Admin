import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: []
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    }
  }
});

export const { addStudent, deleteStudent, updateStudent } = studentSlice.actions;
export const selectStudents = (state) => state.student.students;

export default studentSlice.reducer;
