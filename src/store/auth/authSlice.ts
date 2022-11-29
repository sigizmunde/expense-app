import { AnyAction, Action } from 'redux';
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
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isFetching: false,
  message: '',
};

function isPendingAction(action: AnyAction): action is Action {
  return action.type.endsWith('pending');
}

interface RejectedAction extends Action {
  payload: { message: string };
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetWarning: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isFetching = false;
        state.message = 'Successfully registered. You may now log in.';
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<ILogInTokens>) => {
          state.isFetching = false;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.isFetching = false;
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isFetching = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logOutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.isFetching = false;
        state.message = 'Successfully logged out.';
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.message = payload.message;
      });
  },
});

export const { resetWarning } = authSlice.actions;
