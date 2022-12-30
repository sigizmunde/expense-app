import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStatisticsState } from '../../types/data';
import { getStatistics } from './statisticsThunk';

const initialState: IStatisticsState = {
  transactions: [],
  dateFrom: '',
  dateTo: '',
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetStatistics: (state) => {
      state.transactions = [];
      state.dateFrom = '';
      state.dateTo = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getStatistics.fulfilled,
      (state, action: PayloadAction<IStatisticsState>) => {
        return action.payload;
      }
    );
  },
});

export const { resetStatistics } = statisticsSlice.actions;
