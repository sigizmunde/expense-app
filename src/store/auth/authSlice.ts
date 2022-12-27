import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUser,
  logInUser,
  logOutUser,
  refreshUser,
  registerUser,
} from './authThunk';
import { ILogInTokens, IAuthState, IUser } from '../../types/auth';

const initialState: IAuthState = {
  refreshToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<ILogInTokens>) => {
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(refreshUser.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logOutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      });
  },
});

export const { resetRegistered } = authSlice.actions;
