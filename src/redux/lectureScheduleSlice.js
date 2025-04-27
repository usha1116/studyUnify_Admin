// lectureScheduleSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for lecture schedule
const initialState = {
  schedules: [], // Array to hold lecture schedule data
};

// Redux slice
const lectureScheduleSlice = createSlice({
  name: 'lectureSchedule',
  initialState,
  reducers: {
    // Action to add a new lecture schedule
    addLectureSchedule: (state, action) => {
      state.schedules.push(action.payload);
    },
    // Action to update an existing lecture schedule by id
    updateLectureSchedule: (state, action) => {
      const { id, updatedSchedule } = action.payload;
      const index = state.schedules.findIndex((schedule) => schedule.id === id);
      if (index !== -1) {
        state.schedules[index] = { ...state.schedules[index], ...updatedSchedule };
      }
    },
    // Action to delete a lecture schedule by id
    deleteLectureSchedule: (state, action) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== action.payload
      );
    },
  },
});

// Export actions
export const { addLectureSchedule, updateLectureSchedule, deleteLectureSchedule } = lectureScheduleSlice.actions;

// Export reducer
export default lectureScheduleSlice.reducer;
