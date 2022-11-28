import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IAuth, ILogInTokens, IUser } from '../../types/auth';
import { IValidationError } from '../../types/utils';

// axios baseUrl initializes in the index.tsx

interface IToken {
  set(token: string): void;
  unset(): void;
}

const token: IToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

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
      const error = err as AxiosError<IValidationError>;
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
      const error = err as AxiosError<IValidationError>;
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
      const { data } = await axios.post<never>('/auth/logout');
      token.unset();
      return data;
    } catch (err) {
      const error = err as AxiosError<IValidationError>;
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
>('auth/reconnect', async (userCredentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ILogInTokens>(
      '/auth/login',
      userCredentials
    );
    token.set(data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IValidationError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getUser = createAsyncThunk(
  'auth/reconnect',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/self');
      return data;
    } catch (err) {
      const error = err as AxiosError<IValidationError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
