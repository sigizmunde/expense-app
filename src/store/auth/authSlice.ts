import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUser,
  logInUser,
  logOutUser,
  refreshUser,
  registerUser,
} from './authThunk';
import { ILogInTokens, IAuthState, IUser } from '../../types/auth';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../actionTypeCheckers';

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isFetching: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetWarning: (state) => {
      state.message = '';
    },
    setWarning: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.message = 'success';
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<ILogInTokens>) => {
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logOutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.message = 'Successfully logged out.';
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isFetching = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching = false;
        state.message = payload.message;
      });
  },
});

export const { resetWarning, setWarning } = authSlice.actions;
