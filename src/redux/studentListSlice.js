import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    {
      id: 1, // Ensure each student has a unique ID
      name: " isha",
      mobile1: "1234567890",
      mobile2: "1234567890",
      email: "abc@gms.chs",
      address: "sdbnmsa",
      gender: "female",
      dob: "",
      standardId: "12",
      batchId: "A",
      organization:"dasjd",
    }
  ],
};

const studentListSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {

    addStudent: (state, action) => {
      const newId = state.students.length + 1;
      const studentId = `STU${newId}`;
      state.students.push({ ...action.payload, id: studentId, });
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentListSlice.actions;
export default studentListSlice.reducer;