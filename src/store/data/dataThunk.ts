import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  ICategory,
  INewCategory,
  INewTransaction,
  ITransaction,
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
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/transactions');
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
