import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompletedTests = createAsyncThunk(
  'upcoming/fetchCompletedTests',
  async () => {
    // Simulating fetching data from an API
    const response = await fetch('/api/completed-tests');
    const data = await response.json();
    return data;
  }
);
const initialState = {
  upcomingTests: [
    {
                id: 1,
                standard: '1',
                batch: 'A',
                subject:'Hindi',
                date: '01-05-2025',
                startTime: '10:00 AM',
                endTime:'10:00 AM',
                chapters: 5,
                description: 'Math test on Algebra and Geometry',
                totalMarks: 100,      
              },
  ],
  completedTests: [],
  pendingTests: []

};

const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    addUpcomingTest: (state, action) => {
      state.upcomingTests.push(action.payload);
    },
    editUpcomingTest: (state, action) => {
      const index = state.upcomingTests.findIndex((test) => test.id === action.payload.id);
      if (index !== -1) {
        state.upcomingTests[index] = action.payload;
      }
    },

    deleteUpcomingTest: (state, action) => {
      state.upcomingTests = state.upcomingTests.filter((test) => test.id !== action.payload);
    },
    addCompletedTest: (state, action) => {
      state.completedTests.push(action.payload);
    },
    // removeCompletedTest: (state, action) => {
    //   state.completedTests = state.completedTests.filter((test) => test.id !== action.payload);
    // },

    addToMarkPending: (state, action) => {
      state.pendingTests.push(action.payload);
    },

    removeFromUpcoming: (state, action) => {
      state.upcomingTests = state.upcomingTests.filter(test => test.id !== action.payload);
    },

    // addSubmittedMarks: (state, action) => {
    //   const { testId, studentMarks } = action.payload;
    //   const testIndex = state.pendingTests.findIndex((test) => test.id === testId);
    //   if (testIndex !== -1) {
    //     state.pendingTests[testIndex].submittedMarks = studentMarks;
    //   }
    // },
    //     addPendingTest: (state, action) => {
    //   state.pendingTests.push(action.payload);
    // },

    addSubmittedMarks: (state, action) => {
      const { testId, testData, studentMarks } = action.payload;
    
      const allMarksFilled = Object.values(studentMarks).every(
        (mark) => mark !== undefined && mark !== null && mark.toString().trim() !== ""
      );
    
      if (allMarksFilled) {
        // Convert studentMarks from {id: mark} to array of objects
        const marksArray = Object.entries(studentMarks).map(([studentId, marks]) => ({
          studentId,
          marks,
        }));
    
        // Move test from pending to completed
        state.pendingTests = state.pendingTests.filter((test) => test.id !== testId);
    
        state.completedTests.push({
          ...testData,
          studentMarks: marksArray, // ✅ now an array of { studentId, marks }
        });
      }
    },
    
  }
});

// Export actions
export const {
  addUpcomingTest,
  editUpcomingTest,
  deleteUpcomingTest,
  addCompletedTest,
  removeCompletedTest,
  addToMarkPending, 
  removeFromUpcoming,
  addSubmittedMarks,
  addPendingTest
} = upcomingSlice.actions;

// Export reducer
export default upcomingSlice.reducer;
