import { AnyAction, Action } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logInUser, logOutUser, registerUser } from './authThunk';
import { ILogInTokens, IAuthState } from '../../types/auth';

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
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.message = 'Successfully registered. You may now log in.';
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<ILogInTokens>) => {
          state.isFetching = false;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      )
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.message = 'Successfully logged out.';
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.message = payload.message;
      });
  },
});

export const { resetWarning } = authSlice.actions;
