import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IAuth, ILogInTokens, IUser } from '../../types/auth';
import { IFetchError } from '../../types/utils';
import { token } from '../../services/token';

// axios baseUrl initializes in the index.tsx

export const registerUser = createAsyncThunk<IUser, IAuth>(
  'auth/register',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IUser>(
        '/auth/register',
        userCredentials
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

export const logInUser = createAsyncThunk<ILogInTokens, IAuth>(
  'auth/logIn',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ILogInTokens>(
        '/auth/login',
        userCredentials
      );
      token.set(data.accessToken);
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

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<never>('/auth/logout');
      token.unset();
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

export const refreshUser = createAsyncThunk<
  { accessToken: string },
  { refreshToken: string }
>('auth/reconnect', async ({ refreshToken }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ILogInTokens>('/auth/refresh', {
      refreshToken,
    });
    token.set(data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IFetchError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/self');
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
