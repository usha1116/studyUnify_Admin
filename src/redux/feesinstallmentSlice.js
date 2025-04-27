import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  feesList: [], // Each item: { id, standardId, totalFees, numberOfInstallments }
};

const feesinstallmentSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    addFees: {
      reducer(state, action) {
        state.feesList.push(action.payload);
      },
      prepare({ standardId, totalFees, numberOfInstallments }) {
        return {
          payload: {
            id: nanoid(),
            standardId,
            totalFees,
            numberOfInstallments,
          },
        };
      },
    },
  },
});

export const { addFees } = feesinstallmentSlice.actions;
export default feesinstallmentSlice.reducer;



