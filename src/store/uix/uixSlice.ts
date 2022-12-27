import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUixState, TMessageType } from '../../types/uix';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../actionTypeCheckers';
import { logOutUser, registerUser } from '../auth/authThunk';

const initialState: IUixState = {
  isFetching: false,
  message: { type: undefined, text: null },
};

export const uixSlice = createSlice({
  name: 'uix',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = { type: undefined, text: null };
    },
    setMessage: (
      state,
      action: PayloadAction<{
        type: TMessageType;
        text: string;
      }>
    ) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'User successfully registered',
        };
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Successfully logged out',
        };
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isFetching = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching = false;
        state.message = { type: 'error', text: payload.message };
      });
  },
});

export const { resetMessage, setMessage } = uixSlice.actions;
