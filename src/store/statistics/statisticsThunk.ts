import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IStatisticsQueryProps } from '../../types/data';
import { IFetchError } from '../../types/utils';

export const getStatistics = createAsyncThunk(
  'statistics/getStatData',
  async (
    { dateFrom = '', dateTo = '' }: IStatisticsQueryProps,
    { rejectWithValue }
  ) => {
    try {
      const from = new Date(dateFrom).toISOString();
      const till = new Date(dateTo).toISOString();
      const queryString = `?date[gte]=${from}&date[lte]=${till}`;
      const { data } = await axios.get(`/transactions${queryString}`);
      return {
        transactions: data.content || [],
        dateFrom: from,
        dateTo: till,
      };
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
