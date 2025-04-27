import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batches: [
    {
      id: 1,
      standardId: 1,
      name: " A",
      startTime: "09:00",
      endTime: "10:00",
    }
  ],
};

const batchSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    addBatch: (state, action) => {
      const { standardId, batch } = action.payload;
      const newBatch = {
        ...batch,
        id: Date.now().toString(), // unique ID
        standardId,
      };
      state.batches.push(newBatch);
    },
    deleteBatch: (state, action) => {
      const { batchId } = action.payload;
      state.batches = state.batches.filter((batch) => batch.id !== batchId);
    },
    updateBatch: (state, action) => {
      const { batch } = action.payload;
      const index = state.batches.findIndex((item) => item.id === batch.id);
      if (index !== -1) {
        state.batches[index] = { ...state.batches[index], ...batch };
      }
    },
  },
});

export const { addBatch, deleteBatch, updateBatch } = batchSlice.actions;
export default batchSlice.reducer;





