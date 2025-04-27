import { createSlice } from '@reduxjs/toolkit';

const teacherIdSlice = createSlice({
  name: 'teacherId',
  initialState: {
    teachers: [],
  },
  reducers: {
    addTeacher: (state, action) => {
      const newId = state.teachers.length + 1;
      state.teachers.push({ ...action.payload, id: newId });
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
    },
    
  },
});

export const { addTeacher, deleteTeacher } = teacherIdSlice.actions;

export default teacherIdSlice.reducer;
