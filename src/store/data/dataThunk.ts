import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  ICategory,
  INewCategory,
  INewTransaction,
  ITransaction,
  ITransactionQueryProps,
} from '../../types/data';
import { IFetchError } from '../../types/utils';

export const getCategories = createAsyncThunk(
  'data/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/categories');
      return { categories: data.content || [] };
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  'data/addCategory',
  async (NewCategory: INewCategory, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ICategory>('/categories', NewCategory);
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'data/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<ICategory>('/categories/' + id);
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'data/updateCategory',
  async ({ id, label }: { id: number; label: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch<ICategory>('/categories/' + id, {
        label,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTransactions = createAsyncThunk(
  'data/getTransactions',
  async (
    {
      page = -1,
      limit = 10,
      filter = '',
      sort = [{ date: 'desc' }],
    }: ITransactionQueryProps,
    { rejectWithValue }
  ) => {
    try {
      const sortQueryString =
        sort?.reduce(
          (acc, el) =>
            acc +
            `${Object.keys(el)
              .map((key) => '&_sort=' + key)
              .join('')}${Object.values(el)
              .map((key) => '&_order=' + key)
              .join('')}`,
          ''
        ) || '';
      let queryString = `?${sortQueryString}&page=${page}&limit=${limit}`;
      if (filter !== '') queryString += `&label[contains]=${filter}`;
      const { data } = await axios.get(`/transactions${queryString}`);
      return {
        transactions: data.content || [],
        pagination: data.pagination || null,
        sort: data.sort || [],
        filter: data.filter || {},
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

export const addTransaction = createAsyncThunk(
  'data/addTransaction',
  async (NewCategory: INewTransaction, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ITransaction>(
        '/transactions',
        NewCategory
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'data/deleteTransaction',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<{
        id: number;
        label: string;
        userId: number;
      }>('/transactions/' + id);
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'data/updateTransaction',
  async (
    {
      id,
      date,
      categoryId,
      label,
      amount,
    }: {
      id: number;
      date?: string;
      categoryId: number;
      label?: string;
      amount?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch<{
        id: number;
        label: string;
        userId: number;
      }>('/transactions/' + id, {
        date,
        categoryId,
        label,
        amount,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError<IFetchError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTotalInfo = createAsyncThunk(
  'data/getTotalInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/transactions');
      const { totalIncome, totalExpense } = data.content.reduce(
        (
          acc: { totalIncome: number; totalExpense: number },
          e: ITransaction
        ) => {
          if (e.amount < 0) acc.totalExpense += e.amount;
          if (e.amount > 0) acc.totalIncome += e.amount;
          return acc;
        },
        { totalIncome: 0, totalExpense: 0 }
      );
      const totalTransactions = data.content.length;
      return {
        totalIncome,
        totalExpense,
        totalTransactions,
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
