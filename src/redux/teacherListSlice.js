import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   teachers: [],
// };

const teacherListSlice = createSlice({
  name: 'teacher',
  initialState:{
    teachers: [
      {
        name: "isha",
        mobile: "1234567890",
        altMobile: "1234567890",
        email: "abc@gmail.com",
        address: "ghogha circle",
        gender: " female",
        standard: "1",
        batch: "A",
        subject: "Hindi",
      }
    ],
  },
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },

    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(t => t.id !== action.payload);
    },

    
  },
});

export const { addTeacher, deleteTeacher } = teacherListSlice.actions;
export default teacherListSlice.reducer;